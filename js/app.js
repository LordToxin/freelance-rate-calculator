/**
 * RateCraft Studio - Interactive Application Controller
 */
(function () {
  'use strict';

  const Calc = window.RateCalculator;
  const Presets = window.RatePresets;

  let state = Presets.getDefaultState();

  // DOM Elements
  const el = {
    // Inputs
    salaryInput: document.getElementById('input-salary'),
    expensesInput: document.getElementById('input-expenses'),
    taxRateInput: document.getElementById('input-tax-rate'),
    taxRateVal: document.getElementById('val-tax-rate'),
    vacationInput: document.getElementById('input-vacation'),
    vacationVal: document.getElementById('val-vacation'),
    sickInput: document.getElementById('input-sick'),
    sickVal: document.getElementById('val-sick'),
    billableHoursInput: document.getElementById('input-billable-hours'),
    billableHoursVal: document.getElementById('val-billable-hours'),
    profitBufferInput: document.getElementById('input-profit-buffer'),
    profitBufferVal: document.getElementById('val-profit-buffer'),

    // Project Estimator Inputs
    projectScopeInput: document.getElementById('input-project-hours'),
    contingencyInput: document.getElementById('input-contingency'),
    contingencyVal: document.getElementById('val-contingency'),

    // Hero Output Rates
    targetRate: document.getElementById('rate-target-hourly'),
    minRate: document.getElementById('rate-min-hourly'),
    dayRate: document.getElementById('rate-day'),
    weeklyRate: document.getElementById('rate-weekly'),
    monthlyRetainerRate: document.getElementById('rate-monthly-retainer'),

    // Capacity Outputs
    totalBillableHours: document.getElementById('stat-billable-hours'),
    utilizationRate: document.getElementById('stat-utilization'),
    targetAnnualRevenue: document.getElementById('stat-annual-revenue'),

    // Distribution Bars
    barSalary: document.getElementById('bar-salary'),
    barTaxes: document.getElementById('bar-taxes'),
    barExpenses: document.getElementById('bar-expenses'),
    barProfit: document.getElementById('bar-profit'),
    legendSalary: document.getElementById('legend-salary'),
    legendTaxes: document.getElementById('legend-taxes'),
    legendExpenses: document.getElementById('legend-expenses'),
    legendProfit: document.getElementById('legend-profit'),

    // Project Estimator Outputs
    projectTotal: document.getElementById('project-total-fee'),
    projectEffectiveHours: document.getElementById('project-effective-hours'),
    split50Deposit: document.getElementById('split-50-deposit'),
    split50Final: document.getElementById('split-50-final'),
    split40Deposit: document.getElementById('split-40-deposit'),
    split30Milestone: document.getElementById('split-30-milestone'),
    split30Final: document.getElementById('split-30-final'),

    // Presets & Actions
    presetChips: document.querySelectorAll('[data-preset]'),
    copyProposalBtn: document.getElementById('copy-proposal-btn'),
    resetBtn: document.getElementById('reset-btn'),
    toast: document.getElementById('toast')
  };

  function fmtCurrency(val) {
    return '$' + Math.round(val || 0).toLocaleString();
  }

  function showToast(message) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.classList.remove('hidden');
    el.toast.classList.add('visible');
    setTimeout(() => {
      el.toast.classList.remove('visible');
      setTimeout(() => el.toast.classList.add('hidden'), 300);
    }, 2200);
  }

  function syncInputs() {
    el.salaryInput.value = state.targetAnnualNetSalary;
    el.expensesInput.value = state.monthlyExpenses;
    el.taxRateInput.value = state.taxRatePct;
    el.taxRateVal.textContent = `${state.taxRatePct}%`;
    el.vacationInput.value = state.vacationWeeks;
    el.vacationVal.textContent = `${state.vacationWeeks} wks`;
    el.sickInput.value = state.sickHolidaysDays;
    el.sickVal.textContent = `${state.sickHolidaysDays} days`;
    el.billableHoursInput.value = state.billableHoursPerDay;
    el.billableHoursVal.textContent = `${state.billableHoursPerDay} hrs/day`;
    el.profitBufferInput.value = state.profitBufferPct;
    el.profitBufferVal.textContent = `${state.profitBufferPct}%`;

    el.projectScopeInput.value = state.projectScopeHours;
    el.contingencyInput.value = state.contingencyPct;
    el.contingencyVal.textContent = `+${state.contingencyPct}%`;
  }

  function updateCalculations() {
    const res = Calc.calculateRates(state);

    // Hero Rates
    if (el.targetRate) el.targetRate.textContent = fmtCurrency(res.targetHourlyRate);
    if (el.minRate) el.minRate.textContent = fmtCurrency(res.minHourlyRate);
    if (el.dayRate) el.dayRate.textContent = fmtCurrency(res.dayRate);
    if (el.weeklyRate) el.weeklyRate.textContent = fmtCurrency(res.weeklyRate);
    if (el.monthlyRetainerRate) el.monthlyRetainerRate.textContent = fmtCurrency(res.monthlyRetainerRate);

    // Capacity & Revenue
    if (el.totalBillableHours) el.totalBillableHours.textContent = `${res.totalBillableHours.toLocaleString()} hrs`;
    if (el.utilizationRate) el.utilizationRate.textContent = `${res.utilizationRatePct}%`;
    if (el.targetAnnualRevenue) el.targetAnnualRevenue.textContent = fmtCurrency(res.targetAnnualRevenue);

    // Distribution Bars
    if (el.barSalary) el.barSalary.style.width = `${res.distribution.netSalaryPct}%`;
    if (el.barTaxes) el.barTaxes.style.width = `${res.distribution.taxesPct}%`;
    if (el.barExpenses) el.barExpenses.style.width = `${res.distribution.expensesPct}%`;
    if (el.barProfit) el.barProfit.style.width = `${res.distribution.profitReservePct}%`;

    if (el.legendSalary) el.legendSalary.textContent = `${fmtCurrency(res.netSalary)} (${res.distribution.netSalaryPct}%)`;
    if (el.legendTaxes) el.legendTaxes.textContent = `${fmtCurrency(res.annualTaxes)} (${res.distribution.taxesPct}%)`;
    if (el.legendExpenses) el.legendExpenses.textContent = `${fmtCurrency(res.annualExpenses)} (${res.distribution.expensesPct}%)`;
    if (el.legendProfit) el.legendProfit.textContent = `${fmtCurrency(res.annualProfitReserve)} (${res.distribution.profitReservePct}%)`;

    // Project Estimator
    if (el.projectTotal) el.projectTotal.textContent = fmtCurrency(res.projectPrice);
    if (el.projectEffectiveHours) el.projectEffectiveHours.textContent = `${res.effectiveProjectHours} hrs`;

    if (el.split50Deposit) el.split50Deposit.textContent = fmtCurrency(res.projectMilestones.split5050.deposit);
    if (el.split50Final) el.split50Final.textContent = fmtCurrency(res.projectMilestones.split5050.final);

    if (el.split40Deposit) el.split40Deposit.textContent = fmtCurrency(res.projectMilestones.split403030.deposit);
    if (el.split30Milestone) el.split30Milestone.textContent = fmtCurrency(res.projectMilestones.split403030.milestone);
    if (el.split30Final) el.split30Final.textContent = fmtCurrency(res.projectMilestones.split403030.final);
  }

  function initEventListeners() {
    el.salaryInput.addEventListener('input', (e) => {
      state.targetAnnualNetSalary = parseFloat(e.target.value) || 0;
      updateCalculations();
    });

    el.expensesInput.addEventListener('input', (e) => {
      state.monthlyExpenses = parseFloat(e.target.value) || 0;
      updateCalculations();
    });

    el.taxRateInput.addEventListener('input', (e) => {
      state.taxRatePct = parseFloat(e.target.value) || 0;
      el.taxRateVal.textContent = `${state.taxRatePct}%`;
      updateCalculations();
    });

    el.vacationInput.addEventListener('input', (e) => {
      state.vacationWeeks = parseFloat(e.target.value) || 0;
      el.vacationVal.textContent = `${state.vacationWeeks} wks`;
      updateCalculations();
    });

    el.sickInput.addEventListener('input', (e) => {
      state.sickHolidaysDays = parseFloat(e.target.value) || 0;
      el.sickVal.textContent = `${state.sickHolidaysDays} days`;
      updateCalculations();
    });

    el.billableHoursInput.addEventListener('input', (e) => {
      state.billableHoursPerDay = parseFloat(e.target.value) || 0;
      el.billableHoursVal.textContent = `${state.billableHoursPerDay} hrs/day`;
      updateCalculations();
    });

    el.profitBufferInput.addEventListener('input', (e) => {
      state.profitBufferPct = parseFloat(e.target.value) || 0;
      el.profitBufferVal.textContent = `${state.profitBufferPct}%`;
      updateCalculations();
    });

    el.projectScopeInput.addEventListener('input', (e) => {
      state.projectScopeHours = parseFloat(e.target.value) || 0;
      updateCalculations();
    });

    el.contingencyInput.addEventListener('input', (e) => {
      state.contingencyPct = parseFloat(e.target.value) || 0;
      el.contingencyVal.textContent = `+${state.contingencyPct}%`;
      updateCalculations();
    });

    // Preset Chips
    el.presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.preset;
        if (Presets.PRESETS[key]) {
          state = JSON.parse(JSON.stringify(Presets.PRESETS[key].state));
          el.presetChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          syncInputs();
          updateCalculations();
          showToast(`Applied "${Presets.PRESETS[key].name}" preset`);
        }
      });
    });

    // Copy Proposal
    if (el.copyProposalBtn) {
      el.copyProposalBtn.addEventListener('click', () => {
        const res = Calc.calculateRates(state);
        const md = Calc.generateProposalMarkdown(res, state);
        navigator.clipboard.writeText(md).then(() => {
          showToast('Client Proposal copied to clipboard! 📋');
        });
      });
    }

    // Reset
    if (el.resetBtn) {
      el.resetBtn.addEventListener('click', () => {
        state = Presets.getDefaultState();
        syncInputs();
        updateCalculations();
        showToast('Reset to Senior Engineer default');
      });
    }
  }

  function init() {
    syncInputs();
    initEventListeners();
    updateCalculations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
