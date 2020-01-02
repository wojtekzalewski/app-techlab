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
		this.sendNotifToClientHandler();
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
	return new Promise((resolve, reject) => {
		if (id !== "" && name !== "" && surname !== "" && accountNr !== (undefined || null) &&
			accountBalance !== (undefined || null) && transactionHist.length !== 0) {
			let resolvedPromise = new Client(id, name, surname, accountNr, accountBalance, transactionHist, inputTable);
			resolve({
				status: 200,
				msg: 'OK!',
				payload: {
					data: resolvedPromise,
					inputs: inputTable
				}
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