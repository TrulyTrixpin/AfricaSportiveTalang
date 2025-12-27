// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("input[name='email']");
  const passwordInput = document.querySelector("input[name='password']");
  
  form.addEventListener("submit", (e) => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (email === "" || password === "") {
      e.preventDefault(); // stop form submission
      showError("Please enter both email and password.");
      return;
    }

    // Email format check
    if (!validateEmail(email)) {
      e.preventDefault();
      showError("Please enter a valid email address.");
      return;
    }
  });

  // Helper: simple email regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Show error message in a popup style
  function showError(message) {
    let errorBox = document.querySelector(".js-error");
    if (!errorBox) {
      errorBox = document.createElement("div");
      errorBox.classList.add("js-error");
      document.body.appendChild(errorBox);
    }
    errorBox.textContent = message;
    errorBox.style.position = "fixed";
    errorBox.style.top = "20px";
    errorBox.style.left = "50%";
    errorBox.style.transform = "translateX(-50%)";
    errorBox.style.background = "#ff4c4c";
    errorBox.style.color = "white";
    errorBox.style.padding = "10px 20px";
    errorBox.style.borderRadius = "8px";
    errorBox.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    errorBox.style.zIndex = "9999";

    // Remove after 3 seconds
    setTimeout(() => {
      errorBox.remove();
    }, 3000);
  }
});
