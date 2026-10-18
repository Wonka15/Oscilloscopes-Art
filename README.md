# Oscilloscopes Art

An interactive retro-futurist oscilloscope playground by [Wonka15](https://github.com/Wonka15).

## Live website

- **Vector Lab (2D):** https://wonka15.github.io/Oscilloscopes-Art/
- **3D Bench:** https://wonka15.github.io/Oscilloscopes-Art/3d.html

## Features

### Vector Lab
- Animated vector display: Lissajous, sine, orbit, triangle, square, and spiral
- Interactive frequency, amplitude, phase, and glow controls
- Four phosphor trace colors
- Power and pause controls
- Export the current display as a PNG
- Responsive layout for desktop, tablet, and phone

### 3D Bench
- Procedurally generated 3D oscilloscope, workbench, cables, and workshop props
- Orbit and zoom around the model
- Drag the physical 3D knobs to change frequency, amplitude, and phase
- Change waveform and phosphor color in real time
- Export the 3D mesh as GLB or USDZ, and save a scene image
- AR launch/export options where supported by the browser and device

## Run locally

Open `index.html` for Vector Lab. Open `3d.html` for the 3D Bench. The 3D page loads Three.js from a CDN and needs an internet connection.

## Quality checks

Before deployment, GitHub Actions runs `node scripts/check-inline-js.mjs` to parse inline JavaScript in both HTML pages and verify that HTML IDs are unique. This lightweight static check catches syntax errors and duplicate IDs; it does not replace testing in a real browser.

## Deployment

The GitHub Actions workflow in `.github/workflows/pages.yml` publishes the site whenever changes are pushed to `main`. The repository's Pages source should be set to **GitHub Actions** if GitHub prompts for it.

## Note

This is an interactive visual simulation for art and exploration, not calibrated test equipment. It does not generate electrical output or control hardware. AR availability depends on the device/browser; iPad Quick Look support may vary.
