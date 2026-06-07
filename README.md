# HelioGuard AI

**A NASA-data-powered AI dashboard that turns asteroid and space weather data into mathematical risk scores and mission briefings.**

[![Live Demo](https://img.shields.io/badge/demo-live-34d399?style=flat-square)](https://bebecpp.github.io/helioguard-ai/)
![Screenshot placeholder](docs/screenshot-placeholder.png)

> **Screenshot:** Add a full-page dashboard screenshot to `docs/screenshot-placeholder.png` before submitting to Stardance.

---

## Project Overview

HelioGuard AI is an educational space risk intelligence dashboard built for Hack Club Stardance. It fetches real NASA Near-Earth Object (NeoWs) data and NASA DONKI space weather events, applies transparent mathematical risk models, and generates rule-based mission briefings — all in a mission-control-style React interface.

**This project uses NASA public/open data. It is not an official NASA product or emergency alert system.**

---

## Premium Arcade Interface

HelioGuard AI now uses a premium arcade-inspired space interface with a landing page and detailed dashboard. The landing page introduces the mission visually, while the Launch App flow opens a more detailed educational dashboard for asteroid reports, risk formulas, space weather summaries, and NASA data sources.

---

## Visual Design Philosophy

HelioGuard AI uses a handcrafted pixel-art space mission interface to make real NASA public data more approachable for students. The design combines playful space visuals with serious risk modeling, so the project feels exciting without losing scientific clarity.

The interface is structured as a **mission learning lab**, not a generic dashboard:

1. **Hero Mission Launch** — split layout with orbit scene and live mission status
2. **Mission Path** — four-step educational flow (Scan → Calculate → Brief → Explore)
3. **Mission Risk Console** — instrument-panel HelioGuard Index with formula toggle
4. **ORBIT-01 Briefing Core** — character-driven AI briefing with crew takeaway
5. **Object Reports** — collectible-style asteroid cards with mission notes
6. **Space Weather Mission Log** — DONKI timeline with student explanations

Design highlights:

- Pixel starfield, Earth horizon, satellite signal pulse, orbit paths (CSS/SVG only)
- Student mode toggle for simpler copy
- Educational notes and tooltips on every major section
- Reduced motion support via `prefers-reduced-motion`

## Retro Arcade Redesign

The interface was redesigned to feel like a **90s pixel-art educational space arcade** — chunky HUD panels, Press Start 2P headings, VT323 terminal text, CRT scanlines, and blocky CSS/SVG sprites instead of modern SaaS polish. NASA asteroid and space weather data stay serious under the hood; the game-like shell makes risk scores and briefings more engaging for student explorers.

Key screen elements:

- **Arcade menu header** — pixel rocket logo, mission tabs, Launch App button
- **Hero game screen** — split layout with pixel Earth, rocket, asteroids, orbit trails
- **Mission Risk Console** — HelioGuard Index HUD with segmented pixel risk bars
- **ORBIT-01 Briefing Core** — purple terminal window with bot sprite and green status lines
- **Game item asteroid cards** — top 3 NEO reports with thick pixel borders
- **Student quest card** — pixel explorer character and Start Exploring CTA
- **Warning strip** — educational disclaimer in arcade alert style

The homepage is **compact and screenshot-ready** — no long scroll of raw NASA dumps.

---

## Why This Project Matters

Space threats — asteroid close approaches and solar storms — affect satellites, power grids, and aviation. NASA publishes open data, but it is often hard for students to interpret. HelioGuard AI bridges that gap with:

- Real NASA telemetry
- Explainable risk scores (not black-box AI)
- Plain-English mission briefings
- A polished demo suitable for research portfolios

---

## Core Features

| Feature | Description |
|---------|-------------|
| **HelioGuard Index** | Composite 0–100 risk score combining asteroid and space weather data |
| **Asteroid Watch** | Top NEOs ranked by calculated risk score with NASA JPL links |
| **Space Weather Monitor** | DONKI CME, flare, and notification timeline |
| **AI Mission Briefing** | Rule-based intelligence summary (no paid AI API) |
| **Data Source Panel** | Transparent attribution and API links |

---

## NASA Data Sources

| API | Endpoint | Purpose |
|-----|----------|---------|
| **NeoWs Feed** | `https://api.nasa.gov/neo/rest/v1/feed` | Asteroid close-approach data (7-day window) |
| **DONKI Notifications** | `https://api.nasa.gov/DONKI/notifications` | Space weather alerts |
| **DONKI CME** | `https://api.nasa.gov/DONKI/CME` | Coronal mass ejections |
| **DONKI FLR** | `https://api.nasa.gov/DONKI/FLR` | Solar flares |

Documentation: [NASA Open APIs](https://api.nasa.gov/)

---

## Mathematical Risk Model

### Asteroid Risk

```
AsteroidRisk = 100 × clamp(0.30×S_diameter + 0.20×S_velocity + 0.35×S_distance + 0.15×H, 0, 1)
```

| Factor | Normalization |
|--------|---------------|
| S_diameter | 0–1000 m → 0–1 |
| S_velocity | 0–40 km/s → 0–1 |
| S_distance | Inverse lunar distance: 0 LD = highest, ≥20 LD = lowest |
| H | 1 if potentially hazardous, else 0 |

### Space Weather Risk

Blended severity score from DONKI events (CME, FLR, notifications). Fallback score of **8** when DONKI is unavailable.

### HelioGuard Index

```
HelioGuardIndex = 0.45 × AsteroidRisk + 0.55 × SpaceWeatherRisk
```

### Risk Levels

| Score | Level |
|-------|-------|
| 0–24 | LOW |
| 25–49 | MODERATE |
| 50–74 | ELEVATED |
| 75–100 | HIGH |

Full research documentation: [docs/RESEARCH.md](docs/RESEARCH.md)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     React Dashboard                      │
├──────────────┬──────────────────┬───────────────────────┤
│  Hero / UI   │  RiskIndexCard   │  MissionBriefing      │
├──────────────┴──────────────────┴───────────────────────┤
│  AsteroidCard grid  │  SpaceWeatherTimeline            │
├─────────────────────┴───────────────────────────────────┤
│  Services: nasaNeoService.ts │ nasaDonkiService.ts      │
├──────────────────────────────┴──────────────────────────┤
│  Utils: asteroidRisk │ spaceWeatherRisk │ briefingEngine│
├─────────────────────────────────────────────────────────┤
│  NASA NeoWs API          │  NASA DONKI API              │
└─────────────────────────────────────────────────────────┘
```

---

## AI-Style Reasoning Engine

The **Mission Briefing** uses a transparent, rule-based engine (`src/utils/briefingEngine.ts`):

- Summarizes HelioGuard Index and sub-scores
- Highlights the top asteroid by risk
- Describes space weather status
- Explains technology impact at each risk level
- Includes educational disclaimer

No OpenAI, Gemini, or paid AI APIs in MVP.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** — build tool
- **lucide-react** — icons
- **CSS** — mission-control dark theme (no Tailwind)
- **NASA Open APIs** — NeoWs + DONKI
- **No backend** — client-side MVP

---

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/HelioGuard_AI.git
cd HelioGuard_AI

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Environment Variable Setup

Create a `.env` file in the project root:

```env
VITE_NASA_API_KEY=DEMO_KEY
```

Get a free API key at [https://api.nasa.gov/](https://api.nasa.gov/). The `DEMO_KEY` works for development but has strict rate limits.

---

## Research Documents

- [Research Paper (Markdown)](docs/RESEARCH.md)
- [Research Proposal (PDF)](docs/HelioGuard_AI_Research_Proposal.pdf)

---

## AI Usage Note

I used Cursor/Codex and ChatGPT to help plan the project, structure the frontend, design the mathematical risk model, debug issues, and write documentation. I reviewed and tested the generated changes myself.

---

## Disclaimer

HelioGuard AI is an educational dashboard and not an official emergency alert system. For real alerts or operational decisions, users should check official NASA, NOAA, and government sources.

---

## Future Improvements

- [ ] Historical trend charts for HelioGuard Index
- [ ] Full DONKI GST/RBE integration
- [ ] Offline caching with service workers
- [ ] Unit tests for risk model utilities
- [ ] Deploy to Vercel/Netlify with live demo URL
- [ ] Optional LLM briefing layer (with clear labeling)

---

## Author

Built for **Hack Club Stardance** as a flagship educational space intelligence project.

---

## License

MIT — educational use encouraged. NASA data remains subject to [NASA's terms of use](https://api.nasa.gov/).
