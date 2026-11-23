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
window.selectedCustomPlaces = selectedCustomPlaces;
let currentActiveDay = 1;
let swappingStopIndex = null;
let draggedStopIndex = null;

// Calendar & Dynamic Planning Global State
let calArrivalDate = new Date(2026, 9, 18); // 18 Oct 2026
let calReturnDate = new Date(2026, 9, 21);  // 21 Oct 2026
let calViewMonth = 9; // October (0-11)
let calViewYear = 2026;
let activeCalTarget = "arrival"; // "arrival" | "return"
let activePlanDuration = 4; // Days calculated from Arrival and Return
let currentPlanDynamic = "Solo";
let currentPlanBudgetTier = "budget-friendly";

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
        status: "🟢 Open Now • Closes 10:30 PM",
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
      { name: "Badshahi Ashurkhana", meta: "Enamel Tilework • 900m away • Free Entry", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 45 mins", hours: "🟢 Open Now • Closes 7:00 PM", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80" },
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
        status: "🟢 Open Now • Closes 6:00 PM",
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
      { name: "Hayat Bakshi Begum Mosque", meta: "Grand 17th-c. Mosque • 1 km away • Free", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 45 mins", hours: "🟢 Open Now • Closes 8:00 PM", image: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=400&q=80" },
      { name: "Bhagirathi Arts & Crafts", meta: "Telangana Handicrafts Center • 1.2 km away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", hours: "🟢 Open Now • Closes 7:30 PM", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80" },
      { name: "Premavathi Nritya Mandir", meta: "Historic Royal Dance Pavilion • 800m away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 45 mins", hours: "🟢 Open Now • Closes 6:30 PM", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80" }
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
        status: "🟢 Open Now • Closes 8:00 PM",
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
        status: "🟢 Open Now • Open 24 Hours",
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
      { name: "State Gallery of Art", meta: "Modern Indian Art • 1.5 km away • Free", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", hours: "🟢 Open Now • Closes 7:00 PM", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80" },
      { name: "Inorbit Mall Lake Terrace", meta: "Retail & Overlook Boardwalk • 800m away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", hours: "🟢 Open Now • Closes 10:00 PM", image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=400&q=80" },
      { name: "Cyber Gateway Tech Plaza", meta: "Iconic Tech Hub Gateway • 600m away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 30 mins", hours: "🟢 Open Now • Open 24 Hours", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  4: {
    dayNum: 4,
    name: "Hussainsagar Cultural Loop",
    clusterName: "Hussainsagar Cultural Belt",
    subtitle: "Hussainsagar & Cultural Belt • 2.0 km Cluster",
    stops: [
      {
        id: "day4-stop1",
        name: "Hussain Sagar Lake & Buddha Statue",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 ₹20 Boat Ride",
        dwell: "🕒 Dwell: 1.5 hrs",
        status: "🟢 Open Now • Closes 8:30 PM",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Eat Street Tank Bund", price: "₹80 – ₹160", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Lakefront Street Snacks & Pav Bhaji" },
            { name: "Paradise Secunderabad", price: "₹140 – ₹250", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Flagship Hyderabadi Dum Biryani" }
          ]
        }
      },
      {
        id: "day4-stop2",
        name: "Birla Mandir & Planetarium",
        image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 Free Entry",
        dwell: "🕒 Dwell: 1.5 hrs",
        status: "🟢 Open Now • Closes 9:00 PM",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Minerva Coffee Shop", price: "₹100 – ₹200", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=150&q=80", desc: "Crispy Medu Vada & Filter Coffee" },
            { name: "Taj Mahal Hotel Abids", price: "₹90 – ₹180", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80", desc: "Classic South Indian Thali & Sweets" }
          ]
        }
      },
      {
        id: "day4-stop3",
        name: "Lumbini Park & Musical Fountain",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 ₹20 Entry",
        dwell: "🕒 Dwell: 1.5 hrs",
        status: "🟢 Open Now • Closes 9:00 PM",
        skipped: false,
        foodBreak: {
          title: "Feeling Hungry? (Within 500m)",
          options: [
            { name: "Waterfront Lake Lounge", price: "₹250 – ₹500", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Scenic Lakeside Indian & Continental" },
            { name: "Ohri's Gufaa", price: "₹220 – ₹450", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Themed Cave Dining & Mughlai Delicacies" }
          ]
        }
      }
    ],
    nextStop: {
      name: "Tank Bund Heritage Walkway",
      eta: "~ 5 min away",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=200&q=80"
    },
    swappables: [
      { name: "Sanjeevaiah Park", meta: "Lakeside Rose & Rock Gardens • 1 km away", entry: "🎫 ₹20 Entry", dwell: "🕒 Dwell: 1.0 hr", hours: "🟢 Open Now • Closes 7:00 PM", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80" },
      { name: "B.M. Birla Science Museum", meta: "Interactive Science & Dinosaur Fossils", entry: "🎫 ₹50 Entry", dwell: "🕒 Dwell: 2.0 hrs", hours: "🟢 Open Now • Closes 8:00 PM", image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80" },
      { name: "Necklace Road Promenade", meta: "Open Waterfront Boulevard • 500m away", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", hours: "🟢 Open Now • Open 24 Hours", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" }
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
  startHeroBgSlideshow();
  initCalendar();

  // Render Day 1 and default Solo budget stays
  renderItineraryDay(1);
  renderCuratedStays("Solo", "budget-friendly", "all");
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

  // Screen 2.0 Generate CTA (Intelligent Dynamic Generator)
  document.getElementById("btn-generate-plan-submit")?.addEventListener("click", () => {
    if (activeExperienceChoice === "1st-timer") {
      generateIntelligentItinerary();
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
// 3. Section 2: Interactive Pop-up Calendar Engine (Date, Month, Year)
// --------------------------------------------------------------------------
const MONTH_NAMES_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateDisplay(d) {
  if (!d) return "";
  const day = d.getDate();
  const month = MONTH_NAMES_SHORT[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function initCalendar() {
  const mSelect = document.getElementById("cal-month-select");
  const ySelect = document.getElementById("cal-year-select");
  if (mSelect) mSelect.value = calViewMonth;
  if (ySelect) ySelect.value = calViewYear;
  updateCalendarTabLabels();
  renderCalendarDays();
}

function updateCalendarTabLabels() {
  const arrVal = document.getElementById("cal-tab-arrival-val");
  const retVal = document.getElementById("cal-tab-return-val");
  if (arrVal) arrVal.textContent = formatDateDisplay(calArrivalDate);
  if (retVal) retVal.textContent = formatDateDisplay(calReturnDate);
  
  const diffDays = Math.max(1, Math.round((calReturnDate - calArrivalDate) / (1000 * 60 * 60 * 24)) + 1);
  const nights = Math.max(0, diffDays - 1);
  const durPreview = document.getElementById("cal-duration-preview-text");
  if (durPreview) {
    durPreview.textContent = `🗓️ Trip Duration: ${diffDays} Days (${nights} ${nights === 1 ? 'Night' : 'Nights'})`;
  }
}

window.openDateModal = function(targetType) {
  activeCalTarget = targetType;
  const targetDate = targetType === "arrival" ? calArrivalDate : calReturnDate;
  calViewMonth = targetDate.getMonth();
  calViewYear = targetDate.getFullYear();
  
  const mSelect = document.getElementById("cal-month-select");
  const ySelect = document.getElementById("cal-year-select");
  if (mSelect) mSelect.value = calViewMonth;
  if (ySelect) ySelect.value = calViewYear;
  
  switchCalendarTarget(targetType);
  openModal("modal-date-picker");
};

window.switchCalendarTarget = function(targetType) {
  activeCalTarget = targetType;
  document.getElementById("tab-cal-arrival")?.classList.toggle("active", targetType === "arrival");
  document.getElementById("tab-cal-return")?.classList.toggle("active", targetType === "return");
  const modalTitle = document.getElementById("modal-date-title");
  if (modalTitle) {
    modalTitle.textContent = targetType === "arrival" ? "Select Arrival Date" : "Select Return Date";
  }
  renderCalendarDays();
};

window.navCalendarMonth = function(delta) {
  calViewMonth += delta;
  if (calViewMonth > 11) {
    calViewMonth = 0;
    calViewYear++;
  } else if (calViewMonth < 0) {
    calViewMonth = 11;
    calViewYear--;
  }
  const mSelect = document.getElementById("cal-month-select");
  const ySelect = document.getElementById("cal-year-select");
  if (mSelect) mSelect.value = calViewMonth;
  if (ySelect) ySelect.value = calViewYear;
  renderCalendarDays();
};

window.onCalendarDropdownChange = function() {
  const mSelect = document.getElementById("cal-month-select");
  const ySelect = document.getElementById("cal-year-select");
  if (mSelect) calViewMonth = parseInt(mSelect.value, 10);
  if (ySelect) calViewYear = parseInt(ySelect.value, 10);
  renderCalendarDays();
};

function renderCalendarDays() {
  const grid = document.getElementById("calendar-days-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const firstDayIndex = new Date(calViewYear, calViewMonth, 1).getDay();
  const totalDaysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(calViewYear, calViewMonth, 0).getDate();

  // Previous month padding days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cal-day-cell other-month";
    cell.textContent = dayNum;
    grid.appendChild(cell);
  }

  // Current month days
  const arrTime = new Date(calArrivalDate.getFullYear(), calArrivalDate.getMonth(), calArrivalDate.getDate()).getTime();
  const retTime = new Date(calReturnDate.getFullYear(), calReturnDate.getMonth(), calReturnDate.getDate()).getTime();

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const currentCellDate = new Date(calViewYear, calViewMonth, day);
    const cellTime = currentCellDate.getTime();
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cal-day-cell";
    cell.textContent = day;

    const isArrival = cellTime === arrTime;
    const isReturn = cellTime === retTime;
    const inRange = cellTime > arrTime && cellTime < retTime;

    if (isArrival) cell.classList.add("selected-arrival");
    if (isReturn) cell.classList.add("selected-return");
    if (inRange) cell.classList.add("in-range");

    cell.addEventListener("click", () => {
      if (activeCalTarget === "arrival") {
        calArrivalDate = currentCellDate;
        if (calReturnDate.getTime() <= calArrivalDate.getTime()) {
          calReturnDate = new Date(calArrivalDate.getTime() + 86400000 * 3); // 4 days trip
        }
        // Auto-switch to Return tab for smooth workflow
        switchCalendarTarget("return");
      } else {
        if (currentCellDate.getTime() < calArrivalDate.getTime()) {
          calArrivalDate = currentCellDate;
          switchCalendarTarget("return");
        } else {
          calReturnDate = currentCellDate;
        }
      }
      updateCalendarTabLabels();
      renderCalendarDays();
    });

    grid.appendChild(cell);
  }

  // Next month padding days to fill grid row
  const totalRendered = firstDayIndex + totalDaysInMonth;
  const nextMonthPadding = (7 - (totalRendered % 7)) % 7;
  for (let n = 1; n <= nextMonthPadding; n++) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cal-day-cell other-month";
    cell.textContent = n;
    grid.appendChild(cell);
  }

  updateCalendarTabLabels();
}

window.confirmCalendarDates = function() {
  document.getElementById("label-arrival-date").textContent = formatDateDisplay(calArrivalDate);
  document.getElementById("label-return-date").textContent = formatDateDisplay(calReturnDate);
  activePlanDuration = Math.min(4, Math.max(1, Math.round((calReturnDate - calArrivalDate) / (1000 * 60 * 60 * 24)) + 1));
  closeModal("modal-date-picker");
};

// --------------------------------------------------------------------------
// 3b. Background Slideshow Controller (Screen 2.0 Hero)
// --------------------------------------------------------------------------
function startHeroBgSlideshow() {
  const slides = document.querySelectorAll("#plan-bg-slideshow .plan-bg-slide");
  if (!slides || slides.length === 0) return;
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 4000);
}

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
// 7b. Dynamic Itinerary & Stays Intelligent Synthesizer
// --------------------------------------------------------------------------
function generateIntelligentItinerary() {
  const dynamicCard = document.querySelector(".dynamic-option-card.active");
  const travelDynamic = dynamicCard ? dynamicCard.dataset.dyn : "Solo";

  const openBudgetCard = document.querySelector(".budget-tier-expand-card.open") || document.querySelector(".budget-tier-expand-card");
  const budgetTier = openBudgetCard ? openBudgetCard.dataset.tier : "budget-friendly";

  const durationDays = Math.min(4, Math.max(1, Math.round((calReturnDate - calArrivalDate) / (1000 * 60 * 60 * 24)) + 1));
  activePlanDuration = durationDays;
  currentPlanDynamic = travelDynamic;
  currentPlanBudgetTier = budgetTier;

  // Build tailor-made days data based on travelDynamic and budgetTier
  activeItineraryState = buildCustomItinerary(travelDynamic, budgetTier, durationDays);

  // Keep View Stays banner subtitle clean as per design reference
  const staysSub = document.getElementById("view-stays-banner-subtitle");
  if (staysSub) {
    staysSub.textContent = "Find the best stays nearby";
  }

  // Render Curated Stays dynamically proportionate to user's daily budget & dynamic
  renderCuratedStays(currentPlanDynamic, currentPlanBudgetTier, "all");
  document.querySelectorAll(".stay-filter-chip").forEach(c => c.classList.toggle("active", c.dataset.stayTier === "all"));

  // Update Screen 1.0 (Dashboard Ongoing Trip)
  const homeOngoingTitle = document.querySelector(".ongoing-trip-title");
  if (homeOngoingTitle) {
    homeOngoingTitle.textContent = `Day 1: ${activeItineraryState[1].clusterName} (${travelDynamic})`;
  }

  // Switch to Screen 3.0 and render Day 1
  switchAppScreen("screen-itinerary");
  setActiveBottomTab("itinerary");
  renderItineraryDay(1);
}

function applyStaysTierFilter(tier) {
  document.querySelectorAll(".stay-filter-chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.stayTier === tier);
  });
  document.querySelectorAll(".stay-listing-card").forEach(card => {
    if (tier === "all" || card.dataset.stayTier === tier) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function buildCustomItinerary(travelDynamic, budgetTier, durationDays) {
  const result = {};

  // Dining catalog segmented by budget tier
  const diningCatalog = {
    "budget-friendly": {
      d1: [
        { name: "Nimrah Cafe", price: "₹50 – ₹100", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Legendary Irani Chai & Osmania Biscuits" },
        { name: "Hotel Shadab", price: "₹100 – ₹200", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Authentic Hyderabadi Dum Biryani" },
        { name: "Govind Dosa Bandi", price: "₹40 – ₹90", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=150&q=80", desc: "Butter Tawa Dosa with Podi Chutney" }
      ],
      d2: [
        { name: "Shah Ghouse Golconda", price: "₹120 – ₹220", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Dum Biryani, Mutton Haleem & Chai" },
        { name: "Pista House Tolichowki", price: "₹100 – ₹200", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80", desc: "Zafrani Chai, Osmania Biscuits & Snacks" },
        { name: "Baradari Tea Stall", price: "₹40 – ₹80", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=150&q=80", desc: "Hot Cutting Chai & Mirchi Bajji" }
      ],
      d3: [
        { name: "Chutneys Cyber Towers", price: "₹120 – ₹240", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=150&q=80", desc: "Steamed Guntur Idli with 6 Chutneys" },
        { name: "Rayalaseema Ruchulu", price: "₹180 – ₹320", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Traditional Andhra Thali & Ragi Sankati" },
        { name: "Cyber Cafe Bandi", price: "₹50 – ₹100", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Filter Coffee & Bun Maska" }
      ],
      d4: [
        { name: "Eat Street Tank Bund", price: "₹80 – ₹160", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Lakefront Street Snacks & Pav Bhaji" },
        { name: "Paradise Secunderabad", price: "₹140 – ₹250", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Flagship Hyderabadi Dum Biryani" },
        { name: "Minerva Coffee Shop", price: "₹100 – ₹200", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=150&q=80", desc: "Crispy Medu Vada & Filter Coffee" }
      ]
    },
    "premium": {
      d1: [
        { name: "Cafe Niloufer Lounge", price: "₹180 – ₹350", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Special Malai Chai & Mawa Cake" },
        { name: "Jewel of Nizam - The Minar", price: "₹900 – ₹1,800", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Royal Nizami Kebabs & Dum Biryani" },
        { name: "Hameedi Confectioners Heritage", price: "₹150 – ₹300", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=150&q=80", desc: "Nizam-favored Jouzi Halwa & Pistachio Sweets" }
      ],
      d2: [
        { name: "4 Seasons Tolichowki", price: "₹350 – ₹650", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Lebanese Kebabs & Mutton Mandi Platter" },
        { name: "Concu Jubilee Hills", price: "₹300 – ₹600", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80", desc: "Specialty Coffee & Artisanal French Pastries" },
        { name: "Baradari Heritage Open-Air Cafe", price: "₹200 – ₹450", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Sunset Refreshments & Nizam Appetizers" }
      ],
      d3: [
        { name: "Olive Bistro Lakefront", price: "₹600 – ₹1,200", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "White-walled Mediterranean Lakeside Dining" },
        { name: "Roastery Coffee House", price: "₹250 – ₹550", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Specialty Cold Brews & Gourmet Bagels" },
        { name: "Farzi Cafe Cyber Hub", price: "₹500 – ₹1,100", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Modern Molecular Indian Gastronomy" }
      ],
      d4: [
        { name: "Waterfront Lake Lounge", price: "₹600 – ₹1,100", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Scenic Lakeside Indian & Continental" },
        { name: "Ohri's Gufaa", price: "₹450 – ₹900", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Themed Cave Dining & Mughlai Delicacies" },
        { name: "Sanctuary Bar & Kitchen", price: "₹550 – ₹1,200", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=150&q=80", desc: "Artisan Mocktails & Modern Heritage Plates" }
      ]
    },
    "luxury": {
      d1: [
        { name: "Adaa at Taj Falaknuma", price: "₹4,500 – ₹8,000", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&q=80", desc: "Royal Nizam 6-Course Degustation" },
        { name: "The Jade Room Afternoon Tea", price: "₹3,000 – ₹6,000", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "High Tea Served on Nizam Silverware" },
        { name: "The Golconda Pavilion (ITC)", price: "₹2,500 – ₹5,000", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Handcrafted Deccani Luxury Feast" }
      ],
      d2: [
        { name: "Private Nizam Verandah Dining", price: "₹3,500 – ₹7,000", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Slow-cooked Dum Pukht Biryani by Master Chefs" },
        { name: "Ottimo at ITC Kohenur", price: "₹3,000 – ₹6,000", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Pan-Italian Fine Dining & Truffle Risotto" },
        { name: "Skyline Heritage Lounge", price: "₹2,500 – ₹5,500", img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=150&q=80", desc: "Handcrafted Heritage Elixirs & Sunset View" }
      ],
      d3: [
        { name: "Yi Jing at ITC Kohenur", price: "₹3,500 – ₹6,500", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Contemporary Chinese Tasting Experience" },
        { name: "Falaknuma Champagne Terrace", price: "₹5,000 – ₹10,000", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&q=80", desc: "Sunset Reserve Champagne & Nizam Caviar" },
        { name: "Tre-Forni at Park Hyatt", price: "₹3,500 – ₹6,500", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Authentic Wood-fired Italian Grills" }
      ],
      d4: [
        { name: "Dakshin at ITC Kakatiya", price: "₹3,500 – ₹7,000", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Grand South Indian Royal Thali Experience" },
        { name: "Aish Fine Dining", price: "₹3,000 – ₹6,000", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&q=80", desc: "Historic Nizami Recipes in Palatial Silver Interior" },
        { name: "Glasshouse at Sheraton", price: "₹2,500 – ₹5,000", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=150&q=80", desc: "Panoramic Sky Dining & Chef's Special Table" }
      ]
    }
  };

  const diningTier = diningCatalog[budgetTier] || diningCatalog["budget-friendly"];

  // Base day templates customized by travel dynamic
  for (let d = 1; d <= durationDays; d++) {
    const dKey = `d${d}`;
    const foods = diningTier[dKey] || diningTier.d1;

    if (d === 1) {
      let stops = [];
      if (travelDynamic === "Solo") {
        stops = [
          { id: "day1-stop1", name: "Charminar & Laad Bazaar", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 5:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day1-stop2", name: "Chowmahalla Palace", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹100 Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 5:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day1-stop3", name: "Mecca Masjid", image: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 45 mins", status: "🟢 Open Now • Closes 9:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      } else if (travelDynamic === "Duo") {
        stops = [
          { id: "day1-stop1", name: "Charminar & Clock Tower", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 5:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day1-stop2", name: "Chowmahalla Palace Gardens", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹100 Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 5:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day1-stop3", name: "Laad Bazaar Sunset Stroll", image: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 10:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      } else {
        stops = [
          { id: "day1-stop1", name: "Chowmahalla Palace & Vintage Cars", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹100 Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 5:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day1-stop2", name: "Salar Jung Museum", image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹50 Entry", dwell: "🕒 Dwell: 2.5 hrs", status: "🟢 Open Now • Closes 5:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day1-stop3", name: "Charminar Monument", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 1.0 hr", status: "🟢 Open Now • Closes 5:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      }
      result[1] = {
        dayNum: 1,
        name: "Old City Heritage Day",
        clusterName: "Old City Heritage Core",
        subtitle: "Old City Heritage Cluster • 1.8 km Cluster",
        stops: stops,
        nextStop: { name: "Golconda Fort", eta: "~ 20 min away", image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=200&q=80" },
        swappables: ITINERARY_DAYS_DATA[1].swappables
      };
    } else if (d === 2) {
      let stops = [];
      if (travelDynamic === "Solo") {
        stops = [
          { id: "day2-stop1", name: "Golconda Fort Citadel Trek", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 3.0 hrs", status: "🟢 Open Now • Closes 5:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day2-stop2", name: "Qutb Shahi Tombs", image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 6:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day2-stop3", name: "Taramati Baradari", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 6:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      } else if (travelDynamic === "Duo") {
        stops = [
          { id: "day2-stop1", name: "Taramati Baradari Sunset Pavilion", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 6:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day2-stop2", name: "Qutb Shahi Tombs Heritage Garden", image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 6:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day2-stop3", name: "Golconda Fort Scenic Outlook", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 5:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      } else {
        stops = [
          { id: "day2-stop1", name: "Golconda Fort & Royal Tombs", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 2.5 hrs", status: "🟢 Open Now • Closes 5:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day2-stop2", name: "Qutb Shahi Tombs Serene Grounds", image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹25 Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 6:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day2-stop3", name: "Taramati Baradari", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 6:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      }
      result[2] = {
        dayNum: 2,
        name: "Western Forts & Royal Tombs",
        clusterName: "Western Fort & Royal Tombs",
        subtitle: "Western Fort & Royal Tombs • 3.2 km Cluster",
        stops: stops,
        nextStop: { name: "Durgam Cheruvu & Cable Bridge", eta: "~ 15 min away", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80" },
        swappables: ITINERARY_DAYS_DATA[2].swappables
      };
    } else if (d === 3) {
      let stops = [];
      if (travelDynamic === "Solo") {
        stops = [
          { id: "day3-stop1", name: "Durgam Cheruvu Walkway & Cable Bridge", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 8:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day3-stop2", name: "Shilparamam Craft Village", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹60 Entry", dwell: "🕒 Dwell: 2.5 hrs", status: "🟢 Open Now • Closes 8:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day3-stop3", name: "Raidurg Skywalk & Knowledge City", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", status: "🟢 Open Now • Open 24 Hours", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      } else if (travelDynamic === "Duo") {
        stops = [
          { id: "day3-stop1", name: "Durgam Cheruvu Lake Promenade", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 8:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day3-stop2", name: "Inorbit Lake Terrace", image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 10:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day3-stop3", name: "Raidurg Skywalk Illumination", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", status: "🟢 Open Now • Open 24 Hours", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      } else {
        stops = [
          { id: "day3-stop1", name: "Shilparamam Arts & Crafts Village", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹60 Entry", dwell: "🕒 Dwell: 2.5 hrs", status: "🟢 Open Now • Closes 8:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day3-stop2", name: "Durgam Cheruvu Family Park", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 8:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day3-stop3", name: "Raidurg Skywalk & Knowledge City", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", status: "🟢 Open Now • Open 24 Hours", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      }
      result[3] = {
        dayNum: 3,
        name: "Cyberabad Modern Corridor",
        clusterName: "Hitec City Corridor",
        subtitle: "Hitec City & Modern Cyberabad • 2.5 km Cluster",
        stops: stops,
        nextStop: { name: "Khajaguda Boulders (Sunset Point)", eta: "~ 10 min away", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80" },
        swappables: ITINERARY_DAYS_DATA[3].swappables
      };
    } else if (d === 4) {
      let stops = [];
      if (travelDynamic === "Solo") {
        stops = [
          { id: "day4-stop1", name: "Hussain Sagar Lake & Buddha Statue", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹20 Boat Ride", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 8:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day4-stop2", name: "Birla Mandir & Planetarium", image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 9:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day4-stop3", name: "Tank Bund Promenade", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.0 hr", status: "🟢 Open Now • Open 24 Hours", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      } else if (travelDynamic === "Duo") {
        stops = [
          { id: "day4-stop1", name: "Hussainsagar Sunset Boat Cruise", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹50 Speedboat", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 8:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day4-stop2", name: "Lumbini Park Musical Fountain", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹20 Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 9:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day4-stop3", name: "Birla Mandir Hilltop View", image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80", entry: "🎫 Free Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 9:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      } else {
        stops = [
          { id: "day4-stop1", name: "Birla Science Museum & Planetarium", image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹50 Entry", dwell: "🕒 Dwell: 2.0 hrs", status: "🟢 Open Now • Closes 8:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[1]] } },
          { id: "day4-stop2", name: "Buddha Statue Lake Boat Ride", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹20 Boat Ride", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 8:30 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[1], foods[2]] } },
          { id: "day4-stop3", name: "Lumbini Park & Laser Show", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80", entry: "🎫 ₹20 Entry", dwell: "🕒 Dwell: 1.5 hrs", status: "🟢 Open Now • Closes 9:00 PM", skipped: false, foodBreak: { title: "Feeling Hungry? (Within 500m)", options: [foods[0], foods[2]] } }
        ];
      }
      result[4] = {
        dayNum: 4,
        name: "Hussainsagar Cultural Loop",
        clusterName: "Hussainsagar Cultural Belt",
        subtitle: "Hussainsagar & Cultural Belt • 2.0 km Cluster",
        stops: stops,
        nextStop: { name: "Tank Bund Heritage Walkway", eta: "~ 5 min away", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=200&q=80" },
        swappables: ITINERARY_DAYS_DATA[4].swappables
      };
    }
  }

  return result;
}

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

  // 1. Update Day switcher pills active state and render buttons matching activePlanDuration
  const pillsContainer = document.querySelector(".itinerary-days-pill-row");
  if (pillsContainer) {
    pillsContainer.innerHTML = "";
    const totalDays = Math.min(4, Math.max(1, activePlanDuration || 3));
    for (let d = 1; d <= totalDays; d++) {
      const btn = document.createElement("button");
      btn.className = `itin-day-pill ${d === dayNumber ? "active" : ""}`;
      btn.dataset.day = d;
      btn.id = `day-pill-${d}`;
      let dayTitle = `Day ${d}`;
      if (d === 1) dayTitle = "Old City";
      else if (d === 2) dayTitle = "Western Forts";
      else if (d === 3) dayTitle = "Cyberabad";
      else if (d === 4) dayTitle = "Hussainsagar";

      btn.innerHTML = d === dayNumber ? `📍 Day ${d}: ${dayTitle} (Active)` : `Day ${d}: ${dayTitle}`;
      btn.addEventListener("click", () => renderItineraryDay(d));
      pillsContainer.appendChild(btn);
    }
  }

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
// 12. Screen 4.0: Curated Stays Controller (Budget-Proportionate Engine)
// --------------------------------------------------------------------------
const DYNAMIC_STAYS_CATALOG = {
  "budget-friendly": {
    "Solo": [
      {
        name: "Zostel Hyderabad (Solo AC Pod)",
        location: "Old City, Abids • 1.8 km from Charminar",
        rating: "4.7",
        amenities: ["🛏️ Single AC Pod", "📶 Free Wi-Fi", "🔒 Secure Locker", "🍃 Eco-Friendly"],
        price: "₹599",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Nomads Haven Backpacker Bunk",
        location: "Nampally • 2.5 km from Charminar",
        rating: "4.5",
        amenities: ["🛏️ Mixed Dorm Bed", "📶 Free Wi-Fi", "🍴 Cafe On-Site", "☕ Free Morning Chai"],
        price: "₹499",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Banjara Solo Capsule Stay",
        location: "Banjara Hills • Metro Connected",
        rating: "4.6",
        amenities: ["🛏️ Private Capsule", "❄️ Personal AC", "📶 High-Speed Wi-Fi", "🚿 Hot Shower"],
        price: "₹699",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "The Heritage Bunk Abids",
        location: "Abids Heritage Core • 1.5 km from Charminar",
        rating: "4.4",
        amenities: ["🛏️ Single Bunk", "📶 Free Wi-Fi", "🔒 Luggage Storage", "☕ Tea Station"],
        price: "₹549",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Koti Travelers Backpackers Inn",
        location: "Koti • Close to Old City & Metro",
        rating: "4.3",
        amenities: ["🛏️ Pod Dorm", "❄️ AC Rooms", "📶 Free Wi-Fi", "🚕 Tour Desk"],
        price: "₹520",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      }
    ],
    "Duo": [
      {
        name: "Hotel Tourist Plaza - Standard Double",
        location: "Koti, Sultan Bazaar • Near Old City",
        rating: "4.5",
        amenities: ["🛏️ Double Bed", "❄️ AC Room", "📶 Free Wi-Fi", "🍳 Breakfast Available"],
        price: "₹999",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Abids Heritage Inn - Cozy Twin",
        location: "Abids • 2.0 km from Charminar",
        rating: "4.3",
        amenities: ["🛏️ 2 Twin Beds", "📶 Free Wi-Fi", "🍴 Room Service", "🚕 Travel Desk"],
        price: "₹899",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Treebo Trend Heritage Hub",
        location: "Nampally Station Road",
        rating: "4.6",
        amenities: ["🛏️ Queen Bed", "❄️ Central AC", "📶 Free Wi-Fi", "☕ Morning Tea/Coffee"],
        price: "₹1,199",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Nampally Comfort Double Room",
        location: "Station Road • Central Connectivity",
        rating: "4.4",
        amenities: ["🛏️ King Bed", "❄️ Split AC", "📶 Free Wi-Fi", "🚿 Geyser Hot Water"],
        price: "₹849",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Charminar Heritage Homestay (Twin)",
        location: "Pathergatti • Walking Distance to Charminar",
        rating: "4.5",
        amenities: ["🛏️ Twin Beds", "📶 Free Wi-Fi", "☕ Hyderabadi Chai", "🏛️ Heritage Courtyard"],
        price: "₹1,050",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      }
    ],
    "Family": [
      {
        name: "Hotel Royal Heritage - Family Quad",
        location: "Lakdikapool • Central & Accessible",
        rating: "4.5",
        amenities: ["👨‍👩‍👧‍👦 4 Beds Unit", "❄️ AC Suite", "🚗 Free Parking", "📶 Free Wi-Fi"],
        price: "₹1,399",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Golkonda Comfort Stay - Triple Suite",
        location: "Mehdipatnam • Near Fort & Tombs",
        rating: "4.4",
        amenities: ["🛏️ 3 Large Beds", "❄️ Split AC", "🍴 Family Dining On-Site", "👶 Child Friendly"],
        price: "₹1,249",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Abids Family Residency Suite",
        location: "Abids • 2 km from Charminar",
        rating: "4.6",
        amenities: ["👨‍👩‍👧 Family Unit", "❄️ AC Rooms", "🚿 24hr Hot Water", "📶 Free Wi-Fi"],
        price: "₹1,499",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Lakdikapool Family Guest House",
        location: "Lakdikapool • Quiet Residential Lane",
        rating: "4.3",
        amenities: ["🛏️ 3 Double Beds", "❄️ AC", "🚗 Car Parking", "🍳 Home-style Kitchen"],
        price: "₹1,299",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      },
      {
        name: "Charminar View Family Apartment",
        location: "Old City Core • Rooftop Monument Vista",
        rating: "4.5",
        amenities: ["👨‍👩‍👧‍👦 4-Person Suite", "❄️ AC Rooms", "📶 High-Speed Wi-Fi", "☕ Welcome Chai"],
        price: "₹1,599",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "budget"
      }
    ]
  },
  "premium": {
    "Solo": [
      {
        name: "Courtyard Hub - Executive Solo Room",
        location: "Hitech City • Near Cyber Towers",
        rating: "4.6",
        amenities: ["🛏️ Queen Bed", "🏊 Swimming Pool", "💻 Work Desk", "📶 High-Speed Wi-Fi"],
        price: "₹1,899",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Daspalla Boutique Hotel - Deluxe",
        location: "Jubilee Hills Road 37",
        rating: "4.7",
        amenities: ["❄️ Climate Control", "🍴 Gourmet Breakfast", "🏋️ Fitness Center", "☕ In-Room Espresso"],
        price: "₹2,299",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Mercure Banjara Hills Studio",
        location: "Banjara Hills Road 1",
        rating: "4.7",
        amenities: ["🛏️ Studio Bed", "📶 Free Wi-Fi", "🏊 Infinity Pool", "🍴 Rooftop Bistro"],
        price: "₹2,499",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Lemon Tree Premier Hitec City",
        location: "Madhapur • Tech Corridor",
        rating: "4.6",
        amenities: ["🛏️ King Bed", "🏊 Pool", "🍴 Citrus Cafe", "📶 High-Speed Wi-Fi"],
        price: "₹2,199",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      }
    ],
    "Duo": [
      {
        name: "Courtyard Boutique Hotel - King Suite",
        location: "Gachibowli • Near Lakefront",
        rating: "4.7",
        amenities: ["🛏️ King Bed", "🏊 Rooftop Pool", "🍴 In-Room Dining", "🍸 Lounge Bar"],
        price: "₹2,499",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Mercure Hyderabad KCP - City View",
        location: "Banjara Hills • Overlooking Lake",
        rating: "4.8",
        amenities: ["🛏️ Panoramic View", "❄️ AC Room", "🍳 Buffet Breakfast", "💆 Spa Access"],
        price: "₹3,199",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Radisson Hitec City Suite",
        location: "Hitec City • Knowledge Corridor",
        rating: "4.6",
        amenities: ["🛏️ Luxury Bedding", "🏊 Heated Pool", "🍴 24hr Dining", "📶 Free Wi-Fi"],
        price: "₹2,899",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Avasa Hotel - Club Deluxe",
        location: "Hitec City Metro Station",
        rating: "4.7",
        amenities: ["🛏️ Luxury Club Room", "🍸 Sky Lounge Access", "🏊 Rooftop Pool", "🍳 Buffet"],
        price: "₹3,499",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      }
    ],
    "Family": [
      {
        name: "Courtyard Family Executive Suite",
        location: "Hitech City • Connected Rooms",
        rating: "4.7",
        amenities: ["👨‍👩‍👧‍👦 2 Interconnecting Rooms", "🏊 Kids Pool", "🍴 Multi-cuisine Dining", "🚗 Valet Parking"],
        price: "₹3,799",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Radisson Blu Plaza - Family Deluxe",
        location: "Banjara Hills Road 6",
        rating: "4.8",
        amenities: ["🛏️ 2 King Beds", "🍳 Super Breakfast", "🏊 Heated Pool", "👶 Kids Club"],
        price: "₹4,499",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Novotel Hyderabad Convention Suite",
        location: "Hitec City • Serene Green Grounds",
        rating: "4.7",
        amenities: ["👨‍👩‍👦 Spacious Family Suite", "🌿 Garden Lawns", "🏊 Large Pool", "🍴 Family Brunch"],
        price: "₹4,199",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      },
      {
        name: "Lemon Tree Family Connected Rooms",
        location: "Gachibowli Hub • Near ORR",
        rating: "4.6",
        amenities: ["👨‍👩‍👧‍👦 Dual Interconnected Units", "🏊 Outdoor Pool", "🍳 Breakfast Included", "🚗 Parking"],
        price: "₹3,999",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "premium"
      }
    ]
  },
  "luxury": {
    "Solo": [
      {
        name: "Taj Falaknuma Palace - Historical Room",
        location: "Falaknuma • 7.1 km from Charminar",
        rating: "4.9",
        amenities: ["👑 Historical Palace Suite", "🏛️ Nizam Heritage Tour", "🍴 Royal Breakfast", "💆 Royal Jiva Spa"],
        price: "₹14,999",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      },
      {
        name: "ITC Kohenur - Premium Lakefront Suite",
        location: "Knowledge City, Raidurg • Lake View",
        rating: "4.8",
        amenities: ["💎 Panoramic Lake View", "🤵 24hr Butler", "🏊 Sky Pool", "🍴 5 Signature Restaurants"],
        price: "₹12,499",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      },
      {
        name: "Taj Krishna - Club Heritage Room",
        location: "Banjara Hills Road 1",
        rating: "4.8",
        amenities: ["👑 Heritage Club Access", "🌿 Private Garden View", "🏊 Poolside Dining", "🚗 Chauffeur Service"],
        price: "₹11,999",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      },
      {
        name: "Park Hyatt Hyderabad - Presidential Studio",
        location: "Banjara Hills Road 2",
        rating: "4.8",
        amenities: ["💎 Resident Butler", "💆 Spa & Thermal Suites", "🍴 The Flying Elephant", "🏊 Heated Pool"],
        price: "₹13,500",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      }
    ],
    "Duo": [
      {
        name: "Taj Falaknuma Palace - Royal Suite",
        location: "Falaknuma Engine Bowli",
        rating: "4.9",
        amenities: ["👑 Royal Palace Suite", "🏛️ Private Nizami High Tea", "🐎 Horse Carriage Ride", "💆 Couple Spa Session"],
        price: "₹16,999",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      },
      {
        name: "ITC Kohenur - Grand Presidential Suite",
        location: "Knowledge City, Raidurg • Lake View",
        rating: "4.9",
        amenities: ["💎 Durgam Lake Panorama", "🤵 Personal Butler Service", "🏊 Private Jacuzzi", "🍴 Champagne Breakfast"],
        price: "₹14,500",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      },
      {
        name: "The Park Hyderabad - Aish Luxury Suite",
        location: "Somajiguda • Overlooking Hussain Sagar",
        rating: "4.7",
        amenities: ["🌊 Direct Lakefront View", "👑 Silver Nizami Decor", "🏊 Infinity Pool", "🍴 Fine Dining"],
        price: "₹10,999",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      }
    ],
    "Family": [
      {
        name: "Taj Falaknuma Palace - Royal Grand Suite",
        location: "Falaknuma Hilltop Palace",
        rating: "4.9",
        amenities: ["👑 2-Bedroom Palace Suite", "🐎 Horse Carriage Entry", "🍴 Royal Nizam Banquet", "💆 Full Spa Access"],
        price: "₹28,000",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      },
      {
        name: "Taj Krishna - Luxury Presidential Family Villa",
        location: "Banjara Hills Road 1",
        rating: "4.8",
        amenities: ["🏛️ Private Garden Villa", "🏊 Private Plunge Pool", "🤵 Dedicated Butler", "🚗 Airport Chauffeur"],
        price: "₹22,000",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      },
      {
        name: "ITC Kakatiya - Royal Luxury Pavilion",
        location: "Begumpet • Heritage Gardens",
        rating: "4.7",
        amenities: ["👨‍👩‍👧‍👦 3-Bedroom Family Suite", "🌿 Private Courtyard", "🏊 Swimming Pool", "🍴 Royal Nizami Banquet"],
        price: "₹18,500",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      },
      {
        name: "ITC Kohenur - Presidential 2-Bedroom Suite",
        location: "Knowledge City, Raidurg • Lakefront",
        rating: "4.9",
        amenities: ["💎 2 Master Bedrooms", "🤵 24hr Butler Team", "🏊 Private Terrace Pool", "🍴 Private Chef Table"],
        price: "₹32,000",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        tier: "exclusive"
      }
    ]
  }
};

window.renderCuratedStays = function(travelDynamic = "Solo", budgetTier = "budget-friendly") {
  const container = document.getElementById("stays-feed-container");
  if (!container) return;
  container.innerHTML = "";

  // Retrieve ALL verified stays that strictly match the user's travel dynamic & budget tier
  const staysToShow = (DYNAMIC_STAYS_CATALOG[budgetTier] && DYNAMIC_STAYS_CATALOG[budgetTier][travelDynamic]) || DYNAMIC_STAYS_CATALOG["budget-friendly"]["Solo"];

  // Calculate nights from trip duration
  const nights = Math.max(1, activePlanDuration - 1);

  staysToShow.forEach(stay => {
    const card = document.createElement("div");
    card.className = "stay-listing-card";
    card.dataset.stayTier = stay.tier;

    const chipsHtml = stay.amenities.map(a => `<span class="amenity-chip">${a}</span>`).join("");
    const numericPrice = parseInt(stay.price.replace(/[^\d]/g, ""), 10);
    const totalPrice = numericPrice * nights;

    card.innerHTML = `
      <div class="stay-photo-slider-box">
        <img src="${stay.image}" alt="${stay.name}" class="stay-photo-slider-img" />
        <div class="stay-rating-badge">⭐ ${stay.rating}</div>
        <div class="stay-dots-indicator">
          <span class="stay-dot active"></span>
          <span class="stay-dot"></span>
          <span class="stay-dot"></span>
          <span class="stay-dot"></span>
        </div>
      </div>
      <h2 class="stay-name-title">${stay.name}</h2>
      <div class="stay-location-sub">📍 ${stay.location}</div>
      <div class="stay-amenities-chips-row">
        ${chipsHtml}
      </div>
      <div class="stay-footer-row">
        <div>
          <span class="stay-price-bold">${stay.price}</span>
          <span class="stay-price-sub"> / night</span>
          <div style="font-size:11px; color:var(--color-slate); font-weight:600; margin-top:2px;">
            Total: ₹${totalPrice.toLocaleString('en-IN')} for ${nights} ${nights === 1 ? 'night' : 'nights'}
          </div>
        </div>
        <button class="btn-stay-details-cta" onclick="alert('Viewing verified booking details for ${stay.name} (${stay.price}/night). Total stay: ₹${totalPrice.toLocaleString('en-IN')} for ${nights} nights.')">
          View Details →
        </button>
      </div>
    `;
    container.appendChild(card);
  });
};

function setupStaysScreen() {
  // Screen 4.0 Stays are auto-rendered dynamically based on user budget and dynamic.
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

  // Master metadata for all 18 Experience Explorer destinations
  const MASTER_PLACES_METADATA = {
    "Charminar": {
      name: "Charminar",
      cluster: "old-city",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 ₹25 Entry",
      dwell: "🕒 Dwell: 1.0 hr",
      status: "🟢 Open Now • Closes 5:30 PM"
    },
    "Golconda Fort": {
      name: "Golconda Fort",
      cluster: "western-forts",
      image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 ₹25 Entry",
      dwell: "🕒 Dwell: 2.5 hrs",
      status: "🟢 Open Now • Closes 5:30 PM"
    },
    "Laad Bazaar": {
      name: "Laad Bazaar",
      cluster: "old-city",
      image: "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 1.5 hrs",
      status: "🟢 Open Now • Closes 10:30 PM"
    },
    "Chowmahalla Palace": {
      name: "Chowmahalla Palace",
      cluster: "old-city",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 ₹100 Entry",
      dwell: "🕒 Dwell: 2.0 hrs",
      status: "🟢 Open Now • Closes 5:00 PM"
    },
    "Mecca Masjid": {
      name: "Mecca Masjid",
      cluster: "old-city",
      image: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 45 mins",
      status: "🟢 Open Now • Closes 9:00 PM"
    },
    "Badshahi Ashurkhana": {
      name: "Badshahi Ashurkhana",
      cluster: "old-city",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 45 mins",
      status: "🟢 Open Now • Closes 7:00 PM"
    },
    "Mozamjahi Market": {
      name: "Mozamjahi Market",
      cluster: "old-city",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 1.0 hr",
      status: "🟢 Open Now • Closes 10:00 PM"
    },
    "Salar Jung Museum": {
      name: "Salar Jung Museum",
      cluster: "old-city",
      image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 ₹50 Entry",
      dwell: "🕒 Dwell: 2.5 hrs",
      status: "🟢 Open Now • Closes 5:00 PM"
    },
    "Qutb Shahi Tombs": {
      name: "Qutb Shahi Tombs",
      cluster: "western-forts",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 ₹25 Entry",
      dwell: "🕒 Dwell: 2.0 hrs",
      status: "🟢 Open Now • Closes 6:30 PM"
    },
    "Taramati Baradari": {
      name: "Taramati Baradari",
      cluster: "western-forts",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 1.5 hrs",
      status: "🟢 Open Now • Closes 6:00 PM"
    },
    "Durgam Cheruvu Lake": {
      name: "Durgam Cheruvu Lake",
      cluster: "cyberabad",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 1.5 hrs",
      status: "🟢 Open Now • Closes 8:00 PM"
    },
    "Raidurg Skywalk": {
      name: "Raidurg Skywalk",
      cluster: "cyberabad",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 45 mins",
      status: "🟢 Open Now • Open 24 Hours"
    },
    "Shilparamam Arts Village": {
      name: "Shilparamam Arts Village",
      cluster: "cyberabad",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 ₹60 Entry",
      dwell: "🕒 Dwell: 2.5 hrs",
      status: "🟢 Open Now • Closes 8:30 PM"
    },
    "Hussain Sagar Lake": {
      name: "Hussain Sagar Lake",
      cluster: "central-lakes",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 ₹20 Boat Ride",
      dwell: "🕒 Dwell: 1.5 hrs",
      status: "🟢 Open Now • Closes 10:00 PM"
    },
    "Birla Mandir": {
      name: "Birla Mandir",
      cluster: "central-lakes",
      image: "https://images.unsplash.com/photo-1542314831-c6a4d275b28e?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 1.5 hrs",
      status: "🟢 Open Now • Closes 9:00 PM"
    },
    "Maula Ali Hill": {
      name: "Maula Ali Hill",
      cluster: "central-lakes",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 2.0 hrs",
      status: "🟢 Open Now • Closes 8:30 PM"
    },
    "Paigah Tombs": {
      name: "Paigah Tombs",
      cluster: "old-city",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 Free Entry",
      dwell: "🕒 Dwell: 1.0 hr",
      status: "🟢 Open Now • Closes 5:00 PM"
    },
    "Ramoji Film City": {
      name: "Ramoji Film City",
      cluster: "outskirts",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80",
      entry: "🎫 ₹1,350 Entry",
      dwell: "🕒 Dwell: 6.0 hrs",
      status: "🟢 Open Now • Closes 5:30 PM"
    }
  };

  const CLUSTER_DINING_CATALOG = {
    "old-city": {
      "budget-friendly": [
        { name: "Nimrah Cafe", price: "₹50 – ₹100", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Legendary Irani Chai & Osmania Biscuits" },
        { name: "Hotel Shadab", price: "₹100 – ₹200", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Authentic Hyderabadi Dum Biryani" },
        { name: "Pista House Charminar", price: "₹120 – ₹220", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80", desc: "Traditional Haleem & Zafrani Tea" }
      ],
      "premium": [
        { name: "Grand Hotel Abids", price: "₹400 – ₹800", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Classic Heritage Mughlai & Biryani" },
        { name: "Paradise Heritage", price: "₹500 – ₹900", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Historic Dum Biryani Specialty" }
      ],
      "luxury": [
        { name: "Adaa at Taj Falaknuma", price: "₹4,500 – ₹8,000", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&q=80", desc: "Royal Nizam 6-Course Degustation" },
        { name: "The Jade Room Afternoon Tea", price: "₹3,000 – ₹6,000", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "High Tea Served on Nizam Silverware" }
      ]
    },
    "western-forts": {
      "budget-friendly": [
        { name: "Shah Ghouse Tolichowki", price: "₹150 – ₹250", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Zaffrani Mutton Biryani & Roti" },
        { name: "Mandar Restaurant", price: "₹120 – ₹200", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80", desc: "Deccani Curries & Fresh Kebabs" }
      ],
      "premium": [
        { name: "The Golconda Pavilion", price: "₹800 – ₹1,500", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Deccani Gourmet Feast & Kebabs" },
        { name: "Jewel of Nizam", price: "₹1,000 – ₹1,800", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Minaret Fine Dining with Fort View" }
      ],
      "luxury": [
        { name: "Private Nizam Verandah Dining", price: "₹3,500 – ₹7,000", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Slow-cooked Dum Pukht by Master Chefs" },
        { name: "Skyline Heritage Lounge", price: "₹2,500 – ₹5,500", img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=150&q=80", desc: "Handcrafted Heritage Elixirs & Sunset View" }
      ]
    },
    "cyberabad": {
      "budget-friendly": [
        { name: "Rayalaseema Ruchulu", price: "₹180 – ₹300", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80", desc: "Spicy Telugu Thalis & Ragi Sangati" },
        { name: "Chutneys Hitec City", price: "₹150 – ₹250", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Guntur Idli & 7 Signature Chutneys" }
      ],
      "premium": [
        { name: "Olive Bistro & Bar", price: "₹800 – ₹1,500", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Mediterranean Dining Overlooking Durgam Lake" },
        { name: "Flying Spaghetti Monster", price: "₹600 – ₹1,200", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Artisanal Thin-crust Pizzas & Pastas" }
      ],
      "luxury": [
        { name: "Ottimo at ITC Kohenur", price: "₹3,000 – ₹6,000", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Pan-Italian Fine Dining & Truffle Risotto" },
        { name: "Yi Jing at ITC Kohenur", price: "₹3,500 – ₹6,500", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Contemporary Chinese Tasting Experience" }
      ]
    },
    "central-lakes": {
      "budget-friendly": [
        { name: "Minerva Coffee Shop", price: "₹100 – ₹200", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Crispy Dosas & Filter Kaapi" },
        { name: "Ohri's 70MM", price: "₹250 – ₹400", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80", desc: "Cinema Themed Buffet near Tank Bund" }
      ],
      "premium": [
        { name: "Waterfront Restaurant", price: "₹700 – ₹1,200", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Lakeside Panoramic Dining & Cocktails" },
        { name: "Sahib's Barbeque", price: "₹700 – ₹1,100", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Hyderabadi Live Grill Barbecue Feast" }
      ],
      "luxury": [
        { name: "Dakshin at ITC Kakatiya", price: "₹3,500 – ₹7,000", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Grand South Indian Royal Thali Experience" },
        { name: "Aish at The Park", price: "₹3,000 – ₹6,000", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&q=80", desc: "Historic Nizami Recipes in Palatial Silver Interior" }
      ]
    },
    "outskirts": {
      "budget-friendly": [
        { name: "Tara Dining Hall", price: "₹200 – ₹350", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80", desc: "Multi-Cuisine Family Thali in Studio Complex" },
        { name: "Sitara Food Court", price: "₹150 – ₹250", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=150&q=80", desc: "Quick Bites & South Indian Snacks" }
      ],
      "premium": [
        { name: "Shaan-e-Ramoji Restaurant", price: "₹600 – ₹1,200", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=150&q=80", desc: "Royal Thematic Studio Lunch Buffet" },
        { name: "Galaxy Restaurant", price: "₹700 – ₹1,300", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80", desc: "Celebrity-Style Multi-Cuisine Dining" }
      ],
      "luxury": [
        { name: "Sitara Luxury Hotel Dining", price: "₹2,500 – ₹5,000", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=150&q=80", desc: "Exclusive 5-Star Film City Luxury Dining" }
      ]
    }
  };

  const CLUSTER_CONFIG = {
    "old-city": {
      name: "Old City Heritage Core",
      dayTitle: "Old City Heritage",
      subtitle: "Old City Heritage Cluster • Historic Walking Circuit",
      nextStop: { name: "Golconda Fort", eta: "~ 20 min away", image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=200&q=80" },
      fallbackPlaces: ["Charminar", "Chowmahalla Palace", "Mecca Masjid"],
      swappables: [
        { name: "Salar Jung Museum", dwell: "2.5 hrs", price: "₹50", reason: "Major art museum & Nizam antiquities" },
        { name: "Mecca Masjid", dwell: "45 mins", price: "Free", reason: "Historic granite mosque near Charminar" },
        { name: "Badshahi Ashurkhana", dwell: "45 mins", price: "Free", reason: "Persian enamel tile royal mourning hall" },
        { name: "Mozamjahi Market", dwell: "1 hr", price: "Free", reason: "Historic clock tower stone fruit market" },
        { name: "Paigah Tombs", dwell: "1 hr", price: "Free", reason: "Exquisite stucco & marble filigree craftsmanship" }
      ]
    },
    "western-forts": {
      name: "Western Forts & Royal Tombs",
      dayTitle: "Western Forts",
      subtitle: "Western Fort & Royal Tombs • 3.2 km Cluster",
      nextStop: { name: "Durgam Cheruvu & Cable Bridge", eta: "~ 15 min away", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80" },
      fallbackPlaces: ["Golconda Fort", "Qutb Shahi Tombs", "Taramati Baradari"],
      swappables: [
        { name: "Taramati Baradari", dwell: "1.5 hrs", price: "Free", reason: "Sunset music pavilion & acoustic architecture" },
        { name: "Qutb Shahi Tombs", dwell: "2 hrs", price: "₹25", reason: "Landscaped necropolis of 7 Qutb Shahi rulers" },
        { name: "Golconda Fort", dwell: "2.5 hrs", price: "₹25", reason: "Medieval citadel fortress with acoustic dome" }
      ]
    },
    "cyberabad": {
      name: "Cyberabad Modern Corridor",
      dayTitle: "Cyberabad Corridor",
      subtitle: "Hitec City & Modern Cyberabad • 2.5 km Cluster",
      nextStop: { name: "Hussain Sagar Lake", eta: "~ 18 min away", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=200&q=80" },
      fallbackPlaces: ["Durgam Cheruvu Lake", "Shilparamam Arts Village", "Raidurg Skywalk"],
      swappables: [
        { name: "Raidurg Skywalk", dwell: "45 mins", price: "Free", reason: "Elevated covered urban skywalk walkway" },
        { name: "Shilparamam Arts Village", dwell: "2.5 hrs", price: "₹60", reason: "Ethnic craft bazaars & folk performances" },
        { name: "Durgam Cheruvu Lake", dwell: "1.5 hrs", price: "Free", reason: "Lakefront promenade & illuminated bridge" }
      ]
    },
    "central-lakes": {
      name: "Central Lakes & Heights",
      dayTitle: "Central Lakes",
      subtitle: "Central Lakes & Hilltop Heights • 2.0 km Cluster",
      nextStop: { name: "Charminar Monument", eta: "~ 15 min away", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=200&q=80" },
      fallbackPlaces: ["Hussain Sagar Lake", "Birla Mandir", "Maula Ali Hill"],
      swappables: [
        { name: "Birla Mandir", dwell: "1.5 hrs", price: "Free", reason: "Hilltop white marble temple with panoramic views" },
        { name: "Maula Ali Hill", dwell: "2 hrs", price: "Free", reason: "Panoramic hilltop viewpoint with 500 stone steps" },
        { name: "Hussain Sagar Lake", dwell: "1.5 hrs", price: "₹20", reason: "Heart-shaped lake & Buddha monolithic statue" }
      ]
    },
    "outskirts": {
      name: "Ramoji Film City Excursion",
      dayTitle: "Film City Excursion",
      subtitle: "Grand Studio Sets & Thematic Cinematic Entertainment",
      nextStop: { name: "Evening Light Show", eta: "~ 5 min away", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=200&q=80" },
      fallbackPlaces: ["Ramoji Film City"],
      swappables: [
        { name: "Action Studio Stunt Show", dwell: "1 hr", price: "Included", reason: "Live stunt coordination and sets" },
        { name: "Mughal Gardens Walk", dwell: "1.5 hrs", price: "Included", reason: "Thematic garden sets and fountains" }
      ]
    }
  };

  // Generate itinerary with custom chosen places, geographically clustered day-wise
  document.getElementById("btn-generate-from-experience")?.addEventListener("click", () => {
    if (selectedCustomPlaces.size === 0) {
      alert("Please select at least 1 place using 'Add Plan +' before generating your custom itinerary.");
      return;
    }

    const chosenList = Array.from(selectedCustomPlaces);
    const totalDays = activePlanDuration || 3;
    const budgetTier = currentPlanBudgetTier || "budget-friendly";
    const travelDynamic = currentPlanDynamic || "Solo";

    // 1. Group chosen places by micro-cluster
    const clusterBuckets = {};
    chosenList.forEach(pName => {
      const meta = MASTER_PLACES_METADATA[pName] || {
        name: pName,
        cluster: "old-city",
        image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=400&q=80",
        entry: "🎫 Free Entry",
        dwell: "🕒 Dwell: 1.5 hrs",
        status: "🟢 Open Now • Closes 6:00 PM"
      };
      if (!clusterBuckets[meta.cluster]) clusterBuckets[meta.cluster] = [];
      clusterBuckets[meta.cluster].push(meta);
    });

    // 2. Canonical cluster sequence for smooth city navigation
    const canonicalOrder = ["old-city", "western-forts", "cyberabad", "central-lakes", "outskirts"];
    const chosenClusters = canonicalOrder.filter(c => clusterBuckets[c] && clusterBuckets[c].length > 0);

    // 3. Allocate clusters to days based on user trip duration
    const daysPlan = [];

    if (chosenClusters.length <= totalDays) {
      // Each cluster gets its own day
      chosenClusters.forEach(cKey => {
        daysPlan.push({ clusterKey: cKey, places: clusterBuckets[cKey] });
      });

      // Fill remaining days with complementary unchosen clusters so traveler has a complete trip
      for (const unchosen of canonicalOrder) {
        if (daysPlan.length >= totalDays) break;
        if (!chosenClusters.includes(unchosen)) {
          const cfg = CLUSTER_CONFIG[unchosen];
          const fallbackMetas = cfg.fallbackPlaces.map(p => MASTER_PLACES_METADATA[p]).filter(Boolean);
          daysPlan.push({ clusterKey: unchosen, places: fallbackMetas });
        }
      }
    } else {
      // More clusters chosen than available days -> merge adjacent clusters cleanly into totalDays
      for (let i = 0; i < totalDays; i++) {
        daysPlan.push({ clusterKey: chosenClusters[i], places: [...clusterBuckets[chosenClusters[i]]] });
      }
      // Distribute overflow clusters to closest day
      for (let i = totalDays; i < chosenClusters.length; i++) {
        const targetDayIdx = Math.min(i % totalDays, totalDays - 1);
        daysPlan[targetDayIdx].places.push(...clusterBuckets[chosenClusters[i]]);
      }
    }

    // 4. Build activeItineraryState for each day with authentic stops, food radar, and swappables
    for (let d = 1; d <= totalDays; d++) {
      const dayConfig = daysPlan[d - 1] || daysPlan[0];
      const cKey = dayConfig.clusterKey;
      const cfg = CLUSTER_CONFIG[cKey] || CLUSTER_CONFIG["old-city"];
      const diningTier = (CLUSTER_DINING_CATALOG[cKey] && CLUSTER_DINING_CATALOG[cKey][budgetTier]) || CLUSTER_DINING_CATALOG["old-city"]["budget-friendly"];

      const stops = dayConfig.places.map((placeMeta, pIdx) => {
        const foodIdx1 = pIdx % diningTier.length;
        const foodIdx2 = (pIdx + 1) % diningTier.length;
        return {
          id: `exp-d${d}-stop${pIdx + 1}`,
          name: placeMeta.name,
          image: placeMeta.image,
          entry: placeMeta.entry,
          dwell: placeMeta.dwell,
          status: placeMeta.status,
          skipped: false,
          foodBreak: {
            title: "Feeling Hungry? (Within 500m)",
            options: [diningTier[foodIdx1], diningTier[foodIdx2]]
          }
        };
      });

      // Ensure at least 2 stops per day
      if (stops.length < 2 && cfg.fallbackPlaces) {
        for (const fp of cfg.fallbackPlaces) {
          if (stops.length >= 2) break;
          if (!stops.some(s => s.name === fp)) {
            const fallbackMeta = MASTER_PLACES_METADATA[fp];
            if (fallbackMeta) {
              stops.push({
                id: `exp-d${d}-stop${stops.length + 1}`,
                name: fallbackMeta.name,
                image: fallbackMeta.image,
                entry: fallbackMeta.entry,
                dwell: fallbackMeta.dwell,
                status: fallbackMeta.status,
                skipped: false,
                foodBreak: {
                  title: "Feeling Hungry? (Within 500m)",
                  options: [diningTier[0], diningTier[1]]
                }
              });
            }
          }
        }
      }

      activeItineraryState[d] = {
        dayNum: d,
        name: cfg.dayTitle,
        clusterName: cfg.name,
        subtitle: `${cfg.dayTitle} • ${stops.length} Self-Curated Stops`,
        stops: stops,
        nextStop: cfg.nextStop,
        swappables: cfg.swappables
      };
    }

    // 5. Synchronize Curated Stays to user budget & duration
    renderCuratedStays(travelDynamic, budgetTier);

    // 6. Navigate to Live Itinerary Screen
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
