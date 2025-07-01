document.getElementById("adminLoginBtn").onclick = () => {
  document.getElementById("loginContainer").classList.remove("hidden");
};

document.getElementById("loginForm").onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  });

  if (res.ok) {
    document.getElementById("loginContainer").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    alert("Login failed");
  }
};

document.getElementById("configForm").onsubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  await fetch("/api/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      left: { raspberry: form.leftRaspberry.value, scale: form.leftScale.value },
      right: { raspberry: form.rightRaspberry.value, scale: form.rightScale.value },
    }),
  });
  alert("Saved");
};

document.getElementById("logout").onclick = async () => {
  await fetch("/api/logout", { method: "POST" });
  document.getElementById("adminPanel").classList.add("hidden");
};
