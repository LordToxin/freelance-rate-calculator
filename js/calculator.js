/**
 * RateCraft Freelance Financial Calculation Engine
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RateCalculator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function round(val, decimals = 2) {
    const factor = Math.pow(10, decimals);
    return Math.round((val + Number.EPSILON) * factor) / factor;
  }

  /**
   * Calculates complete freelance rates, capacity, and cost distribution
   */
  function calculateRates(state) {
    const netSalary = Math.max(1000, Number(state.targetAnnualNetSalary ?? 80000));
    const monthlyExpenses = Math.max(0, Number(state.monthlyExpenses ?? 500));
    const taxRatePct = clamp(Number(state.taxRatePct ?? 25), 0, 60);
    const taxRate = taxRatePct / 100;

    const vacationWeeks = clamp(Number(state.vacationWeeks ?? 4), 0, 20);
    const sickDays = clamp(Number(state.sickHolidaysDays ?? 12), 0, 45);
    const daysPerWeek = clamp(Number(state.workingDaysPerWeek ?? 5), 1, 7);
    const billableHoursPerDay = clamp(Number(state.billableHoursPerDay ?? 5), 1, 14);
    const profitBufferPct = clamp(Number(state.profitBufferPct ?? 15), 0, 100);
    const profitBuffer = profitBufferPct / 100;

    // Project Estimator Inputs
    const projectHours = Math.max(1, Number(state.projectScopeHours ?? 40));
    const contingencyPct = clamp(Number(state.contingencyPct ?? 20), 0, 100);

    // 1. Annual Financial Requirements
    const annualExpenses = monthlyExpenses * 12;
    // Salary needed before income tax to hit net salary
    const grossSalaryNeeded = taxRate < 1 ? (netSalary / (1 - taxRate)) : netSalary;
    const annualTaxes = grossSalaryNeeded - netSalary;
    const baseOperatingBudget = grossSalaryNeeded + annualExpenses;
    const targetAnnualRevenue = baseOperatingBudget * (1 + profitBuffer);
    const annualProfitReserve = targetAnnualRevenue - baseOperatingBudget;

    // 2. Working Time & Billable Capacity
    const workingWeeks = Math.max(1, 52 - vacationWeeks);
    const grossWorkDays = workingWeeks * daysPerWeek;
    const billableDays = Math.max(1, grossWorkDays - sickDays);
    const totalBillableHours = billableDays * billableHoursPerDay;
    const totalPotentialHours = billableDays * 8; // standard 8h day
    const utilizationRatePct = round((totalBillableHours / totalPotentialHours) * 100, 1);

    // 3. Rate Calculations
    // Minimum break-even rate without profit buffer
    const minHourlyRate = round(baseOperatingBudget / totalBillableHours, 0);
    // Target hourly rate with business profit reserve
    const targetHourlyRate = round(targetAnnualRevenue / totalBillableHours, 0);

    // Day Rate (based on 7.5 hour standard billable equivalent)
    const dayRate = round(targetHourlyRate * 7.5, 0);
    // Weekly Sprint (5 days with 5% sprint packaging discount)
    const weeklyRate = round(dayRate * daysPerWeek * 0.95, 0);
    // Monthly Retainer (average monthly billable hours with 10% loyalty discount)
    const monthlyRetainerHours = totalBillableHours / 12;
    const monthlyRetainerRate = round(monthlyRetainerHours * targetHourlyRate * 0.90, 0);

    // 4. Project Fixed Fee Calculation
    const effectiveProjectHours = round(projectHours * (1 + contingencyPct / 100), 1);
    const projectPrice = round(effectiveProjectHours * targetHourlyRate, 0);

    const projectMilestones = {
      split5050: {
        deposit: round(projectPrice * 0.5, 0),
        final: round(projectPrice * 0.5, 0)
      },
      split403030: {
        deposit: round(projectPrice * 0.4, 0),
        milestone: round(projectPrice * 0.3, 0),
        final: round(projectPrice * 0.3, 0)
      }
    };

    // 5. Cost Distribution Breakdown (Percentages)
    const totalRev = targetAnnualRevenue || 1;
    const distribution = {
      netSalaryPct: round((netSalary / totalRev) * 100, 1),
      taxesPct: round((annualTaxes / totalRev) * 100, 1),
      expensesPct: round((annualExpenses / totalRev) * 100, 1),
      profitReservePct: round((annualProfitReserve / totalRev) * 100, 1)
    };

    return {
      netSalary,
      grossSalaryNeeded: round(grossSalaryNeeded, 0),
      annualExpenses: round(annualExpenses, 0),
      annualTaxes: round(annualTaxes, 0),
      baseOperatingBudget: round(baseOperatingBudget, 0),
      targetAnnualRevenue: round(targetAnnualRevenue, 0),
      annualProfitReserve: round(annualProfitReserve, 0),

      workingWeeks,
      billableDays,
      totalBillableHours: round(totalBillableHours, 0),
      utilizationRatePct,

      minHourlyRate,
      targetHourlyRate,
      dayRate,
      weeklyRate,
      monthlyRetainerRate,

      projectPrice,
      effectiveProjectHours,
      projectMilestones,
      distribution
    };
  }

  /**
   * Generates a polished client-facing proposal summary
   */
  function generateProposalMarkdown(metrics, state) {
    const hours = state.projectScopeHours || 40;
    const contingency = state.contingencyPct || 20;

    return [
      `# 💼 Project Scope & Pricing Proposal`,
      `**Prepared on:** ${new Date().toLocaleDateString()}`,
      ``,
      `---`,
      ``,
      `### 1. Project Investment Summary`,
      `- **Scope Estimate:** ${hours} billable hours`,
      `- **Contingency Buffer:** +${contingency}% (effective ${metrics.effectiveProjectHours} hours)`,
      `- **Fixed Project Investment:** **$${metrics.projectPrice.toLocaleString()}**`,
      ``,
      `### 2. Milestone Payment Schedule`,
      `- **Option A (50 / 50 Standard):**`,
      `  - 50% Deposit to secure start date: **$${metrics.projectMilestones.split5050.deposit.toLocaleString()}**`,
      `  - 50% Upon final deployment & hand-off: **$${metrics.projectMilestones.split5050.final.toLocaleString()}**`,
      ``,
      `- **Option B (3-Stage Milestone):**`,
      `  - 40% Kick-off Deposit: **$${metrics.projectMilestones.split403030.deposit.toLocaleString()}**`,
      `  - 30% Feature Freeze / Beta Release: **$${metrics.projectMilestones.split403030.milestone.toLocaleString()}**`,
      `  - 30% Final Delivery & Launch: **$${metrics.projectMilestones.split403030.final.toLocaleString()}**`,
      ``,
      `### 3. Alternative Retainer & Dedicated Sprint Models`,
      `- **Weekly Dedicated Sprint:** **$${metrics.weeklyRate.toLocaleString()}** / week`,
      `- **Monthly Continuous Retainer:** **$${metrics.monthlyRetainerRate.toLocaleString()}** / month (~${Math.round(metrics.totalBillableHours / 12)} hrs/mo)`,
      `- **Hourly Overflow Rate:** **$${metrics.targetHourlyRate}** / hr`,
      ``,
      `---`,
      `*Proposal valid for 30 calendar days from issue date.*`
    ].join('\n');
  }

  return {
    calculateRates,
    generateProposalMarkdown,
    round,
    clamp
  };
});
