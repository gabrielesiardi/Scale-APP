let isAdmin = false;

document.getElementById('adminLoginBtn').onclick = () => {
  document.getElementById('admin-modal').classList.remove('hidden');
};

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(data => {
    if (data.success) {
      isAdmin = true;
      document.getElementById('admin-modal').classList.add('hidden');
      document.getElementById('config-panel').classList.remove('hidden');
    } else {
      alert('Invalid credentials');
    }
  });
}

function logout() {
  isAdmin = false;
  document.getElementById('config-panel').classList.add('hidden');
}

function saveConfig() {
  const config = {
    left: {
      raspberry: document.getElementById('left-r').value,
      scale: document.getElementById('left-s').value
    },
    right: {
      raspberry: document.getElementById('right-r').value,
      scale: document.getElementById('right-s').value
    }
  };

  fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  }).then(() => {
    document.getElementById('right-scale').style.display = config.right.raspberry && config.right.scale ? 'block' : 'none';
    document.getElementById('config-panel').classList.add('hidden');
  });
}

// Load existing config on startup
fetch('/api/config')
  .then(res => res.json())
  .then(config => {
    if (config.right) {
      document.getElementById('right-scale').style.display = 'block';
    }
  });
