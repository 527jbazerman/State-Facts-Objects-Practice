const positionFilter = document.getElementById("position-filter");
const cardsContainer = document.getElementById("cards-container");

function renderCards(category = "") {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = "";

  Object.keys(stateData).forEach((key) => {
    const position = stateData[key];

    if (!category || position.positionType === category) {
      const card = document.createElement("div");
      card.className = "position-card";
      card.innerHTML = `
        <img src="${position.image}" alt="${position.name}" class="card-image">
        <div class="card-content">
          <h2>${position.name}</h2>
          <p><strong>Height:</strong> ${position.averageHeight}</p>
          <p><strong>Weight:</strong> ${position.averageWeight}</p>
          <p><strong>Role:</strong> ${position.whatTheyDo}</p>
          <p><strong>Notes:</strong> ${position.notes}</p>
          <button class="goat-button" data-position="${key}">See The GOAT</button>
        </div>
      `;
      cardsContainer.appendChild(card);
    }
  });

  document.querySelectorAll(".goat-button").forEach((button) => {
    button.addEventListener("click", openGoatModal);
  });
}

function openGoatModal(event) {
  const positionKey = event.target.getAttribute("data-position");
  const position = stateData[positionKey];
  const modal = document.getElementById("goat-modal");
  const modalContent = document.querySelector(".modal-body");

  if (!modal || !modalContent || !position) return;

  modalContent.innerHTML = `
    <h2>${position.name}</h2>
    <p class="goat-label">GREATEST OF ALL TIME</p>
    <p class="goat-name">${position.goat}</p>
    <img src="${position.goatImage}" alt="${position.goat}" class="modal-image">
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeGoatModal() {
  const modal = document.getElementById("goat-modal");
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function initializeRosterPage() {
  if (!cardsContainer || !positionFilter) return;

  positionFilter.onchange = function () {
    renderCards(this.value);
  };

  renderCards("");

  const modal = document.getElementById("goat-modal");
  if (modal) {
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeGoatModal();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeRosterPage);
