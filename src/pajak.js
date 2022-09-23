import * as data from "./__mockdata.pajak.js"
import { taxCategory, reliefCategory } from "./category.constant.js";

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

const calculateTaxScheme = (person) => {
  if (person.salary <= 0 || !person.salary)
    return {error: 'something is wrong with the person salary'};

  const taxableIncome = person.salary * 12;
  const taxIncome = calculateHelper(taxableIncome);

  return { taxableIncome, taxIncome };
}

const calculateTaxRelief = (person) => {
  const {salary, profile} = person;
  if (!Object.keys(reliefCategory).includes(profile) || salary <= 0)
    return {error: 'something is wrong with the person data'};

  let taxableIncome = (salary * 12) - reliefCategory[profile];
  if (taxableIncome <= 0 || !taxableIncome) taxableIncome = 0;

  let taxIncome = calculateHelper(taxableIncome);
  if (taxIncome <= 0 || !taxIncome) taxIncome = 0;

  return {taxableIncome, taxIncome};
}

export { calculateTaxScheme, calculateTaxRelief };

// to print example

const person = data.person3;
const log = console.log;

log('salary: ' + person.salary + ' IDR / month');
log('status: ' + person.profile);
log('///////////////////////////////////');
log(`[ Tax Scheme Calculation ] RESULT = ${JSON.stringify(calculateTaxScheme(person))}`);
log('===============================');
log(`[ Tax Relief Calculation ] RESULT = ${JSON.stringify(calculateTaxRelief(person))}`);
