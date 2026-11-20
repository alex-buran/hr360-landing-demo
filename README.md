# HR Analitic 360 · Landing Page (Demo)

**▶ Live demo: https://alex-buran.github.io/hr360-landing-demo/**

Marketing site for an HR analytics and decision-support platform, in Turkish and English (`/` and `/en/`). A single page with a mouse-trailing spotlight hero, four management questions on an orbit around the product dashboard, a four-question narrative answered by real product screens, security, pricing, FAQ and a contact form.

> **Sanitized portfolio demo.** The real contact address, live app links, domain and search-engine metadata have been removed. Links are placeholders and the contact form is a no-op. The product screens show an invented sample company ("Örnek Sanayi A.Ş.") and are stamped "Örnek veri" / "Sample data"; the English page shows the English interface of the app.

## Design

- **Palette:** graphite and the product's own blue (OKLCH), pure white sections between dark ones.
- **Type:** one family, Archivo, self-hosted; medium-weight headings and its width axis for small labels.
- **Hero orbit:** an open dashed arc sits behind the dashboard, offset to the left, with dashes slowly flowing along it. The four questions connect to it with connector lines that grow longer from the first to the fourth and end in glowing dots. Hovering a question lights its line, node and dot, and each question links to the screen that answers it. Below 1000 px the orbit gives way to a ruled list.
- **Two languages:** a TR | EN switch made of plain links, so it works without JavaScript; each page declares the other with `hreflang`.
- **Hero motion:** a soft light eases toward the pointer with a lag and reveals a fine grid beneath it. It holds still under `prefers-reduced-motion`, drifts slowly on touch screens, and pauses when off-screen.
- **Copy:** formal corporate Turkish; every claim is checked against the product.
- **Imagery:** real screens of the app, captured from a seeded sample dataset run through the product's own import pipeline.

## Tech

- Static HTML / CSS / vanilla JS, no build step, no dependencies
- Strict Content-Security-Policy (no inline styles or scripts), self-hosted fonts
- WCAG AA contrast on every colour pair, keyboard and screen-reader friendly, responsive from 360 px

**Related:** the product this site is for, with screenshots of the app: **[hr-analitic-360-demo](https://github.com/alex-buran/hr-analitic-360-demo)**.

Designed and built by **[Softburn.tech](https://softburn.tech)**.
