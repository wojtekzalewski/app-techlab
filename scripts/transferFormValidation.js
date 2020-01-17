document.addEventListener("DOMContentLoaded", function () {
	const newPaymentBtn = document.querySelector(".new-paymant");
	const closePayment = document.querySelector(".close-popup-transfer-form");
	const transferForm = document.querySelector(".transfer-form-popup");
    const przekorzystneAccount = document.querySelector('.account-box-przekorzystne');
    const przekorzystneAccMain = document.querySelector('.przekorzystne_account');
    const secondAccount = document.querySelector('.select-account-box-2');
	secondAccount.classList.add('none');
    const closeSelectAccount = document.querySelector('.arrow-account');
    const arrowAccCurent = document.querySelector('.arrow-account-2');
    const saveOrderLabel = document.querySelector('.save_order_label');
    const saveOrderInput = document.querySelector('.save-order');
    const ArraySaveOrder = document.querySelectorAll('.save_order');
    const transferSuccess = document.querySelector('#transfer-success');
    const transferFailed = document.querySelector('#transfer-failed');
    const closeFisnishTransferPopup = document.querySelector('.cross-white');
    const transferFinish = document.querySelector(".transferFinishForm");

    newPaymentBtn.addEventListener("click", function () {
		transferForm.classList.contains('none') && transferForm.classList.remove('none');
		const transfer = new Transfer();
	});
	closePayment.addEventListener("click", function () {
		transferForm.classList.add('none');
    });
    arrowAccCurent.classList.add('none');
	closeSelectAccount.addEventListener("click", function(){
        secondAccount.classList.toggle('none');
    });
    przekorzystneAccount.addEventListener("click" , function() {
        secondAccount.classList.add('none');
        przekorzystneAccount.classList.add('selected_acc');
    });
    secondAccount.addEventListener("click", function() {
        przekorzystneAccMain.classList.toggle('none');
        arrowAccCurent.classList.toggle('none');
        przekorzystneAccount.classList.remove('selected_acc');
        secondAccount.classList.add('selected_acc');
    });
    saveOrderInput.checked = true;
    ArraySaveOrder.forEach(function(element){
        element.addEventListener("click", function() {
            if (saveOrderInput.checked ) {
                saveOrderInput.checked = false;
            } else {
                saveOrderInput.checked = true;
            }
        })
    });
    closeFisnishTransferPopup.addEventListener("click", function() {
        transferFinish.classList.add('none');
    });

class Transfer {
    constructor() {
        this.data = {};
        this.accountType = document.querySelector(".main-account");
        this.numberAccount = document.querySelector(".account-number");
        this.transferAmount = document.querySelector(".transfer-amount");
        this.transferAmountDesktop = document.querySelector(".transfer-amount-desktop");
        this.targetAddress = document.querySelector(".targetAddress");
        this.transferTitle = document.querySelector(".title-transfer-mob");
        this.transferTitleDesktop = document.querySelector(".title-transfer-desktop");
        this.transferType = document.querySelector(".order-name");
        this.transferSubmit = document.querySelector(".transferSubmit");
        this.transferForm= document.querySelector(".transferForm");
        this.transferFinish = document.querySelector(".transferFinishForm");
        this.transferFinishCloseBtn = document.querySelector(".transferFinishCloseBtn");

        // this.regexpAccNr = /^[0-9]{26}$/;
        this.regexpAccNr = /^[0-9]{4}$/; //regex do testowania
        this.regexpAmount = /^[0-9]{1,10}[,][0-9]{2}$/;
        this.regexpTitle = /^[a-zA-z\s\dżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,60}$/;
        this.validationElementTable = [
            {
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
                element: this.transferAmountDesktop,
                regexp: this.regexpAmount,
                status: false,
            },
            {
                element: this.transferTitle,
                regexp: this.regexpTitle,
                status: false,
            },
            {
                element: this.transferTitleDesktop,
                regexp: this.regexpTitle,
                status: false,
            },

        ];
        this.validationEvent();
        this.transferSubmit.addEventListener('click', () => this.submitTransferForm());
    }

    validationEvent() {
        for (let i = 0; i < this.validationElementTable.length; i++) {
            this.validationElementTable[i].element.addEventListener('keyup', () => this.validateField(this.validationElementTable[i].element, this.validationElementTable[i].regexp, i));
        }
    }

    getValue() {
        this.data = {
            accountType: this.accountType.innerHTML,
            numberAccount: this.numberAccount.value,
            transferAmount: this.transferAmount.value,
            amountDesktop: this.transferAmountDesktop.value,
            address: this.targetAddress.value,
            transferTitle: this.transferTitle.value,
            titleDesktop: this.transferTitleDesktop.value,
            transferType: this.transferType.value,
            success: true
        };
        console.log(this.data);
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
            obj.parentElement.parentElement.children[2].classList.add('apear');
            obj.parentElement.nextElementSibling.classList.add('apear');
            return false
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
        transferForm.classList.remove('none');
    }

    async submitTransferForm() {
        if (this.validateFields()) {
            this.getValue();
            this.fillFinishForm(this.data);
            const response = await this.sendData(this.data);
            if (response.status === 201) {
                const json = await response.json();
                if (json.success){
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
            console.error("błędnie uzupełnione pola");
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
        let filedAccountSender = document.querySelector(".acc-number-sender");
        let filledAccountReciver = document.querySelector(".account-reciver");
        let filledAmountValue = document.querySelector(".amount-value");
        let filledNameReciver = document.querySelector(".name-reciver");

        selectedAccount.innerText = obj.accountType;
        filledAccountReciver.innerText = obj.numberAccount;
        filledAmountValue.innerText = obj.transferAmount;
        filledNameReciver.innerText = obj.transferType;
    }
}
})