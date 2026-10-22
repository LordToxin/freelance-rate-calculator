# Product Specification: RateCraft Pro (Freelance & Agency Rate Modeler)

## 1. Executive Summary & Vision
**RateCraft Pro** is an interactive, zero-dependency financial engine that eliminates freelance pricing guesswork. By taking target take-home salary, operational expenses, vacation/sick leave, and realistic billable focus capacity into account, it calculates precise minimum viable rates, target value rates, sprint packages, retainers, and project estimates with automated markdown proposal exports.

## 2. Target Market & User Personas
- **Solo Developers & Technical Contractors**: Transitioning from salaried roles to contract work without mispricing tax liabilities.
- **UI/UX & Product Designers**: Offering value-based project quotes and weekly design sprints.
- **Boutique Agencies (2–5 people)**: Calculating blended team rates, overhead recovery, and structured milestone schedules.

## 3. Core Architecture & Modules
- `js/calculator.js`: Deterministic financial engine (gross revenue needed, billable hour denominator, minimum break-even, target rate, day/sprint/retainer packages, project estimator).
- `js/presets.js`: Pre-configured archetypes (Senior Full-Stack, Lead UI/UX, Boutique Agency, Solo Web Dev).
- `js/chart.js`: Dynamic visual revenue allocation breakdown (Salary, Taxes, Overhead, Profit Reserve).
- `js/app.js`: Reactive UI state controller, URL hash serialization, proposal clipboard copy.
- `test/calculator.test.js`: Native `node:test` suite verifying all formulas.
- `server.js`: Zero-dependency static server.

## 4. Monetization Strategies
- **Hosted Micro-SaaS ($9/mo or $49/yr)**: Cloud saving, custom branded PDF proposal export with agency logos, online Stripe deposit link.
- **Gumroad Digital Product ($29-$49)**: Turnkey template package bundled with contract templates.
- **Agency Lead Magnet ($199 Whitelabel)**: Embeddable quote estimator on agency landing pages to pre-qualify inbound clients.
