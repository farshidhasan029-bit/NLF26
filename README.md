# National Language Fest 2026 (NLF '26 at BAU) - Official Homepage

Welcome to the official web portal for the **National Language Fest 2026 (NLF '26)**, hosted by the **Bangladesh Agricultural University Language Club (BAULC)** at **BAU, Mymensingh**.

This website has been designed with a **simple, minimal, modern, and accessible** aesthetic modeled directly after the reference website: [iubat.ac.bd/icpc](https://iubat.ac.bd/icpc/).

---

## 🎨 Design & Layout Architecture (Human-Designed Academic Literature Fest)

1. **Single Sleek Sticky Navigation (`#navbar`)**:
   - Single compact 64px sticky navbar with subtle dark teal glass (`backdrop-blur-md`).
   - Integrated dual emblems (**BAULC crest** and **BAU university crest**).
   - Clean modern sans navigation links (*About*, *Timeline*, *Location*, *Segments*, *Registration*, *Contact*) in medium-weight `Inter`.
   - High-contrast solid `.btn-gold` button (`REGISTER`).

2. **Constant Multilingual Background**:
   - Fixed high-resolution background artwork (`assets/images/language-bg.jpg`) applied across the entire page body (`background-attachment: fixed`).
   - Ambient dark-teal radial gradient ensuring the glowing letters (`A`, `ক`, `অ`, `ف`, `अ`) and light beams remain visible while maintaining optimal contrast for reading.

3. **Hero Section (`#hero`)**:
   - **Left**: Official event badge (`NATIONAL FESTIVAL • NOVEMBER 2026 • BAU MYMENSINGH`), massive `Bebas Neue` display headline (`NATIONAL LANGUAGE FEST / BAU MYMENSINGH 2026`), high-readability overview, solid action buttons (`[ REGISTER ]` and `[ VIEW TIMELINE ]`), and clean inline metadata.
   - **Right**: Elegant event countdown card (live days, hours, minutes, seconds) with subtle translucent glass and solid `Register for Fest` CTA button. Free of any terminal, pseudo-code, or faux-window frames.

4. **Patrons & Institutional Partners (`#partners`)**:
   - Positioned as a dedicated, high-prestige partner strip directly below the Hero section.
   - Showcases Academic Patron (**BAU Mymensingh**), Host (**BAULC**), **Ministry of Education**, **National Youth Forum**, and **Campus Media Network** alongside a "Partner with NLF '26" contact link.

5. **About Section (`#about`)**:
   - 4-stat metric cards (`1,500+` Participants, `10+` Segments, `50+` Universities, `2 Days` Gala) with smooth count-up animation on scroll.
   - Side-by-side cards highlighting the multilingual arena scope and BAULC's founding mission at BAU Mymensingh.

6. **Event Timeline (`#timeline`)**:
   - Modeled directly after the official BAULC festival poster.
   - Clean paired schedule rows with subtle translucent surfaces.
   - Elegant midday refreshment break divider.

7. **Festival Location (`#location`)**:
   - Architectural venue showcase covering Agronomy Gallery, Horticulture Gallery, Plant Pathology Gallery, and the BAU Central Auditorium main stage.

8. **Flagship Competition Segments (`#segments`)**:
   - 3-column clean cards for the 6 official tracks:
     1. Track 01: Bangla Shahitto & Olympiad
     2. Track 02: National Spelling Bee
     3. Track 03: Extempore Speech & Oratory
     4. Track 04: Creative Writing & Recitation
     5. Track 05: Linguistics & Literature Quiz
     6. Track 06: Translation Challenge

9. **Registration Info (`#registration`)**:
   - Clean 4-step milestone progression (`01` Select Segments, `02` Complete Profile, `03` Submit & Verify, `04` Receive Pass).
   - Academic eligibility checklist with green checkmark markers.
   - Direct portal button (`Open Registration Portal`) and prospectus download link.

10. **Contact & Official Footer (`#contact`, `footer`)**:
    - 3 clean contact cards (Venue, Email, Helpline Desk).
    - Official BAULC crest, emblem, and club motto:
      `EXPLORE THE WORLD OF LANGUAGE`
      `BANGLADESH AGRICULTURAL UNIVERSITY LANGUAGE CLUB`
    - Quick navigation links, social media profiles, and copyright notice.

---

## 🚀 How to Run & Preview Locally

Run Python's built-in HTTP server:

```bash
# Navigate to directory
cd "/Users/farshidhasan/Downloads/BAULC(NLF)"

# Start server
python3 -m http.server 8000
```

Open your browser at:
👉 **`http://localhost:8000`**

Or open `index.html` directly in any web browser!

---

## 📁 File Structure

```
BAULC(NLF)/
├── index.html                  # Minimalist homepage matching iubat.ac.bd/icpc
├── css/
│   └── styles.css              # Custom styling, patterns, tickers & transitions
├── js/
│   └── main.js                 # Countdown, scroll reveal, navbar & stat animations
├── assets/
│   ├── images/
│   │   └── language-bg.jpg     # User-provided festival background photo
│   └── logos/
│       ├── baulc_logo.jpg      # Official BAULC logo
│       ├── bau_logo.webp       # Official BAU university emblem
│       └── nlf_logo.svg        # NLF '26 vector logo
└── README.md                   # Documentation
```
