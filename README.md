# Oscilloscopes Art

**Version 2.0 · Interactive browser-based oscilloscope art and 3D electronics workbench**

Oscilloscopes Art is a hands-on visual lab by [Wonka15](https://github.com/Wonka15). Explore glowing signal patterns, adjust a simulated oscilloscope, and inspect a detailed 3D electronics bench—all from a modern web browser.

> **Important:** This project is an educational/artistic simulation. It is not calibrated test equipment and does not generate electrical output or control physical hardware. The Jacob's ladder and electron-microscope imagery are visual simulations.

## Explore the live project

- **[Open Vector Lab (2D)](https://wonka15.github.io/Oscilloscopes-Art/)** — shape and save animated waveform art.
- **[Open the 3D Bench](https://wonka15.github.io/Oscilloscopes-Art/3d.html)** — orbit the workbench, interact with the oscilloscope controls, explore the simulated SEM, and export supported model formats.

## What you can do

### Vector Lab

- Explore Lissajous, sine, orbit, triangle, square, and spiral patterns.
- Adjust frequency, amplitude, phase, and trace glow.
- Choose between four phosphor colors.
- Pause or power down the display.
- Save the current canvas as a PNG image.
- Use the responsive layout on desktop, tablet, and phone.

### 3D Bench

- Orbit around and zoom into a procedurally built electronics workbench.
- Drag the physical oscilloscope knobs to change frequency, amplitude, and phase.
- Change the waveform and trace color in real time.
- Load an audio file, try the configured radio stream, or optionally analyse room audio with microphone permission.
- Explore the virtual SEM specimen viewer and its simulated detector, focus, brightness, contrast, voltage, and scan controls.
- Toggle the **visual-only** Jacob's ladder effect.
- Export a GLB or USDZ model, save a scene image, and try AR-related options where supported by the browser and device.

Audio and AR behavior depends on browser security rules, device support, permissions, and whether an external stream allows analysis. The site does not upload microphone audio.

## Project layout

| File or folder | Purpose |
| --- | --- |
| `index.html` | Vector Lab interface, styles, Canvas 2D waveform renderer, and controls. |
| `3d.html` | Three.js workbench, oscilloscope interactions, audio tools, model export, and simulated SEM viewer. |
| `scripts/check-inline-js.mjs` | Lightweight pre-deploy checks for inline JavaScript syntax and duplicate HTML IDs. |
| `.github/workflows/pages.yml` | GitHub Actions workflow that checks and deploys the static site to GitHub Pages. |
| `docs/DEVELOPMENT.md` | Beginner-friendly guide to the code structure, safe edits, and testing workflow. |
| `CHANGELOG.md` | Human-readable project version notes. |

The site is intentionally a **static website**: there is no build framework or package installation required. The 3D page loads Three.js modules from a CDN, so an internet connection is required for the 3D scene.

## Run it locally

1. Download or clone this repository.
2. Open `index.html` to use Vector Lab.
3. Open `3d.html` to use the 3D Bench.

For the most reliable local testing—especially for modules, microphone permission, and downloads—serve the folder through a local HTTP server rather than opening the HTML files directly from disk. For example, if Python is installed, run `python -m http.server 8000` in the repository folder, then visit `http://localhost:8000`.

## Quality checks

GitHub Actions runs the repository's static checker before deployment:

```sh
node scripts/check-inline-js.mjs
```

The checker parses inline JavaScript in both HTML pages and flags duplicate HTML IDs. It catches useful classes of mistakes early, but **it is not a replacement for testing the pages in a real browser**. After changing controls, rendering, audio, or exports, manually test the affected feature on the target devices.

## Beginner-friendly contribution guide

- Start with [the development guide](docs/DEVELOPMENT.md) before making a larger change.
- Prefer small, named helper functions over long, unexplained blocks.
- Keep related settings together and explain *why* a non-obvious choice exists.
- Keep UI labels and their corresponding element IDs in sync.
- Avoid adding comments that merely repeat the next line; comments should explain purpose, assumptions, or behavior.
- Run the static checker and test the changed interaction in a browser before merging.

## Deployment

The workflow in `.github/workflows/pages.yml` publishes the repository to GitHub Pages when changes are pushed to `main`. In **Settings → Pages**, choose **GitHub Actions** as the deployment source if GitHub asks you to select one.

## Version 2.0 goals

This pass focuses on maintainability as well as appearance:

- Clearer explanations around the rendering pipeline, signal state, 3D subsystems, and controls.
- Consistent project/version documentation and a quick file map.
- A beginner-oriented development guide and change log.
- Existing features preserved wherever possible; no broad rewrite solely for style.

Version 2.0 should be considered complete only after the changes are merged, automated checks pass, and the live site has been checked in a browser.
