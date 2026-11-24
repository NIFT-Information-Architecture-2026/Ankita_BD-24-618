# Phase 5: Visual Design System, Design Tokens & Editorial Styling

**Project Title:** Hyderabad & Telangana Hyper-Local, Budget-Intelligent Trip Planner  
**Creative Director & Product Lead:** Fashion Communication, NIFT Hyderabad  
**Technical Project Architect:** Antigravity (AGY)  
**Lifecycle Stage:** Phase 5 — Visual Design System, Design Tokens & Screen-by-Screen Aesthetic Alignment  
**File Location:** `c:\Users\ANKITA\Documents\Ankita_BD-24-618\PHASE5_OUTPUTS.md`  
**Core Reference for Screen 1.0:** `media_1795464756555_73df153e.jpg` (Official High-Fidelity Dashboard Artwork)

---

## 1. Executive Summary & Aesthetic Direction

In Phase 5, the structural wireframes and data models locked in Phase 4 are transformed into a **culturally resonant, high-fashion editorial visual system**. Rooted in Hyderabad’s rich material culture, the aesthetic merges the warmth of sunbaked Deccani sandstone, vintage Irani chai ceramics, and Nizami royal regalia with high-legibility modern mobile utility.

### Core Visual Principles:
1. **Warm Canvas Atmosphere**: Replacing stark white digital backdrops with a gentle, breathable, sun-drenched parchment wash (`#FAF5EE` to `#FDF8F3`).
2. **Deccani Terracotta Brand Anchor**: A vibrant, appetizing, high-contrast terracotta burnt-orange (`#DE6138`) that commands primary actions and active states.
3. **Dual-Voice Typography System**: Monumental, high-contrast serif headlines (*Playfair Display*) paired with clean, utilitarian, high-contrast geometric sans-serif metadata (*Plus Jakarta Sans*).
4. **Soft Tactile Materiality**: 24px pill-soft rounded corners, diffused ambient drop shadows (`rgba(189, 83, 56, 0.07)`), playful hand-drawn sticky sketch notes, and delicate botanical flourishes.

---

## 2. Cultural Moodboard & Semantic Color Token Matrix

### 2.1 Cultural Swatch Foundations

| Swatch Name | Inspiration & Cultural Context | Hex Code | Role in UI System |
| :--- | :--- | :--- | :--- |
| **Parchment Ivory** | Aged Basra pearl parchment & cotton khadi | `#FAF5EE` | App canvas background, viewport base |
| **Alabaster Surface** | Polished Chowmahalla marble courtyards | `#FFFFFF` | Primary elevated card bodies |
| **Deccani Terracotta** | Clay kulhads & roasted Irani chai spices | `#DE6138` | Primary CTA buttons, active timeline nodes, active tab icon |
| **Deep Charminar Stone** | Deep Bidri engraving charcoal & ironwork | `#1C2026` | Hero titles, monument headlines, high-contrast text |
| **Qutb Shahi Granite** | Weathered fortress stone & shaded stone arches | `#5C6068` | Secondary metadata, dwell time labels, inactive icons |
| **Sunlit Zari Gold** | Nizami gold leaf zari thread & tea sparkle | `#E5A83B` | Sparkle stars (`✨`), ratings, special status accents |
| **Peach Kulhad Wash** | Soft baked clay tea cup & watercolor sky | `#FDE8D8` | Active trip tag background, badge highlights |
| **Kraft Sketch Note** | Vintage travel journal tape & memo paper | `#FCF1CF` | Playful hand-drawn notes (*"Let's keep going!"*) |
| **Deccan Garden Herb** | Lush neem & tamarind palace garden leaves | `#68735C` | Subtle botanical corner leaf flourishes |

### 2.2 Semantic CSS Variables Token Matrix

