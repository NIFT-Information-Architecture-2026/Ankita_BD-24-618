// ==========================================================================
// HYDERABAD TRIP PLANNER - MASTER APPLICATION CONTROLLER
// 5-Screen Unified Architecture & Interactive Dynamic Timeline Engine
// Screen 1.0: Dashboard (Home Screen)
// Screen 2.0: Plan A New Trip (Single-Page Setup)
// Screen 3.0: Live Itinerary (Timeline Ground Companion with Day Switching,
//             Drag & Drop Reordering, Cluster-Strict Swapping & Food Radars)
// Screen 4.0: Curated Stays (Accommodations Finder)
// Screen 5.0: Experience Explorer (Self-Planning Workspace)
// ==========================================================================

let activeDateTarget = "arrival";
let activeExperienceChoice = "1st-timer";
const selectedCustomPlaces = new Set();
let currentActiveDay = 1;
let swappingStopIndex = null;
let draggedStopIndex = null;

// Master Dynamic Itinerary Data by Day (Predefined Cluster Data)
const ITINERARY_DAYS_DATA = {
  1: {
    dayNum: 1,
    name: "Old City Heritage Day",
    clusterName: "Old City Heritage Core",
    subtitle: "Old City Heritage Cluster • 1.8 km Cluster",
    stops: [
      {
        id: "day1-stop1",
        name: "Charminar & Laad Bazaar",
        image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 ₹25 Entry",
        dwell: "🕒 Dwell: 1.5 hrs",
        status: "🟢 Open Now • Closes 5:30 PM",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Nimrah Cafe", price: "₹50 – ₹100", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Legendary Irani Chai & Osmania Biscuits" },
            { name: "Hotel Shadab", price: "₹100 – ₹200", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Authentic Hyderabadi Dum Biryani" }
          ]
        }
      },
      {
        id: "day1-stop2",
        name: "Chowmahalla Palace",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 ₹100 Entry",
        dwell: "🕒 Dwell: 2.0 hrs",
        status: "🟢 Open Now • Closes 5:00 PM",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Matwale Doodh Ghar", price: "₹60 – ₹110", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=150&q=80", desc: "Special Thick Lassi & Kesar Falooda" },
            { name: "Subhan Bakery", price: "₹80 – ₹150", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80", desc: "Fresh Osmania Biscuits & Plum Cakes" }
          ]
        }
      },
      {
        id: "day1-stop3",
        name: "Laad Bazaar",
        image: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 Free Entry",
        dwell: "🕒 Dwell: 1.0 hr",
        status: "🟢 Open Now • Vibrant Night Bazaar",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Govind Dosa Bandi", price: "₹40 – ₹90", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=150&q=80", desc: "Iconic Butter Tawa Dosa with Podi" },
            { name: "Hameedi Confectioners", price: "₹70 – ₹160", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=150&q=80", desc: "Royal Nizam-favored Jouzi Halwa" }
          ]
        }
      }
    ],
    nextStop: {
      name: "Golconda Fort",
      eta: "~ 20 min away",
      image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=200&q=80"
    },
    swappables: [
      { name: "Mecca Masjid", meta: "Heritage • Faith • 300m away • Free Entry", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 45 mins", hours: "🟢 Open Now • Closes 9:00 PM", image: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=400&q=80" },
      { name: "Salar Jung Museum", meta: "World Art Museum • 800m away • ₹50 Entry", entry: "🎫 ₹50 Entry", dwell: "🕒 Dwell: 3.0 hrs", hours: "🟢 Open Now • Closes 5:00 PM", image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80" },
      { name: "Badshahi Ashurkhana", meta: "Enamel Tilework • 900m away • Free Entry", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 45 mins", hours: "🟢 Open Now • Historic Monument", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80" },
      { name: "British Residency (Koti)", meta: "Colonial Palladian Mansion • 1.2 km away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", hours: "🟢 Open Now • Closes 4:30 PM", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  2: {
    dayNum: 2,
    name: "Western Forts & Royal Tombs",
    clusterName: "Western Fort & Royal Tombs",
    subtitle: "Western Fort & Royal Tombs • 3.2 km Cluster",
    stops: [
      {
        id: "day2-stop1",
        name: "Golconda Fort",
        image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 ₹25 Entry",
        dwell: "🕒 Dwell: 3.0 hrs",
        status: "🟢 Open Now • Closes 5:30 PM",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Al-Rabea Al-Arabi", price: "₹150 – ₹300", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Authentic Arabian Mutton Mandi & Shawarma" },
            { name: "Shah Ghouse Golconda", price: "₹120 – ₹220", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Famous Hyderabadi Dum Biryani & Haleem" }
          ]
        }
      },
      {
        id: "day2-stop2",
        name: "Qutb Shahi Tombs",
        image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 ₹25 Entry",
        dwell: "🕒 Dwell: 2.0 hrs",
        status: "🟢 Open Now • Closes 6:30 PM",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Pista House Tolichowki", price: "₹100 – ₹220", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80", desc: "Zafrani Chai, Osmania Biscuits & Haleem" },
            { name: "Rumaan Restaurant", price: "₹110 – ₹200", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Crispy Chicken 65, Rumali Roti & Kebab" }
          ]
        }
      },
      {
        id: "day2-stop3",
        name: "Taramati Baradari",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 Free Entry",
        dwell: "🕒 Dwell: 1.5 hrs",
        status: "🟢 Open Now • Sunset Pavilion",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Baradari Heritage Cafe", price: "₹80 – ₹180", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Fresh Filter Coffee, Mirchi Bajji & Samosas" },
            { name: "4 Seasons Tolichowki", price: "₹180 – ₹350", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Lebanese Kebabs & Mughlai Platters" }
          ]
        }
      }
    ],
    nextStop: {
      name: "Durgam Cheruvu & Cable Bridge",
      eta: "~ 15 min away",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80"
    },
    swappables: [
      { name: "Hayat Bakshi Begum Mosque", meta: "Grand 17th-c. Mosque • 1 km away • Free", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 45 mins", hours: "🟢 Open Now • Heritage Mosque", image: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=400&q=80" },
      { name: "Bhagirathi Arts & Crafts", meta: "Telangana Handicrafts Center • 1.2 km away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", hours: "🟢 Open Now • Handlooms Hub", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80" },
      { name: "Premavathi Nritya Mandir", meta: "Historic Royal Dance Pavilion • 800m away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 45 mins", hours: "🟢 Open Now • Sunset Spot", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  3: {
    dayNum: 3,
    name: "Cyberabad Modern Corridor",
    clusterName: "Hitec City Corridor",
    subtitle: "Hitec City & Modern Cyberabad • 2.5 km Cluster",
    stops: [
      {
        id: "day3-stop1",
        name: "Durgam Cheruvu & Cable Bridge",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 Free Entry",
        dwell: "🕒 Dwell: 2.0 hrs",
        status: "🟢 Open Now • Lakefront Promenade",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Olive Bistro Lakefront", price: "₹250 – ₹500", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "White-walled Mediterranean Cafe & Gelato" },
            { name: "Concu Patisserie", price: "₹150 – ₹300", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80", desc: "Artisanal Pastries, Tarts & Specialty Brews" }
          ]
        }
      },
      {
        id: "day3-stop2",
        name: "Shilparamam Arts & Crafts Village",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 ₹60 Entry",
        dwell: "🕒 Dwell: 2.5 hrs",
        status: "🟢 Open Now • Closes 8:30 PM",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Chutneys Cyber Towers", price: "₹120 – ₹240", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=150&q=80", desc: "Steamed Guntur Idli with 6 Special Chutneys" },
            { name: "Rayalaseema Ruchulu", price: "₹200 – ₹400", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Fiery Gongura Mutton & Traditional Ragi Sankati" }
          ]
        }
      },
      {
        id: "day3-stop3",
        name: "Raidurg Skywalk & Knowledge City",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 Free Entry",
        dwell: "🕒 Dwell: 1.0 hr",
        status: "🟢 Open 24 Hours • Modern Architectural Vista",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Roastery Coffee House", price: "₹150 – ₹280", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Cold Brews, Specialty Pour-overs & Bagels" },
            { name: "Hard Rock Cafe Hitec", price: "₹300 – ₹700", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "American Burgers, Fries & Signature Drinks" }
          ]
        }
      }
    ],
    nextStop: {
      name: "Khajaguda Boulders (Sunset Point)",
      eta: "~ 10 min away",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80"
    },
    swappables: [
      { name: "State Gallery of Art", meta: "Modern Indian Art • 1.5 km away • Free", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", hours: "🟢 Open Now • Modern Art Gallery", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80" },
      { name: "Inorbit Mall Lake Terrace", meta: "Retail & Overlook Boardwalk • 800m away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", hours: "🟢 Open Now • Closes 10:00 PM", image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=400&q=80" },
      { name: "Cyber Gateway Tech Plaza", meta: "Iconic Tech Hub Gateway • 600m away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 30 mins", hours: "🟢 Open 24 Hours • Tech Gateway", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" }
    ]
  }
};

