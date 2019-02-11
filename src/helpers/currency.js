

export const currencyFormater = (value) => {
  let num = value.replace(/[^0-9\\]+/g, '')
  if (!num) {
    return 0
  }

  if (typeof num !== 'string') {
    num = String(num)
  }
  const finalFloat = (parseFloat(num.replace(/[^0-9\\]+/g, '')) / 100).toFixed(2)

  return finalFloat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default currencyFormater
