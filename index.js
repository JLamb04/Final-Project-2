const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", function () {
  submitBtn.classList.add("loading");

  setTimeout(() => {
    submitBtn.classList.remove("loading");
  }, 2000);
});