// Deep copy of active itinerary state for live mutations (reorder, swap, skip)
let activeItineraryState = JSON.parse(JSON.stringify(ITINERARY_DAYS_DATA));

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

  // Render Day 1 by default
  renderItineraryDay(1);
});

// --------------------------------------------------------------------------
// 1. Master Screen Routing Engine
// --------------------------------------------------------------------------
function setupScreenNavigation() {
  // Screen 1.0 (Dashboard) actions
  document.getElementById("btn-open-itinerary-home")?.addEventListener("click", () => {
    switchAppScreen("screen-itinerary");
    setActiveBottomTab("itinerary");
    renderItineraryDay(currentActiveDay);
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
      renderItineraryDay(1);
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
      const currentLoc = document.getElementById("current-location-label");
      if (currentLoc) currentLoc.textContent = item.dataset.city;
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
  const currentLoc = document.getElementById("current-location-label");
  if (currentLoc) currentLoc.textContent = cityName;
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
        renderItineraryDay(currentActiveDay);
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
// 7. Modals, Overlays & General Helpers
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

// --------------------------------------------------------------------------
// 8. Screen 3.0: Dynamic Itinerary Engine (Day Switch, Reorder, Swap, Skip)
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
      const dayNum = parseInt(pill.dataset.day, 10);
      renderItineraryDay(dayNum);
    });
  });
}

