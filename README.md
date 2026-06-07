# HelioGuard AI

<div align="center">

<img src="./docs/assets/helioguard-cover.png" alt="HelioGuard AI Cover" width="100%" />

<br />

# 🚀 HelioGuard AI

### Space Risk Intelligence for Student Explorers

A NASA-data-powered educational dashboard that helps students understand asteroid and space weather data through mathematical risk scores, AI-style mission briefings, and a premium arcade-inspired space interface.

<br />

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white)
![NASA Open Data](https://img.shields.io/badge/NASA-Open%20Data-0b3d91?style=for-the-badge)
![Educational AI](https://img.shields.io/badge/Educational-AI-8b5cf6?style=for-the-badge)
![Hack Club Stardance](https://img.shields.io/badge/Hack%20Club-Stardance-f97316?style=for-the-badge)

<br />

[Live Demo](https://bebecpp.github.io/helioguard-ai/) ·
[GitHub Repo](https://github.com/BeBecpp/helioguard-ai) ·
[Research Notes](./docs/RESEARCH.md) ·
[Research PDF](./docs/HelioGuard_AI_Research_Proposal.pdf)

</div>

---

## Overview

**HelioGuard AI** is a student-built educational space intelligence dashboard.

It uses NASA public data to help students understand:

* near-Earth asteroid activity,
* space weather signals,
* educational risk scoring,
* and how raw scientific data can become a clear mission briefing.

Instead of showing only raw API data, HelioGuard AI turns space data into a visual learning experience.

```txt
NASA public data → risk model → HelioGuard Index → mission briefing → student understanding
```

> HelioGuard AI is an educational dashboard only. It is not an official NASA product, NOAA product, or emergency alert system.

---

## Live Demo

Try the project here:

```txt
https://bebecpp.github.io/helioguard-ai/
```

Repository:

```txt
https://github.com/BeBecpp/helioguard-ai
```

---

## Why This Project Matters

NASA and space weather data are powerful, but raw scientific data can be difficult for beginners to understand.

A student might ask:

* Is this asteroid dangerous?
* What does miss distance mean?
* Why does asteroid velocity matter?
* What is space weather?
* Can solar activity affect satellites, GPS, radio, or power systems?
* How can raw NASA data become something students can actually understand?

HelioGuard AI answers those questions with a visual dashboard, simple explanations, and an AI-style mission briefing.

---

## Key Features

* NASA NeoWs asteroid data integration
* NASA DONKI space weather structure
* Mathematical asteroid risk scoring
* HelioGuard Index from 0 to 100
* AI-style mission briefing engine
* Premium arcade-inspired landing page
* Detailed dashboard page after launching the app
* Student-friendly learning cards
* Asteroid object reports
* Space weather summary panel
* Research documentation
* Responsive mobile layout

---

## Interface Design

HelioGuard AI uses a **premium arcade-inspired space interface**.

The landing page introduces the mission visually with:

* floating glass navigation,
* cinematic space hero,
* glowing planet scene,
* rocket and asteroid visuals,
* mission status preview,
* ORBIT-01 briefing preview,
* and compact asteroid object reports.

The **Launch App** / **Start Exploring** flow opens a more detailed dashboard where students can explore the risk model, asteroid data, space weather summaries, learning cards, and data sources.

The goal is to make real NASA public data feel more exciting and approachable without losing scientific clarity.

---

## How It Works

HelioGuard AI follows this pipeline:

```txt
NASA APIs
   ↓
Data fetching layer
   ↓
Data cleaning and TypeScript mapping
   ↓
Mathematical feature extraction
   ↓
Risk scoring engine
   ↓
AI-style briefing engine
   ↓
Student-friendly dashboard
```

---

## Mathematical Risk Model

HelioGuard AI uses an educational scoring model. It does not predict real danger or replace official alerts.

### Asteroid Risk Score

For each near-Earth object:

```txt
AsteroidRisk = 100 × clamp(
  0.30 × S_diameter +
  0.20 × S_velocity +
  0.35 × S_distance +
  0.15 × H,
  0,
  1
)
```

Where:

```txt
S_diameter = normalized asteroid diameter score
S_velocity = normalized relative velocity score
S_distance = normalized closeness score
H = 1 if NASA marks it potentially hazardous, otherwise 0
```

### HelioGuard Index

```txt
HelioGuardIndex = 0.45 × AsteroidRisk + 0.55 × SpaceWeatherRisk
```

Risk levels:

```txt
0–24   LOW
25–49  MODERATE
50–74  ELEVATED
75–100 HIGH
```

---

## AI-Style Mission Briefing

The MVP uses a rule-based AI-style briefing engine instead of a paid AI API.

This makes the system:

* explainable,
* transparent,
* free to deploy,
* easy to debug,
* and safe for educational use.

Example briefing:

```txt
Today's HelioGuard Index is MODERATE. NASA asteroid data shows several near-Earth objects passing safely, with the highest attention object ranked by size, velocity, distance, and NASA's hazardous flag. This dashboard is educational and should not replace official NASA or NOAA alerts.
```

---

## NASA Data Sources

HelioGuard AI uses NASA public/open data.

Main sources:

* NASA NeoWs near-Earth asteroid feed
* NASA DONKI space weather data structure
* NASA/JPL asteroid object links
* NOAA/NASA educational context for space weather impacts

This project does not claim official NASA partnership. It only uses NASA public data for education.

---

## Research

This project includes research documentation explaining the motivation, data sources, system architecture, mathematical risk model, limitations, and educational purpose.

* [Research Notes](./docs/RESEARCH.md)
* [Research Proposal PDF](./docs/HelioGuard_AI_Research_Proposal.pdf)

---

## Tech Stack

| Part       | Technology                 |
| ---------- | -------------------------- |
| Frontend   | React                      |
| Language   | TypeScript                 |
| Build Tool | Vite                       |
| Styling    | CSS                        |
| Data       | NASA Open APIs             |
| AI Layer   | Rule-based briefing engine |
| Deployment | GitHub Pages               |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BeBecpp/helioguard-ai.git
cd helioguard-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add NASA API key

Create a `.env` file:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## AI Usage Note

I used Cursor/Codex and ChatGPT to help plan the project, structure the frontend, design the mathematical risk model, debug issues, improve the UI, and write documentation. I reviewed and tested the generated changes myself.

---

## Disclaimer

HelioGuard AI is an educational dashboard and not an official emergency alert system.

For real alerts, operational decisions, or official warnings, users should check NASA, NOAA, and other official government sources.

---

## Future Improvements

* Add historical HelioGuard Index charts
* Add more NASA DONKI event types
* Add student explanation mode
* Add saved mission reports
* Add downloadable PDF briefings
* Add more asteroid size comparisons
* Add optional LLM-powered explanations
* Add risk utility tests
* Improve mobile dashboard interactions

---

## Author

Built by **BeBe / Nero_404**

* Portfolio: https://bebecpp.github.io/my_blog/
* GitHub: https://github.com/BeBecpp/
* Team: https://notfound404.asuu.app/

---

<div align="center">

Made for Hack Club Stardance.

**Keep exploring space.**

</div>
