// ==========================================================================
// HYDERABAD TRIP PLANNER - MASTER APPLICATION CONTROLLER
// Supporting Dual-State Dashboard, Autocomplete & 6-Section Planning Flow
// ==========================================================================

let activeDateTarget = "arrival";
let activeExperienceChoice = "1st-timer";

document.addEventListener("DOMContentLoaded", () => {
  setupDualStateDashboard();
  setupDestinationAutocomplete();
  setupBudgetAccordions();
  setupDynamicAndExperience();
  setupBottomTabsNavigation();
  setupEmergencySOS();
});

// --------------------------------------------------------------------------
// 1. Dual-State Dashboard Management
// --------------------------------------------------------------------------
function setupDualStateDashboard() {
  const btnNoTrip = document.getElementById("btn-state-no-trip");
  const btnHasTrip = document.getElementById("btn-state-has-trip");

  btnNoTrip?.addEventListener("click", () => {
    switchDashboardState("no-trip");
  });

  btnHasTrip?.addEventListener("click", () => {
    switchDashboardState("has-trip");
  });

  // When user is on "Has Active Trip" (Right page) and clicks "Build a New Trip (1-3 Days)",
  // it automatically opens the "No Active Trip / Plan a New Trip" page (Left page)
  document.getElementById("card-trigger-new-trip-flow")?.addEventListener("click", () => {
    switchDashboardState("no-trip");
  });

  // Clicking the Active Trip Pass opens the Live Itinerary
  document.getElementById("card-active-trip-pass")?.addEventListener("click", () => {
    switchAppScreen("screen-itinerary");
  });

  // Clicking "Explore 45 Curated Spots" opens Explore screen
  document.getElementById("card-trigger-explore-catalog")?.addEventListener("click", () => {
    switchAppScreen("screen-explore");
  });
}

function switchDashboardState(state) {
  const scrNoTrip = document.getElementById("screen-dashboard-no-trip");
  const scrHasTrip = document.getElementById("screen-dashboard-has-trip");
  const btnNoTrip = document.getElementById("btn-state-no-trip");
  const btnHasTrip = document.getElementById("btn-state-has-trip");

  // Deactivate other screens
  document.querySelectorAll(".app-screen").forEach(s => s.classList.remove("active"));

  if (state === "no-trip") {
    scrNoTrip?.classList.add("active");
    if (btnNoTrip) {
      btnNoTrip.style.background = "var(--color-terracotta)";
      btnNoTrip.style.color = "#FFF";
    }
    if (btnHasTrip) {
      btnHasTrip.style.background = "#FFF";
      btnHasTrip.style.color = "var(--color-slate)";
    }
  } else {
    scrHasTrip?.classList.add("active");
    if (btnHasTrip) {
      btnHasTrip.style.background = "var(--color-terracotta)";
      btnHasTrip.style.color = "#FFF";
    }
    if (btnNoTrip) {
      btnNoTrip.style.background = "#FFF";
      btnNoTrip.style.color = "var(--color-slate)";
    }
  }

  // Set bottom Home tab to active
  setActiveBottomTab("home");

  const viewport = document.getElementById("app-viewport");
  if (viewport) viewport.scrollTop = 0;
}

function switchAppScreen(screenId) {
  document.querySelectorAll(".app-screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");

  const viewport = document.getElementById("app-viewport");
  if (viewport) viewport.scrollTop = 0;
}

// --------------------------------------------------------------------------
// 2. Section 1: Destination Autocomplete
// --------------------------------------------------------------------------
function setupDestinationAutocomplete() {
  const input = document.getElementById("input-destination-city");
  const dropdown = document.getElementById("dropdown-city-autocomplete");

  input?.addEventListener("focus", () => {
    dropdown?.classList.add("active");
  });

  input?.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();
    dropdown?.classList.add("active");
    const items = dropdown.querySelectorAll(".autocomplete-item");
    items.forEach(item => {
      const city = item.dataset.city.toLowerCase();
      item.style.display = city.includes(val) ? "flex" : "none";
    });
  });

  document.querySelectorAll(".autocomplete-item").forEach(item => {
    item.addEventListener("click", () => {
      const selectedCity = item.dataset.city;
      if (input) input.value = selectedCity;
      const headerLabel = document.getElementById("current-location-label");
      if (headerLabel) headerLabel.textContent = selectedCity;
      dropdown?.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".destination-search-box")) {
      dropdown?.classList.remove("active");
    }
  });
}

