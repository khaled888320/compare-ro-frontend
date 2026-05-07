import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/axios'

export const useCourierStore = defineStore('couriers', () => {
  const results = ref([])
  const cheapest = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const weight = ref(1)

  async function compare(weightValue) {
    loading.value = true
    error.value = null
    results.value = []
    cheapest.value = null

    try {
      const response = await api.post('/couriers/compare', {
        weight: weightValue
      })
      results.value = response.data.results
      cheapest.value = response.data.cheapest
      weight.value = weightValue
    } catch (e) {
      error.value = 'Eroare la comparare. Încearcă din nou!'
    } finally {
      loading.value = false
    }
  }

  return { results, cheapest, loading, error, weight, compare }
})