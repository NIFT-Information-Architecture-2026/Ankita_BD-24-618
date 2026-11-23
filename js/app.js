// ==========================================================================
// HYDERABAD TRIP PLANNER - MASTER APPLICATION CONTROLLER
// 5-Screen Unified Architecture & Interaction Engine
// Screen 1.0: Dashboard (Home)
// Screen 2.0: Plan A New Trip (Single-Page Setup)
// Screen 3.0: Live Itinerary (Timeline Ground Companion)
// Screen 4.0: Curated Stays (Accommodations Finder)
// Screen 5.0: Experience Explorer (Self-Planning Workspace)
// ==========================================================================

let activeDateTarget = "arrival";
let activeExperienceChoice = "1st-timer";
const selectedCustomPlaces = new Set();

document.addEventListener("DOMContentLoaded", () => {
  setupScreenNavigation();
  setupDestinationAutocomplete();
  setupBudgetAccordions();
  setupDynamicAndExperience();
  setupBottomTabsNavigation();
  setupEmergencySOS();
  setupItineraryInteractions();
  setupStaysScreen();
  setupExperienceExplorer();
});

// --------------------------------------------------------------------------
// 1. Master Screen Routing Engine
// --------------------------------------------------------------------------
function setupScreenNavigation() {
  // Screen 1.0 (Dashboard) actions
  document.getElementById("btn-open-itinerary-home")?.addEventListener("click", () => {
    switchAppScreen("screen-itinerary");
    setActiveBottomTab("itinerary");
  });

  document.getElementById("banner-plan-new-trip-promo")?.addEventListener("click", () => {
    switchAppScreen("screen-plan-trip");
  });

  // Screen 2.0 (Plan a New Trip) back action
  document.getElementById("btn-back-plan-to-home")?.addEventListener("click", () => {
    switchAppScreen("screen-dashboard");
    setActiveBottomTab("home");
  });

  // Screen 2.0 Generate CTA
  document.getElementById("btn-generate-plan-submit")?.addEventListener("click", () => {
    if (activeExperienceChoice === "1st-timer") {
      switchAppScreen("screen-itinerary");
      setActiveBottomTab("itinerary");
    } else {
      switchAppScreen("screen-experience-explorer");
      setActiveBottomTab("explore");
    }
  });

  // Screen 3.0 View Stays Banner (leads into Screen 4.0)
  document.getElementById("banner-view-stays-card")?.addEventListener("click", () => {
    switchAppScreen("screen-stays");
  });

  // Screen 4.0 Back button (leads back to Screen 3.0)
  document.getElementById("btn-stays-back")?.addEventListener("click", () => {
    switchAppScreen("screen-itinerary");
    setActiveBottomTab("itinerary");
  });

  // Screen 5.0 Back button (leads back to Screen 2.0)
  document.getElementById("btn-back-exp-to-plan")?.addEventListener("click", () => {
    switchAppScreen("screen-plan-trip");
  });
}

function switchAppScreen(screenId) {
  document.querySelectorAll(".app-screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }

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
    dropdown?.classList.add("show");
  });

  input?.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    dropdown?.classList.add("show");
    const items = dropdown?.querySelectorAll(".autocomplete-item");
    items?.forEach(item => {
      const cityText = item.dataset.city.toLowerCase();
      item.style.display = cityText.includes(val) ? "block" : "none";
    });
  });

  dropdown?.querySelectorAll(".autocomplete-item").forEach(item => {
    item.addEventListener("click", () => {
      if (input) input.value = item.dataset.city;
      dropdown.classList.remove("show");
      document.getElementById("current-location-label").textContent = item.dataset.city;
    });
  });

  document.addEventListener("click", (e) => {
    if (!input?.contains(e.target) && !dropdown?.contains(e.target)) {
      dropdown?.classList.remove("show");
    }
  });
}

window.selectDestinationQuick = function(cityName) {
  const input = document.getElementById("input-destination-city");
  if (input) input.value = cityName;
  document.getElementById("current-location-label").textContent = cityName;
  switchAppScreen("screen-plan-trip");
};

// --------------------------------------------------------------------------
// 3. Section 2: Trip Dates Modal Handling
// --------------------------------------------------------------------------
window.openDateModal = function(targetType) {
  activeDateTarget = targetType;
  const title = document.getElementById("modal-date-title");
  if (title) {
    title.textContent = targetType === "arrival" ? "Select Arrival Date" : "Select Return Date";
  }
  openModal("modal-date-picker");
};

window.selectDateVal = function(dateStr) {
  if (activeDateTarget === "arrival") {
    document.getElementById("label-arrival-date").textContent = dateStr;
  } else {
    document.getElementById("label-return-date").textContent = dateStr;
  }
  closeModal("modal-date-picker");
};

// --------------------------------------------------------------------------
// 4. Section 3 & 5: Dynamic and Experience Selection
// --------------------------------------------------------------------------
function setupDynamicAndExperience() {
  // Travel Dynamic Segmented Pills
  document.querySelectorAll(".dynamic-option-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".dynamic-option-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  // Experience Choice Illustrated Cards
  document.querySelectorAll(".experience-card-illustrated").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".experience-card-illustrated").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      activeExperienceChoice = card.dataset.exp;
    });
  });
}

