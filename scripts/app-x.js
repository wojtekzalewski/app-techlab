document.addEventListener("DOMContentLoaded", function() {
	const redirectBtn = document.querySelector(".newPaymentBtn");
	redirectBtn &&
	(redirectBtn.addEventListener("click", function () {
		window.location = "./redirect.html" 
	}));
	let generalCheck = false; 
	class TransferInputElement {
		constructor (selector, regexp) {
			this.selector = document.querySelector(`.${selector}`),
			this.regexp = regexp
			this.shouldSend = false
		}
		addListener() {
			this.selector.addEventListener ("keyup", ()=>{
				customValidation(this);
			})
		}
		finalValidation () {
			return customValidation(this)
		}
		pushToTable () {
			inputTable.push(this)
		}
	}
	 const inputTable = []
	 const transferForm = document.querySelector('.transfer-form');
	 const transferTitle = new TransferInputElement ("transferTitle-input", /^([a-zA-Z0-9_-]){5,60}$/);
	 const transferRecName = new TransferInputElement ("transferRecName-input", /^[A-Z]([a-zA-Z]){2,60}$/);
	 
	 function customValidation(inputElementObj) {
		if (inputElementObj.regexp.test(inputElementObj.selector.value)) {
			inputElementObj.selector.classList.contains("border-red") && inputElementObj.selector.classList.remove("border-red");
			inputElementObj.selector.classList.add("border-green");
			console.log("działa")
			inputElementObj.shouldSend = true;
			return true
		} else {
			inputElementObj.selector.classList.contains("border-green") && inputElementObj.selector.classList.remove("border-green")
			inputElementObj.selector.classList.add("border-red");
			console.log("nie działa")
			inputElementObj.shouldSend = false;
			return false
		}
	}
	 transferTitle.addListener();
	 transferRecName.addListener();
	 
	function checkForm (param) {
		for (let i = 0; i < inputTable.length; i++) {
			param = inputTable[i].finalValidation()
			console.log(param)
		 } 
		 return param
	}
	function final (param) {
		console.log(param)
		if (param == true) {
			const sendData = {
				title: transferTitle.value,
				recName: transferRecName.value,
				recAccount: transferRecAccountNr.value,
				recPostal: transferRecPostalCode.value,
				recCity: transferRecCity.value,
				message: transferMsg.value,
				amount: transferAmount.value
			}
			console.log("Przelew Wysłany!!!");
			console.log(sendData);
		 } else {
			 console.log("sorry, try again ;__;");
		 }
	}
	 transferForm.addEventListener("submit", async function(e) {
		e.preventDefault();
		await checkForm(generalCheck)
		final(generalCheck);

	 })
	})