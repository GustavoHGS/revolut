

export const currencyFormatter = (value) => {
  if (!value) {
    return 0
  }
  let num = String(value).replace(/[^0-9-\\]+/g, '')

  if (typeof num !== 'string') {
    num = String(num)
  }
  const finalFloat = (parseFloat(num.replace(/[^0-9-\\]+/g, '')) / 100).toFixed(2)

  return finalFloat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const removeCommas = value => String(value).replace(/,/g, '')

export const toDouble = value => parseFloat(parseFloat(removeCommas(value)).toFixed(2))
