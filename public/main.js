function showLogin() {
  const username = prompt("Username:");
  const password = prompt("Password:");

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) window.location.href = "/settings";
      else alert("Login fallito.");
    });
}

function registerWeight(side) {
  const weight = document.getElementById(`weight-${side}`).innerText;
  const tare = document.getElementById(`tare-${side}`).innerText;
  console.log(`Register: ${side}, ${weight}, ${tare}`);
}

// Simulate real-time updates (you’ll replace this with actual logic)
setInterval(() => {
  document.getElementById('weight-left').innerText = Math.floor(Math.random() * 1000) + " kg";
  document.getElementById('tare-left').innerText = "Tara: " + (Math.random() * 50).toFixed(1) + " kg";

  if (!document.getElementById('right-scale').classList.contains("hidden")) {
    document.getElementById('weight-right').innerText = Math.floor(Math.random() * 1000) + " kg";
    document.getElementById('tare-right').innerText = "Tara: " + (Math.random() * 50).toFixed(1) + " kg";
  }
}, 2000);
window.addEventListener("load", () => {
  const selected = JSON.parse(sessionStorage.getItem("selectedScales")) || ["left"];
  document.getElementById('left-scale').classList.add("hidden");
  document.getElementById('right-scale').classList.add("hidden");

  selected.forEach(id => {
    document.getElementById(`${id}-scale`).classList.remove("hidden");
  });
});