// --------------------------------------------------------------------------
// 5. Section 4: Budget Range Accordion Logic
// --------------------------------------------------------------------------
function setupBudgetAccordions() {
  document.querySelectorAll(".budget-tier-expand-card").forEach(card => {
    const bar = card.querySelector(".budget-tier-bar");
    bar?.addEventListener("click", () => {
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
        switchAppScreen("screen-dashboard");
      } else if (navTarget === "itinerary") {
        switchAppScreen("screen-itinerary");
      } else if (navTarget === "explore") {
        switchAppScreen("screen-experience-explorer");
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
  alert("⇅ Sequence Reordered: Stops swapped smoothly within Charminar Cluster.");
};

window.handleSkipTimeline = function() {
  alert("✕ Stop Skipped: Route dynamically reconnected to next venue.");
};

window.openSwapDialog = function() {
  openModal("modal-swap-sheet");
};

window.applySwap = function(placeName) {
  closeModal("modal-swap-sheet");
  alert(`⇄ Stop swapped successfully with ${placeName} (Same Old City Cluster: < 1 km).`);
};

window.triggerSpatialWarning = function(msg) {
  closeModal("modal-swap-sheet");
  document.getElementById("spatial-warning-text").textContent =
    `${msg} is outside the active Old City cluster. Proceeding will add transit overhead and reduce dwell time.`;
  openModal("modal-spatial-warning");
};

window.confirmSpatialOverride = function() {
  closeModal("modal-spatial-warning");
  alert("⚠️ Spatial warning overridden. Schedule recalculated with +45 min transit buffer.");
};

// --------------------------------------------------------------------------
// 8. Screen 3.0: "Your Itinerary" Controller
// --------------------------------------------------------------------------
function setupItineraryInteractions() {
  // Back button returns to Dashboard
  document.getElementById("btn-itinerary-back")?.addEventListener("click", () => {
    switchAppScreen("screen-dashboard");
    setActiveBottomTab("home");
  });

  // SOS button in Itinerary header
  document.getElementById("btn-itinerary-sos")?.addEventListener("click", () => {
    openModal("modal-sos-overlay");
  });

  // Day switcher pills
  document.querySelectorAll(".itin-day-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".itin-day-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const dayNum = pill.dataset.day;
      if (dayNum === "1") {
        // Active Charminar Cluster
      } else if (dayNum === "2") {
        alert("Day 2: Western Forts Cluster (Golconda Fort, Qutb Shahi Tombs, Taramati Baradari)");
      } else if (dayNum === "3") {
        alert("Day 3: Cyberabad & Modern Heritage (Durgam Cheruvu, Shilparamam, HITEC City)");
      }
    });
  });
}

window.openFoodOptionsModal = function() {
  alert("🍴 Nearby Food Options (Within 500m):\n1. Nimrah Cafe (Irani Chai & Osmania Biscuit: ₹50-₹100)\n2. Hotel Shadab (Hyderabadi Dum Biryani: ₹100-₹200)\n3. Shah Ghouse Cafe (Mutton Biryani: ₹120-₹220)\n4. Matwale Doodh Ghar (Lassi & Falooda: ₹60-₹110)");
};

// --------------------------------------------------------------------------
// 9. Screen 4.0: Curated Stays Controller
// --------------------------------------------------------------------------
function setupStaysScreen() {
  document.querySelectorAll(".stay-filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".stay-filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const tier = chip.dataset.stayTier;

      document.querySelectorAll(".stay-listing-card").forEach(card => {
        if (tier === "all" || card.dataset.stayTier === tier) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 10. Screen 5.0: Experience Explorer Controller
// --------------------------------------------------------------------------
function setupExperienceExplorer() {
  // Filter chips for cost and dwell time
  document.querySelectorAll(".exp-chip-btn").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".exp-chip-btn").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.expFilter;

      document.querySelectorAll(".exp-place-card").forEach(card => {
        const cost = parseInt(card.dataset.cost, 10);
        const dwell = parseFloat(card.dataset.dwell);

        let match = true;
        if (filter === "100") match = cost <= 100;
        else if (filter === "200") match = cost <= 200;
        else if (filter === "dwell-1.5") match = dwell <= 1.5;
        else if (filter === "dwell-2") match = dwell <= 2.0;
        else if (filter === "dwell-3") match = dwell <= 3.0;

        card.style.display = match ? "flex" : "none";
      });
    });
  });

  // Keyword search input
  const searchInput = document.getElementById("input-exp-search");
  searchInput?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll(".exp-place-card").forEach(card => {
      const name = card.querySelector(".exp-place-name")?.textContent.toLowerCase() || "";
      card.style.display = name.includes(q) ? "flex" : "none";
    });
  });

  // Generate itinerary with custom chosen places
  document.getElementById("btn-generate-from-experience")?.addEventListener("click", () => {
    if (selectedCustomPlaces.size === 0) {
      alert("Please select at least 1 place using 'Add Plan +' before generating your custom itinerary.");
      return;
    }
    const chosenList = Array.from(selectedCustomPlaces).join(", ");
    alert(`✨ Custom Itinerary Generated!\nStops included: ${chosenList}\nOpening your Live Itinerary layout...`);
    switchAppScreen("screen-itinerary");
    setActiveBottomTab("itinerary");
  });
}

window.togglePlaceSelection = function(btn, placeName) {
  if (selectedCustomPlaces.has(placeName)) {
    selectedCustomPlaces.delete(placeName);
    btn.textContent = "Add Plan +";
    btn.classList.remove("added");
  } else {
    selectedCustomPlaces.add(placeName);
    btn.textContent = "Added ✓";
    btn.classList.add("added");
  }
  const counter = document.getElementById("count-selected-places");
  if (counter) counter.textContent = selectedCustomPlaces.size;
};