```css
:root {
  /* Surface & Canvas Tokens */
  --bg-canvas: #FAF5EE;
  --bg-card: #FFFFFF;
  --bg-card-warm: #FFFDFB;
  --bg-hero-gradient: linear-gradient(180deg, #FDF8F3 0%, #FAF5EE 100%);
  --bg-promo-gradient: linear-gradient(135deg, #FBF2E8 0%, #F5DEC9 100%);

  /* Brand & Accent Tokens */
  --color-terracotta: #DE6138;
  --color-terracotta-dark: #C44D26;
  --color-terracotta-soft: #FDE8D8;
  --color-gold-sparkle: #E5A83B;
  --color-note-yellow: #FCF1CF;
  --color-note-border: rgba(235, 215, 160, 0.7);

  /* Typography Colors */
  --color-charcoal: #1C2026;
  --color-charcoal-sub: #2D3139;
  --color-slate: #5C6068;
  --color-slate-light: #6A707C;

  /* Line & Divider Tokens */
  --color-border: #E8E1D8;
  --color-border-card: rgba(226, 216, 204, 0.7);
  --color-stepper-inactive: #E8E1D9;
  --color-stepper-pending: #ECE5DC;

  /* Semantic Feedback Tokens */
  --color-status-open: #28724F;
  --color-status-open-soft: #EBF4EC;
  --color-sos-red: #DE5E43;
  --color-sos-red-dark: #C54E28;
}
```

---

## 3. Typographic Voice & Editorial Scale Hierarchy

### 3.1 Typographic Pairing Philosophy
* **Display & Emotional Voice (*Playfair Display* / Serif)**:
  Used exclusively for monumental headlines, emotional narrative quotes, and evocative titles (*"Explore Hyderabad"*, *"at your pace"*, *"Plan a New Trip"*). It gives the product the timeless editorial gravitas of a luxury fashion travel monograph.
* **Utility & Operational Voice (*Plus Jakarta Sans* / Geometric Sans)**:
  Used for fast, frictionless cognitive scanning: stepper labels, ticket tariffs, cluster titles, dwell times, and CTA buttons.

### 3.2 Typographic Hierarchy Scale

| Token Name | Font Family | Size / Line Height | Weight & Style | Tracking | Primary UI Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--type-hero-display` | Playfair Display | 31px / 36px | 700 Bold, Normal | -0.3px | Screen 1.0 main title: *"Explore Hyderabad"* |
| `--type-hero-cursive` | Playfair Display | 22px / 28px | 600 SemiBold, Italic | 0px | Hero subtitle: *"at your pace ✨"* |
| `--type-promo-title` | Playfair Display | 24px / 28px | 700 Bold, Normal | -0.2px | Promo card title: *"Plan a New Trip"* |
| `--type-section-title`| Plus Jakarta Sans| 17px / 22px | 700 Bold, Normal | 0px | Section header: *"🧭 Explore More"* |
| `--type-card-title` | Plus Jakarta Sans| 15px / 19px | 700 Bold, Normal | 0px | Active trip: *"Day 1: Old City Heritage Cluster"* |
| `--type-card-meta` | Plus Jakarta Sans| 11.5px / 16px| 600 SemiBold, Normal| 0px | *"📍 Next Stop: Chowmahalla Palace • 11:30 AM"* |
| `--type-btn-cta` | Plus Jakarta Sans| 13px / 16px | 700 Bold, Normal | +0.2px | Button labels: *"Open Itinerary ➔"* |
| `--type-badge-pill` | Plus Jakarta Sans| 11px / 14px | 700 Bold, Normal | 0px | Active trip pill: *"💼 Your Active Trip"* |
| `--type-stepper-label`| Plus Jakarta Sans| 8.5px / 10px | 600 SemiBold, Normal| 0px | Stepper stops: *"Charminar"*, *"Laad Bazaar"* |
| `--type-sketch-note` | Plus Jakarta Sans| 10px / 12px | 700 Bold, Normal | 0px | Post-it memo: *"Let's keep going!"* |

---

## 4. Tactile Surface Materiality & Microcopy Voice Matrix

### 4.1 Tactile Materiality & Elevation Tokens

```css
:root {
  /* Corner Radii */
  --radius-pill: 999px;
  --radius-card-outer: 24px;
  --radius-card-inner: 18px;
  --radius-city-card: 20px;
  --radius-note: 4px;

  /* Ambient Multi-Layer Shadows */
  --shadow-card: 0 10px 28px rgba(189, 83, 56, 0.07), 0 2px 6px rgba(0, 0, 0, 0.03);
  --shadow-btn-cta: 0 4px 14px rgba(222, 97, 56, 0.35);
  --shadow-city-card: 0 6px 16px rgba(0, 0, 0, 0.08);
  --shadow-note: 0 2px 6px rgba(0, 0, 0, 0.05);
}
```

### 4.2 Microcopy & Personality Voice Matrix
Rather than clinical, detached system prompts, the microcopy sounds like a warm, cultured local connoisseur:

| UI Touchpoint | Traditional / Robotic Copy | Our Warm Hyderabadi Editorial Microcopy |
| :--- | :--- | :--- |
| **Hero Title** | "Search Hyderabad attractions" | *"Explore Hyderabad at your pace ✨"* |
| **Trip Stepper Tag** | "Active route: Day 1" | *"💼 Your Active Trip"* |
| **Progress Stepper Note**| "Resume navigation" | *"╲ │ ╱ Let's keep going! ⤹"* (Handwritten sketch note) |
| **Next Step Pointer** | "Next destination: Chowmahalla"| *"📍 Next Stop: Chowmahalla Palace • 11:30 AM"* |
| **Itinerary Action** | "View Day 1 Map" | *"✈️ Open Itinerary ➔"* |
| **New Trip Entry** | "Create custom trip" | *"Plan a New Trip (with dashed paper plane trail)"* |
| **Destination Discovery**| "Popular Cities" | *"🧭 Explore More — View All ➔"* |

---

## 5. Screen 1.0 (Dashboard) Component-by-Component Spec

*Directly corresponding to Reference Image `media_1795464756555_73df153e.jpg`*

### 5.1 Top App Bar Row
* **Location Pill (`.location-dropdown-pill`)**:
  * Shape: Full pill (`border-radius: 999px`).
  * Surface: `#FFFFFF` with border `1px solid #E8E1D8` and shadow `0 2px 6px rgba(0,0,0,0.03)`.
  * Contents: Warm terracotta map pin (`📍`), bold charcoal text (`Hyderabad, Telangana`), subtle slate chevron (`∨`).
