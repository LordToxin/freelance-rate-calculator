/**
 * RateCraft Freelance Industry Archetypes
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RatePresets = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const PRESETS = {
    seniorDev: {
      name: 'Senior Full-Stack Engineer',
      description: 'Experienced software contractor with high technical leverage and specialized domain skills.',
      state: {
        targetAnnualNetSalary: 120000,
        monthlyExpenses: 650,
        taxRatePct: 28,
        vacationWeeks: 5,
        sickHolidaysDays: 14,
        workingDaysPerWeek: 5,
        billableHoursPerDay: 5.0,
        profitBufferPct: 20,
        projectScopeHours: 60,
        contingencyPct: 20
      }
    },
    productDesigner: {
      name: 'Lead UI/UX Product Designer',
      description: 'Senior designer executing end-to-end Figma systems, user research, and prototype sprints.',
      state: {
        targetAnnualNetSalary: 95000,
        monthlyExpenses: 450,
        taxRatePct: 25,
        vacationWeeks: 4,
        sickHolidaysDays: 12,
        workingDaysPerWeek: 5,
        billableHoursPerDay: 5.5,
        profitBufferPct: 15,
        projectScopeHours: 40,
        contingencyPct: 20
      }
    },
    boutiqueStudio: {
      name: 'Boutique Creative Agency (Small Team)',
      description: 'Multi-person collective with higher operational overhead, equipment, and shared reserves.',
      state: {
        targetAnnualNetSalary: 240000,
        monthlyExpenses: 2800,
        taxRatePct: 30,
        vacationWeeks: 4,
        sickHolidaysDays: 15,
        workingDaysPerWeek: 5,
        billableHoursPerDay: 12.0, // 2-3 people total
        profitBufferPct: 25,
        projectScopeHours: 120,
        contingencyPct: 25
      }
    },
    midFreelancer: {
      name: 'Independent Web Developer',
      description: 'Solo builder creating modern Next.js/WordPress websites and landing pages for SMBs.',
      state: {
        targetAnnualNetSalary: 65000,
        monthlyExpenses: 320,
        taxRatePct: 22,
        vacationWeeks: 3,
        sickHolidaysDays: 10,
        workingDaysPerWeek: 5,
        billableHoursPerDay: 5.0,
        profitBufferPct: 15,
        projectScopeHours: 35,
        contingencyPct: 15
      }
    }
  };

  return {
    PRESETS,
    getDefaultState: () => JSON.parse(JSON.stringify(PRESETS.seniorDev.state))
  };
});
