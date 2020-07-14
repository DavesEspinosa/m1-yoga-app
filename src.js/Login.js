"use strict";

class Login {
  constructor() {
    this.emailInput = document.querySelector("#modalLRInput10");
    this.passwordInput = document.querySelector("#modalLRInput11");

    this.loginButton = document.querySelector("#login");
    this.messageContainer = document.querySelector(
      ".message-container"
    );
  }

  // gestionar el envio de los datos (evento "submit")
  submit = (event) => {
    event.preventDefault();

    const usersDB = db.getAllUsers();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    // Intentar encontrar el usuario
    const user = usersDB.find((userObj) => {
      if (userObj.email === email && userObj.password === password) {
        return true;
      }
    });

    this.showMessage(user);
  };

  // mostrar el mensaje de error o mensaje de exito
  showMessage = (user) => {
    // eliminar el mensaje previo
    this.messageContainer.innerHTML = "";

    const message = document.createElement("p");

    if (user) {
      // si el usuario inicia la sesion con exito
      // agrega la clase para cambiar el color y sobrescribir el estilo anterior
      message.innerHTML = `Namasté, ${user.name}`;
      message.classList.add("correct-message");
    } else {
      // si el inicio de sesión no se ha realizado correctamente
     alert(/* message.innerHTML =  */`I know you can do it, keep trying`) 
    }

    this.messageContainer.appendChild(message);

    if (user) this.redirect();
  };

  redirect = () => {
    setTimeout(() => location.assign("dashboard.html"), 2000);
  };
}

const login = new Login();

login.loginButton.addEventListener('click', login.submit)
