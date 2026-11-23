# Master Low-Fidelity Wireframes & User Flows (Phase 4)

**Project:** Hyderabad & Telangana Hyper-Local Trip Planner  
**Creative Director & Product Lead:** NIFT Hyderabad  
**Technical Project Architect:** AGY  
**Lifecycle Stage:** Phase 4 — User Flows & Low-Fidelity Structural Wireframes  
**Source Blueprints:** Official Screen References (`media_1795432344239_b5db47b1.jpg` through `media_1795436112703_bbb3352d.jpg`)

---

## 1. Architectural Scope & Screen Inventory (5-Screen System)

1. **Screen 1.0 — Dashboard (Home Screen):**
   * Top bar: `📍 Hyderabad, Telangana ∨`, SOS badge `[ 🛡️ SOS ]`, User Avatar.
   * Hero header: `Explore Hyderabad` / *`at your pace ✨`* over watercolor Charminar backdrop.
   * Ongoing Trip Card: Palace thumbnail on left, tag `🧳 Your Active Trip`, sticky note *`Let's keep going! ↗`*, title `Day 1: Old City Heritage Cluster`, next stop time, 4-step progress stepper (`Charminar ✓`, `Laad Bazaar ✓`, `Chowmahalla Palace (Current)`, `Evening Spot`), and primary button `✈️ Open Itinerary ➔`.
   * Plan a New Trip Card: Illustrated luggage, hat, paper plane graphic with `Plan a New Trip >`.
   * Explore More section: `🧭 Explore More`, `View All ➔`, horizontal scrollable destination cards (`Ranchi`, `Lucknow`, `Mumbai`).
   * Bottom Navigation: 4 tabs (`Home`, `Itinerary`, `Explore`, `Saved`).

2. **Screen 2.0 — Plan A New Trip Screen:**
   * Hero header: `Plan a New Trip` / *`Let's explore more ✨`* with top places slideshow (`Ranchi`, `Maharashtra`, `Guwahati`, etc.).
   * Section 1: `📍 Your Destination` with autocomplete input.
   * Section 2: `📅 Trip Dates` (`[ Arrival Date > ]` & `[ Return Date > ]`).
   * Section 3: `👥 Travel Dynamic` (`[ Solo ]`, `[ Duo ]`, `[ Family ]`).
   * Section 4: `₹ Budget Range` (3 expandable tiers: `Budget Friendly`, `Premium`, `Luxury`, each with 3 sub-ranges: *Baseline Saver*, *Mid Comfort*, *Plus Deluxe*).
   * Section 5: `✨ Experience Choice` (`[ 🎒 1st Timer ]` vs `[ 🔭 Experience Explorer ]`).
   * Action: Terracotta CTA `✈️ Generate Itinerary ➔`.

3. **Screen 3.0 — Live Itinerary Screen:**
   * Top bar: Back arrow `←`, `Your Itinerary` serif title, map icon `🗺️`, `[ 🛡️ SOS ]`, User Avatar.
   * Hero header: *`Your trip, well planned ✨`* over watercolor Charminar backdrop.
   * Top banner: `🛏️ View Stays` ("Find the best stays nearby >") — taps into Screen 4.0.
   * Day switcher: `[ 📍 Day 1: Old City (Active) ]`, `[ Day 2: Western Forts ]`, `[ Day 3: Cyberabad ]`.
   * Left continuous terracotta rail connecting Stop 1 (`Charminar & Laad Bazaar`), midpoint bullet (`Feeling Hungry?` within 500m food radar with `Nimrah Cafe` & `Shadab`), Stop 2 (`Chowmahalla Palace`), and Stop 3 (`Laad Bazaar`).
   * Stops feature: Dwell time, Entry fee, Open/Close status, and 3 actions: `[ ⇅ Reorder ]`, `[ ⇄ Swap ]`, `[ ✕ Skip Stop ]`.
   * Floating Next Stop bar: `Next Stop Golconda Fort • 📍 ~ 20 min away >`.

