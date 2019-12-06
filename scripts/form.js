document.addEventListener("DOMContentLoaded", function () {
  const transferBtn = document.querySelector(".new-paymant");
  const trasnferFormPopup = document.querySelector(".transfer-form-popup");
  const closePopupCross = document.querySelector(".close-popup-transfer-form");

  transferBtn.addEventListener("click", function () {
    trasnferFormPopup.classList.add("appear");
  });

  closePopupCross.addEventListener("click", function () {
    if(trasnferFormPopup.classList.contains("appear")) {
      trasnferFormPopup.classList.remove("appear");
      trasnferFormPopup.classList.add("none");
    }else{
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

})

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
// }