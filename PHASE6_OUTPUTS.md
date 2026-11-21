# Phase 6: Interactive Prototyping & Code Scaffolding (Master Outputs)

**Project Title:** Hyderabad & Telangana Hyper-Local, Budget-Intelligent Trip Planner  
**Creative Director & Product Lead:** NIFT Hyderabad  
**Technical Project Architect:** AGY  
**Lifecycle Stage:** Phase 6 — Interactive Prototyping, Code Scaffolding & Web Deployment  
**Document Purpose:** Master documentation of the production-ready interactive frontend prototype, application architecture, testable interaction flows, and deployment instructions.

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
│   └── style.css              # Phase 5 design tokens, soft-cornered cards, typography & ambient shadows
├── js/
│   ├── data.js                # Curated 45-places Hyderabad dataset, curated stays & meal spots
│   └── app.js                 # Navigation router, state manager, swap bottom sheet & spatial alert logic
├── PHASE1_OUTPUTS.md          # Locked Phase 1 deliverables
├── PHASE2_OUTPUTS.md          # Locked Phase 2 deliverables
├── PHASE3_OUTPUTS.md          # Locked Phase 3 deliverables
├── PHASE4_OUTPUTS.md          # Locked Phase 4 deliverables
├── PHASE5_OUTPUTS.md          # Locked Phase 5 deliverables
└── PHASE6_OUTPUTS.md          # Locked Phase 6 deliverables
```

---

## 3. Interactive Features & Screen Walkthrough

### 1. Screen 1.0: Open Dashboard (Home)
* **Live Itinerary Status Tile:** Highlights current active trip (*"NEXT: Chowmahalla Palace • 11:30 AM"*). Tapping it routes instantly to the live timeline.
* **Hero "PLAN A NEW TRIP >" Card:** Prominent action banner with smooth transition to the setup wizard.
* **Horizontal Recommendations:** Inspiring cards for Goa, Bali, and Benares showcasing the modular city system.
* **Emergency SOS:** Persistent top-bar pill accessible from anywhere.

### 2. Screen 2.0: Plan a New Trip (Single-Page Setup)
* **Traveler Dynamic Selector:** Instant switching between `Solo`, `Duo / Friends`, and `Family Unit`.
* **Expandable Two-Tier Budget Accordion:** 
  * `Budget-Friendly` (Backpacker, Standard, Comfortable numeric sub-ranges).
  * `Premium` (Boutique, Heritage, Signature sub-ranges).
  * `Exclusive Luxury` (Royal Suites, Palace Splendor).
* **Experience Pathway Routing:**
  * Selecting `[ 1st Timer ]` + `GENERATE` ➔ Builds a zero-transit-waste itinerary on **Screen 3.0**.
  * Selecting `[ Return Explorer ]` + `GENERATE` ➔ Opens the manual discovery catalog on **Screen 4.0**.

### 3. Screen 3.0: "Your Itinerary" Screen (Ground Navigation Companion)
* **Top Navigation Bar:** With Back button (`←`), serif page title `Your Itinerary`, Map icon (`🗺️`), red SOS pill (`[ 🛡️ SOS ]`), and circular profile avatar.
* **Hero Heritage Watercolor Backdrop:** Rich watercolor banner of Charminar & palace domes with script headline *"Your trip, well planned ✨"* and warm brush stroke accent.
* **Segmented Day Switcher Bar:** Floating pill row with `[ 📍 Day 1: Old City (Active) ]`, `[ Day 2: Western Forts ]`, and `[ Day 3: Cyberabad ]`.
* **Vertical Continuous Timeline Rail:** Numbered itinerary stops (`1`, `2`) with dwell times (`🕒 Dwell: 1.5 hrs`), ticket prices (`🎫 ₹25 Entry`), and live status (`🟢 Open Now • Closes 5:30 PM`).
* **Intra-Day Modification Controls:**
  * `[ ⇅ Reorder ]`: Dynamically shifts and swaps sequence order.
  * `[ ⇄ Swap ]`: Slides up bottom sheet with same-cluster alternatives (with Spatial Warning pop-up for cross-city distances).
  * `[ ✕ Skip Stop ]`: Drops the selected stop cleanly and updates the schedule.
* **Inline Food Radar Card:** *"Feeling Hungry? (Within 500m)"* with `View Options ›` and quick-access dining cards for Nimrah Cafe and Hotel Shadab.
* **Floating Next Stop Banner:** Elevated preview banner above bottom dock (`Next Stop Golconda Fort • 📍 ~ 20 min away ›`).

### 4. Screen 4.0: Explore Hyderabad (Return Explorer Catalog)
* **4-D Filter Pills:** Instant filtering by *Old City*, *Hitec City*, *Under ₹100*, and *Dwell < 2 hrs*.
* **Live Search:** Fast keyword search across monument names, zones, and descriptions.
* **2-Column Responsive Cards:** With bookmarking and `[ + Add to My Plan ]` toggles.
* **Sticky Bottom Assembly Bar:** Real-time counter of selected places with 1-tap assembly into the Live Itinerary.

### 5. Screen 5.0: Curated Stays (Accommodations Finder)
* **Tier Filters:** Filter stays by `Budget-Friendly`, `Premium`, or `Exclusive`.
* **Verified Lodging Cards:** Displaying cleanliness verification, distance from core itinerary clusters, and direct external links (`[ Official Site / Partner ➔ ]`) with zero in-app booking commissions.

---

## 4. How to Test & Preview

1. **Direct Browser Open:** Double-click [index.html](file:///c:/Users/ANKITA/Documents/Ankita_BD-24-618/index.html) in your local file explorer to open it in Chrome, Edge, or Safari.
2. **Local Development Server (Optional):**
   ```powershell
   python -m http.server 8000
   ```
   Open `http://localhost:8000` in any web browser.
3. **GitHub Pages Deployment:** Enable GitHub Pages under **Settings ➔ Pages ➔ Deploy from branch `main` / `root`** to publish the interactive prototype live on the web!