4. **Screen 4.0 — Curated Stays Screen:**
   * Opens via `View Stays` button on Screen 3.0.
   * Hero: *`Stay your way in Hyderabad ✨`* `📍`.
   * Filter tabs: `[ 🛏️ All Stays ]`, `[ 💼 Budget-Friendly ]`, `[ 💎 Premium ]`, `[ ⭐ Exclusive ]`.
   * Stays listings with photo carousels, ratings, distances from Charminar, amenity tags (`AC Rooms`, `Pool`, `Wi-Fi`, `Fine Dining`), price per night, and `View Details ➔`.
   * Bottom custom stay card: `Looking for something specific? Explore more stay options for your trip >`.

5. **Screen 5.0 — Experience Explorer Screen:**
   * Opens via `Experience Explorer` selection on Screen 2.0.
   * Header: Charminar silhouette cutout, `📍 Hyderabad ∨`, SOS.
   * Title: `Experience Explorer` / *`Plan by Yourself ✍️`* with paper plane illustration.
   * Search bar with keyword filter + settings icon `🎛️`.
   * Horizontal filter pills: `✨ All`, `Under ₹100`, `Under ₹200`, `Dwell < 1.5hr`, `Dwell < 2hr`, `Dwell < 3hr`.
   * 2-column place cards with photo, title, star rating, entry cost, dwell time, and `Add Plan +` button.
   * Sticky bottom action bar: `🧭 Generate My Itinerary (X Chosen) ➔` which assembles their chosen places into the Screen 3.0 Live Itinerary structure!

---

## 2. Structural Wireframes (ASCII Schematics)

### WIREFRAME 1.0: Dashboard (Home Screen)
```
┌────────────────────────────────────────────────────────┐
│ 9:41                                                   │
│ 📍 Hyderabad, Telangana ∨              [+ SOS]   (👤)  │
├────────────────────────────────────────────────────────┤
│ [HERO WATERCOLOR BACKDROP: CHARMINAR & BIRDS IN SKY]   │
│                                                        │
│ Explore Hyderabad                                      │
│ at your pace ✨                                        │
│                                                        │
│ ┌─ ONGOING TRIP CARD ────────────────────────────────┐ │
│ │ ┌──────────┐ 🧳 Your Active Trip    [Let's keep     │ │
│ │ │ [Image]  │                         going! ↗]     │ │
│ │ │ Charminar│ Day 1: Old City Heritage Cluster      │ │
│ │ │ Gateway  │ 📍 Next: Chowmahalla Palace • 11:30 AM│ │
│ │ │          │                                       │ │
│ │ │          │ (✓)─────(✓)─────(●)─────(○)           │ │
│ │ │          │ Char.   Laad    Chow.   Evening       │ │
│ │ │          │                                       │ │
│ │ └──────────┘ ┌───────────────────────────────────┐ │ │
│ │              │      ✈️ Open Itinerary ➔          │ │ │
│ │              └───────────────────────────────────┘ │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ ┌─ PLAN A NEW TRIP CARD ─────────────────────────────┐ │
│ │ ✨                                     [🧳 Luggage,│ │
│ │ Plan a                                   Map, Hat, │ │
│ │ New Trip             (✈️ dashed trail)   Plane Art]│ │
│ │ ( > )                                              │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ 🧭 Explore More                            View All ➔  │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│ │ [Photo]      │  │ [Photo]      │  │ [Photo]      │   │
│ │ 📍 Ranchi    │  │ 📍 Lucknow   │  │ 📍 Mumbai    │   │
│ └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                        │
├────────────────────────────────────────────────────────┤
│   [🏠 Home]      [📅 Itinerary]   [🔍 Explore]   [🔖 Saved]│
└────────────────────────────────────────────────────────┘
```

---

