import * as data from "./__mockdata.pajak"
import { taxCategory, reliefCategory } from "./category.constant.js";

const log = console.log;

// data values
const person = {
  salary: -25000000,
  profile: 'TK0',
}

const calculateHelper = (annualSalary) => {
  const {levelOne, levelTwo, levelThree, levelFour} = taxCategory;
  if (annualSalary <= levelOne) return null;

  let remainingSalary = annualSalary;
  let annualTax;

  switch (true) {
    case (annualSalary <= levelTwo):
      annualTax = annualSalary * 0.05;
      break;

    case (annualSalary <= levelThree):
      remainingSalary -= levelTwo;
      annualTax = (levelTwo * 0.05) + (remainingSalary * 0.15);
      break;

    case (annualSalary <= levelFour):
      remainingSalary -= levelThree;
      annualTax = (levelTwo * 0.05) + ((levelThree - levelTwo) * 0.15) + (remainingSalary * 0.25);
      break;

    case (annualSalary > levelFour):
      remainingSalary -= levelFour;
      annualTax =
        (levelTwo * 0.05) +
        ((levelThree - levelTwo) * 0.15) +
        ((levelFour - levelThree) * 0.25) +
        (remainingSalary * 0.30);
      break;
  }

  return annualTax;
}

export const calculateTaxScheme = (person) => {
  if (person.salary <= 0 || !person.salary)
    return {error: 'something is wrong with the person salary'};

  const taxableIncome = person.salary * 12;
  const taxIncome = calculateHelper(taxableIncome);

  return { taxableIncome, taxIncome };
}

export const calculateTaxRelief = (person) => {
  const {salary, profile} = person;
  if (!Object.keys(reliefCategory).includes(profile) || salary <= 0)
    return {error: 'something is wrong with the person data'};

  let taxableIncome = (salary * 12) - reliefCategory[profile];
  if (taxableIncome <= 0 || !taxableIncome) taxableIncome = 0;

  let taxIncome = calculateHelper(taxableIncome);
  if (taxIncome <= 0 || !taxIncome) taxIncome = 0;

  return {taxableIncome, taxIncome};
}


log('salary: ' + person.salary + ' IDR / month');
log('status: ' + person.profile);
log('///////////////////////////////////');
log(`[ Tax Scheme Calculation ] RESULT = ${JSON.stringify(calculateTaxScheme(data.person4))}`);
log('===============================');
log(`[ Tax Relief Calculation ] RESULT = ${JSON.stringify(calculateTaxRelief(data.person4))}`);
