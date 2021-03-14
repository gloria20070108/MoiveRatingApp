const signup = async () => {
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

  const responds = await fetch("/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  if (responds.status !== 200) {
    errorMsg.innerHTML = "Can't sign up current user. Please try again.";
  } else {
    window.location.href = "/home";
  }
};

const signUpForm = document.getElementById("sign-up-form");
signUpForm.addEventListener("submit", signup);
