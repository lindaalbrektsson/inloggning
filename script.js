/*Login-fönstret*/
const loginView = document.getElementById('loginView');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const loginButton = document.querySelector('.btn-login');

/*Welcome-fönstret*/
const welcomeView = document.getElementById('welcomeView');
  const logoutButton = document.querySelector('.btn-logout');

/* Knapp funkar med enter och klick */
password.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    tryLogin();
  }
});

loginButton.addEventListener("click", tryLogin);

/* Login-funktion */

function tryLogin() {
  const enteredUsername = username.value.trim();
  const enteredPassword = password.value;

  if (enteredUsername === "test" && enteredPassword === "1234") {
    alert("Du är inloggad. Välkommen, " + enteredUsername + "!");
  } else {
    alert("Felaktigt användarnamn eller lösenord. Försök igen.");
  }
}



/* Logout-funktion */
logoutButton.addEventListener("click", () => {
  alert("Du har loggat ut.");