* **Emergency SOS Trigger (`.btn-sos-top`)**:
  * Surface: Rich terracotta-red gradient (`#DE5E43` to `#C54E28`), pill shaped.
  * Icon: White shield with cross (`🛡️`), text `SOS` (Bold white, 12px).
* **User Profile Avatar (`.user-avatar-small`)**:
  * Size: 32px diameter circle.
  * Border: 1.5px solid `#FFFFFF`, soft ambient drop shadow.

### 5.2 Hero Watercolor Vignette
* **Left Text Column**:
  * Title line 1: `Explore Hyderabad` (31px, Bold Serif `#1C2026`).
  * Title line 2: `at your pace ✨` (22px, Italic Serif `#1C2026`, gold sparkle `#E5A83B`).
  * Underline Accent: Subtle radial-gradient brushstroke curve (`125px x 6px`).
* **Right Architectural Illustration (`.plan-hero-landmark-bg`)**:
  * 168px wide architectural watercolor of the historic Charminar minarets.
  * Soft feathered elliptical radial mask seamlessly blending stone masonry into the warm parchment background with birds in flight.

### 5.3 Active Trip Card (`.home-ongoing-trip-card`)
* **Physical Shell**:
  * Border-radius: `24px`.
  * Surface: `#FFFFFF` with `1px solid rgba(226, 216, 204, 0.7)`.
  * Ambient shadow: `0 10px 28px rgba(189, 83, 56, 0.07)`.
* **Left Image Box (`.ongoing-trip-thumb-box`)**:
  * Width: 98px, Min-height: 168px, Border-radius: 18px.
  * Shows sunlight-bathed ornate stone arches of Chowmahalla Palace / Charminar gateway.
* **Right Information Column**:
  * Top Row:
    * Tag: `💼 Your Active Trip` on `#FDE8D8` peach pill.
    * Tilted Note: `#FCF1CF` sticky note rotated at `+3deg` with sketch rays `╲ │ ╱`, *"Let's keep going!"*, and curving pointer arrow.
  * Cluster Title: `Day 1: Old City Heritage Cluster` (15px Bold `#1C2026`).
  * Next Landmark: `📍 Next Stop: Chowmahalla Palace • 11:30 AM`.
  * Progress Stepper:
    * 4 nodes: `Charminar` (✓ done), `Laad Bazaar` (✓ done), `Chowmahalla Palace` (pending), `Evening Spot` (pending).
    * Active connecting line is solid terracotta `#DE6138`.
    * Inactive connecting lines are soft stone `#E8E1D9`.
  * Primary Action CTA:
    * Full-width pill button: `Open Itinerary ➔` with paper plane icon.
    * Background: `#DE6138`, hover `#C44D26`, shadow `0 4px 14px rgba(222, 97, 56, 0.35)`.

