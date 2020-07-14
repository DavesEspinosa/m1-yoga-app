"use strict";

class Validator {
  constructor() {
    // this.invalidAgeError= //Si la edad es mayor de 65 años, "No importa la edad que tengas, siemrpe es buen momento :)"
    this.invalidEmailError =
      "Respira profundamente, e introduce un correo válido";
    this.emailExistsError =
      "El correo ya existe, tómate unos minutos y recapacita";
    this.passwordError = 
      "Como mínimo la contraseña debe contener 6 carácteres, ya casi lo tenemos :)";
    this.repeatPasswordError =
      "Ambas contraseñas no coinciden, cuerpo y alma deben ser uno solo";

    //objeto con los errores que se muestran al usuario
    this.errors = {
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    };
  }

  validateValidEmail = (email) => {
    if (this.emailIsValid(email)) {
      delete this.errors.invalidEmailError;
    } else {
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  };

  emailIsValid = (email) => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    //Metodo que comprueba las reglas y devuelve true o false
    const isValid = emailRegEx.test(email);
    //Este metodo devuelve true o false cuando se llama en otro.
    return isValid;
  };

  //Comprobar en local storage
  validateUniqueEmail = (newEmail) => {
    const usersDB = db.getAllUsers();
    let emailUnique = true;

    //Si no hay usuario, el email será unico (true), si email esta tomado, la variable cambiará a false.

    if (usersDB.length > 0) {
      usersDB.forEach((userObj) => {
        if (userObj.email === newEmail) {
          emailUnique = false;
        }
      });
      if (emailUnique) {
        delete this.errors.emailExistsError;
      } else {
        this.errors.emailExistsError = this.emailExistsError;
      }
    }
  };
  //Buscar un regex con más seguridad
  validatePassword = (password) => {
    if (password.length >= 6) {
      delete this.errors.passwordError;
    } else {
      this.errors.passwordError = this.passwordError;
    }
  };

  validateRepeatPassword = (password, passwordRepeat) => {
    if (password === passwordRepeat) {
      delete this.errors.repeatPasswordError;
    } else {
      this.errors.repeatPasswordError = this.repeatPasswordError;
    }
  };

  //
  getErrors = () => {
    return this.errors;
  };
  // Reiniciar  los errores mostrados para el próximo signUp.
  resetValidator = () => {
    this.errors = {
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    };
  };
}

const validator = new Validator();