// Render dynamic stops, food breaks, and next stop based on active day
window.renderItineraryDay = function(dayNumber) {
  currentActiveDay = dayNumber;
  const dayData = activeItineraryState[dayNumber];
  if (!dayData) return;

  // 1. Update Day switcher pills active state and titles
  document.querySelectorAll(".itin-day-pill").forEach(p => {
    const dNum = parseInt(p.dataset.day, 10);
    p.classList.toggle("active", dNum === dayNumber);
    if (dNum === 1) {
      p.innerHTML = dNum === dayNumber ? "📍 Day 1: Old City (Active)" : "Day 1: Old City";
    } else if (dNum === 2) {
      p.innerHTML = dNum === dayNumber ? "📍 Day 2: Western Forts (Active)" : "Day 2: Western Forts";
    } else if (dNum === 3) {
      p.innerHTML = dNum === dayNumber ? "📍 Day 3: Cyberabad (Active)" : "Day 3: Cyberabad";
    }
  });

  // 2. Render stops and contextual food breaks
  const container = document.getElementById("itinerary-stops-list");
  if (!container) return;
  container.innerHTML = "";

  dayData.stops.forEach((stop, idx) => {
    const isSkipped = stop.skipped;

    // A. Stop Block
    const stopBlock = document.createElement("div");
    stopBlock.className = `timeline-stop-block ${isSkipped ? "is-skipped" : ""}`;
    stopBlock.dataset.stopIndex = idx;
    stopBlock.draggable = !isSkipped; // Allow dragging only when active

    stopBlock.innerHTML = `
      <div class="timeline-node-badge ${isSkipped ? "skipped" : ""}">
        ${isSkipped ? "✕" : (idx + 1)}
      </div>
      <div class="itinerary-stop-card ${isSkipped ? "skipped" : ""}">
        <div class="stop-card-main-row">
          <img src="${stop.image}" alt="${stop.name}" class="stop-card-thumb" />
          <div class="stop-card-meta">
            <h2 class="stop-card-name">${stop.name}</h2>
            <div class="stop-card-badges-row">
              <span class="itin-badge-entry">${stop.entry}</span>
              <span class="itin-badge-dwell">${stop.dwell}</span>
            </div>
            ${
              isSkipped
                ? `<span class="itin-badge-skipped">🚫 Skipped from Route Plan</span>`
                : `<span class="itin-badge-status"><span class="status-dot"></span> ${stop.status}</span>`
            }
          </div>
        </div>
        <div class="stop-card-actions-grid">
          ${
            isSkipped
              ? `<button class="btn-undo-skip-pill" style="grid-column: span 3; justify-content: center;" onclick="undoSkipStop(${idx})">
                   <span>↩️</span> Undo Skip &amp; Restore Stop to Itinerary
                 </button>`
              : `<button class="itin-action-pill-btn" onclick="reorderStopInteractive(${idx})" title="Click or drag to reorder">
                   <span class="drag-handle-pill">⋮⋮ ⇅</span> Reorder
                 </button>
                 <button class="itin-action-pill-btn" onclick="openSwapDialogForStop(${idx})">
                   <span>⇄</span> Swap
                 </button>
                 <button class="itin-action-pill-btn" onclick="skipStop(${idx})">
                   <span>✕</span> Skip Stop
                 </button>`
          }
        </div>
      </div>
    `;

    container.appendChild(stopBlock);

    // B. Contextual "Feeling Hungry? (Within 500m)" Card after EVERY stop
    if (stop.foodBreak && stop.foodBreak.options && stop.foodBreak.options.length > 0) {
      const foodBlock = document.createElement("div");
      foodBlock.className = "timeline-stop-block";
      foodBlock.style.margin = "20px 0";

      const opt1 = stop.foodBreak.options[0];
      const opt2 = stop.foodBreak.options[1];

      foodBlock.innerHTML = `
        <div class="timeline-node-bullet"></div>
        <div class="itinerary-food-radar-card">
          <div class="food-radar-top-row">
            <div class="food-radar-left-title">
              <div class="food-radar-icon-badge">🍴</div>
              <div>
                <div class="food-radar-title-text">${stop.foodBreak.title}</div>
                <div class="food-radar-dist-sub">(Near ${stop.name.split('&')[0].trim()})</div>
              </div>
            </div>
            <div class="food-radar-view-link" onclick="openFoodOptionsModalForStop('${stop.name.replace(/'/g, "\\'")}')">
              View Options ›
            </div>
          </div>
          <div class="food-options-mini-grid">
            <div class="food-mini-choice-box" onclick="alert('${opt1.name}: ${opt1.desc} (${opt1.price})')">
              <img src="${opt1.img}" alt="${opt1.name}" class="food-mini-thumb" />
              <div>
                <div class="food-mini-name">${opt1.name}</div>
                <span class="food-mini-price-pill">${opt1.price}</span>
              </div>
            </div>
            ${
              opt2
                ? `<div class="food-mini-choice-box" onclick="alert('${opt2.name}: ${opt2.desc} (${opt2.price})')">
                     <img src="${opt2.img}" alt="${opt2.name}" class="food-mini-thumb" />
                     <div>
                       <div class="food-mini-name">${opt2.name}</div>
                       <span class="food-mini-price-pill">${opt2.price}</span>
                     </div>
                   </div>`
                : ""
            }
          </div>
        </div>
      `;
      container.appendChild(foodBlock);
    }
  });

  // 3. Render Next Stop Banner for active day
  const nextContainer = document.getElementById("itinerary-next-stop-container");
  if (nextContainer && dayData.nextStop) {
    nextContainer.innerHTML = `
      <div class="itinerary-next-stop-bar" onclick="alert('Proceeding to: ${dayData.nextStop.name} (${dayData.nextStop.eta})')">
        <img src="${dayData.nextStop.image}" alt="${dayData.nextStop.name}" class="next-stop-thumb" />
        <div class="next-stop-info">
          <div class="next-stop-label">Next Stop</div>
          <div class="next-stop-destination">${dayData.nextStop.name}</div>
        </div>
        <div class="next-stop-eta-pill">
          <span>📍 ${dayData.nextStop.eta} ›</span>
        </div>
      </div>
    `;
  }

  // 4. Initialize Drag & Drop Events on Stop Blocks
  setupDragAndDrop();
};

