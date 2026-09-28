/* Touchstone 4 JavaScript for North Star Bakery. */

const bakeryItems = [
  { id: "bread", name: "Fresh Breads", description: "Everyday loaves and special bakes." },
  { id: "pastries", name: "Pastries", description: "Morning treats and boxes for sharing." },
  { id: "cakes", name: "Celebration Cakes", description: "Made-to-order cakes for birthdays and gatherings." }
];

const storageKeys = {
  favorites: "northStarFavorites",
  contactDraft: "northStarContactDraft"
};

const validationMessages = {
  nameRequired: "Please enter your name.",
  nameLength: "Please enter at least 2 characters for your name.",
  emailRequired: "Please enter your email address.",
  emailFormat: "Please enter a valid email address, such as name@example.com.",
  requestType: "Please choose a request type.",
  detailsRequired: "Please enter a few details about your request.",
  detailsLength: "Please enter at least 10 characters so we know how to help."
};

function getStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setupFavoritesFeature() {
  const container = document.querySelector("#favorite-options");
  if (!container) return;

  let favoriteIds = getStoredJson(storageKeys.favorites, []);
  if (!Array.isArray(favoriteIds)) favoriteIds = [];

  function renderFavoriteOptions() {
    container.innerHTML = "";

    bakeryItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "favorite-card";

      const heading = document.createElement("h3");
      heading.textContent = item.name;

      const description = document.createElement("p");
      description.textContent = item.description;

      const button = document.createElement("button");
      button.type = "button";
      const selected = favoriteIds.includes(item.id);
      button.setAttribute("aria-pressed", String(selected));
      button.textContent = selected ? `Remove ${item.name}` : `Save ${item.name}`;
      button.addEventListener("click", () => toggleFavorite(item.id));

      card.append(heading, description, button);
      container.append(card);
    });
  }

  function updateFavoriteSummary() {
    const summary = document.querySelector("#favorite-summary");
    if (!summary) return;

    const selectedNames = bakeryItems
      .filter((item) => favoriteIds.includes(item.id))
      .map((item) => item.name);

    summary.textContent = selectedNames.length ? selectedNames.join(", ") : "None selected yet.";
  }

  function toggleFavorite(itemId) {
    if (favoriteIds.includes(itemId)) {
      favoriteIds = favoriteIds.filter((id) => id !== itemId);
    } else {
      favoriteIds.push(itemId);
    }

    saveJson(storageKeys.favorites, favoriteIds);
    renderFavoriteOptions();
    updateFavoriteSummary();

    const note = document.querySelector("#favorite-storage-note");
    if (note) note.textContent = "Saved in this browser. Your favorites will still be here after a refresh.";
  }

  renderFavoriteOptions();
  updateFavoriteSummary();

  const note = document.querySelector("#favorite-storage-note");
  if (note && favoriteIds.length > 0) {
    note.textContent = "Saved favorites restored from this browser.";
  }
}

function setupContactForm() {
  const form = document.querySelector("#request-form");
  if (!form) return;

  const fields = {
    name: document.querySelector("#customer-name"),
    email: document.querySelector("#customer-email"),
    requestType: document.querySelector("#request-type"),
    details: document.querySelector("#item-details")
  };

  const errors = {
    name: document.querySelector("#name-error"),
    email: document.querySelector("#email-error"),
    requestType: document.querySelector("#request-type-error"),
    details: document.querySelector("#details-error")
  };

  function setError(fieldName, message) {
    errors[fieldName].textContent = message;
    fields[fieldName].classList.toggle("field-error", Boolean(message));
    fields[fieldName].setAttribute("aria-invalid", message ? "true" : "false");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    let valid = true;
    const nameValue = fields.name.value.trim();
    const emailValue = fields.email.value.trim();
    const detailsValue = fields.details.value.trim();

    if (!nameValue) {
      setError("name", validationMessages.nameRequired);
      valid = false;
    } else if (nameValue.length < 2) {
      setError("name", validationMessages.nameLength);
      valid = false;
    } else {
      setError("name", "");
    }

    if (!emailValue) {
      setError("email", validationMessages.emailRequired);
      valid = false;
    } else if (!isValidEmail(emailValue)) {
      setError("email", validationMessages.emailFormat);
      valid = false;
    } else {
      setError("email", "");
    }

    if (!fields.requestType.value) {
      setError("requestType", validationMessages.requestType);
      valid = false;
    } else {
      setError("requestType", "");
    }

    if (!detailsValue) {
      setError("details", validationMessages.detailsRequired);
      valid = false;
    } else if (detailsValue.length < 10) {
      setError("details", validationMessages.detailsLength);
      valid = false;
    } else {
      setError("details", "");
    }

    return valid;
  }

  function saveContactDraft() {
    const draft = {
      name: fields.name.value,
      email: fields.email.value,
      requestType: fields.requestType.value
    };
    saveJson(storageKeys.contactDraft, draft);
  }

  function restoreContactDraft() {
    const draft = getStoredJson(storageKeys.contactDraft, {});
    if (draft.name) fields.name.value = draft.name;
    if (draft.email) fields.email.value = draft.email;
    if (draft.requestType) fields.requestType.value = draft.requestType;

    if (draft.name || draft.email || draft.requestType) {
      const status = document.querySelector("#draft-status");
      if (status) status.textContent = "Your saved contact details were restored from this browser.";
    }
  }

  restoreContactDraft();

  [fields.name, fields.email, fields.requestType].forEach((field) => {
    field.addEventListener("input", saveContactDraft);
    field.addEventListener("change", saveContactDraft);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("#form-status");

    if (!validateForm()) {
      status.textContent = "Please correct the highlighted fields before sending your request.";
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    status.textContent = "Thanks! Your request looks ready to send. This course prototype does not send data to a server.";
    localStorage.removeItem(storageKeys.contactDraft);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFavoritesFeature();
  setupContactForm();
});
