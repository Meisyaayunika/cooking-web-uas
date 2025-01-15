const apiUrl = "https://primdev.alwaysdata.net/api"; // Base API URL
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const toggleLink = document.getElementById("toggle-form");

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (formTitle.textContent === "Login") {
    formTitle.textContent = "Register";
    submitBtn.textContent = "Register";
    toggleLink.textContent = "Already have an account? Login";
  } else {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    toggleLink.textContent = "Don't have an account? Register";
  }
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const isRegister = formTitle.textContent === "Register";
  const endpoint = isRegister ? "/register" : "/login";

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "BLOG_API.postman_collection/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (!isRegister) {
        localStorage.setItem("authToken", data.token); // Simpan token login
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect ke index.html setelah login
      } else {
        alert("Registration successful! Please login.");
        formTitle.textContent = "Login";
        submitBtn.textContent = "Login";
        toggleLink.textContent = "Don't have an account? Register";
      }
    } else {
      alert(data.message || "An error occurred.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Unable to connect to the server.");
  }
});