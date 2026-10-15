# Master Visual Design System & Design Tokens (Phase 5)

**Project Title:** Hyper-Local, Budget-Intelligent Trip Planner  
**Creative Director & Product Lead:** NIFT Hyderabad  
**Technical Project Architect:** AGY  
**Lifecycle Stage:** Phase 5 — Visual Design System, Design Tokens & Component Styling  
**Aesthetic Core:** Dynamic City-Adaptive Theming • Hyderabad Heritage Edition  

---

## 1. Architectural Philosophy: The City-Adaptive Theming Engine

A core creative breakthrough of this application is its **Dynamic City-Adaptive Design Architecture**. 
Rather than forcing every destination into a generic, monotonous interface, the app’s visual soul transforms to reflect the sensory atmosphere, architecture, and cultural heritage of the selected city:

```
                  ┌──────────────────────────────────────────────┐
                  │      CORE FUNCTIONAL UI FRAMEWORK            │
                  │   (Navigation, 8pt Grid, Micro-Clusters)    │
                  └──────────────────────┬───────────────────────┘
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 ▼                       ▼                       ▼
      ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
      │  HYDERABAD EDITION  │ │     GOA EDITION     │ │   BENARES EDITION   │
      │  (Active Focus)     │ │   (Future Theme)    │ │   (Future Theme)    │
      ├─────────────────────┤ ├─────────────────────┤ ├─────────────────────┤
      │ • Bidri Charcoal    │ │ • Coastal Ochre     │ │ • Temple Vermilion  │
      │ • Basra Pearl White │ │ • Seafoam Turquoise │ │ • Ghat Marigold     │
      │ • Nizami Zari Gold  │ │ • Terracotta Tile   │ │ • Sacred River Ash  │
      │ • Irani Terracotta  │ │ • Washed Linen      │ │ • Brass Bell Gold   │
      │ • Regal Serif + Sans│ │ • Modern Sans       │ │ • Classical Serif   │
      └─────────────────────┘ └─────────────────────┘ └─────────────────────┘
```

---

## 2. Hyderabad Edition: Color Palette & Semantic Tokens

The Hyderabad theme draws inspiration from the Nizam's pearl craftsmanship, the historic Bidriware metal inlays, the stucco filigree of royal arches, and the comforting warmth of an Old City Irani chai stall.

### 2.1 Thematic Brand Palette

| Token Name | Hex Code | Visual Swatch & Cultural Inspiration | Primary UI Usage |
| :--- | :--- | :--- | :--- |
| **`color-hyderabad-pearl`** | `#FAF8F5` | **Basra Pearl / Ivory** — Pure, luminous warmth of royal pearl markets. | App background, primary card surface, breathable whitespace. |
| **`color-hyderabad-charcoal`** | `#1C1D21` | **Bidri Charcoal** — Deep matte oxidized zinc from Telanganite Bidri craft. | Primary headings, prominent title typography, active bottom bar icons. |
| **`color-hyderabad-gold`** | `#C59B27` | **Nizami Zari Gold** — Warm, burnished metallic thread from Paigah courtyards. | Key primary accents, active state borders, bookmark icons, hero badge details. |
| **`color-hyderabad-terracotta`** | `#B85D36` | **Irani Chai Clay** — Earthy warmth of clay kulhads and Charminar baked brick. | Interactive CTA buttons, "Plan a New Trip" hero card gradient, meal radar tag. |
| **`color-hyderabad-stone`** | `#EBE7DF` | **Qutb Shahi Granite** — Weathered historic lime mortar & stone arches. | Subtle card borders, input borders, divider hairlines, secondary buttons. |
| **`color-hyderabad-slate`** | `#6E6D69` | **Deccan Basalt** — Balanced slate tone of boulder ridges and forts. | Secondary metadata (dwell times, ratings, distance labels, closed hours). |

---

### 2.2 Functional Semantic Tokens