### 5.4 Plan a New Trip Promo Card (`.plan-new-trip-promo-banner`)
* **Physical Shell**:
  * Surface: `#FBF2E8` to `#F5DEC9` warm peach gradient.
  * Border-radius: `24px`, Border: `1px solid rgba(230, 205, 185, 0.7)`.
* **Left Elements**:
  * Gold sparkle icon `✨`.
  * Two-line title: `Plan a`<br>`New Trip` (24px Bold Serif).
  * Circular terracotta chevron button `( > )` (32px circle).
* **Center / Right Illustrations**:
  * Arched dashed flight path with small flying folded origami paper airplane.
  * Classic leather traveler suitcase with brass buckled straps, explorer fedora hat, and unfolded topographic world map.

### 5.5 Explore More Horizontal Carousel (`.explore-more-section`)
* **Header**: Circular terracotta compass badge (`🧭`), title `Explore More`, and `View All ➔` link.
* **Cards**:
  * Size: 126px width x 154px height, `20px` border radius.
  * Destinations: `📍 Ranchi`, `📍 Lucknow`, `📍 Mumbai`, `📍 Varanasi`.
  * Styling: Deep photo imagery with bottom gradient shadow overlay and crisp white pin labels.

### 5.6 Fixed Dock Navigation Bar (`.bottom-tab-bar`)
* **Frosted Surface**: 64px height, `rgba(255, 253, 250, 0.94)` with `backdrop-filter: blur(20px)`.
* **Tab Dividers**: Subtle vertical hairline dividers (`1px x 24px rgba(216, 205, 192, 0.55)`) separating each tab.
* **Active Accent**: Active tab (`Home`) glows in vibrant `#DE6138` with filled home glyph.
* **Botanical Accents**: Delicate neem leaf branch illustrations subtly framing the bottom corners (`🌿`).
* **iOS Home Indicator**: 134px x 5px dark pill centered at the bottom of the device shell.

---

## 6. Screen 2.0 (Plan a New Trip) Component-by-Component Spec

*Directly corresponding to Reference Image `media_1795432829635_4381baac.jpg`*

### 6.1 Top Bar & Hero Vignette
* **Header**: Seamless header row identical to Screen 1.0 with location pill (`📍 Hyderabad, Telangana ∨`), emergency SOS button, and circular user avatar.
* **Hero Headline**:
  * Title line 1: `Plan a New Trip` (Playfair Display 31px, Bold Serif `#1C2026`).
  * Title line 2: `Let's explore more ✨` (Playfair Display 22px, Italic Serif `#1C2026`, gold sparkle `#E5A83B`).
  * Accent: Brushstroke radial curve underneath.
  * Right: Charminar watercolor illustration backdrop with soft feathered mask.

### 6.2 Master Planning Container (`.planning-master-container`)
* **Physical Shell**:
  * Surface: `#FFFFFF` with `1px solid rgba(226, 216, 204, 0.7)` and 24px border radius.
  * Ambient Shadow: `0 8px 24px rgba(60, 40, 20, 0.06)`.
  * Position: Relative, housing the `.card-flight-trail` dashed airplane trail at the top-right corner.
* **Section 1: Destination Search Bar (`.destination-search-box`)**:
  * Capsule input pill with `border-radius: 999px`, background `#FAF2EA`, border `1px solid #E8DCCF`.
  * Left icon: `🔍`, Right icon: `✈️`.
  * Typography: 13px SemiBold, `#1C2026`, placeholder: *"Where do you want to go?"*.
* **Section 2: Trip Dates (`.trip-dates-pair-row`)**:
  * Two side-by-side rounded button pills: `[ 📅 Arrival Date › ]` and `[ 📅 Return Date › ]`.
  * Surface: `#FAF8F5`, border `1px solid #E8E1D8`, right chevron `›`.
* **Section 3: Travel Dynamic (`.dynamic-toggle-grid`)**:
  * 3 segmented selector cards: `👤 Solo`, `👥 Duo`, `👨‍👩‍👧‍👦 Family`.
  * Active state: Solid white card with vibrant terracotta border (`#DE6138`), terracotta text, and subtle ambient lift shadow.
