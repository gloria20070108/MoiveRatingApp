const signup = () => {
  event.preventDefault();
  const username = document.getElementById("sign-up-username").value;
  const password = document.getElementById("sign-up-password").value;
  const confirmPassword = document.getElementById("sign-up-confirm-password")
    .value;

  const errorMsg = document.getElementById("error-msg");
  if (password !== confirmPassword) {
    errorMsg.innerHTML = "Passwords do not match! Please try again!";
    return;
  }

  ajaxRequest(
    "POST",
    "/signup",
    { username: username, password: password },
    (status, res) => {
      if (status !== 200) {
        errorMsg.innerHTML = "Can't sign up current user. Please try again.";
      } else {
        window.location.href = "/home";
      }
    }
  );
};

const signUpForm = document.getElementById("sign-up-form");
signUpForm.addEventListener("submit", signup);
