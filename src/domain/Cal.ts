export const Cal = (debtAccounts: { T: { T: number } }, cost: number, whoPaid: string, toWhoms: string[]): { T: { T: number } } => {
const shared = cost/toWhoms.length

  for let i = 0; i < toWhoms.length; i++ {
    const whom = toWhoms[i]
    if (whom !== whoPaid) {
      debtAccounts[whom][whoPaid] = shared
    }
  }
  return debtAccounts
}
