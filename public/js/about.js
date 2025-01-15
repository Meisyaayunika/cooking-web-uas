document.getElementById("more-info-btn").addEventListener("click", function () {
  const moreInfo = document.getElementById("more-info");
  moreInfo.classList.toggle("hidden");
  const buttonText = moreInfo.classList.contains("hidden")
    ? "Click for More Info"
    : "Show Less";
  document.getElementById("more-info-btn").textContent = buttonText;
});
