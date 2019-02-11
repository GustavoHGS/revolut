import apiFX from 'api/apiFX'
import { FIXER_API_KEY } from 'helpers/constants'

const BootstrapService = {
  async fetchExchangeRate(baseCurrency, symbols) {
    const res = await apiFX.get(`/latest?access_key=${FIXER_API_KEY}&base=${baseCurrency}&symbols=${}`)
    return res.data
  },
}

export default BootstrapService
