document.addEventListener("DOMContentLoaded", function () {
	const newPaymentBtn = document.querySelector(".new-paymant");
	const closePayment = document.querySelector(".close-popup-transfer-form");
	const transferForm = document.querySelector(".transfer-form-popup");

	newPaymentBtn.addEventListener("click", function () {
		transferForm.classList.contains('none') && transferForm.classList.remove('none');
		const transfer = new Transfer();
	});

	closePayment.addEventListener("click", function () {
		transferForm.classList.add('none');
    });
    
    const secondAccount = document.querySelector('.select-account-box-2');
	secondAccount.classList.add('none');
	const closeSelectaccount = document.querySelector('.arrow-account');
	closeSelectaccount.addEventListener("click", function(){
			console.log('aaa');
		// secondAccount.style.display = "none";
		// secondAccount.classList.remove('none')
		secondAccount.classList.toggle('none');

	});

class Transfer {
    constructor() {
        // ------------------- data element -------------------
        this.data = {};

        // ------------------- dom elements -------------------
        this.targetAccount = document.querySelector(".targetAccount");
        this.transferAmount = document.querySelector(".transferAmount");
        this.targetAddress = document.querySelector(".targetAddress");
        this.transferTitle = document.querySelector(".transferTitle");
        this.transferType = document.querySelector(".transferType");
        this.transferSubmit = document.querySelector(".transferSubmit");
        this.transferForm= document.querySelector(".transferForm");
        this.transferFinish = document.querySelector(".transferFinishForm");
        this.transferFinishCloseBtn = document.querySelector(".transferFinishCloseBtn");

        // ------------------- regexp -------------------
        // this.regexpAccNr = /^[0-9]{26}$/;
        this.regexpAccNr = /^[0-9]{4}$/;
        this.regexpAmount = /^[0-9]{1,10}[,][0-9]{2}$/;
        this.regexpTitle = /^[a-zA-z\s\dżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,60}$/;

        // ------------------- input validation -------------------

        this.validationElementTable = [
            // {
            //     element: this.targetAccount,
            //     regexp: this.regexpAccNr,
            //     status: false,
            // },
            // {
            //     element: this.transferAmount,
            //     regexp: this.regexpAmount,
            //     status: false,
            // },
            {
                element: this.transferTitle,
                regexp: this.regexpTitle,
                status: false,
            }
        ];

        this.createValidationEvent();
        // this.targetAccount.addEventListener('keyup', () => this.validateField(this.targetAccount, this.regexpAccNr));
        // this.transferAmount.addEventListener('keyup', () => this.validateField(this.transferAmount, this.regexpAmount));
        // this.transferTitle.addEventListener('keyup', () => this.validateField(this.transferTitle, this.regexpTitle));

        // ------------------- events -------------------
        this.transferSubmit.addEventListener('click', () => this.submitTransferForm());
        // this.transferFinishCloseBtn.addEventListener('click', () => this.closeFinishForm());
    }

    createValidationEvent() {

        for (let i = 0; i < this.validationElementTable.length; i++) {
            this.validationElementTable[i].element.addEventListener('keyup', () => this.validateField(this.validationElementTable[i].element, this.validationElementTable[i].regexp, i));
        }
        // this.validationElementTable.forEach(obj => {
        //     console.log(obj);
        //     obj.element.addEventListener('keyup', () => this.validateField(obj.element, obj.regexp));
        // });
    }

    getAllValue() {
        this.data = {
            targetAccount: this.targetAccount.value,
            amount: this.transferAmount.value,
            address: this.targetAddress.value,
            title: this.transferTitle.value,
            transferType: this.transferType.value,
            success: true
        };

        return this.data;
    }

    validateAllFields() {
        return this.validationElementTable.every((test) => test.status === true);
    }

    validateField(obj, regexp, index) {
        if (regexp.test(obj.value)) {
            obj.classList.contains("transfer__textField--error") && obj.classList.remove("transfer__textField--error");
            obj.parentElement.parentElement.children[2].style.display = 'none';
            this.validationElementTable[index].status = true;
            return true;
        } else {
            this.validationElementTable[index].status = false;
            obj.classList.add("transfer__textField--error");
            obj.parentElement.parentElement.children[2].style.display = 'block';
            if (obj.value) {
                obj.parentElement.parentElement.children[2].innerText = 'zła wartość';
            } else {
                obj.parentElement.parentElement.children[2].innerText = 'podaj wartość';
            }
            return false
        }
    }

    closeFinishForm() {
        this.transferFinish.classList.add('none');
    }

    setFinalFormSuccess() {
        this.transferForm.classList.add('none');
        this.transferFinish.classList.remove('none');
        this.transferFinish.classList.remove('transfer__finish--fail');
        this.transferFinish.classList.add('transfer__finish--success');

        let listFail = document.querySelectorAll(".tcFail");
        let listSuccess = document.querySelectorAll(".tcSuccess");

        listFail.forEach(element => {
            element.classList.add('none')
        });

        listSuccess.forEach(element => {
            element.classList.remove('none')
        });
    }

    setFinalFormFail() {
        this.transferForm.classList.add('none');
        this.transferFinish.classList.remove('transfer__finish--success');
        this.transferFinish.classList.add('transfer__finish--fail');

        let listFail = document.querySelectorAll(".tcFail");
        let listSuccess = document.querySelectorAll(".tcSuccess");

        listFail.forEach(element => {
            element.classList.remove('none')
        });

        listSuccess.forEach(element => {
            element.classList.add('none')
        });

        this.transferFinish.classList.remove('none');
    }

    async submitTransferForm() {
        if (this.validateAllFields()) {
            this.getAllValue();
            // this.fillFinishForm(this.data);
            // console.log(this.data);
            const response = await this.sendData(this.data);
            // const json = response.json();

            // console.log(json);

            if (response.status === 201) {
                const json = await response.json();
                if (json.success){
                    this.fillFinishForm(json);
                    this.setFinalFormSuccess();
                } else {
                    this.fillFinishForm(this.data);
                    this.setFinalFormFail();
                }
            } else {
                this.fillFinishForm(this.data);
                this.setFinalFormFail();
            }

        } else {
            console.error("błędnie uzupełnione pola");
        }
    }

    async sendData(data) {

        const header = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts', header);
        // return await response.json();
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', header);
        console.log(response);
        return await response;
    }

    fillFinishForm(obj, user) {
        let tcUserAccountNr = document.querySelector(".tcUserAccountNr");
        let tcReceiverAccountNr = document.querySelector(".tcReceiverAccountNr");
        let tcTransferAmount = document.querySelector(".tcTransferAmount");
        let tcReceiverTitle = document.querySelector(".tcReceiverTitle");

        tcReceiverAccountNr.innerText = obj.targetAccount;
        tcTransferAmount.innerText = obj.amount;
        tcReceiverTitle.innerText = obj.title;
    }
}

})