// --------------------------------------------------------------------------
// 9. Drag & Drop Reordering Logic
// --------------------------------------------------------------------------
function setupDragAndDrop() {
  const blocks = document.querySelectorAll(".timeline-stop-block[draggable='true']");

  blocks.forEach(block => {
    block.addEventListener("dragstart", (e) => {
      draggedStopIndex = parseInt(block.dataset.stopIndex, 10);
      block.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", draggedStopIndex);
    });

    block.addEventListener("dragend", () => {
      block.classList.remove("dragging");
      document.querySelectorAll(".timeline-stop-block").forEach(b => b.classList.remove("drag-over"));
    });

    block.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      block.classList.add("drag-over");
    });

    block.addEventListener("dragleave", () => {
      block.classList.remove("drag-over");
    });

    block.addEventListener("drop", (e) => {
      e.preventDefault();
      block.classList.remove("drag-over");
      const targetIndex = parseInt(block.dataset.stopIndex, 10);

      if (draggedStopIndex !== null && targetIndex !== draggedStopIndex) {
        const stops = activeItineraryState[currentActiveDay].stops;
        const [movedItem] = stops.splice(draggedStopIndex, 1);
        stops.splice(targetIndex, 0, movedItem);

        renderItineraryDay(currentActiveDay);
      }
    });
  });
}

