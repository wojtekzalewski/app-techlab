document.addEventListener("DOMContentLoaded", function () {

	class TransferInputElement {
		constructor(selector, regexp, id) {
			this.id = id;
			this.selector = document.querySelector(`#${selector}`);
			this.regexp = regexp;
			this.shouldSend = false;
			this.value = '';
		}
		setInputListener() {
			this.selector.addEventListener("keyup", () => {
				this.getValue();
				console.log(this.value);
			})
		}
		finalValidation(functArg) {
			return functArg(this);
		}
		pushToTable(tableToPush) {
			tableToPush.push(this);
		}
		setListerAndPush(arn, functArg) {
			this.setInputListener(functArg);
			this.pushToTable(arg);
		}
		getValue() {
			this.value = this.selector.value;
		}
	}

	// declarations inputs value:

	let accountNumberValue = new TransferInputElement("account-number", /^(\d{2}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4})$/, "1");
	accountNumberValue.setInputListener();

	let addressRecipientValue = new TransferInputElement("address-recipient", /^([a-zA-Z]){2,60}$/, "2");
	addressRecipientValue.setInputListener();

	let titleTransferValue = new TransferInputElement("title-transfer", /^([a-zA-Z0-9_-\s]){5,60}$/, "3");
	titleTransferValue.setInputListener();

	let titleTranferDesktopvalue = new TransferInputElement("title-transfer-desktop", /^([a-zA-Z0-9_-\s]){5,60}$/, "4")
	titleTranferDesktopvalue.setInputListener();

	let transferAmountValue = new TransferInputElement("transfer-amount", /^[0-9]{0,}$/, "5");
	transferAmountValue.setInputListener();

	let transferAmountDesktopValue = new TransferInputElement("transfer-amount-desktop", /^[0-9]{0,}$/, "6")
	transferAmountDesktopValue.setInputListener();

	let orderNameValue = new TransferInputElement("order-name", /^([a-zA-Z0-9_-\s]){5,60}$/, "7")
	orderNameValue.setInputListener();


	function inputElement(selector, regexp, id) {
		return new TransferInputElement(selector, regexp, id);
	}

	// client object

	class Client {
		constructor(id, name, surname, accountNr, accountBalance, transactionHist, inputTable) {
			this.id = id;
			this.name = name;
			this.surname = surname;
			this.accountNr = accountNr;
			this.accountBalance = accountBalance;
			this.transactionHist = transactionHist;
			this.inputTable = inputTable;
		}
		changeAccNr(newAccNr) {
			this.accountNr = newAccNr;
			this.sendNotifToUser();
			this.sendNotiToCientHandler();
		}
		sendNotifToUser() {
			console.log("User has been notified");
		}
		sendNotifToClientHandler() {
			console.log("Handler has been notified");
		}
		sendTransfer(amount) {
			if (this.accountBalance > amount) {
				this.accountBalance -= amount;
				console.log("transfer has been sent");
			} else {
				console.log("not enough fonds");
			}
		}
	}

	function client(id, name, surname, accountNr, accountBalance, transactionHist, inputTable) {
		return new Client(id, name, surname, accountNr, accountBalance, transactionHist, inputTable);
	};

	// validator scripts/

	class Validator {
		constructor() {}
		finalFromValidation(sendData, clientData) {
			let temp = sendData.every((element) => element.shouldSend === true);
			if (temp) {
				for (let i = 0; i < sendData.length; i++) {
					if (sendData[i].id === "1") {
						clientData.sendTransfer(sendData[i].getValue());
						console.log("czy dzialam?");
						break;
					}
				}
			}
			console.log(temp);
			console.log(sendData.amount);
		}


		customValidation(inputElementObj) {
			if (inputElementObj.regexp.test(inputElementObj.selector.value)) {
				// inputElementObj.selector.classList.contains("alert-display") && inputElementObj.selector.classList.remove("alert-display");
				inputElementObj.selector.classList.add("alert-hidden");
				console.log("działa")
				inputElementObj.shouldSend = true;
				return true
			} else {
				// inputElementObj.selector.classList.contains("alert-hidden" ) && inputElementObj.selector.classList.remove("alert-hidden ")
				inputElementObj.selector.classList.add("alert-display ");
				console.log("nie działa")
				inputElementObj.shouldSend = false;
				return false
			}
		}
		checkForm(param) {
			for (let i = 0; i < inputTable.length; i++) {
				param = inputTable[i].finalValidation(this.customValidation)
			}
			return param
		}
	}

	function validatorObject() {
		return new Validator();
	}

	let myValidator = new Validator();

	// events click:
	const transferBtn = document.querySelector(".new-paymant");
	const trasnferFormPopup = document.querySelector(".transfer-form-popup");
	const closePopupCross = document.querySelector(".close-popup-transfer-form");

	transferBtn.addEventListener("click", function () {
		trasnferFormPopup.classList.add("appear");
	});

	closePopupCross.addEventListener("click", function () {
		if (trasnferFormPopup.classList.contains("appear")) {
			trasnferFormPopup.classList.remove("appear");
			trasnferFormPopup.classList.add("none");
		}
	});

	let testVariable = "1234";
	fetch(`http://localhost:3001/rest/v1/products/${testVariable}`).then(response => {
		console.log(response);
		if (response.status === 200) {
			response.json().then(resp => {
				console.log(resp)
			})
		}
	})

	const inputTable = [];
	const customValidator = validatorObject();
	let nameSurname;
	const createInputElement = [];

	createInputElement.map(element => {
		console.log("as");
		createInputElement.push();
		element.setInputListener(customValidator.customValidation);
	});


let data = new FormData();
data.append(name, "dupa")
fetch(`http://localhost:3001/rest/v1/products/postForm`, {
	method: 'POST',
	mode: 'cors',
	body: data
}).then(response => {
	console.log(response)
	if (response.status === 200) {
		response.json().then(dupa => {
			console.log(dupa)
		})
	}
});
});