window.selectDestinationQuick = function(cityName) {
  const input = document.getElementById("input-destination-city");
  if (input) input.value = cityName;
  const headerLabel = document.getElementById("current-location-label");
  if (headerLabel) headerLabel.textContent = cityName;
};

// --------------------------------------------------------------------------
// 3. Section 2: Trip Dates Modal Pickers
// --------------------------------------------------------------------------
window.openDateModal = function(type) {
  activeDateTarget = type;
  const title = document.getElementById("date-picker-modal-title");
  if (title) {
    title.textContent = type === "arrival" ? "Select Arrival Date" : "Select Return Date";
  }
  openModal("modal-date-picker");
};

window.applyDateSelection = function() {
  const dateInput = document.getElementById("date-picker-input-native");
  if (dateInput && dateInput.value) {
    const d = new Date(dateInput.value);
    const formatted = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    if (activeDateTarget === "arrival") {
      const lbl = document.getElementById("label-arrival-date");
      if (lbl) lbl.textContent = formatted;
    } else {
      const lbl = document.getElementById("label-return-date");
      if (lbl) lbl.textContent = formatted;
    }
  }
  closeModal("modal-date-picker");
};

// --------------------------------------------------------------------------
// 4. Section 3 & 5: Travel Dynamic and Experience Choice
// --------------------------------------------------------------------------
function setupDynamicAndExperience() {
  // Travel Dynamic Segmented Pills
  document.querySelectorAll(".dynamic-option-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".dynamic-option-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  // Experience Choice Cards
  document.querySelectorAll(".experience-card-illustrated").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".experience-card-illustrated").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      activeExperienceChoice = card.dataset.exp;
    });
  });

  // Generate Itinerary Submit Button
  document.getElementById("btn-generate-plan-submit")?.addEventListener("click", () => {
    if (activeExperienceChoice === "1st-timer") {
      switchAppScreen("screen-itinerary");
      setActiveBottomTab("itinerary");
    } else {
      switchAppScreen("screen-explore");
      setActiveBottomTab("explore");
    }
  });
}

// --------------------------------------------------------------------------
// 5. Section 4: Budget Range Accordion Logic
// --------------------------------------------------------------------------
function setupBudgetAccordions() {
  document.querySelectorAll(".budget-tier-expand-card").forEach(card => {
    const bar = card.querySelector(".budget-tier-bar");
    bar.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");
      document.querySelectorAll(".budget-tier-expand-card").forEach(c => c.classList.remove("open"));
      if (!isOpen) card.classList.add("open");
    });

    card.querySelectorAll(".subrange-tier-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".subrange-tier-item").forEach(i => i.classList.remove("selected"));
        item.classList.add("selected");
      });
    });
  });
}

// --------------------------------------------------------------------------
// 6. Bottom Navigation Tabs
// --------------------------------------------------------------------------
function setupBottomTabsNavigation() {
  document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      const navTarget = tab.dataset.nav;
      setActiveBottomTab(navTarget);

      if (navTarget === "home") {
        // Return to whichever dashboard was active
        const isHasTripActive = document.getElementById("btn-state-has-trip")?.style.background.includes("var(--color-terracotta)");
        switchDashboardState(isHasTripActive ? "has-trip" : "no-trip");
      } else if (navTarget === "itinerary") {
        switchAppScreen("screen-itinerary");
      } else if (navTarget === "explore") {
        switchAppScreen("screen-explore");
      } else if (navTarget === "saved") {
        alert("📁 Saved Itineraries: You have 1 active trip and 2 saved offline day passes.");
      }
    });
  });
}

function setActiveBottomTab(navName) {
  document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.nav === navName);
  });
}

// --------------------------------------------------------------------------
// 7. Modals, Overlays & Intra-Day Actions
// --------------------------------------------------------------------------
function setupEmergencySOS() {
  document.getElementById("btn-top-sos")?.addEventListener("click", () => {
    openModal("modal-sos-overlay");
  });
}

window.openModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("active");
};

window.closeModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("active");
};

window.handleReorderTimeline = function() {
  alert("⇅ Sequence Reordered: Stops swapped within Charminar Cluster.");
};

window.handleSkipTimeline = function() {
  alert("✕ Stop Skipped: Route dynamically reconnected to next venue.");
};

window.openSwapDialog = function() {
  openModal("modal-swap-sheet");
};
