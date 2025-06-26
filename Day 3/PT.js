const table = document.getElementById("periodic-table");
const tooltip = document.getElementById("tooltip");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("element-details");
const closeBtn = document.getElementById("close-btn");

// Dynamically generate table
elements.forEach(el => {
  const cell = document.createElement("div");
  cell.className = "element";
  cell.style.gridColumn = el.x;
  cell.style.gridRow = el.y;
  cell.innerHTML = `<strong>${el.symbol}</strong><br><small>${el.number}</small>`;
  
  // Tooltip on hover
  cell.addEventListener("mouseenter", (e) => {
    tooltip.innerHTML = `${el.name} (${el.symbol})`;
    tooltip.classList.remove("hidden");
  });

  cell.addEventListener("mousemove", (e) => {
    tooltip.style.top = `${e.pageY - 40}px`;
    tooltip.style.left = `${e.pageX + 10}px`;
  });

  cell.addEventListener("mouseleave", () => {
    tooltip.classList.add("hidden");
  });

  // Modal on click
  cell.addEventListener("click", () => {
    modalContent.innerHTML = `
      <h2>${el.name} (${el.symbol})</h2>
      <p><strong>Atomic Number:</strong> ${el.number}</p>
      <p><strong>Atomic Mass:</strong> ${el.mass}</p>
      <p><strong>Electronegativity:</strong> ${el.electronegativity ?? "N/A"}</p>
    `;
    modal.classList.remove("hidden");
  });

  table.appendChild(cell);
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
