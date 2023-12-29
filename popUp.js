function saveData(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const destination = document.getElementById("destination").value;
  const pickup = document.getElementById("pickup").value;
  const date = document.getElementById("date").value;
  const classCoach = document.getElementById("classCoach").value;

  // const rememberMe = document.getElementById("rememberMe").checked;

  // Validation for username
  const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
  const isUsernameValid = usernameRegex.test(username);

  // Validation for password
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@#$%^&*()_+!]{8,15}$/;
  const isPasswordValid = passwordRegex.test(password);

  if (
    isUsernameValid &&
    isPasswordValid &&
    pickup &&
    destination &&
    date &&
    classCoach
  ) {
    const obj = {
      username: username,
      password: password,
      destination: destination,
      pickup: pickup,
      date: date,
      classCoach: classCoach,
      // rememberMe: rememberMe,
    };
    chrome.runtime.sendMessage({ obj: obj });
    console.log("obj........", obj);

    // Display a success message in the popup
    document.getElementById("message").textContent = "Data saved successfully!";
    setInterval(() => {
      window.close();
    }, 200);
  } else {
    // Display an error message in the popup
    let errorMessage = "Validation failed. ";

    if (!isUsernameValid) {
      errorMessage +=
        "Username is invalid. Must be at least 6 characters, and only letters and numbers are allowed. ";
    }

    if (!isPasswordValid) {
      errorMessage +=
        "Password is invalid. Must be 8 to 15 characters and contain at least one letter, one number, and special characters like @#$%^&*()_+!.";
    }

    document.getElementById("message").textContent = errorMessage;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Attach the submit event listener after the DOM is fully loaded
  document.getElementById("loginForm").addEventListener("submit", saveData);
});
