# Phase 3: Information Architecture & Taxonomy Specification

**Project Title:** Hyderabad & Telangana Hyper-Local, Budget-Intelligent Trip Planner  
**Role:** Creative Director & Product Lead (NIFT Hyderabad) | Technical Project Architect (AGY)  
**Lifecycle Stage:** Phase 3 — Information Architecture & Taxonomy (Streamlined Venue Cards Edition)

---

## 1. Card Architecture Strategy

Based on product steering, we have refined **Set 1: Individual Venue Cards** to be strictly objective, factual, and clutter-free. 

* **Dropped Fields:** `Transit Info` (belongs dynamically between itinerary stops, not on static place cards) and `Insider Tip` (removed to preserve a clean, pragmatic utility aesthetic).
* **Core Philosophy:** Clean, highly glanceable, factual data cards that travelers can evaluate and sort independently.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PHASE 3 CARD WORKFLOW ORDER                       │
├───────────────────────────────────────┬────────────────────────────────┤
│ STEP 1: SET 1 VENUE CARDS (CURRENT)   │ STEP 2: SET 3 NAVIGATION CARDS │
│ • Factual Place Data Architecture     │ • Main Mobile App Screens      │
│ • Streamlined Component Hierarchy     │ • Bottom Navigation Bar Tabs   │
└───────────────────────────────────────┴────────────────────────────────┘
```

---

## 2. SET 1: Streamlined Individual Venue Card Anatomy

Each Venue Card contains 6 focused, essential data fields:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   STREAMLINED INDIVIDUAL VENUE CARD                    │
├────────────────────────────────────────────────────────────────────────┤
│ [PHOTO HEADER: High-Res Image of Spot]                                 │
│                                                                        │
│ 📍 Venue Title: Charminar & Laad Bazaar Heritage Walk                  │
│ 🏷️ Budget Tier Badges: [Easy Trip] [Premium] [Luxury]                  │
│ ⏱️ Dwell Time: 1.5 Hours (90 Mins)                                     │
│ ⏰ Recommended Visit Hours: 08:00 AM - 10:30 AM (Best Light/Low Rush)   │
│ 💰 Ticket Price & Payments: ₹25 (Indian) | Accepts UPI & Cash           │
│ 🏨 Hygienic Stays Proximity: Clean Hostels/Stays within 1 km           │
└────────────────────────────────────────────────────────────────────────┘
```

### Detailed Field Breakdown:

1. **Visual Header (Image Component):** High-resolution hero image showcasing the spot.
2. **Venue Name & Regional Zone:** Official venue name and micro-neighborhood zone (e.g., *Charminar, Old City*).
3. **Budget Tier Badges:** Indicates which budget tiers this place fits (`[Easy]`, `[Premium]`, `[Luxury]`).
4. **Dwell Time Estimate (`dwell_time_mins`):** Recommended duration to spend at the venue (e.g., 45 mins, 1.5 hrs, 3 hrs).
5. **Recommended Visit Window / Operating Hours:** Best time of day to visit and general operational hours.
6. **Ticket Cost & Accepted Payment Modes:** Exact entry fee structure + payment methods accepted (Cash, UPI, Card).
7. **Hygienic Stays Proximity:** Direct indicator of verified clean and safe accommodation options nearby.

---

## 3. Sample Set 1 Venue Cards (Hyderabad Reference Dataset)

### Card 1.1: Heritage Monument Anchor
* **Title:** Golconda Fort Monolithic Citadel Walk
* **Zone:** Golconda / Western Heritage Zone
* **Budget Tiers:** `[Easy]` `[Premium]` `[Luxury]`
* **Dwell Time:** 3 Hours (180 Mins)
* **Recommended Visit Window:** 08:30 AM – 11:30 AM or 04:00 PM – 06:30 PM
* **Ticket Cost:** ₹25 (Indian) / ₹300 (Foreign) | Payment Modes: UPI, Cash, Online
* **Hygienic Stays Proximity:** Verified boutique hotels & heritage homestays within 3 km

### Card 1.2: Green & Scenic Escape
* **Title:** KBR National Park Nature Trail
* **Zone:** Jubilee Hills
* **Budget Tiers:** `[Easy]` `[Premium]` `[Luxury]`
* **Dwell Time:** 1.5 Hours (90 Mins)
* **Recommended Visit Window:** 06:00 AM – 09:00 AM
* **Ticket Cost:** ₹40 (Adult) / ₹20 (Child) | Payment Modes: Cash, UPI
* **Hygienic Stays Proximity:** Verified clean hotels and serviced apartments within 1.5 km

### Card 1.3: Iconic Local Culinary Spot
* **Title:** Nimrah Cafe & Bakery (Irani Chai & Osmania Biscuits)
* **Zone:** Old City (Opposite Charminar)
* **Budget Tiers:** `[Easy]` `[Premium]` `[Luxury]`
* **Dwell Time:** 30 Mins
* **Recommended Visit Window:** 07:00 AM – 09:00 AM or 05:00 PM – 07:00 PM
* **Price / Average Spend:** ₹20 – ₹100 per person | Payment Modes: Cash, UPI
* **Hygienic Stays Proximity:** Verified backpacker hostels & budget stays within 800m

---

## 4. Next Step: Set 3 Navigation Cards (Main Mobile Screens)

With Set 1 streamlined and locked, we proceed to **Set 3 Navigation Cards** to define the primary mobile app screens and bottom navigation bar tabs.
