document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const position = document.getElementById("position").value;
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert(
      `Registration successful!\n\nDetails:\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\nCountry: ${country}\nCity: ${city}\nGender: ${gender}`
    );
  });

document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("Registration successful!");
  window.location.href = "login.html";
});

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (
    email === localStorage.getItem("userEmail") &&
    password === localStorage.getItem("userPassword")
  ) {
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials!");
  }
});

document.getElementById("toggle-form").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "register.html";
});
