<template>
  <div class="transport">

    <div class="hero">
      <h1>Compară prețurile <span>transportului</span></h1>
      <p>Uber, Bolt sau Free Now — găsește cea mai ieftină cursă!</p>
    </div>

    <div class="compare-card">
      <h2>🚗 Comparare Transport</h2>

      <!-- DE UNDE -->
      <div class="form-group">
        <label>De unde?</label>
        <div class="autocomplete-wrap">
          <input
            v-model="from"
            type="text"
            placeholder="ex: Piața Unirii, București"
            class="text-input"
            @input="searchFrom"
            @focus="showFromSuggestions = true"
            autocomplete="off"
          />
          <div v-if="showFromSuggestions && fromSuggestions.length > 0" class="suggestions">
            <div
              v-for="s in fromSuggestions"
              :key="s.place_id"
              class="suggestion-item"
              @click="selectFrom(s)"
            >
              📍 {{ s.display_name }}
            </div>
          </div>
        </div>
      </div>

      <!-- UNDE -->
      <div class="form-group">
        <label>Unde?</label>
        <div class="autocomplete-wrap">
          <input
            v-model="to"
            type="text"
            placeholder="ex: Aeroportul Otopeni"
            class="text-input"
            @input="searchTo"
            @focus="showToSuggestions = true"
            autocomplete="off"
          />
          <div v-if="showToSuggestions && toSuggestions.length > 0" class="suggestions">
            <div
              v-for="s in toSuggestions"
              :key="s.place_id"
              class="suggestion-item"
              @click="selectTo(s)"
            >
              📍 {{ s.display_name }}
            </div>
          </div>
        </div>
      </div>

      <button class="compare-btn" @click="handleCompare" :disabled="loading || !fromCoords || !toCoords">
        {{ loading ? 'Se calculează...' : '🔍 Compară Prețurile' }}
      </button>
    </div>

    <!-- RESULTS -->
    <div v-if="results.length > 0" class="results">
      <div class="distance-info">
        📏 Distanță estimată: <strong>{{ distanceKm }} km</strong>
      </div>

      <div class="cheapest-card">
        <div class="cheapest-badge">🏆 CEL MAI IEFTIN</div>
        <h3>{{ results[0].name }}</h3>
        <div class="cheapest-price">{{ results[0].price_min }} – {{ results[0].price_max }} lei</div>
        <div class="cheapest-delivery">⏱️ ~{{ results[0].eta }} minute</div>
        <a :href="results[0].deep_link" target="_blank" class="order-btn">
          Comandă acum →
        </a>
      </div>

      <div class="results-grid">
        <div
          v-for="(result, index) in results"
          :key="result.slug"
          class="result-card"
          :class="{ 'is-cheapest': index === 0 }"
        >
          <div class="result-rank">#{{ index + 1 }}</div>
          <div class="result-info">
            <div class="result-name">{{ result.name }}</div>
            <div class="result-delivery">⏱️ ~{{ result.eta }} min</div>
          </div>
          <div class="result-price-wrap">
            <div class="result-price">{{ result.price_min }}–{{ result.price_max }} lei</div>
          </div>
          <a :href="result.deep_link" target="_blank" class="result-btn">
            Deschide →
          </a>
        </div>
      </div>
    </div>

    <!-- INFO -->
    <div class="info-card">
      <h3>ℹ️ Cum funcționează?</h3>
      <p>Prețurile sunt <strong>estimări</strong> bazate pe distanță reală între cele două adrese. Prețul final poate varia în funcție de trafic și cerere.</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const from = ref('')
const to = ref('')
const fromCoords = ref(null)
const toCoords = ref(null)
const fromSuggestions = ref([])
const toSuggestions = ref([])
const showFromSuggestions = ref(false)
const showToSuggestions = ref(false)
const loading = ref(false)
const results = ref([])
const distanceKm = ref(0)

let fromTimer = null
let toTimer = null

const services = [
  { name: 'Bolt', slug: 'bolt', price_per_km: 2.5, base_price: 5, eta: 5, deep_link: 'https://bolt.eu' },
  { name: 'Uber', slug: 'uber', price_per_km: 2.8, base_price: 6, eta: 6, deep_link: 'https://uber.com' },
  { name: 'Free Now', slug: 'free-now', price_per_km: 3.0, base_price: 7, eta: 8, deep_link: 'https://free-now.com' },
]

async function searchAddress(query) {
  if (query.length < 3) return []
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=ro`
  const res = await fetch(url, {
    headers: { 'Accept-Language': 'ro' }
  })
  return await res.json()
}

function searchFrom() {
  clearTimeout(fromTimer)
  fromCoords.value = null
  fromTimer = setTimeout(async () => {
    fromSuggestions.value = await searchAddress(from.value)
  }, 400)
}

function searchTo() {
  clearTimeout(toTimer)
  toCoords.value = null
  toTimer = setTimeout(async () => {
    toSuggestions.value = await searchAddress(to.value)
  }, 400)
}

function selectFrom(s) {
  from.value = s.display_name
  fromCoords.value = { lat: parseFloat(s.lat), lon: parseFloat(s.lon) }
  fromSuggestions.value = []
  showFromSuggestions.value = false
}

function selectTo(s) {
  to.value = s.display_name
  toCoords.value = { lat: parseFloat(s.lat), lon: parseFloat(s.lon) }
  toSuggestions.value = []
  showToSuggestions.value = false
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

async function handleCompare() {
  if (!fromCoords.value || !toCoords.value) return
  loading.value = true
  results.value = []

  const km = calculateDistance(
    fromCoords.value.lat, fromCoords.value.lon,
    toCoords.value.lat, toCoords.value.lon
  )

  distanceKm.value = km.toFixed(1)

  results.value = services.map(service => {
    const priceMin = (service.base_price + km * service.price_per_km * 0.9).toFixed(2)
    const priceMax = (service.base_price + km * service.price_per_km * 1.1).toFixed(2)
    return { ...service, price_min: priceMin, price_max: priceMax, km }
  }).sort((a, b) => a.price_min - b.price_min)

  loading.value = false
}
</script>

<style scoped>
.transport { max-width: 800px; margin: 0 auto; }

.autocomplete-wrap { position: relative; }

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  z-index: 100;
  max-height: 240px;
  overflow-y: auto;
  margin-top: 4px;
}

.suggestion-item {
  padding: 12px 16px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s;
  line-height: 1.4;
}

.suggestion-item:last-child { border-bottom: none; }
.suggestion-item:hover { background: #f8fafc; color: #6366f1; }

.distance-info {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  color: #166534;
  margin-bottom: 16px;
  text-align: center;
}

.info-card {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 20px 24px;
  margin-top: 24px;
}

.info-card h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #0369a1;
}

.info-card p {
  font-size: 13px;
  color: #0c4a6e;
  line-height: 1.6;
}
</style>