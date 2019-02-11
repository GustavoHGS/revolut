import apiFX from 'api/apiFX'
import { FIXER_API_KEY } from 'helpers/constants'

const ExchangeServices = {
  async fetchCurrencyRate(baseCurrency, symbols) {
    const res = await apiFX.get(`/latest?access_key=${FIXER_API_KEY}&base=${baseCurrency}&symbols=${symbols}`)
    return res.data
  },
}

export default ExchangeServices
