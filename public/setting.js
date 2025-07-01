document.getElementById("scaleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const selected = Array.from(document.querySelectorAll("input[name='scales']:checked")).map(cb => cb.value);
  sessionStorage.setItem("selectedScales", JSON.stringify(selected));
  window.location.href = "/";
});
