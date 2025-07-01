async function loadScales() {
  const res = await fetch("/api/layout");
  const layout = await res.json();

  const container = document.getElementById("scale-container");
  container.innerHTML = "";

  Object.keys(layout).forEach((raspId) => {
    Object.keys(layout[raspId]).forEach((scaleId) => {
      const { weight, tare } = layout[raspId][scaleId];
      const div = document.createElement("div");
      div.className = "scale-box";
      div.innerHTML = `
        <div class="weight">Peso: ${weight}</div>
        <div class="tare">Tara: ${tare}</div>
        <div class="scale-name">${raspId} - ${scaleId}</div>
      `;
      container.appendChild(div);
    });
  });
}

setInterval(loadScales, 2000);
