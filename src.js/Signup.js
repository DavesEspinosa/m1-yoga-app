"use strict";

class Signup {
  constructor() {
    this.nameInput = document.querySelector("#name");
    this.firstnameInput = document.querySelector("#firstname");
    this.ageInput = document.querySelector("#age");
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.repeatPasswordInput = document.querySelector(
      "#repeat-password"
    );

    this.buttonInput = document.querySelector("#signup-button");
    this.errorsWrapper = document.querySelector(".message-container");
  }
  //se sacará el texto que viene de cada input, almacenandolo en una variable ( desde el value de cada input)
  handleEmailInput = (event) => {
    const email = event.target.value;
    console.log("email", email);
  };

  handleAgeInput = (event) => {
    const age = event.target.value;
    console.log("age", age);
  };

  handlePasswordInput = (event) => {
    const password = event.target.value;
    console.log("password", password);
  };

  handleRepeatPasswordInput = (event) => {
    const repeatPassword = event.target.value;
    console.log("repeatPassword", repeatPassword);
  };

  saveData = (event) => {
      //Para evitar el submit
    event.preventDefault();
    //recoger los valores de cada input
    const name = this.nameInput.value;
    const firstName = this.firstnameInput.value;
    const age = this.ageInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;

    const newUser = new User(name, firstName, age, email, password);

    //Guardar nuevo usuario en localStorage_Invocar a saveNewUser
    db.saveNewUser(newUser);

    // Vaciar el form

    this.nameInput.value = "";
    this.firstnameInput.value = "";
    this.ageInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
  };

  addListeners = () => {
    this.ageInput.addEventListener("input", this.handleAgeInput);
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
}

//crear una nueva instancia de éste objeto
const signup = new Signup();
// cuando la pagina termina de cargarse, se registran todos los eventos.

window.addEventListener("load", signup.addListeners);
