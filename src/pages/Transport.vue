<template>
    <div class="transport">
  
      <!-- HERO -->
      <div class="hero">
        <h1>Compară prețurile <span>transportului</span></h1>
        <p>Uber, Bolt sau Free Now — găsește cea mai ieftină cursă!</p>
      </div>
  
      <!-- FORM -->
      <div class="compare-card">
        <h2>🚗 Comparare Transport</h2>
  
        <div class="form-group">
          <label>De unde?</label>
          <input
            v-model="from"
            type="text"
            placeholder="ex: Piața Unirii, București"
            class="text-input"
          />
        </div>
  
        <div class="form-group">
          <label>Unde?</label>
          <input
            v-model="to"
            type="text"
            placeholder="ex: Aeroportul Otopeni"
            class="text-input"
          />
        </div>
  
        <button class="compare-btn" @click="handleCompare" :disabled="loading">
          {{ loading ? 'Se compară...' : '🔍 Compară Prețurile' }}
        </button>
      </div>
  
      <!-- RESULTS -->
      <div v-if="results.length > 0" class="results">
  
        <div class="cheapest-card">
          <div class="cheapest-badge">🏆 CEL MAI IEFTIN</div>
          <h3>{{ results[0].name }}</h3>
          <div class="cheapest-price">{{ results[0].price_min }} – {{ results[0].price_max }} lei</div>
          <div class="cheapest-delivery">⏱️ {{ results[0].eta }} minute</div>
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
        <p>Prețurile sunt <strong>estimări</strong> bazate pe distanță. Prețul final poate varia în funcție de trafic și cerere. Apasă "Deschide" pentru prețul exact în aplicație.</p>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const from = ref('')
  const to = ref('')
  const loading = ref(false)
  const results = ref([])
  
  // Prețuri estimate per km pentru fiecare serviciu
  const services = [
    { name: 'Bolt', slug: 'bolt', price_per_km: 2.5, base_price: 5, eta: 5, deep_link: 'https://bolt.eu' },
    { name: 'Uber', slug: 'uber', price_per_km: 2.8, base_price: 6, eta: 6, deep_link: 'https://uber.com' },
    { name: 'Free Now', slug: 'free-now', price_per_km: 3.0, base_price: 7, eta: 8, deep_link: 'https://free-now.com' },
  ]
  
  async function handleCompare() {
    if (!from.value || !to.value) return
  
    loading.value = true
    results.value = []
  
    // Simulăm distanța — în viitor folosim Google Maps API
    const estimatedKm = Math.floor(Math.random() * 15) + 3
  
    results.value = services.map(service => {
      const priceMin = (service.base_price + estimatedKm * service.price_per_km * 0.9).toFixed(2)
      const priceMax = (service.base_price + estimatedKm * service.price_per_km * 1.1).toFixed(2)
      return {
        ...service,
        price_min: priceMin,
        price_max: priceMax,
        km: estimatedKm
      }
    }).sort((a, b) => a.price_min - b.price_min)
  
    loading.value = false
  }
  </script>
  
  <style scoped>
  .transport { max-width: 800px; margin: 0 auto; }
  
  .text-input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.2s;
  }
  
  .text-input:focus {
    outline: none;
    border-color: #6366f1;
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