// Interactive Reorder Button (Moves stop downward or wraps to top)
window.reorderStopInteractive = function(index) {
  const stops = activeItineraryState[currentActiveDay].stops;
  if (stops.length > 1) {
    const nextIdx = (index + 1) % stops.length;
    const temp = stops[index];
    stops[index] = stops[nextIdx];
    stops[nextIdx] = temp;
    renderItineraryDay(currentActiveDay);
  }
};

// --------------------------------------------------------------------------
// 10. Stop Skipping & Restoring
// --------------------------------------------------------------------------
window.skipStop = function(index) {
  const stops = activeItineraryState[currentActiveDay].stops;
  if (stops[index]) {
    stops[index].skipped = true;
    renderItineraryDay(currentActiveDay);
  }
};

window.undoSkipStop = function(index) {
  const stops = activeItineraryState[currentActiveDay].stops;
  if (stops[index]) {
    stops[index].skipped = false;
    renderItineraryDay(currentActiveDay);
  }
};

// --------------------------------------------------------------------------
// 11. Cluster-Strict Stop Swapping
// --------------------------------------------------------------------------
window.openSwapDialogForStop = function(stopIndex) {
  swappingStopIndex = stopIndex;
  const dayData = activeItineraryState[currentActiveDay];
  if (!dayData) return;

  const currentStop = dayData.stops[stopIndex];
  const desc = document.getElementById("modal-swap-cluster-desc");
  if (desc) {
    desc.innerHTML = `Recommended alternatives strictly within <strong>${dayData.clusterName} (&lt; 1.5 km)</strong> to replace <em>${currentStop.name}</em>:`;
  }

  const listContainer = document.getElementById("modal-swap-places-list");
  if (listContainer) {
    listContainer.innerHTML = "";

    // Populate verified alternatives from that specific cluster
    dayData.swappables.forEach((item, swIdx) => {
      const itemDiv = document.createElement("div");
      itemDiv.style.cssText = "background:#FFF; padding:10px; border-radius:12px; border:1px solid var(--color-border); cursor:pointer; display:flex; justify-content:space-between; align-items:center;";
      itemDiv.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${item.image}" alt="${item.name}" style="width:42px; height:42px; border-radius:10px; object-fit:cover;" />
          <div>
            <strong style="font-size:13px; color:#1E1F22;">${item.name}</strong>
            <div style="font-size:10px; color:var(--color-slate);">${item.meta}</div>
          </div>
        </div>
        <span style="color:var(--color-terracotta); font-weight:700; font-size:11px;">Select ›</span>
      `;
      itemDiv.onclick = () => {
        applyClusterSwap(swIdx);
      };
      listContainer.appendChild(itemDiv);
    });

    // Cross-cluster demonstration warning item
    const warningDiv = document.createElement("div");
    warningDiv.style.cssText = "background:#FFF5F5; padding:10px; border-radius:12px; border:1px solid #FFD6D6; cursor:pointer; display:flex; justify-content:space-between; align-items:center; margin-top:4px;";
    warningDiv.innerHTML = `
      <div>
        <strong style="color:#C53030; font-size:12px;">⚠️ Explore Cross-City Landmark (Distant Cluster)</strong>
        <div style="font-size:10px; color:#A00;">Cross-Cluster: &gt; 12 km transit jump penalty</div>
      </div>
      <span style="color:#C53030; font-weight:700; font-size:11px;">Inspect ›</span>
    `;
    warningDiv.onclick = () => {
      triggerSpatialWarning(currentActiveDay === 1 ? "Golconda Fort (Western Cluster • 14 km away)" : "Charminar (Old City Cluster • 16 km away)");
    };
    listContainer.appendChild(warningDiv);
  }

  openModal("modal-swap-sheet");
};

window.applyClusterSwap = function(swappableIndex) {
  const dayData = activeItineraryState[currentActiveDay];
  if (!dayData || swappingStopIndex === null) return;

  const choice = dayData.swappables[swappableIndex];
  const oldName = dayData.stops[swappingStopIndex].name;

  // Replace stop details with verified cluster choice
  dayData.stops[swappingStopIndex].name = choice.name;
  dayData.stops[swappingStopIndex].image = choice.image;
  dayData.stops[swappingStopIndex].entry = choice.entry;
  dayData.stops[swappingStopIndex].dwell = choice.dwell;
  dayData.stops[swappingStopIndex].status = choice.hours;
  dayData.stops[swappingStopIndex].skipped = false;

  closeModal("modal-swap-sheet");
  renderItineraryDay(currentActiveDay);

  alert(`⇄ Swapped successfully!\n"${oldName}" replaced with "${choice.name}" within ${dayData.clusterName}.`);
};

window.triggerSpatialWarning = function(msg) {
  closeModal("modal-swap-sheet");
  const warnText = document.getElementById("spatial-warning-text");
  if (warnText) {
    warnText.textContent = `${msg} is located outside your active cluster! Adding this will add +45 mins of cross-city transit time and disrupt your schedule flow.`;
  }
  openModal("modal-spatial-warning");
};

window.confirmSpatialOverride = function() {
  closeModal("modal-spatial-warning");
  alert("⚠️ Cross-cluster swap applied with +45 min transit buffer added.");
};

window.openFoodOptionsModalForStop = function(stopName) {
  alert(`🍴 Nearby Dining Radar (< 500m of ${stopName}):\n• Spot 1: Irani Chai & Osmania Biscuits / Light Snack\n• Spot 2: Authentic Regional Biryani & Local Specialties\n• Spot 3: Fresh Lassi, Falooda & Desserts\nAll options verified within your chosen budget!`);
};

// --------------------------------------------------------------------------
// 12. Screen 4.0: Curated Stays Controller
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
// 13. Screen 5.0: Experience Explorer Controller
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
    renderItineraryDay(1);
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