| Semantic Token | Hex Code | Purpose & Component Association |
| :--- | :--- | :--- |
| **`color-status-open`** | `#2E7D32` | `🟢 Open Now` operational pill badge; indicates venue is accessible. |
| **`color-status-closed`** | `#C62828` | `🔴 Closed Today` operational safeguard badge (e.g., Salar Jung on Friday). |
| **`color-warning-spatial`** | `#D97706` | `⚠️ Spatial Advisory` warning banner when an intra-day swap creates excessive travel. |
| **`color-sos-emergency`** | `#DC2626` | Persistent `( SOS )` top-bar pill and instant emergency dispatch buttons. |
| **`color-shield-safety`** | `#1B4958` | `🛡️ Safety Shield [ON]` live tracking badge; reassuring Deccan teal. |
| **`color-budget-tier`** | `#4A5568` | Neutral, high-contrast chip for budget range sub-categories. |

---

## 3. Typography Scale & Hierarchy

To honor the Creative Director's vision, typography combines **cultural elegance** with **bulletproof utility**:
1. **Curatorial Headlines & Destination Names:** Classical, regal serif font (*Cormorant Garamond* / *Playfair Display*) that reflects historic architecture and editorial fashion layouts.
2. **Operational Data & UI Microcopy:** High-performance, crystal-clear geometric sans-serif (*Plus Jakarta Sans* / *Inter*) optimized for fast legibility of ticket prices, transit times, and buttons in direct sunlight.

### 3.1 Type Scale Specification

| Role | Font Family | Weight | Size (Mobile) | Line Height | Usage Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (Hero)** | Serif (*Cormorant*) | SemiBold (600) | `32px` | `38px` | *"Plan a New Trip"* |
| **Heading 1 (H1)** | Serif (*Cormorant*) | Bold (700) | `26px` | `32px` | *"Explore Hyderabad"* / *"Live Itinerary"* |
| **Heading 2 (H2)** | Serif (*Playfair*) | SemiBold (600) | `20px` | `26px` | *"Charminar & Laad Bazaar"* |
| **Heading 3 (H3)** | Sans-Serif (*Jakarta*) | SemiBold (600) | `16px` | `22px` | Sub-sections, Card headers, Modal titles |
| **Body Large** | Sans-Serif (*Jakarta*) | Regular (400) | `15px` | `22px` | Venue descriptions, curatorial commentary |
| **Body Medium** | Sans-Serif (*Jakarta*) | Regular (400) | `14px` | `20px` | Form inputs, dates, list items |
| **Body Small / Meta** | Sans-Serif (*Jakarta*) | Medium (500) | `12px` | `16px` | Dwell tags: `⏱️ 1.5 hrs`, `🎟️ ₹25 Entry` |
| **Overline / Badge** | Sans-Serif (*Jakarta*) | Bold (700) | `11px` | `14px` | All-caps labels: `LIVE NEXT`, `SOLO WANDERER` |
| **Data Monospace** | Monospace (*JetBrains*) | Medium (500) | `13px` | `18px` | Precise transit metrics: `12 min walk (900m)` |

---

## 4. Component Elevation & Ambient Shadows

As directed, cards feature **soft-cornered architecture with subtle ambient drop shadows**, replacing harsh flat outlines with tactile, layered depth.

### 4.1 Border Radii Tokens

| Token | Radius Value | Applied Components |
| :--- | :--- | :--- |
| **`radius-sm`** | `6px` | Status tags, open/closed pills, operational badges. |
| **`radius-md`** | `12px` | Buttons, text input fields, search bar, chips. |
| **`radius-lg`** | `18px` | Destination place cards, stays cards, meal radar tiles. |
| **`radius-xl`** | `24px` | Hero planning cards, dashboard action banners. |
| **`radius-sheet`** | `28px 28px 0 0` | Bottom sheets (`⇄ Swap Spot`, intra-day drawers). |

---

### 4.2 Elevation & Ambient Drop Shadow Tokens

