import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCourierStore = defineStore('couriers', () => {
  const results = ref([])
  const cheapest = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const couriers = [
    {
      name: 'Fan Courier',
      slug: 'fan-courier',
      website: 'https://www.fancourier.ro',
      delivery_days: 1,
      delivery_text: '24h',
      prices: [
        { weight_max: 1, price: 18.50, extra_kg: 2.50 },
        { weight_max: 3, price: 21.00, extra_kg: 2.50 },
        { weight_max: 5, price: 24.00, extra_kg: 2.50 },
        { weight_max: 10, price: 29.00, extra_kg: 2.00 },
        { weight_max: 20, price: 39.00, extra_kg: 1.50 },
        { weight_max: 31, price: 55.00, extra_kg: 1.50 },
      ]
    },
    {
      name: 'Sameday',
      slug: 'sameday',
      website: 'https://www.sameday.ro',
      delivery_days: 1,
      delivery_text: '24h',
      prices: [
        { weight_max: 1, price: 15.00, extra_kg: 2.00 },
        { weight_max: 3, price: 18.00, extra_kg: 2.00 },
        { weight_max: 5, price: 21.00, extra_kg: 2.00 },
        { weight_max: 10, price: 26.00, extra_kg: 1.80 },
        { weight_max: 20, price: 35.00, extra_kg: 1.50 },
        { weight_max: 31, price: 49.00, extra_kg: 1.50 },
      ]
    },
    {
      name: 'DPD',
      slug: 'dpd',
      website: 'https://www.dpd.com/ro',
      delivery_days: 2,
      delivery_text: '2 zile',
      prices: [
        { weight_max: 1, price: 17.00, extra_kg: 2.20 },
        { weight_max: 3, price: 20.00, extra_kg: 2.20 },
        { weight_max: 5, price: 23.00, extra_kg: 2.20 },
        { weight_max: 10, price: 28.00, extra_kg: 1.90 },
        { weight_max: 20, price: 37.00, extra_kg: 1.60 },
        { weight_max: 31, price: 52.00, extra_kg: 1.60 },
      ]
    },
    {
      name: 'Cargus',
      slug: 'cargus',
      website: 'https://www.cargus.ro',
      delivery_days: 1,
      delivery_text: '24h',
      prices: [
        { weight_max: 1, price: 16.50, extra_kg: 2.30 },
        { weight_max: 3, price: 19.50, extra_kg: 2.30 },
        { weight_max: 5, price: 22.50, extra_kg: 2.30 },
        { weight_max: 10, price: 27.50, extra_kg: 1.90 },
        { weight_max: 20, price: 36.50, extra_kg: 1.60 },
        { weight_max: 31, price: 51.00, extra_kg: 1.60 },
      ]
    },
    {
      name: 'GLS',
      slug: 'gls',
      website: 'https://gls-group.com/RO',
      delivery_days: 2,
      delivery_text: '2 zile',
      prices: [
        { weight_max: 1, price: 19.00, extra_kg: 2.50 },
        { weight_max: 3, price: 22.00, extra_kg: 2.50 },
        { weight_max: 5, price: 25.00, extra_kg: 2.50 },
        { weight_max: 10, price: 30.00, extra_kg: 2.00 },
        { weight_max: 20, price: 40.00, extra_kg: 1.80 },
        { weight_max: 31, price: 56.00, extra_kg: 1.80 },
      ]
    },
  ]

  function getPriceForWeight(courier, weight) {
    const tier = courier.prices.find(p => weight <= p.weight_max)
    if (!tier) return null
    return tier.price
  }

  async function compare(weight) {
    loading.value = true
    error.value = null
    results.value = []
    cheapest.value = null

    try {
      const calculated = couriers.map(courier => {
        const price = getPriceForWeight(courier, weight)
        if (!price) return null
        return {
          courier: courier.name,
          slug: courier.slug,
          website: courier.website,
          price: price,
          delivery_days: courier.delivery_days,
          delivery_text: courier.delivery_text,
        }
      })
      .filter(Boolean)
      .sort((a, b) => a.price - b.price)

      results.value = calculated
      cheapest.value = calculated[0]
    } catch (e) {
      error.value = 'Eroare la comparare!'
    } finally {
      loading.value = false
    }
  }

  return { results, cheapest, loading, error, compare }
})