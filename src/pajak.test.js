import { calculateTaxRelief, calculateTaxScheme } from './pajak.js';
import * as data from "./__mockdata.pajak.js"

describe('calculate tax scheme correctly', () => {

  test('first person data - calculate tax scheme', () => {
    expect(calculateTaxScheme(data.person1)).toEqual({
      taxableIncome:60000000,
      taxIncome:4000000
    });
  })
  test('first person data - calculate tax relief', () => {
    expect(calculateTaxRelief(data.person1)).toEqual({
      taxableIncome:0,
      taxIncome:0
    });
  })

  test('second person data - calculate tax scheme', () => {
    expect(calculateTaxScheme(data.person2)).toEqual({
      taxableIncome:120000000,
      taxIncome:13000000
    });
  })
  test('second person data - calculate tax relief', () => {
    expect(calculateTaxRelief(data.person2)).toEqual({
      taxableIncome:61500000,
      taxIncome:4225000
    });
  })

  test('third person data - calculate tax scheme', () => {
    expect(calculateTaxScheme(data.person3)).toEqual({
      taxableIncome:300000000,
      taxIncome:45000000
    });
  })
  test('third person data - calculate tax relief', () => {
    expect(calculateTaxRelief(data.person3)).toEqual({
      taxableIncome:246000000,
      taxIncome:31900000
    });
  })

  test('fourth person data - calculate tax scheme', () => {
    expect(calculateTaxScheme(data.person4)).toEqual({
      taxableIncome:1200000000,
      taxIncome:305000000
    });
  })
  test('fourth person data - calculate tax relief', () => {
    expect(calculateTaxRelief(data.person4)).toEqual({
      taxableIncome:1132500000,
      taxIncome:284750000
    });
  })
})

describe('given wrong data to handle error', () => {
  test('fifth person data - should be error when calculate tax scheme', () => {
    expect(calculateTaxScheme(data.person5)).toHaveProperty('error');
  })

  test('fifth person data - should be error when calculate tax relief', () => {
    expect(calculateTaxRelief(data.person5)).toHaveProperty('error');
  })
})

