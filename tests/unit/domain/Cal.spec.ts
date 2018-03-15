import { Cal } from '@/domain/Cal';
describe('Cal sample', () => {
  it('1 person share', () => {
    const debtAccounts = {
      'Nong': {},
      'Aki': {}
    }
    const cost = 20
    const whoPaid =  'Aki'
    const toWhom = ['Aki', 'Nong']

    const result = Cal(debtAccounts, cost, whoPaid, toWhom)

    expect(result).toEqual({
    'Nong': { 'Aki': 10 },
    'Aki': {}
    })
  })

  it('two person share', () => {
    const debtAccounts = {
      'Nong': {},
      'Aki': {}
    }
    const cost = 20
    const whoPaid =  'Nong'
    const toWhom = ['Nong', 'Aki']

    const result = Cal(debtAccounts, cost, whoPaid, toWhom)

    expect(result).toEqual({
    'Nong': {},
    'Aki': { 'Nong': 10 }
    })
  })

  it('three person share', () => {
    const debtAccounts = {
      'Nong': {},
      'Aki': {},
      'Kob': {}
    }
    const cost = 30
    const whoPaid =  'Nong'
    const toWhom = ['Nong', 'Aki', 'Kob']

    const result = Cal(debtAccounts, cost, whoPaid, toWhom)

    expect(result).toEqual({
    'Nong': {},
    'Aki': { 'Nong': 10 }
    'Kob': { 'Nong': 10 }
    })
  })
})
