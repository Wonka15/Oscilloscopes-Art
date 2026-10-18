# Changelog

Notable project changes are recorded here. This file is maintained by hand; it is not generated from Git history.

## Version 2.0 — stereo audio art studio

- Added an Audio XY display mode that maps stereo left/right samples to X/Y coordinates.
- Added two local audio layers with independent gain sliders, browser-side mixing, and play/stop controls.
- Kept audio files in the browser; no upload service or server-side processing was added.
- Documented the limits of ordinary music: recognizable pictures work best with audio designed for oscilloscope/vector displays.

## Version 2.0 — live audio, shape presets, and motion controls

- Added ten built-in shape presets that draw a phosphor trace and play a synthesized tone.
- Added microphone-reactive XY traces, device-orientation control, and direct internet-radio stream playback where browser CORS rules allow it.
- Added an embedded YouTube preview. Protected YouTube audio is not read directly; the microphone can visualize sound picked up from the device speakers.

## Version 2.0 — audio playback and multi-stroke refinements

- Added a dedicated output-volume slider and more informative playback status, including likely silent-source and browser audio-context issues.
- Fixed drawing paths to preserve separate pen strokes and SVG paths in the oscilloscope view and stereo WAV export.

## Version 2.0 — draw-to-sound studio

- Added a touch- and mouse-friendly drawing pad that turns a path into an oscilloscope XY trace.
- Added SVG path import for simple vector artwork, with point sampling and normalized placement.
- Added stereo 16-bit PCM WAV export: left-channel samples encode horizontal movement and right-channel samples encode vertical movement.
- Kept SVG parsing local in the browser and did not add a server upload service.

## Version 2.0 — code clarity and documentation pass

**Status:** preparing the version 2.0 milestone.

- Added beginner-oriented explanations for the Vector Lab's state, waveform-point calculation, canvas rendering, controls, and animation loop.
- Added section and function comments for the 3D Bench's scene setup, mesh helpers, equipment, audio handling, model export, and simulated SEM viewer.
- Marked the live interface as Version 2.0.
- Reworked the README with a feature overview, project map, local-run instructions, quality-check details, and safety/simulation notes.
- Added a development guide with a plain-language architecture tour and manual browser checklist.
- Preserved existing app behavior as the primary goal; source comments alone do not prove runtime correctness.
- Completion still requires automated checks, a browser smoke test, and confirmation that GitHub Pages has deployed the merged changes.

## Previous checkpoint

- **3D Bench solder-spool alignment fix:** the spool is upright, has a center hub and seven visible wire turns, and is positioned just above the tabletop.
- Saved source checkpoint: [`570faf5`](https://github.com/Wonka15/Oscilloscopes-Art/commit/570faf5d21deca411fbdb28daca0b445e1bd479e).