### WIREFRAME 2.0: Plan A New Trip Screen
```
┌────────────────────────────────────────────────────────┐
│ 9:41                                                   │
│ 📍 Hyderabad, Telangana ∨              [+ SOS]   (👤)  │
├────────────────────────────────────────────────────────┤
│ Plan a New Trip                                        │
│ Let's explore more ✨                                  │
│ ──────────────────────── (watercolor brush stroke)     │
│ [Top Places Slideshow: Ranchi • Maharashtra • Guwahati]│
│                                                        │
│ ┌─ MASTER PLANNING CARD ─────────────────────────────┐ │
│ │ 📍 Your Destination                                │ │
│ │ ┌────────────────────────────────────────────────┐ │ │
│ │ │ 🔍 Where do you want to go?                 ✈️ │ │ │
│ │ └────────────────────────────────────────────────┘ │ │
│ │   └─► [Autocomplete: "H" ➔ Hyderabad, Telangana]   │ │
│ │                                                    │ │
│ │ 📅 Trip Dates                                      │ │
│ │ ┌───────────────────────┐  ┌─────────────────────┐ │ │
│ │ │ 📅 Arrival Date     > │  │ 📅 Return Date    > │ │ │
│ │ └───────────────────────┘  └─────────────────────┘ │ │
│ │                                                    │ │
│ │ 👥 Travel Dynamic                                  │ │
│ │ ┌─────────────┐   ┌─────────────┐   ┌────────────┐ │ │
│ │ │   👤 Solo   │   │   👥 Duo    │   │ 👨‍👩‍👧‍👦 Family │ │ │
│ │ └─────────────┘   └─────────────┘   └────────────┘ │ │
│ │                                                    │ │
│ │ ₹ Budget Range                                     │ │
│ │ ┌────────────────────────────────────────────────┐ │ │
│ │ │ 👛 Budget Friendly                           > │ │ │
│ │ │    • Baseline Saver   • Mid Comfort  • Plus Day│ │ │
│ │ ├────────────────────────────────────────────────┤ │ │
│ │ │ 👑 Premium                                   > │ │ │
│ │ │    • Baseline Saver   • Mid Comfort  • Plus Day│ │ │
│ │ ├────────────────────────────────────────────────┤ │ │
│ │ │ 💎 Luxury                                    > │ │ │
│ │ │    • Baseline Saver   • Mid Comfort  • Plus Day│ │ │
│ │ └────────────────────────────────────────────────┘ │ │
│ │                                                    │ │
│ │ ✨ Experience Choice                               │ │
│ │ ┌───────────────────────┐  ┌─────────────────────┐ │ │
│ │ │     [🎒 Backpack]     │  │    [🔭 Binoculars]  │ │ │
│ │ │ 1st Timer         (○) │  │ Experience Exp. (○) │ │ │
│ │ │ A perfect start to    │  │ Discover more, go   │ │ │
│ │ │ your journey!         │  │ deeper!             │ │ │
│ │ └───────────────────────┘  └─────────────────────┘ │ │
│ │                                                    │ │
│ │ ┌────────────────────────────────────────────────┐ │ │
│ │ │           ✈️ Generate Itinerary ➔               │ │ │
│ │ └────────────────────────────────────────────────┘ │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
├────────────────────────────────────────────────────────┤
│   [🏠 Home]      [📅 Itinerary]   [🔍 Explore]   [🔖 Saved]│
└────────────────────────────────────────────────────────┘
```

---

