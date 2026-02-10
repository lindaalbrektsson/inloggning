/* Login-fönstret */
const loginView = document.getElementById("loginView");
const formContainer = document.querySelector(".form-container");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.querySelector(".btn-login");

/* Welcome-fönstret */
const welcomeView = document.getElementById("welcomeView");
const welcomeTitle = document.getElementById("welcomeTitle");
const loggedInName = document.getElementById("loggedInName");
const logoutButton = document.querySelector(".btn-logout");

/* Hårdkodade uppgifter */
const CORRECT_USERNAME = "test";
const CORRECT_PASSWORD = "1234";

/* Error-ruta  */
const errorMsg = document.createElement("p");
errorMsg.classList.add("error", "hidden");
formContainer.appendChild(errorMsg);

function showError(text) {
  errorMsg.textContent = text;
  errorMsg.classList.remove("hidden");
}

function hideError() {
  errorMsg.textContent = "";
  errorMsg.classList.add("hidden");
}

/* Events */
password.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    tryLogin();
  }
});

loginButton.addEventListener("click", tryLogin);
logoutButton.addEventListener("click", logout);

/* Funktioner */
function tryLogin() {
  const enteredUsername = username.value.trim();
  const enteredPassword = password.value;

  const userOk = enteredUsername === CORRECT_USERNAME;
  const passOk = enteredPassword === CORRECT_PASSWORD;

  if (userOk && passOk) {
    hideError();
    showWelcome(enteredUsername);
    return;
  }

  if (!userOk && !passOk) {
  showError("Både användarnamn och lösenord är fel. Försök igen.");
} else if (!userOk) {
  showError("Användarnamnet är fel. Försök igen.");
} else if (!passOk) {
  showError("Lösenordet är fel. Försök igen.");
}
}

function showWelcome(name) {
  loginView.classList.add("hidden");
  welcomeView.classList.remove("hidden");
  document.body.classList.add("logged-in");

  loggedInName.textContent = name;
  welcomeTitle.textContent = `Trevligt att se dig, ${name}.`;
}

function logout() {
  welcomeView.classList.add("hidden");
  loginView.classList.remove("hidden");
  document.body.classList.remove("logged-in");

  username.value = "";
  password.value = "";
  hideError();

  // loggedInName.textContent = "";
  // welcomeTitle.textContent = "Trevligt att se dig.";
  username.focus();
}




