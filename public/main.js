let isAdmin = false;

document.getElementById("adminLoginBtn").addEventListener("click", () => {
  document.getElementById("adminPanel").classList.remove("hidden");
});

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "password") {
    isAdmin = true;
    document.getElementById("scaleSelection").classList.remove("hidden");
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  isAdmin = false;
  document.getElementById("scaleSelection").classList.add("hidden");
  document.getElementById("adminPanel").classList.add("hidden");
}

async function saveScales() {
  const left = document.getElementById("leftScaleInput").value;
  const right = document.getElementById("rightScaleInput").value;

  await fetch('/api/set-scales', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ left, right })
  });

  location.reload();
}

async function loadScales() {
  const res = await fetch('/api/get-scales');
  const config = await res.json();

  if (config.left) {
    document.getElementById("leftScale").classList.remove("hidden");
    document.getElementById("leftWeight").innerText = "45.00";
    document.getElementById("leftTare").innerText = "2.50";
  }

  if (config.right) {
    document.getElementById("rightScale").classList.remove("hidden");
    document.getElementById("rightWeight").innerText = "39.00";
    document.getElementById("rightTare").innerText = "2.00";
  }
}

loadScales();
