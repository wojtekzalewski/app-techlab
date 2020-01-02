class TransferInputElement {
	constructor(selector, regexp, id) {
		this.id = id;
		this.selector = document.querySelector(`.${selector}`),
			this.regexp = regexp;
		this.shouldSend = false;
		this.value = '';
	}
	setInputListener(functArg) {
		this.selector.addEventListener("keyup", () => {
			functArg(this);
			this.getValue();
			console.log(this.value)
		})
	}
	finalValidation(functArg) {
		return functArg(this)
	}
	pushToTable(tableToPush) {
		tableToPush.push(this);
	}
	setListenerAndPush(arg, functArg) {
		this.setInputListener(functArg);
		this.pushToTable(arg);
	}
	getValue() {
		this.value = this.selector.value;
	}
}

function inputElement(selector, regexp, id) {
	return new Promise((resolve, reject) => {
		if (selector != "" && regexp instanceof RegExp) {
			let resolvedPromise = new TransferInputElement(selector, regexp, id);
			resolve({
				status: 200,
				msg: 'OK!',
				payload: resolvedPromise
			})
		} else {
			let reason = new Error("not enough info");
			reject({
				status: 500,
				msg: reason,
				payload: null
			});
		}
	})
}