# Development Guide

Welcome! This guide is for people who are new to this project or are still learning HTML, CSS, and JavaScript. You do not need a build tool to read the code or run the site.

## First, understand the three layers

Most browser interfaces combine three kinds of code:

- **HTML** describes the page's structure: headings, buttons, controls, and the canvas where the drawing appears.
- **CSS** controls how those elements look and how the layout adapts to different screen sizes.
- **JavaScript** makes the page interactive: it reads controls, updates state, draws the waveform, and runs animation loops.

In this project, each page keeps its HTML, CSS, and JavaScript together in one file. That makes it easy to get started, although the files are longer than a multi-file application.

## Which file should I open?

### `index.html` — Vector Lab

The Vector Lab uses the browser's **Canvas 2D API** to draw the phosphor grid and waveform.

The main JavaScript pieces are:

1. **DOM references** find the canvas and controls by their HTML IDs.
2. **`state`** stores the selected waveform, frequency, amplitude, phase, glow, color, power, and pause status.
3. **`resize()`** measures the display and scales the drawing buffer for sharp rendering on high-density screens.
4. **`drawGrid()`** paints the background and measurement grid.
5. **`points(t)`** calculates the coordinates for the selected waveform. It calculates points but does not paint them.
6. **`strokeTrace(t)`** draws those points with a soft glow and a crisp center line.
7. **`render(now)`** is called repeatedly by `requestAnimationFrame`. It advances the animation clock and redraws the display.
8. **Event listeners** connect sliders and buttons to the state object.

**Safe first experiment:** change a color value in the color-button markup, or adjust a CSS color token. Then reload the page and see what changed.

### `3d.html` — 3D Bench

The 3D Bench uses **Three.js**, a JavaScript library for displaying 3D graphics in a browser.

The main subsystems are:

- **Scene setup:** creates the 3D world, camera, renderer, orbit controls, and lights.
- **Reusable mesh helpers:** functions such as `box()`, `cylinder()`, and `textLabel()` create named pieces of the model. Using helpers keeps dimensions and material setup consistent.
- **Equipment model:** assembles the oscilloscope, bench, shelf, power demonstration, solder spool, and other props.
- **Signal controls:** sliders and physical knobs update the same signal settings so the controls stay synchronized.
- **Audio tools:** optional Web Audio connections analyse a chosen audio file, a permitted stream, or microphone input. Browser permissions and cross-origin restrictions may limit analysis.
- **Model exports:** exporter helpers prepare supported GLB and USDZ downloads.
- **SEM simulator:** draws illustrative specimen textures to a canvas and uses that canvas as the simulated microscope display. It is not a collection of real micrographs.
- **Animation loop:** updates the scene and renders frames while the page is open.

The Jacob's ladder is a **visual effect only**. No real high voltage is created or controlled.

## Editing safely

1. **Start small.** Make one focused change at a time.
2. **Search before adding.** If a function already exists for the task, update it rather than creating a second competing implementation.
3. **Preserve element IDs.** JavaScript looks up controls using IDs such as `freq`, `amp`, and `powerToggle`. Renaming an ID in HTML without updating its JavaScript reference can break the control.
4. **Keep state as the source of truth.** If a control changes a value, update the relevant state object and then refresh the UI. Avoid separate, conflicting copies of the same value.
5. **Comment the reason.** A useful comment explains intent, assumptions, browser limitations, or a non-obvious calculation. A comment that simply repeats the next line adds little value.
6. **Use descriptive names.** Names like `drawGrid` and `setLadderPower` help readers understand intent before they read the implementation.
7. **Be careful with 3D coordinates.** Three.js uses `x`, `y`, and `z` coordinates. Before changing a model part, check its parent group, position, rotation, and dimensions.
8. **Understand stereo XY audio.** In Audio XY mode, each stereo sample pair becomes a coordinate: left channel is horizontal (X), right channel is vertical (Y). The Audio Art Studio decodes selected files locally, combines up to two layers using their gain sliders, and builds a stereo buffer for playback and drawing. Ordinary stereo music may create abstract patterns rather than a clear picture; audio made specifically for XY display is more likely to draw a recognizable image.
9. **Draw-to-sound studio:** the drawing pad stores normalized points, so the shape scales to different screen sizes. SVG import samples path geometry in the browser; the WAV exporter writes standard 16-bit stereo PCM with X in the left channel and Y in the right channel. It does not upload drawings or audio.
10. **Do not claim a simulation is real measurement.** The waveform and SEM visuals are for exploration, not calibrated engineering work.

## Test before you merge

### Automated check

From the repository root, run:

```sh
node scripts/check-inline-js.mjs
```

This checks inline JavaScript syntax and duplicate HTML IDs. It is a useful guardrail, not a complete test suite.

### Browser smoke-test checklist

- [ ] Open the Vector Lab and confirm the waveform animates.
- [ ] Change each signal slider and confirm its displayed value updates.
- [ ] Switch all waveform modes and trace colors.
- [ ] Pause, resume, power off, and power on the Vector Lab.
- [ ] Save a PNG and confirm the downloaded image opens.
- [ ] Load a local audio file in the Audio Art Studio and confirm its name appears.
- [ ] Load a second file, adjust both mix levels, and check that the mix can be played and stopped.
- [ ] Select Audio XY and confirm the stereo signal is rendered as a vector trace.
- [ ] Try a stereo file made for oscilloscope music; compare it with ordinary music.
- [ ] Open the 3D Bench and confirm the model appears.
- [ ] Orbit and zoom the camera; drag the frequency, amplitude, and phase knobs.
- [ ] Toggle the Jacob's ladder and confirm the status label matches its state.
- [ ] Switch SEM specimens and detector settings; adjust the scan controls.
- [ ] Test audio only when appropriate permissions and a suitable stream/file are available.
- [ ] Try GLB/USDZ export on a supported browser and device.
- [ ] Check a narrow phone layout and a tablet/desktop layout.
- [ ] Open the browser console and investigate any unexpected errors.

## Why some things may behave differently

- **External stream analysis:** a radio stream may play but refuse to expose audio samples because of cross-origin security restrictions.
- **Microphone access:** browsers normally require HTTPS or localhost and explicit permission.
- **AR and USDZ:** support varies by browser, operating system, and device.
- **Performance:** detailed geometry and canvas effects can behave differently on mobile devices. Reduce work per frame before adding more visual effects.

If a feature fails, record the device/browser, the steps you took, and any console error. That makes debugging much easier than changing several unrelated things at once.
