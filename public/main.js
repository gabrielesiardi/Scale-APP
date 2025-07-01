async function loadScales() {
  const res = await fetch('/api/selected');
  const scales = await res.json();
  const container = document.getElementById('scale-container');
  container.innerHTML = '';

  scales.forEach(scale => {
    const scaleDiv = document.createElement('div');
    scaleDiv.className = 'scale-box';

    const weightDiv = document.createElement('div');
    weightDiv.className = 'scale-weight';
    weightDiv.innerText = 'Loading...';

    const tareDiv = document.createElement('div');
    tareDiv.className = 'scale-tare';
    tareDiv.innerText = 'Tara: --';

    scaleDiv.appendChild(weightDiv);
    scaleDiv.appendChild(tareDiv);
    container.appendChild(scaleDiv);

    setInterval(async () => {
      const res = await fetch(`/api/weight/${scale}`);
      const data = await res.json();
      weightDiv.innerText = `Peso: ${data.weight} kg`;
      tareDiv.innerText = `Tara: ${data.tare} kg`;
    }, 2000);
  });
}

window.onload = loadScales;
