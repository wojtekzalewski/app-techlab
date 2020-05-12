document.addEventListener("DOMContentLoaded", () => {
    const newPaymentBtn = document.querySelector(".new-paymant");
    const closePayment = document.querySelector(".close-popup-transfer-form");
    const transferForm = document.querySelector(".transfer-form-popup");
    const przekorzystneAccount = document.querySelector('.account-box-przekorzystne');
    const przekorzystneAccMain = document.querySelector('.przekorzystne_account');
    const secondAccount = document.querySelector('.select-account-box-2');
    const secondAccountInner = document.querySelector('.selected-account-2');
    const closeSelectAccount = document.querySelector('.arrow-account');
    const arrowAccCurent = document.querySelector('.arrow-account-2');
    const saveOrderInput = document.querySelector('.save-order');
    const ArraySaveOrder = document.querySelectorAll('.save_order');
    const transferSuccess = document.querySelector('#transfer-success');
    const transferFailed = document.querySelector('#transfer-failed');
    const closeFinishTransferPopup = document.querySelector('.cross-white');
    const transferFinish = document.querySelector(".transferFinishForm");
    const viewPortWidth = window.innerWidth || document.documentElement.clientWidth;
    const closePopupFailed = document.querySelector('.cross-white-failed');
    const transferRetryBtn = document.querySelector('.transfer-retry-btn');
    const accountType = document.querySelector('.main-account');
    const mainAcc = document.querySelector('.main-acc');
    secondAccount.classList.add('none');
    closePayment.addEventListener("click", () => {
        transferForm.classList.add('none');
    })
    arrowAccCurent.classList.add('none');
    closeSelectAccount.addEventListener("click", () => {
        secondAccount.classList.toggle('none');
    })
    przekorzystneAccount.addEventListener("click", () => {
        if (accountType.classList.contains('selected_acc')) {
            secondAccount.classList.add('none');
        } else {
            accountType.classList.add('selected_acc');
            secondAccount.classList.toggle('none');
        }
    })
    secondAccount.addEventListener("click", () => {
        mainAcc.classList.remove('selected_acc');
        przekorzystneAccMain.classList.toggle('none');
        arrowAccCurent.classList.toggle('none');
        przekorzystneAccount.classList.remove('selected_acc');
        secondAccountInner.classList.add('selected_acc');
    })
    saveOrderInput.checked = true;
    ArraySaveOrder.forEach((element) => {
        element.addEventListener("click", () => {
            if (saveOrderInput.checked) {
                saveOrderInput.checked = false;
            } else {
                saveOrderInput.checked = true;
            }
        })
    })
    closeFinishTransferPopup.addEventListener("click", () => {
        transferFinish.classList.add('none');
    })
    closePopupFailed.addEventListener("click", () => {
        transferFailed.classList.add('none');
    })
    newPaymentBtn.addEventListener("click", () => {
        transferForm.classList.contains('none') && transferForm.classList.remove('none');
        if (viewPortWidth < 768) {
            new TransferMobile();
        } else {
            new TransferDesktop();
        }
    })
    transferRetryBtn.addEventListener("click", () => {
        transferFailed.classList.add('none');

    })
    class TransferMobile {
        constructor() {
            this.accountType = document.querySelector('.main-account');
            this.numberAccount = document.querySelector('.account-number');
            this.transferAmount = document.querySelector('.transfer-amount');
            this.targetAddress = document.querySelector('.target-address');
            this.transferTitle = document.querySelector('.title-transfer-mob');
            this.transferType = document.querySelector('.order-name');
            this.transferSubmit = document.querySelector('.transferSubmit');
            this.trasnferForm = document.querySelector('.transferForm');
            this.transferFinish = document.querySelector('.transferFinishForm');
            this.transferFinishCloseBtn = document.querySelector('.transferFinishCloseBtn');
            this.regexpAccNr = /^[0-9]{26}$/;
            // this.regexpAccNr = /^[0-9]{4}$/; //regex do testowania
            this.regexpAmount = /^[0-9]{1,10}[,][0-9]{2}$/;
            this.regexpTitle = /^[a-zA-z\s\dżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,60}$/;
            this.data = {};
            this.validationElementTable = [{
                    element: this.numberAccount,
                    regexp: this.regexpAccNr,
                    status: false,
                },
                {
                    element: this.transferAmount,
                    regexp: this.regexpAmount,
                    status: false,
                },
                {
                    element: this.transferTitle,
                    regexp: this.regexpTitle,
                    status: false,
                },
            ];
            this.validationEvent();
            this.transferSubmit.addEventListener('click', () =>
                this.submitTransferForm());
        }
        validationEvent() {
            for (let i = 0; i < this.validationElementTable.length; i++) {
                this.validationElementTable[i].element.addEventListener('keyup', () => this.validateField(this.validationElementTable[i].element, this.validationElementTable[i].regexp, i));
            }
        }
        getValue() {
            this.data = {
                accountType: this.accountType.innerHTML,
                numberAccount: this.numberAccount.nodeValue,
                transferAmount: this.transferAmount.value,
                address: this.targetAddress.value,
                transferTitle: this.transferTitle.value,
                transferType: this.transferType.value,
                success: true
            }
            return this.data;
        }
        validateFields() {
            return this.validationElementTable.every((test) => test.status === true);
        }
        validateField(obj, regexp, index) {
            if (regexp.test(obj.value)) {
                obj.parentElement.nextElementSibling.classList.add('none');
                obj.parentElement.parentElement.children[2].classList.add('none');
                this.validationElementTable[index].status = true;
                return true;
            } else {
                this.validationElementTable[index].status = false;
                return false;
            }
        }
        closeForm() {
            this.transferFinish.classList.add('none');
        }
        formSuccess() {
            transferForm.classList.add('none');
            transferSuccess.classList.remove('none');
        }
        formFail() {
            transferForm.classList.add('none');
            transferFailed.classList.remove('none');
        }
        async submitTransferForm() {
            if (this.validateFields()) {
                this.getValue();
                this.fillFinishForm(this.data);
                const response = await this.sendData(this.data);
                if (response.status === 201) {
                    const json = await response.json();
                    if (json.success) {
                        this.fillFinishForm(json);
                        this.formSuccess();
                    } else {
                        this.fillFinishForm(this.data);
                        this.formFail();
                    }
                } else {
                    this.fillFinishForm(this.data);
                    this.formFail();
                }
            } else {
                console.error('ERROR - pola walidacji formularza');
            }
        }
        async sendData(data) {
            const header = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify(data)
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', header);
            console.log(response);
            return await response;
        }
        fillFinishForm(obj) {
            let selectedAccount = document.querySelector('.selected_acc');
            let filledAmountValue = document.querySelector('.amount-value');
            let filledNameReciver = document.querySelector('.name-reciver');
            selectedAccount.innerText = obj.accountType;
            filledAmountValue.innerHTML = obj.transferAmount;
            filledNameReciver.innerText = obj.transferType;
        }
    }
    class TransferDesktop {
        constructor() {
            this.accountType = document.querySelector('.main-account');
            this.numberAccount = document.querySelector('.account-number');
            this.transferAmountDesktop = document.querySelector('.transfer-amount-desktop');
            this.targetAddress = document.querySelector('.target-address');
            this.transferTitleDesktop = document.querySelector('.title-transfer-desktop');
            this.transferType = document.querySelector('.order-name');
            this.transferSubmit = document.querySelector('.transferSubmit');
            this.trasnferForm = document.querySelector('.transferForm');
            this.transferFinish = document.querySelector('.transferFinishForm');
            this.transferFinishCloseBtn = document.querySelector('.transferFinishCloseBtn');
            this.viewPortWidth = window.innerWidth || document.documentElement.clientWidth;
            this.regexpAccNr = /^[0-9]{26}$/;
            // this.regexpAccNr = /^[0-9]{4}$/; //regex do testowania
            this.regexpAmount = /^[0-9]{1,10}[,][0-9]{2}$/;
            this.regexpTitle = /^[a-zA-z\s\dżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,60}$/;
            this.data = {};
            this.validationElementTableDesktop = [{
                    element: this.numberAccount,
                    regexp: this.regexpAccNr,
                    status: false,
                },
                {
                    element: this.transferAmountDesktop,
                    regexp: this.regexpAmount,
                    status: false,
                },
                {
                    element: this.transferTitleDesktop,
                    regexp: this.regexpTitle,
                    status: false,
                }
            ];
            this.validationEventDesktop();
            this.transferSubmit.addEventListener('click', () =>
                this.submitTransferForm());
        }

        validationEventDesktop() {
            for (let i = 0; i < this.validationElementTableDesktop.length; i++) {
                this.validationElementTableDesktop[i].element.addEventListener('keyup', () => this.validateFieldDesktop(this.validationElementTableDesktop[i].element, this.validationElementTableDesktop[i].regexp, i));
            }
        }
        getValueDesktop() {
            this.data = {
                accountType: this.accountType.innerHTML,
                numberAccount: this.numberAccount.nodeValue,
                amountDesktop: this.transferAmountDesktop.value,
                address: this.targetAddress.value,
                titleDesktop: this.transferTitleDesktop.value,
                transferType: this.transferType.value,
                success: true
            }
            return this.data;
        }
        validateFieldsDesktop() {
            return this.validationElementTableDesktop.every((test) => test.status === true);
        }
        validateFieldDesktop(obj, regexp, index) {
            if (regexp.test(obj.value)) {
                obj.parentElement.nextElementSibling.classList.add('none');
                obj.parentElement.parentElement.children[2].classList.add('none');
                this.validationElementTableDesktop[index].status = true;
                return true;
            } else {
                this.validationElementTableDesktop[index].status = false;
                return false;
            }
        }
        closeForm() {
            this.transferFinish.classList.add('none');
        }
        formSuccess() {
            transferForm.classList.add('none');
            transferSuccess.classList.remove('none');
        }
        formFail() {
            transferForm.classList.add('none');
            transferFailed.classList.remove('none');
        }
        async submitTransferForm() {
            if (this.validateFieldsDesktop()) {
                this.getValueDesktop();
                this.fillFinishForm(this.data);
                const response = await this.sendData(this.data);
                if (response.status === 201) {
                    const json = await response.json();
                    if (json.success) {
                        this.fillFinishForm(json);
                        this.formSuccess();
                    } else {
                        this.fillFinishForm(this.data);
                        this.formFail();
                    }
                } else {
                    this.fillFinishForm(this.data);
                    this.formFail();
                }
            } else {
                console.error('ERROR - pola walidacji formularza');
            }
        }
        async sendData(data) {
            const header = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify(data)
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', header);
            console.log(response);
            return await response;
        }
        fillFinishForm(obj) {
            let selectedAccount = document.querySelector('.selected_acc');
            let filledAmountValue = document.querySelector('.amount-value');
            let filledNameReciver = document.querySelector('.name-reciver');
            selectedAccount.innerText = obj.accountType;
            filledAmountValue.innerHTML = obj.amountDesktop;
            filledNameReciver.innerText = obj.transferType;
        }
    }
})