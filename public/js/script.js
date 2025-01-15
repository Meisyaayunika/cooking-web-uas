const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetHref = this.getAttribute("href");

    if (targetHref.startsWith("#")) {
      e.preventDefault();
      const targetId = targetHref.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      window.location.href = targetHref;
    }
  });
});

const recipes = document.querySelectorAll(".recipe");
recipes.forEach((recipe) => {
  recipe.addEventListener("mouseenter", () => {
    recipe.style.transform = "scale(1.05)";
    recipe.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  });

  recipe.addEventListener("mouseleave", () => {
    recipe.style.transform = "scale(1)";
    recipe.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  });
});

document.querySelector(".get-started").addEventListener("click", () => {
  alert("Let's get cooking! Explore our recipes below.");
  document.getElementById("recipes").scrollIntoView({ behavior: "smooth" });
});

const submitButton = document.getElementById("submit-btn");
if (submitButton) {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formTitle = document.getElementById("form-title")?.textContent;

    if (formTitle === "Login") {
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Registration successful!");
      window.location.href = "index.html";
    }
  });
}

const logoutButton = document.getElementById("logout-btn");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("You have successfully logged out!");
    sessionStorage.clear();
    window.location.href = "login.html";
  });
}

const menuToggle = document.getElementById("menu-toggle");
const navLink = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
