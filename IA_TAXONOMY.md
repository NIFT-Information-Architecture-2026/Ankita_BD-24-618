# Phase 3: Information Architecture & Taxonomy Specification

**Project Title:** Hyderabad & Telangana Hyper-Local, Budget-Intelligent Trip Planner  
**Role:** Creative Director & Product Lead (NIFT Hyderabad) | Technical Project Architect (AGY)  
**Lifecycle Stage:** Phase 3 — Information Architecture & Taxonomy (Set 1 Venue Cards Edition)

---

## 1. Card Architecture Strategy

Based on product steering, we are focusing directly on **Set 1: Individual Venue Cards** as our primary structural unit. 

Instead of forcing artificial category buckets, every place in Hyderabad is presented as a rich, self-contained **Venue Card**. Travelers can sort, view, and organize these cards based on their own priorities, budget tier, and location.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PHASE 3 CARD WORKFLOW ORDER                       │
├───────────────────────────────────────┬────────────────────────────────┤
│ STEP 1: SET 1 VENUE CARDS (CURRENT)   │ STEP 2: SET 3 NAVIGATION CARDS │
│ • Individual Place Data Architecture  │ • Main Mobile App Screens      │
│ • Component Hierarchy & Metadata      │ • Bottom Navigation Bar Tabs   │
└───────────────────────────────────────┴────────────────────────────────┘
```

---

## 2. SET 1: Individual Venue Card Anatomy & Data Fields

Each Venue Card is designed for high glanceability on mobile screens and contains 8 structured data fields:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        INDIVIDUAL VENUE CARD ANATOMY                   │
├────────────────────────────────────────────────────────────────────────┤
│ [PHOTO HEADER: High-Res Image of Spot]                                 │
│                                                                        │
│ 📍 Venue Title: Charminar & Laad Bazaar Heritage Walk                  │
│ 🏷️ Budget Tier Badges: [Easy Trip] [Premium] [Luxury]                  │
│ ⏱️ Dwell Time: 1.5 Hours (90 Mins)                                     │
│ ⏰ Recommended Visit Hours: 08:00 AM - 10:30 AM (Best Light/Low Rush)   │
│ 🚶 Transit Distance: 10 Min Walk from Previous Stop (0.8 km)           │
│ 💰 Ticket Price & Payments: ₹25 (Indian) | Accepts UPI & Cash           │
│ 💡 Local Insider Tip: Visit Nimrah Cafe right opposite for Irani Chai  │
│ 🏨 Hygienic Accommodation Note: Clean Hostels/Stays within 1 km       │
└────────────────────────────────────────────────────────────────────────┘
```

### Detailed Field Breakdown:

1. **Visual Header (Image Component):** High-resolution hero image showcasing the spot's aesthetic character.
2. **Venue Name & Regional Tag:** Official name + micro-neighborhood zone (e.g., *Charminar, Old City*).
3. **Budget Tier Suitability Badges:** Indicates which budget tiers this spot fits into (`[Easy]`, `[Premium]`, `[Luxury]`).
4. **Dwell Time Estimate (`dwell_time_mins`):** Exact recommended time to spend at the venue (e.g., 45 mins, 1.5 hrs, 3 hrs).
5. **Recommended Visit Window:** Optimal time of day to visit (e.g., *08:00 AM – 10:30 AM* for cool morning light and low crowds).
6. **Transit Distance & Duration:** Estimated distance/duration from previous stop by walking, metro, or car/auto.
7. **Ticket Cost & Accepted Payment Modes:** Precise entry fees + payment methods accepted (Cash, UPI, Card).
8. **Contextual Insider Tip & Hygiene Note:** Proximity notes for food, rest spots, and clean stay radius.

---

## 3. Sample Set 1 Venue Cards (Hyderabad Reference Dataset)

### Card 1.1: Heritage Monument Anchor
* **Title:** Golconda Fort Monolithic Citadel Walk
* **Zone:** Golconda / Western Heritage Zone
* **Budget Tiers:** `[Easy]` `[Premium]` `[Luxury]`
* **Dwell Time:** 3 Hours (180 Mins)
* **Recommended Visit Window:** 08:30 AM – 11:30 AM (Morning) or 04:00 PM – 06:30 PM (Sound & Light Show)
* **Ticket Cost:** ₹25 (Indian) / ₹300 (Foreign) | Payment Modes: UPI, Cash, Online
* **Transit Note:** 15 Min Auto / Car from Qutb Shahi Tombs (3.2 km)
* **Insider Tip:** Wear comfortable walking shoes; carry water. Sound & light show starts at 6:30 PM.

### Card 1.2: Green & Scenic Escape
* **Title:** KBR National Park Nature Trail
* **Zone:** Jubilee Hills
* **Budget Tiers:** `[Easy]` `[Premium]` `[Luxury]`
* **Dwell Time:** 1.5 Hours (90 Mins)
* **Recommended Visit Window:** 06:00 AM – 09:00 AM (Cool Morning Air)
* **Ticket Cost:** ₹40 (Adult) / ₹20 (Child) | Payment Modes: Cash, UPI
* **Transit Note:** 5 Min Walk from Jubilee Hills Checkpost Metro Station
* **Insider Tip:** Ideal quiet walking trail for morning bird watching. Clean hygienic cafes nearby.

### Card 1.3: Iconic Local Culinary Spot
* **Title:** Nimrah Cafe & Bakery (Irani Chai & Osmania Biscuits)
* **Zone:** Old City (Opposite Charminar)
* **Budget Tiers:** `[Easy]` `[Premium]` `[Luxury]`
* **Dwell Time:** 30 Mins
* **Recommended Visit Window:** 07:00 AM – 09:00 AM or 05:00 PM – 07:00 PM
* **Ticket/Food Cost:** ₹20 – ₹100 per person | Payment Modes: Cash, UPI
* **Transit Note:** 1 Min Walk from Charminar monument exit
* **Insider Tip:** Grab fresh hot Osmania biscuits paired with Irani chai while viewing Charminar.

---

## 4. Next Step: Set 3 Navigation Cards (Main Mobile Screens)

Once Set 1 Venue Card architecture is reviewed and locked, we will move directly to **Set 3 Navigation Cards** to define the 4 primary mobile screens (`[Plan Trip]`, `[My Day Pass]`, `[Explore Spots]`, `[Saved]`).
