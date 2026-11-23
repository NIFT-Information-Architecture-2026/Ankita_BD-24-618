# Phase 6: Interactive Prototyping & Code Scaffolding (Master Outputs)

**Project Title:** Hyderabad & Telangana Hyper-Local, Budget-Intelligent Trip Planner  
**Creative Director & Product Lead:** NIFT Hyderabad  
**Technical Project Architect:** AGY  
**Lifecycle Stage:** Phase 6 — Interactive Prototyping, Code Scaffolding & Web Deployment  
**Document Purpose:** Master documentation of the production-ready interactive frontend prototype, application architecture, testable interaction flows, and deployment instructions matching the 5 official reference designs (`media_1795432344239_b5db47b1.jpg` through `media_1795436112703_bbb3352d.jpg`).

---

## 1. Executive Summary & Prototype Architecture

In Phase 6, all research, empathy models, information architecture, wireframes, and design tokens from Phases 1 through 5 have been synthesized into a **functional, responsive, zero-dependency interactive web prototype**.

### Technical Stack & Decisions:
* **Architecture:** Mobile-First Vanilla HTML5, Modern CSS3 with Design Tokens, and ES6+ JavaScript.
* **Zero External Build Dependencies:** Runs instantly in any modern web browser without requiring `npm`, `node_modules`, or complex bundlers.
* **Offline & Static Host Ready:** Can be tested immediately by opening [index.html](file:///c:/Users/ANKITA/Documents/Ankita_BD-24-618/index.html) or deployed to **GitHub Pages** with 1 click.

---

## 2. Directory Structure

```
Ankita_BD-24-618/
├── index.html                 # Mobile-first interactive shell with all 5 screens & modals
├── css/
│   └── style.css              # Design tokens, soft-cornered cards, watercolor headers & stepper tracks
├── js/
│   ├── data.js                # Curated 45-places Hyderabad dataset, curated stays & meal spots
│   └── app.js                 # Master screen router, state controller, filter logic & modal managers
├── PHASE1_OUTPUTS.md          # Locked Phase 1 deliverables
├── PHASE2_OUTPUTS.md          # Locked Phase 2 deliverables
├── PHASE3_OUTPUTS.md          # Locked Phase 3 deliverables
├── PHASE4_OUTPUTS.md          # Locked Phase 4 deliverables (5-Screen Inventory & Flows)
├── PHASE5_OUTPUTS.md          # Locked Phase 5 deliverables (Design System & Tokens)
└── PHASE6_OUTPUTS.md          # Locked Phase 6 deliverables (Prototype Validation)
```

---

## 3. Interactive Features & Screen Walkthrough (5 Screens)

### 1. Screen 1.0: Dashboard (Home Screen)
*Reference: `media_1795432344239_b5db47b1.jpg`*
* **Top Header Row:** Location dropdown pill (`📍 Hyderabad, Telangana ∨`), emergency SOS button (`[ 🛡️ SOS ]`), and circular traveler avatar.
* **Hero Headline:** `Explore Hyderabad` / *`at your pace ✨`* with watercolor Charminar backdrop and flying birds.
* **Ongoing Trip Card:** 
  * Left photo of heritage palace gate.
  * Tag `🧳 Your Active Trip` and sticky note *`Let's keep going! ↗`*.
  * Title: `Day 1: Old City Heritage Cluster`, next stop `📍 Next Stop: Chowmahalla Palace • 11:30 AM`.
  * 4-step stepper with checkmarks (`Charminar ✓`, `Laad Bazaar ✓`, `Chowmahalla Palace (Current)`, `Evening Spot`).
  * Primary button: `✈️ Open Itinerary ➔` (Routes directly to Screen 3.0 Live Itinerary).
* **Plan a New Trip Promo Banner:** Warm illustrated card with suitcase, hat, map, and paper airplane trail. Tapping opens Screen 2.0.
* **Explore More Section:** `🧭 Explore More` with sideways scrollable destination cards (`Ranchi`, `Lucknow`, `Mumbai`).

### 2. Screen 2.0: Plan A New Trip Screen
*Reference: `media_1795432829635_4381baac.jpg`*
* **Hero Header:** `Plan a New Trip` / *`Let's explore more ✨`* with top scenic slideshow (`Trip to Ranchi`, `Trip to Maharashtra`, `Trip to Guwahati`).
* **Section 1 (Your Destination):** Predictive autocomplete search bar (`Hyderabad`, `Himachal Pradesh`, `Hampi`, `Goa`).
* **Section 2 (Trip Dates):** Interactive arrival date (`18 Oct 2026`) and return date (`21 Oct 2026`) modal pickers.
* **Section 3 (Travel Dynamic):** Segmented pill controls for `Solo`, `Duo`, and `Family`.
* **Section 4 (Budget Range):** 3 accordion tiers with unified sub-range pricing:
  * `Budget Friendly` (Baseline Saver ₹1.5k-₹2k, Mid Comfort ₹2k-₹2.8k, Plus Deluxe ₹2.8k-₹3.5k).
  * `Premium` (Baseline Saver ₹4.5k-₹6k, Mid Comfort ₹6k-₹8.5k, Plus Deluxe ₹8.5k-₹12k).
  * `Luxury` (Baseline Saver ₹15k-₹25k, Mid Comfort ₹25k-₹40k, Plus Deluxe ₹40k+).
* **Section 5 (Experience Choice):**
  * `1st Timer` (🎒 Illustrated Backpack) ➔ Tapping `Generate Itinerary` opens **Screen 3.0 (Live Itinerary)**.
  * `Experience Explorer` (🔭 Illustrated Binoculars) ➔ Tapping `Generate Itinerary` opens **Screen 5.0 (Experience Explorer)**.

### 3. Screen 3.0: Live Itinerary Screen
*Reference: `media_1795433517094_a6ae0db1.jpg`*
* **Top Navigation:** Back arrow `←` (returns to Dashboard), serif `Your Itinerary` title, Map cluster icon `🗺️`, red SOS badge `[ 🛡️ SOS ]`, and avatar.
* **Watercolor Hero Header:** *`Your trip, well planned ✨`* with warm terracotta brush stroke accent.
* **View Stays Top Banner:** `🛏️ View Stays` ("Find the best stays nearby >"). Tapping opens **Screen 4.0 (Curated Stays)**.
* **Floating Day Switcher:** Translucent segmented pills: `[ 📍 Day 1: Old City (Active) ]`, `[ Day 2: Western Forts ]`, `[ Day 3: Cyberabad ]`.
* **Continuous Timeline Rail:**
  * Stop 1: `Charminar & Laad Bazaar` (`🎫 ₹25 Entry`, `🕒 Dwell: 1.5 hrs`, `🟢 Open Now • Closes 5:30 PM`, `[ ⇅ Reorder ]`, `[ ⇄ Swap ]`, `[ ✕ Skip Stop ]`).
  * Midpoint Meal Break: `🍴 Feeling Hungry? (Within 500m)` with `Nimrah Cafe` (`₹50-₹100`) & `Shadab` (`₹100-₹200`).
  * Stop 2: `Chowmahalla Palace` (`🎫 ₹100 Entry`, `🕒 Dwell: 2 hrs`, `🟢 Open Now`, `[ ⇅ Reorder ]`, `[ ⇄ Swap ]`, `[ ✕ Skip Stop ]`).
  * Stop 3: `Laad Bazaar` (`🎫 Free Entry`, `🕒 Dwell: 1 hr`, `[ ⇅ Reorder ]`, `[ ⇄ Swap ]`, `[ ✕ Skip Stop ]`).
* **Floating Next Stop Banner:** `Next Stop Golconda Fort • 📍 ~ 20 min away >`.

### 4. Screen 4.0: Curated Stays Screen
*Reference: `media_1795435632279_6cd129b7.jpg`*
* **Top Navigation:** Back arrow `←` (returns to Screen 3.0), title `Curated Stays`, map icon, SOS pill, avatar.
* **Hero Banner:** *`Stay your way in Hyderabad ✨`* `📍`.
* **Filter Pills Row:** `[ 🛏️ All Stays ]`, `[ 💼 Budget-Friendly ]`, `[ 💎 Premium ]`, `[ ⭐ Exclusive ]`.
* **Verified Stays Feed:**
  * `Zostel Hyderabad` (⭐ 4.6 • 2.2 km from Charminar • Dorms & Rooms, Free Wi-Fi, Cafe, Eco-Friendly • ₹799 / night).
  * `Courtyard Hotel Hub` (⭐ 4.4 • 4.4 km from Charminar • AC Rooms, Pool, In-Room Dining, Free Wi-Fi • ₹1,999 / night).
  * `Taj Falaknuma Palace` (⭐ 4.8 • 7.1 km from Charminar • Luxury Stay, Heritage Property, Fine Dining, Spa • ₹12,999 / night).
* **Bottom Custom Stay Banner:** `🛏️✨ Looking for something specific? Explore more stay options for your trip. >`.

### 5. Screen 5.0: Experience Explorer Screen
*Reference: `media_1795436112703_bbb3352d.jpg`*
* **Top Header Row:** Charminar silhouette cutout art, `📍 Hyderabad ∨`, SOS button, avatar.
* **Title:** `Experience Explorer` / *`Plan by Yourself ✍️`* with paper airplane dashed trail.
* **Search Bar & Filter Modal:** Keyword search + settings button `🎛️`.
* **Horizontal Filter Pills:** `✨ All`, `Under ₹100`, `Under ₹200`, `Dwell < 1.5hr`, `Dwell < 2hr`, `Dwell < 3hr`.
* **2-Column Places Grid:**
  * Cards for Charminar, Golconda Fort, Laad Bazaar, Hussain Sagar Lake, Chowmahalla Palace, Qutb Shahi Tombs with rating, cost, dwell, and interactive `Add Plan +` button (toggles to `Added ✓`).
* **Sticky Bottom Assembly Bar:** `🧭 Generate My Itinerary (X Chosen) ➔` (Assembles selected custom spots into the Screen 3.0 Live Itinerary layout).

---

## 4. How to Test & Preview

1. **Direct Browser Open:** Double-click [index.html](file:///c:/Users/ANKITA/Documents/Ankita_BD-24-618/index.html) in your local file explorer to open it in Chrome, Edge, or Safari.
2. **Local Development Server (Optional):**
   ```powershell
   python -m http.server 8000
   ```
   Open `http://localhost:8000` in any web browser.
3. **GitHub Pages Deployment:** Enable GitHub Pages under **Settings ➔ Pages ➔ Deploy from branch `main` / `root`** to publish the interactive prototype live on the web!
