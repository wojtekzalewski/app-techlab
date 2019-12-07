// inputObject scripts:
// conat inputElement =  ("account-number",  /^(\d{2}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4})$/) => {

// }

class TransferInputElement {
	constructor(selector, regexp, id) {
		this.id = id;
		this.selector = document.querySelector(`#${selector}`),
		this.regexp = regexp;
		this.shouldSend = false;
		this.value = '';
	}
	setInputListener(functArg) {
		this.selector.addEventListener("keyup", () => {
			functArg(this);
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

function inputElement(selector, regexp, id) {
	return new TransferInputElement(selector, regexp, id);
	//   return new Promise((resolve, reject) => {
	// if (selector != "" && regexp instanceof RegExp) {
	//   let resolvedPromise = new TransferInputElement(selector, regexp, id);
	//   resolve({
	//     status: 200,
	//     msg: 'OK!',
	//     payload: resolvedPromise
	//   })
	// }else{
	//   let reason = new Error ("not enough info");
	//   reject({
	//     status: 500,
	//     msg: reason,
	//     payload: null
	//   });
	// }
	//   })
}

// client object script

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

document.addEventListener("DOMContentLoaded", function () {
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
				} else {}
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
			// const objectArrayFull = [
			//   {
			//     id: "1",
			//     selector: "account-number",
			//     regexp: /^(\d{2}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4})$/
			//   },
			//   {
			//     id: "2",
			//     selector: "transfer-amonut",
			//     regexp: /^[0-9]{0,}$/
			//   },
			//   {
			//     id:"3",
			//     selector: "address-recipient",
			//     regexp:/^([a-zA-Z]){2,60}$/
			//   },
			//   {
			//     id: "4",
			//     selector:"title-transfer",
			//     regexp:/^([a-zA-Z0-9_-\s]){5,60}$/
			//   },
			//   {
			//     id: "5",
			//     selector: "order-name",
			//     regexp:/^([a-zA-Z0-9_-\s]){5,60}$/
			//   }
			// ];

			const objectArray = [{
				id: "1",
				selector: "account-number",
				regexp: /^(\d{2}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4})$/
			}];

			let nameSurname;
			// const createInputElement = [];

			// 	client("ID", "Name", "Surname", "12345678900987654321123456", 10000, ["0"], objectArray)
			// 	.then(response => {
			// 		if (response.status === 200) {
			// 			console.log(response.payload.inputs);
			// 			response.payload.inputs.map(inputObject => {
			// 				inputElement(inputObject.inputTitle, inputObject.inputRegexp).then(response => {
			// 					console.log(response);
			// 					if (response.status === 200) {
			// 						createInputElement.push(response.payload);
			// 					} else {
			// 						throw new Error(response.msg);
			// 					}
			// 				}).then(() => {
			// 					createInputElement.map(element => {
			// 						element.setInputListener			(customValidator.customValidation);
			// 					})
			// 				})
			// 			})
			// 			nameSurname = response.payload;
			// 			return nameSurname;
			// 		} else {
			// 			console.log(response.msg);
			// 		}
			//   });

			const createInputElement = [];

			createInputElement.map(element => {
				console.log("as");
				createInputElement.push();
				element.setInputListener(customValidator.customValidation);
			});








				// "account-number",  /^(\d{2}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4}-\d{4})$/
				//   let transferForm = document.querySelector('#transfer-form');
				//   transferForm.addEventListener("submit", function (e) {
				// 		e.preventDefault();
				// 		console.log(nameSurname);
				// 		console.log(inputTable);
				// 		// finalFormValidation(checkForm(generalCheck));
				// 		customValidator.finalFromValidation(inputTable, nameSurname);
				// 	})
				// })

				//   let testMetodhs = {
				//     lengthRegexp: "////,"
				//     valueRegexp: ////

				// }

				// class myOutputClass {
				//   constructor( identifier, value) {
				//     this.identifier = identifier;
				//     this.value ="";
				//   }

				//   getValue(functArg) {
				//     this.selector.addEventListener ("keyup", () => {
				//     functArg(this);
				//   });

				//     // get value and sets this.value to the value it's gotten
				//   }

				//   addDynamicValidationListener() {
				//     //adds listener on keyup and checks i
				//     return functArg(this);
				//   }

				//   pushToSubmitArray(pushToSubmitArray){
				//     pushToSubmitArray.push(this);
				//   }
			})