* **Section 4: Budget Range (`.budget-tier-container-stack`)**:
  * 3 accordion tiers:
    1. `👛 Budget Friendly`: Sub-ranges Baseline Saver (`₹1,500 – ₹2,000 / day`), Mid Comfort (`₹2,000 – ₹2,800 / day`), Plus Deluxe (`₹2,800 – ₹3,500 / day`).
    2. `👑 Premium`: Sub-ranges (`₹4,500 – ₹6,000 / day`, `₹6,000 – ₹8,500 / day`, `₹8,500 – ₹12,000 / day`).
    3. `💎 Luxury`: Sub-ranges (`₹15,000 – ₹25,000 / day`, `₹25,000 – ₹40,000 / day`, `₹40,000+ / day`).
  * Styling: Rounded container with chevron arrow `›`, expandable sub-range pills highlighting selected tariff.
* **Section 5: Experience Choice (`.experience-illustrations-grid`)**:
  * Card 1: `🎒 1st Timer`
    * Square peach illustration box (`#FDE8DE`, border `#F5CEBC`, yellow backpack `🎒`).
    * Radio circle at top-right.
    * Heading: `1st Timer`, Subtitle: *"A perfect start to your journey!"*.
  * Card 2: `🔭 Experience Explorer`
    * Square lavender illustration box (`#ECE6F8`, border `#DCD0F2`, blue binoculars `🔭`).
    * Radio circle at top-right.
    * Heading: `Experience Explorer`, Subtitle: *"Discover more, go deeper!"*.
* **Primary CTA Button (`.btn-generate-itinerary-hero`)**:
  * Full-width terracotta pill (`#DE6138`, hover `#C44D26`, shadow `0 4px 14px rgba(189, 83, 56, 0.35)`).
  * Left sketch rays: `╲ │ ╱`.
  * Icon: Paper airplane `✈️`.
  * Label: `Generate Itinerary ➔`.
  * Right sketch rays: `╲ │ ╱`.

---

## 7. Screen 3.0 (Live Itinerary — "Your Itinerary") Component-by-Component Spec

*Directly corresponding to Reference Image `media_1795433517094_a6ae0db1.jpg`*

### 7.1 Top Navigation & Hero Banner
* **Navigation Header**:
  * Back arrow: `←` (left).
  * Title: `Your Itinerary` (Playfair Display 22px Bold Serif).
  * Right actions: Folded map glyph (`🗺️`), terracotta SOS pill (`+ SOS`), and circular user avatar.
* **Hero Banner (`.itinerary-hero-banner`)**:
  * Cursive quote: *"Your trip, well planned ✨"* (Playfair Display italic serif).
  * Watercolor Charminar minaret backdrop and terracotta pin accent (`📍`).

### 7.2 Stays Quick-Access Banner (`.view-stays-top-banner`)
* Oval hotel thumbnail on left (`50px x 50px`, rounded corners `14px`).
* Title: `🛏️ View Stays`, Subtitle: *"Find the best stays nearby"*.
* Action: Right chevron `›`. Tapping transitions smoothly to Screen 4.0 (Curated Stays).

### 7.3 Day Switcher Segmented Pills (`.itinerary-days-pill-row`)
* Horizontal scroll of rounded day pills:
  * Active pill: Solid terracotta `#DE6138` with white text (`📍 Day 1: Old City (Active)`).
  * Inactive pills: Soft cream `#FAF8F5`, border `1px solid #E8E1D8`, dark text (`Day 2: Western Forts`, `Day 3: Cyberabad`).

### 7.4 Continuous Vertical Timeline Rail & Stop Cards
* **Left Continuous Rail (`.itinerary-timeline-rail`)**:
  * Continuous 3px solid terracotta vertical spine line connecting all stops.
  * Circular node badges (`(1)`, `(2)`, `(3)`) in solid terracotta with crisp white numerals.
* **Stop Card Body (`.itin-stop-card`)**:
  * High-polish white card with 20px border radius, subtle drop shadow.
  * Monument photograph with rounded corners (`14px`).
  * Badges row: `🎫 ₹25 Entry` pill and `🕒 Dwell: 1.5 hrs` pill.
  * Monument Title: e.g., `Golconda Fort` (Playfair Display 16px).
  * Real-time status: `🟢 Open Now • Closes 5:30 PM`.
  * Micro-action buttons:
    * `[ ⇅ Reorder ]` (tap to shift stop position up/down).
    * `[ ⇄ Swap ]` (triggers bottom sheet modal with same-cluster alternatives < 1.5 km).
    * `[ ✕ Skip Stop ]` (marks stop skipped, recalculating remaining day dwell budget).