### WIREFRAME 3.0: Live Itinerary Screen
```
┌────────────────────────────────────────────────────────┐
│  ←  Your Itinerary                     [🗺️] [🛡️ SOS] (👤)│
├────────────────────────────────────────────────────────┤
│  [HERO WATERCOLOR BACKDROP: CHARMINAR & PALACE DOMES]  │
│                                                        │
│  "Your trip,                                           │
│   well planned ✨"                                     │
│   ───────────────── (warm terracotta brush stroke)     │
│                                                        │
│  ┌─ VIEW STAYS BANNER (Tapping opens Screen 4.0) ────┐ │
│  │ 🛏️ [Bed Photo]  View Stays                     >  │ │
│  │                 Find the best stays nearby        │ │
│  └───────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [📍 Day 1: Old City (Active)] [Day 2] [Day 3]    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  │ (Vertical Continuous Terracotta Timeline Rail)      │
│ (1)── ┌─────────────────────────────────────────────┐  │
│  │    │ [Thumb]  Charminar & Laad Bazaar            │  │
│  │    │          [🎫 ₹25 Entry]  [🕒 Dwell: 1.5 hrs] │  │
│  │    │          [🟢 Open Now • Closes 5:30 PM]     │  │
│  │    ├─────────────────────────────────────────────┤  │
│  │    │  [ ⇅ Reorder ]   [ ⇄ Swap ]   [ ✕ Skip Stop]│  │
│  │    └─────────────────────────────────────────────┘  │
│  │                                                     │
│ (•)── ┌─────────────────────────────────────────────┐  │
│  │    │ 🍴 Feeling Hungry? (Within 500m)   View >   │  │
│  │    │ ┌───────────────────┐  ┌──────────────────┐ │  │
│  │    │ │ [☕] Nimrah Cafe  │  │ [🍲] Shadab      │ │  │
│  │    │ │     ₹50 - ₹100    │  │     ₹100 - ₹200  │ │  │
│  │    │ └───────────────────┘  └──────────────────┘ │  │
│  │    └─────────────────────────────────────────────┘  │
│  │                                                     │
│ (2)── ┌─────────────────────────────────────────────┐  │
│  │    │ [Thumb]  Chowmahalla Palace                 │  │
│  │    │          [🎫 ₹100 Entry] [🕒 Dwell: 2 hrs]   │  │
│  │    │          [🟢 Open Now]                      │  │
│  │    ├─────────────────────────────────────────────┤  │
│  │    │  [ ⇅ Reorder ]   [ ⇄ Swap ]   [ ✕ Skip Stop]│  │
│  │    └─────────────────────────────────────────────┘  │
│  │                                                     │
│ (3)── ┌─────────────────────────────────────────────┐  │
│  │    │ [Thumb]  Laad Bazaar                        │  │
│  │    │          [🎫 Free Entry] [🕒 Dwell: 1 hr]    │  │
│  │    ├─────────────────────────────────────────────┤  │
│  │    │  [ ⇅ Reorder ]   [ ⇄ Swap ]   [ ✕ Skip Stop]│  │
│  │    └─────────────────────────────────────────────┘  │
│  │                                                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [🏰 Thumb] Next Stop: Golconda Fort [📍 ~20m >]  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
├────────────────────────────────────────────────────────┤
│   [🏠 Home]      [📅 Itinerary]   [🔍 Explore]   [🔖 Saved]│
└────────────────────────────────────────────────────────┘
```

---

### WIREFRAME 4.0: Curated Stays Screen
```
┌────────────────────────────────────────────────────────┐
│  ←  Curated Stays                      [🗺️] [🛡️ SOS] (👤)│
├────────────────────────────────────────────────────────┤
│  [HERO WATERCOLOR BACKDROP: CHARMINAR & HERITAGE DOMES]│
│                                                        │
│  "Stay your way                                        │
│   in Hyderabad ✨"                                     │
│  📍                                                    │
│                                                        │
│  FILTER TABS (Horizontal Scroll):                      │
│  [🛏️ All Stays] [💼 Budget-Friendly] [💎 Premium] [⭐ Excl]│
│                                                        │
│  ┌─ STAY CARD 1 ─────────────────────────────────────┐ │
│  │ [Photo: Clean Room / Interior]          ⭐ 4.6    │ │
│  │ •••••• (Pagination Dots)                          │ │
│  │                                                   │ │
│  │ Zostel Hyderabad                                  │ │
│  │ 📍 Old City, Abids • 2.2 km from Charminar        │ │
│  │                                                   │ │
│  │ [🛏️ Dorms & Rooms]    [📶 Free Wi-Fi]              │ │
│  │ [🍴 Cafe On-Site]     [🍃 Eco-Friendly]           │ │
│  │                                                   │ │
│  │ ₹799 / night                      [View Details ➔]│ │
│  └───────────────────────────────────────────────────┘ │
│                                                        │
│  ┌─ STAY CARD 2 ─────────────────────────────────────┐ │
│  │ [Photo: Skyline Window Room]            ⭐ 4.4    │ │
│  │ ••••••                                            │ │
│  │                                                   │ │
│  │ Hotel Name (Courtyard Hub)                        │ │
│  │ 📍 Hitech City • 4.4 km from Charminar            │ │
│  │                                                   │ │
│  │ [❄️ AC Rooms]         [🏊 Swimming Pool]          │ │
│  │ [🍴 In-Room Dining]   [📶 Free Wi-Fi]             │ │
│  │                                                   │ │
│  │ ₹1,999 / night                    [View Details ➔]│ │
│  └───────────────────────────────────────────────────┘ │
│                                                        │
│  ┌─ STAY CARD 3 ─────────────────────────────────────┐ │
│  │ [Photo: Falaknuma Courtyard]            ⭐ 4.8    │ │
│  │ ••••••                                            │ │
│  │                                                   │ │
│  │ Taj Falaknuma Palace                              │ │
│  │ 📍 Falaknuma • 7.1 km from Charminar              │ │
│  │                                                   │ │
│  │ [👑 Luxury Stay]      [🏛️ Heritage Property]      │ │
│  │ [🍴 Fine Dining]      [💆 Spa & Wellness]         │ │
│  │                                                   │ │
│  │ ₹12,999 / night                   [View Details ➔]│ │
│  └───────────────────────────────────────────────────┘ │
│                                                        │
│  ┌─ CUSTOM STAY BANNER ──────────────────────────────┐ │
│  │ 🛏️✨ Looking for something specific?            > │ │
│  │     Explore more stay options for your trip.      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                        │
├────────────────────────────────────────────────────────┤
│   [🏠 Home]      [📅 Itinerary]   [🔍 Explore]   [🔖 Saved]│
└────────────────────────────────────────────────────────┘
```

