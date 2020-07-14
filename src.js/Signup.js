"use strict";

class Signup {
  constructor() {
    this.nameInput = document.getElementById("modalLRInput12");
    this.emailInput = document.getElementById("modalLRInput13");
    this.passwordInput = document.getElementById("modalLRInput14");
    this.repeatPasswordInput = document.querySelector(
      "#modalLRInput15"
    );

    this.buttonInput = document.querySelector("#signup-button");
    this.errorsWrapper = document.querySelector(".message-container1");
  }
  //se sacará el texto que viene de cada input, almacenandolo en una variable ( desde el value de cada input)
  handleEmailInput = (event) => {
    const email = event.target.value;
    validator.validateValidEmail(email);
    const errors = validator.getErrors;
    if (!errors.invalidEmailError) {
      validator.validateUniqueEmail(email);
    }

    this.setErrorsMessage();
  };

  /* handleAgeInput = (event) => {
    const age = event.target.value;
    console.log("age", age);
  }; 
  //Plantear como mostrar éste mensaje.
  showSomethingAboutAge = () => {}; */

  handlePasswordInput = (event) => {
    const password = event.target.value;
    const passwordRepeat = this.repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, passwordRepeat);

    this.setErrorsMessage();
  };

  handleRepeatPasswordInput = (event) => {
    const passwordRepeat = event.target.value;
    const password = this.passwordInput.value;
    //Para poder cmabiar el password sobre la marcha, y que siga marcando errores si lo hubiera.

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, passwordRepeat);

    this.setErrorsMessage();
  };

  saveData = (event) => {
    //Para evitar el submit
    event.preventDefault();
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    

    const newUser = new User(name, email, password);

    //Guardar nuevo usuario en localStorage_Invocar a saveNewUser
    db.saveNewUser(newUser);

    // Vaciar el form

    this.nameInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput.value = "";
  };

  addListeners = () => {
    this.emailInput.addEventListener("input", this.handleEmailInput);
    this.passwordInput.addEventListener(
      "input",
      this.handlePasswordInput
    );
    this.repeatPasswordInput.addEventListener(
      "input",
      this.handleRepeatPasswordInput
    );

    this.buttonInput.addEventListener("click", this.saveData);
  };

  //Se muestran mensajes que viene del validator.errors.
  setErrorsMessage = () => {
    //vacia los errores paar que no se sumen.
    this.errorsWrapper.innerHTML = "";

    const erorsObj = validator.getErrors();
    //convertir el objeto a un array
    const errorsStringsArr = Object.values(erorsObj);
    errorsStringsArr.forEach((errorStr) => {
      const errorMessageDiv = document.createElement("div");
      errorMessageDiv.classList.add('alert' , 'alert-info')
      // errorMessageP.classList.add or remove
      errorMessageDiv.innerHTML = errorStr;

      //Se pone dentro del DOM- Se añade al div .message-container
      this.errorsWrapper.appendChild(errorMessageDiv);
    });
  };
}

//crear una nueva instancia de éste objeto
const signup = new Signup();
// cuando la pagina termina de cargarse, se registran todos los eventos.

window.addEventListener("load", signup.addListeners);