* **Contextual Food Radar Card (`.itin-food-radar-card`)**:
  * Header: `🍴 Feeling Hungry? (Within 500m)` with `View Options ›`.
  * Horizontal scroll of verified authentic local eateries (e.g., `Nimrah Cafe & Bakery`, `Hotel Shadab`) with ratings, price range, and signature dishes.

### 7.5 Floating Next Stop Banner
* Elevated terracotta bottom pill floating over the viewport:
  * `Next Stop: Golconda Fort • ~ 20 min away ›`.

---

## 8. Screen 4.0 (Curated Stays) Component-by-Component Spec

*Directly corresponding to Reference Image `media_1795435632279_6cd129b7.jpg`*

### 8.1 Header & Hero
* **Navigation Header**: `← Curated Stays`, folded map glyph (`🗺️`), `+ SOS`, and user avatar.
* **Hero Banner**: *"Stay your way in Hyderabad ✨"* in Playfair Display italic serif, terracotta pin accent (`📍`), and Charminar watercolor watermark.

### 8.2 Horizontal Stay Tier Filter Chips (`.stays-filter-scroll-row`)
* Single-select filter pills in horizontal scroll:
  1. `[ 🛏️ All Stays ]` (Active: Solid terracotta `#DE6138`, white text).
  2. `[ 💼 Budget-Friendly ]` (Cream pill `#FFF`, border `#E8E1D8`).
  3. `[ 💎 Premium ]` (Cream pill `#FFF`, border `#E8E1D8`).
  4. `[ ⭐ Exclusive ]` (Cream pill `#FFF`, border `#E8E1D8`).

### 8.3 Stay Cards Feed (`.stay-listing-card`)
* High-fidelity hotel listing cards:
  * Photo Slider: 165px height, rounded corners `16px`, with photo pagination dots (`.stay-dots-indicator`).
  * Rating Badge: Floating glassmorphic pill at top-right: `⭐ 4.6 (128 reviews)`.
  * Name & Location: e.g., `Zostel Hyderabad` or `Taj Falaknuma Palace`, location subtitle `📍 Banjara Hills • 2.1 km from center`.
  * 2x2 Amenity Chips: `[ 📶 High-speed WiFi ]`, `[ ❄️ AC ]`, `[ 🍳 Breakfast Included ]`, `[ 🏊 Pool ]`.
  * Price & Booking: `₹799 / night` (or `₹12,999 / night` for exclusive tier) with `View Details →` terracotta CTA.

### 8.4 Bottom Bespoke Concierge Banner (`.custom-stays-bottom-banner`)
* Warm peach container (`#FDF2E9`, border `#F6D8C2`, border-radius `20px`):
  * Left: `🛏️✨` icon, title *"Looking for something specific?"*, subtitle *"Explore more stay options for your trip."*.
  * Right: Terracotta arrow `›`.

---

## 9. Screen 5.0 (Experience Explorer — Self-Planner) Component-by-Component Spec

*Directly corresponding to Reference Image `media_1795436112703_bbb3352d.jpg`*

### 9.1 Top Bar & Architectural Landmark
* **Left Landmark Art (`.exp-header-landmark-left`)**: Soft sepia watercolor vignette of Charminar minarets in the top-left background.
* **Header Row**: Back button (`←`), location dropdown pill (`📍 Hyderabad ∨`), `+ SOS` pill, avatar.

### 9.2 Hero Headline & Looping Airplane Vector
* **Headline**: `Experience Explorer` (Playfair Display 24px Bold Serif).
* **Script Subtitle**: `Plan by Yourself ✍️` (Playfair Display italic serif with quill pen emoji).
* **Flight Trail (`.exp-paper-plane-trail`)**: Looping dotted terracotta trail with flying paper plane (`- - - ✈️`).

### 9.3 Search Bar & Filter Controls
* **Search Input (`.exp-search-bar-wrap`)**:
  * Pill input: `🔍 Search for places...` (`#FFFFFF`, border `#E8E1D8`, border-radius `999px`).
  * Filter Modal Button (`.exp-filter-modal-btn`): Circular button with sliders glyph (`🎛️`).
* **Filter Chips Row (`.exp-filter-scroll-row`)**:
  * `✨ All` (Solid terracotta active).
  * `Under ₹100`, `Under ₹200`, `Dwell < 1.5hr`, `Dwell < 2hr`, `Dwell < 3hr`.