---

### WIREFRAME 5.0: Experience Explorer Screen
```
┌────────────────────────────────────────────────────────┐
│ [Charminar Art]  📍 Hyderabad ∨           [SOS]   (👤) │
├────────────────────────────────────────────────────────┤
│ Experience Explorer                                    │
│ Plan by Yourself ✍️                 (✈️ dashed trail) │
│                                                        │
│ ┌──────────────────────────────────────────────────┐   │
│ │ 🔍 Search for places...                       🎛️ │   │
│ └──────────────────────────────────────────────────┘   │
│                                                        │
│ HORIZONTAL FILTER PILLS:                               │
│ [✨ All] [Under ₹100] [Under ₹200] [Dwell<1.5h] [Dwell<2h]│
│                                                        │
│ 2-COLUMN PLACES GRID:                                  │
│ ┌──────────────────────┐    ┌──────────────────────┐   │
│ │ [Image]              │    │ [Image]              │   │
│ │ Charminar     ⭐ 4.7 │    │ Golconda Fort ⭐ 4.6 │   │
│ │ 🏷️ ₹50   🕒 ~1 hr    │    │ 🏷️ ₹25   🕒 ~1.5 hrs │   │
│ │ [    Add Plan +    ] │    │ [    Add Plan +    ] │   │
│ └──────────────────────┘    └──────────────────────┘   │
│ ┌──────────────────────┐    ┌──────────────────────┐   │
│ │ [Image]              │    │ [Image]              │   │
│ │ Laad Bazaar   ⭐ 4.5 │    │ Hussain Sagar ⭐ 4.6 │   │
│ │ 🏷️ ₹50   🕒 ~2 hrs   │    │ 🏷️ ₹20   🕒 ~1.5 hrs │   │
│ │ [    Add Plan +    ] │    │ [    Add Plan +    ] │   │
│ └──────────────────────┘    └──────────────────────┘   │
│ ┌──────────────────────┐    ┌──────────────────────┐   │
│ │ [Image]              │    │ [Image]              │   │
│ │ Chowmahalla   ⭐ 4.7 │    │ Qutb Shahi    ⭐ 4.5 │   │
│ │ 🏷️ ₹100  🕒 ~1.5 hrs │    │ 🏷️ ₹30   🕒 ~1.5 hrs │   │
│ │ [    Add Plan +    ] │    │ [    Add Plan +    ] │   │
│ └──────────────────────┘    └──────────────────────┘   │
│                                                        │
│ ┌──────────────────────────────────────────────────┐   │
│ │     🧭 Generate My Itinerary (3 Chosen) ➔        │   │
│ └──────────────────────────────────────────────────┘   │
│                                                        │
├────────────────────────────────────────────────────────┤
│   [🏠 Home]        [📍 Map]       [🔖 Saved]     [🧭 Explore]│
└────────────────────────────────────────────────────────┘
```
