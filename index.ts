type RetirementCalcResult = {
  retirementAge: string
  retirementTime: string
  delayMonths: string
}

function calculateRetirementInfo(
  birthYear: number,
  birthMonth: number,
  type: 'male' | 'female50' | 'female55',
): RetirementCalcResult {
  const addMonths = (year: number, month: number, addMonth: number) => {
    const date = new Date(year, month - 1, 1)
    date.setMonth(date.getMonth() + addMonth)
    return `${date.getFullYear()}年${date.getMonth() + 1}月`
  }

  const result: RetirementCalcResult = { retirementAge: '', retirementTime: '', delayMonths: '' }

  if (type === 'male') {
    const baseYear = 1965
    const baseYearPlus = birthYear - baseYear

    if (birthYear < 1965) {
      result.retirementAge = '60岁'
      result.retirementTime = addMonths(birthYear, birthMonth, 720)
      result.delayMonths = '0个月'
    } else if (birthYear > 1976) {
      result.retirementAge = '63岁'
      result.retirementTime = addMonths(birthYear, birthMonth, 756)
      result.delayMonths = '36个月'
    } else {
      const delayMonths = Math.ceil((baseYearPlus * 12) / 4)
      const retirementAgeYears = 60 + Math.floor(delayMonths / 12)
      const retirementAgeMonths = delayMonths % 12
      result.retirementAge = `${retirementAgeYears}岁${retirementAgeMonths > 0 ? `${retirementAgeMonths}个月` : ''}`
      result.retirementTime = addMonths(birthYear, birthMonth, 720 + delayMonths)
      result.delayMonths = `${delayMonths}个月`
    }
  }

  return result
}
