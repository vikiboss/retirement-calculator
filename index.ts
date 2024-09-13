type RetirementInfo = {
  retirementAge: string
  retirementTime: string
  delayMonths: string
}

function calculateRetirement(
  yearOfBirth: number,
  monthOfBirth: number,
  type: 'male' | 'female50' | 'female55',
): RetirementInfo {
  const monthDiff = (fromYear: number, fromMonth: number, toYear: number, toMonth: number): number => {
    return (toYear - fromYear) * 12 + toMonth - fromMonth
  }

  const addMonths = (date: Date, months: number): Date => {
    date.setMonth(date.getMonth() + months)
    return date
  }

  let retirementAge = ''
  let retirementTime = ''
  let delayMonths = 0

  if (type === 'male') {
    if (yearOfBirth < 1965) {
      retirementAge = '60岁'
      delayMonths = 0
    } else if (yearOfBirth > 1976) {
      retirementAge = '63岁'
      delayMonths = 36
    } else {
      const diff = Math.ceil(monthDiff(1965, 1, yearOfBirth, monthOfBirth) / 4)
      const extraYears = Math.floor(diff / 12)
      const extraMonths = diff % 12
      retirementAge = `${60 + extraYears}岁${extraMonths > 0 ? `${extraMonths}个月` : ''}`
      delayMonths = diff
    }
  } else if (type === 'female55') {
    if (yearOfBirth < 1970) {
      retirementAge = '55岁'
      delayMonths = 0
    } else if (yearOfBirth > 1981) {
      retirementAge = '58岁'
      delayMonths = 36
    } else {
      const diff = Math.ceil(monthDiff(1970, 1, yearOfBirth, monthOfBirth) / 4)
      const extraYears = Math.floor(diff / 12)
      const extraMonths = diff % 12
      retirementAge = `${55 + extraYears}岁${extraMonths > 0 ? `${extraMonths}个月` : ''}`
      delayMonths = diff
    }
  } else if (type === 'female50') {
    if (yearOfBirth < 1975) {
      retirementAge = '50岁'
      delayMonths = 0
    } else if (yearOfBirth > 1984) {
      retirementAge = '55岁'
      delayMonths = 60
    } else {
      const diff = Math.ceil(monthDiff(1975, 1, yearOfBirth, monthOfBirth) / 2)
      const extraYears = Math.floor(diff / 12)
      const extraMonths = diff % 12
      retirementAge = `${50 + extraYears}岁${extraMonths > 0 ? `${extraMonths}个月` : ''}`
      delayMonths = diff
    }
  }

  const retirementStartDate = addMonths(
    new Date(yearOfBirth, monthOfBirth - 1),
    (type === 'male' ? 60 : type === 'female55' ? 55 : 50) * 12 + delayMonths,
  )
  retirementTime = `${retirementStartDate.getFullYear()}年${retirementStartDate.getMonth() + 1}月`

  return {
    retirementAge,
    retirementTime,
    delayMonths: `${delayMonths}个月`,
  }
}
