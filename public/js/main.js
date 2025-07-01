async function fetchWeights() {
  const res = await fetch('/api/get-scales');
  const selectedScales = await res.json();

  const container = document.getElementById('main-display');
  container.innerHTML = '';
  container.className = selectedScales.length === 2 ? 'split' : 'single';

  selectedScales.forEach(async (scaleId) => {
    const data = await fetch(`/api/weight/${scaleId}`);
    const { weight, tare } = await data.json();

    const box = document.createElement('div');
    box.classList.add('scale-box');

    box.innerHTML = `
      <div class="weight">${weight} kg</div>
      <div class="tare">Tara: ${tare} kg</div>
      <button class="register-btn">Registra Peso</button>
    `;

    container.appendChild(box);
  });
}



setInterval(fetchWeights, 2000);
fetchWeights();
