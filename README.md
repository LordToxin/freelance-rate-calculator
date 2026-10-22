# 💼 RateCraft Pro — Value-Based Freelance & Agency Pricing Modeler

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Pure Vanilla JS](https://img.shields.io/badge/Stack-HTML5%20%2F%20CSS3%20%2F%20Vanilla%20JS-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Zero External Dependencies](https://img.shields.io/badge/Dependencies-Zero-10B981.svg)](package.json)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success.svg)]()

> **The definitive freelance and agency rate calculation engine.** Stop undercharging by guessing hourly numbers. Model your true financial baseline: taxes, business overhead, paid time off, utilization capacity, and profit reinvestment reserves.

---

## 🌐 English Description

### 🎯 The Problem
Freelance developers, designers, and boutique agencies often divide their target salary by 2,000 hours, arbitrarily setting rates like "$50/hour". This fatal mistake ignores **unbillable admin/marketing hours** (you only bill ~4-5 hours/day), **self-employment taxes (25-35%)**, **software overhead**, and **unpaid vacations**. When tax season or scope creep hits, freelancers face burnout and cash shortfalls.

### 💡 The Solution
**RateCraft Pro** reverses the equation. You enter your desired net take-home salary, operational expenses, vacation time, and real daily billable hours. The engine instantly computes:
- **Minimum Viable Rate (break-even)**
- **Target Value Rate (with 15–25% profit reserve)**
- **Day Rates, Weekly Dedicated Sprints, and Monthly Retainers**
- **Fixed-Price Project Estimator** with contingency padding and client milestone schedules (50/50 & 40/30/30).

---

### ✨ Features
- 💰 **Comprehensive Financial Breakdown**:
  - Net take-home salary target vs gross revenue needed before income tax.
  - Monthly overhead (hosting, Figma, IDE licenses, accountants, hardware depreciation).
  - Business profit buffer (10–30%) to fund emergency reserves and reinvestment.
- ⏱️ **Capacity & Utilization Engine**:
  - Vacation weeks, public holidays, and sick days deductions.
  - Realistic billable focus hours per day (default 5.0h out of 8h).
  - Accurate annual billable hour denominator.
- 📦 **Multi-Tier Rate Packaging**:
  - **Target Hourly Rate**: Benchmark rate for scope overflow.
  - **Standard Day Rate (7.5h)**: For short advisory or design sprints.
  - **Weekly Dedicated Sprint**: Packaged 5-day focus with 5% sprint discount.
  - **Monthly Continuous Retainer**: Dedicated capacity with 10% loyalty discount.
- 📑 **Fixed-Price Project Scope Estimator**:
  - Enter project hours + scope creep buffer (15–30%).
  - Generates 50/50 and 40/30/30 payment milestone schedules.
  - One-click copy formatted Markdown Client Proposal.
- 🎯 **4 Pre-loaded Industry Archetypes**:
  - *Senior Full-Stack Engineer*
  - *Lead UI/UX Product Designer*
  - *Boutique Creative Agency (Small Team)*
  - *Independent Web Developer*

---

### 🚀 Quickstart (Run in 2 Clicks)

#### Option 1: Open Directly
Double-click `index.html` in your file browser, or run:
```bash
# Windows PowerShell
Start-Process index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

#### Option 2: Run Local Server
```bash
npx serve .
# Or Python
python -m http.server 3000
```

#### Run Automated Test Suite
```bash
node test/calculator.test.js
```

---

## 🇷🇺 Русское описание

### 🎯 Какую проблему решает?
Фрилансеры и веб-студии часто называют стоимость услуг «на глазок», рассчитывая ставку как «желаемая зарплата / 160 часов в месяц». В реальности программист или дизайнер тратит до 40% рабочего времени на небиллингуемые задачи: созвоны, переписки, подготовку КП и отчетности. Если не заложить налоги, отпуск и расходы на софт, фрилансер неизбежно выгорает и работает в минус.

### 💡 Решение
**RateCraft Pro** рассчитывает математически обоснованную стоимость вашего часа, дня, недели и проектного фикса. Калькулятор учитывает налоги, реальную утилизацию времени, дни болезни, отпуск и закладывает подушку безопасности (прибыль бизнеса).

---

### ✨ Ключевые возможности
1. **Расчет всех форматов работы**:
   - **Целевая ставка в час**: С учетом налогов и прибыли.
   - **Минимально допустимая ставка**: Точка безубыточности.
   - **Дневная ставка (Day Rate)**: 7.5 часов чистого фокуса.
   - **Недельный спринт**: Готовый пакет на 5 рабочих дней со скидкой 5%.
   - **Месячный ретейнер**: Постоянное ведение проекта со скидкой 10%.
2. **Оценка проектного фикса (Fixed-Price Estimator)**:
   - Ввод примерного скоупа в часах + процент на форс-мажоры (Scope Creep).
   - Расчет этапов оплаты (50/50 или 40/30/30).
3. **Генерация коммерческого предложения**:
   - Копирование готового клиентского предложения в Markdown в 1 клик.
4. **Визуальная диаграмма распределения выручки**:
   - Наглядно показывает доли: чистый доход, налоги, операционные расходы, прибыль компании.
5. **4 готовых архетипа**:
   - Senior Full-Stack разработчик, Lead UI/UX дизайнер, дизайн-агентство, веб-разработчик.

---

### 🚀 Запуск в 2 клика

Просто откройте `index.html` в любом браузере. Приложение полностью автономно и работает без подключения к сети.

Запуск тестов:
```powershell
node test/calculator.test.js
```

---

## 💰 Monetization & Commercial Potential

RateCraft Pro operates in the high-ticket freelancer and digital agency software market (over 70M knowledge workers globally):

1. **Freemium Micro-SaaS ($9/month or $49/year)**:
   - Free: Basic rate calculation and markdown proposal copy.
   - Pro: Branded PDF proposal generator with custom logo/colors, client-facing interactive price quote link, Stripe deposit payment checkout integration, and multi-currency exchange rates.
2. **Turnkey Digital Product on Gumroad / Notion Marketplace ($29–$69)**:
   - Package RateCraft code alongside Notion freelance CRM templates, client service agreements, and proposal decks.
3. **Agency Whitelabel License ($199 one-time)**:
   - Boutique agencies can self-host RateCraft on their domain as a client lead magnet to capture inbound client project inquiries and pre-qualify budgets.

---

## 📄 License
MIT License. Free for commercial and personal projects.
