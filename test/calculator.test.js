/**
 * Unit Test Suite for Freelance Rate Calculator (RateCraft)
 */
const assert = require('assert');
const calc = require('../js/calculator.js');
const presets = require('../js/presets.js');

let passCount = 0;
let failCount = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failCount++;
  }
}

console.log('--- RUNNING RATECRAFT TEST SUITE ---');

it('computes gross salary needed and taxes accurately', () => {
  const state = {
    targetAnnualNetSalary: 75000,
    monthlyExpenses: 500,
    taxRatePct: 25, // 25% tax
    vacationWeeks: 4,
    sickHolidaysDays: 10,
    workingDaysPerWeek: 5,
    billableHoursPerDay: 5,
    profitBufferPct: 20
  };

  const res = calc.calculateRates(state);

  // Gross needed: 75000 / (1 - 0.25) = 100,000
  assert.strictEqual(res.grossSalaryNeeded, 100000);
  assert.strictEqual(res.annualTaxes, 25000);
  assert.strictEqual(res.annualExpenses, 6000);
  assert.strictEqual(res.baseOperatingBudget, 106000);
});

it('calculates billable capacity correctly', () => {
  const state = {
    targetAnnualNetSalary: 80000,
    monthlyExpenses: 500,
    taxRatePct: 20,
    vacationWeeks: 4, // 52 - 4 = 48 weeks
    sickHolidaysDays: 10, // 48 * 5 = 240 gross days - 10 = 230 billable days
    workingDaysPerWeek: 5,
    billableHoursPerDay: 5, // 230 * 5 = 1,150 billable hours
    profitBufferPct: 15
  };

  const res = calc.calculateRates(state);

  assert.strictEqual(res.workingWeeks, 48);
  assert.strictEqual(res.billableDays, 230);
  assert.strictEqual(res.totalBillableHours, 1150);
});

it('ensures target hourly rate includes profit buffer over minimum rate', () => {
  const state = presets.getDefaultState();
  const res = calc.calculateRates(state);

  assert(res.minHourlyRate > 0, 'Min hourly rate must be positive');
  assert(res.targetHourlyRate > res.minHourlyRate, 'Target hourly rate must exceed min rate');
  assert(res.dayRate > res.targetHourlyRate, 'Day rate must be larger than hourly rate');
  assert(res.weeklyRate > res.dayRate, 'Weekly rate must be larger than day rate');
  assert(res.monthlyRetainerRate > res.weeklyRate, 'Monthly retainer must exceed weekly rate');
});

it('computes project fixed fee and milestone schedules with contingency', () => {
  const state = {
    ...presets.getDefaultState(),
    projectScopeHours: 50,
    contingencyPct: 20 // 50 * 1.2 = 60 effective hours
  };

  const res = calc.calculateRates(state);

  assert.strictEqual(res.effectiveProjectHours, 60);
  assert.strictEqual(res.projectPrice, 60 * res.targetHourlyRate);

  // 50/50 split verification
  const split50 = res.projectMilestones.split5050;
  assert.strictEqual(split50.deposit + split50.final, res.projectPrice);

  // 40/30/30 split verification
  const split40 = res.projectMilestones.split403030;
  assert.strictEqual(split40.deposit + split40.milestone + split40.final, res.projectPrice);
});

it('generates well-formed client proposal markdown', () => {
  const state = presets.getDefaultState();
  const res = calc.calculateRates(state);
  const md = calc.generateProposalMarkdown(res, state);

  assert(md.includes('# 💼 Project Scope & Pricing Proposal'), 'Must contain proposal title');
  assert(md.includes('Fixed Project Investment:'), 'Must show total investment');
  assert(md.includes('Option A (50 / 50 Standard):'), 'Must include 50/50 option');
  assert(md.includes('Option B (3-Stage Milestone):'), 'Must include 40/30/30 option');
});

it('evaluates all presets without error or NaN', () => {
  for (const [key, preset] of Object.entries(presets.PRESETS)) {
    const res = calc.calculateRates(preset.state);
    assert(Number.isFinite(res.targetHourlyRate), `Preset ${key} target rate must be finite`);
    assert(Number.isFinite(res.dayRate), `Preset ${key} day rate must be finite`);
    assert(Number.isFinite(res.projectPrice), `Preset ${key} project price must be finite`);
    assert(res.distribution.netSalaryPct > 0, `Preset ${key} salary pct must be > 0`);
  }
});

console.log(`\nTest results: ${passCount} passed, ${failCount} failed.`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('All RateCraft tests passed successfully! ✨');
}