### 9.4 2-Column Places Grid (`.exp-places-2col-grid`)
* Exact visual order matching the reference specification:
  1. `Charminar` (★ 4.7 • 🏷️ ₹50 • 🕒 ~1 hr)
  2. `Golconda Fort` (★ 4.6 • 🏷️ ₹25 • 🕒 ~1.5 hrs)
  3. `Laad Bazaar` (★ 4.5 • 🏷️ ₹50 • 🕒 ~2 hrs)
  4. `Hussain Sagar Lake` (★ 4.6 • 🏷️ ₹20 • 🕒 ~1.5 hrs)
  5. `Chowmahalla Palace` (★ 4.7 • 🏷️ ₹100 • 🕒 ~1.5 hrs)
  6. `Qutb Shahi Tombs` (★ 4.5 • 🏷️ ₹30 • 🕒 ~1.5 hrs)
  7. `Taramati Baradari` (★ 4.4 • 🏷️ Free • 🕒 ~1.5 hrs)
  8. `Durgam Cheruvu Lake` (★ 4.6 • 🏷️ Free • 🕒 ~2 hrs)
  9. `Raidurg Skywalk` (★ 4.5 • 🏷️ Free • 🕒 ~1 hr)
  10. `Shilparamam Arts Village` (★ 4.5 • 🏷️ ₹60 • 🕒 ~2.5 hrs)
  11. `Mecca Masjid` (★ 4.6 • 🏷️ Free • 🕒 ~45 mins)
  12. `Badshahi Ashurkhana` (★ 4.5 • 🏷️ Free • 🕒 ~45 mins)
  13. `Mozamjahi Market` (★ 4.4 • 🏷️ Free • 🕒 ~1 hr)
  14. `Salar Jung Museum` (★ 4.6 • 🏷️ ₹50 • 🕒 ~2.5 hrs)
  15. `Birla Mandir` (★ 4.7 • 🏷️ Free • 🕒 ~1.5 hrs)
  16. `Maula Ali Hill` (★ 4.6 • 🏷️ Free • 🕒 ~2 hrs)
  17. `Paigah Tombs` (★ 4.4 • 🏷️ Free • 🕒 ~1 hr)
  18. `Ramoji Film City` (★ 4.6 • 🏷️ ₹1,350 • 🕒 Full Day)
* **Place Card Tactile Styling**:
  * Rounded container with 18px radius, white surface, subtle drop shadow.
  * Photo thumbnail (`105px` height, rounded top corners).
  * Place name in bold serif (`13px`), rating in bold dark slate.
  * Meta row: Price and dwell duration.
  * **Add Button (`.btn-add-place-plan`)**:
    * Unselected: Soft peach-terracotta pill (`#F4C4BA`, border `#F0BCB1`, text `#4A2B24`, label: `Add Plan +`).
    * Selected / Added: Solid terracotta pill (`#DE6138`, white text, label: `✓ Added`).

### 9.5 Sticky Itinerary Generation CTA
* Sticky bottom bar: `🧭 Generate My Itinerary (X Chosen) ➔` (`.btn-exp-generate-cta` / `.exp-sticky-itinerary-cta`).
* Respects user-selected places strictly without adding unauthorized external stops. Clubs places intelligently by geographical micro-clusters (Old City, Western Forts, Cyberabad).

---

## 10. Master Verification & Git Sync Matrix

| Screen | Reference Image ID | HTML Markup Sync | CSS Styling Sync | Interactive JS Handlers |
| :--- | :--- | :---: | :---: | :---: |
| **Screen 1.0: Dashboard** | `media_1795464756555_73df153e.jpg` | **Verified** | **Verified** | **Verified** |
| **Screen 2.0: Plan A New Trip** | `media_1795432829635_4381baac.jpg` | **Verified** | **Verified** | **Verified** |
| **Screen 3.0: Live Itinerary** | `media_1795433517094_a6ae0db1.jpg` | **Verified** | **Verified** | **Verified** |
| **Screen 4.0: Curated Stays** | `media_1795435632279_6cd129b7.jpg` | **Verified** | **Verified** | **Verified** |
| **Screen 5.0: Experience Explorer** | `media_1795436112703_bbb3352d.jpg` | **Verified** | **Verified** | **Verified** |

*All 5 screens faithfully reproduce the exact visual identity, aesthetic language, typography, color palette, spacing, proportions, component styling, imagery, visual hierarchy, and tactile surface qualities shown in the user's reference screenshots.*