| Token | CSS Box Shadow Value | Visual Sensation | Applied Elements |
| :--- | :--- | :--- | :--- |
| **`shadow-ambient-low`** | `0 2px 8px -2px rgba(28, 29, 33, 0.05), 0 1px 3px rgba(28, 29, 33, 0.03)` | Subtle ground float | Filter pills, utility buttons, search bar. |
| **`shadow-ambient-card`** | `0 10px 24px -4px rgba(28, 29, 33, 0.07), 0 2px 6px -1px rgba(28, 29, 33, 0.04)` | Soft, diffused natural sunlight elevation | Destination cards (Screen 3.0 & 4.0), Stays cards (Screen 5.0). |
| **`shadow-ambient-hero`** | `0 16px 36px -6px rgba(184, 93, 54, 0.18), 0 4px 12px -2px rgba(28, 29, 33, 0.06)` | Warm, luminous prominence | "Plan a New Trip" hero banner, SOS trigger pill. |
| **`shadow-ambient-sheet`**| `0 -12px 32px -4px rgba(28, 29, 33, 0.12)` | Ground overlay elevation | Intra-day swap bottom sheet, modal dialogs. |

---

## 5. Visual Component Styling Matrix

### 5.1 The Destination Card (Screen 3.0 & 4.0)
* **Background:** Solid `#FAF8F5` (Basra Pearl).
* **Border:** `1px solid rgba(28, 29, 33, 0.06)` for crisp edge definition against shadows.
* **Corner Radius:** `18px`.
* **Elevation:** `shadow-ambient-card`.
* **Image Treatment:** Aspect ratio `16:10` with soft top-corner radius (`17px 17px 0 0`), subtle gradient scrim at bottom for text contrast.
* **Badges:** Translucent frosted blur tags for `🟢 Open Now` and dwell times.

### 5.2 The Curated Stay Card (Screen 5.0)
* **Layout:** Clean horizontal or compact vertical orientation.
* **Cleanliness Badge:** Soft teal pill (`#E6F0F2` with `#1B4958` text): *"✨ Verified Sanitized"*.
* **CTA Button:** Deep Bidri Charcoal `#1C1D21` with crisp white text: `[ Book on Official Site / Agoda ➔ ]`, elevated with `shadow-ambient-low`.

### 5.3 The Meal Radar Inline Tile (Screen 3.0)
* **Background:** Soft warm tint `#F7EFE9` (Chai cream).
* **Border:** `1px solid rgba(184, 93, 54, 0.18)`.
* **Micro-Pills:** Price estimates formatted in clean monospace: `₹50 - ₹120`.

---

## 6. City Adaptation Engine: Future City Profiles

To demonstrate the versatility of our design architecture, here is how the design tokens dynamically morph when the user selects other Indian destinations:

| City Edition | Primary Accent | Background Surface | Text Tone | Cultural Font Pairing |
| :--- | :--- | :--- | :--- | :--- |
| **Hyderabad (Active)** | Nizami Zari Gold (`#C59B27`) + Chai Clay (`#B85D36`) | Basra Pearl (`#FAF8F5`) | Bidri Charcoal (`#1C1D21`) | Regal Serif (*Cormorant*) + *Jakarta Sans* |
| **Goa (Future)** | Seafoam Turquoise (`#2A9D8F`) + Sunset Ochre (`#F4A261`) | Washed Sand (`#F8F7F4`) | Deep Navy Slate (`#1A2530`) | Modern Grotesque (*Cabinet Grotesk*) + *Inter* |
| **Benares (Future)** | Ghat Terracotta (`#A4422B`) + Marigold Gold (`#E09F3E`) | Raw Cotton (`#FAF6F0`) | Sacred Ash (`#222120`) | Classical Book Serif (*EB Garamond*) + *Inter* |

---

## 7. Phase Gate Review & Next Steps

This visual design system encapsulates all styling decisions made by the Creative Director:
* Evocative, heritage-grounded Hyderabad palette.
* Extensible city-adaptive token architecture.
* Distinctive regal serif + modern sans-serif typography pairing.
* Soft-cornered, ambient-shadow card design language.

Ready to lock this into `PHASE5_OUTPUTS.md` and prepare for **Phase 6: Interactive Prototyping & Code Scaffolding**!
