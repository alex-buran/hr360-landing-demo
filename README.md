# HR Analitic 360 · Landing Page (Demo)

**▶ Live demo: https://alex-buran.github.io/hr360-landing-demo/**

Marketing site for an HR analytics and decision-support platform (Turkish). A single page with a mouse-trailing spotlight hero, a four-question narrative answered by real product screens, security, pricing, FAQ and a contact form.

> **Sanitized portfolio demo.** The real contact address, live app links, domain and search-engine metadata have been removed. Links are placeholders and the contact form is a no-op. The product screens show an invented sample company ("Örnek Sanayi A.Ş.") and are stamped "Örnek veri".

## Design

- **Palette:** graphite and the product's own blue (OKLCH), pure white sections between dark ones.
- **Type:** one family, Archivo, using its width axis: the hero headline widens line by line, from "Ne oldu?" to "Hangi aksiyon?". Self-hosted.
- **Hero motion:** a soft light eases toward the pointer with a lag and reveals a fine grid beneath it. It holds still under `prefers-reduced-motion`, drifts slowly on touch screens, and pauses when off-screen.
- **Copy:** formal corporate Turkish; every claim is checked against the product.
- **Imagery:** real screens of the app, captured from a seeded sample dataset run through the product's own import pipeline.

## Tech

- Static HTML / CSS / vanilla JS, no build step, no dependencies
- Strict Content-Security-Policy (no inline styles or scripts), self-hosted fonts
- WCAG AA contrast on every colour pair, keyboard and screen-reader friendly, responsive from 360 px

Designed and built by **[Softburn.tech](https://softburn.tech)**.
