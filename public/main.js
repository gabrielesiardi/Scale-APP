document.addEventListener("DOMContentLoaded", async () => {
  const loginBtn = document.getElementById("login-btn");

  loginBtn.addEventListener("click", () => {
    const username = prompt("Username:");
    const password = prompt("Password:");
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) window.location.href = "/settings";
      else alert("Credenziali errate.");
    });
  });

  const scales = await fetch("/get-scales").then(r => r.json());
  if (!scales || !scales.scales) return;

  if (scales.scales.includes("scale1")) {
    document.getElementById("scale1").style.display = "block";
  } else {
    document.getElementById("scale1").style.display = "none";
  }

  if (scales.scales.includes("scale2")) {
    document.getElementById("scale2").style.display = "block";
  } else {
    document.getElementById("scale2").style.display = "none";
  }

  if (scales.scales.length === 2) {
    document.getElementById("scale-container").style.flexDirection = "row";
  } else {
    document.getElementById("scale-container").style.flexDirection = "column";
  }
});
