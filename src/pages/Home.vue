<template>
    <div class="home">
  
      <!-- HERO -->
      <div class="hero">
        <h1>Compară prețurile <span>curierilor</span> din România</h1>
        <p>Găsește cel mai ieftin curier pentru coletul tău în câteva secunde!</p>
      </div>
  
      <!-- FORM -->
      <div class="compare-card" id="courier">
        <h2>📦 Comparare Curierat</h2>
  
        <div class="form-group">
          <label>Greutate colet (kg)</label>
          <div class="weight-input">
            <button @click="decreaseWeight">−</button>
            <input
              v-model.number="weight"
              type="number"
              min="0.1"
              max="31"
              step="0.5"
            />
            <button @click="increaseWeight">+</button>
          </div>
          <span class="hint">Greutate între 0.1 și 31 kg</span>
        </div>
  
        <button class="compare-btn" @click="handleCompare" :disabled="store.loading">
          {{ store.loading ? 'Se compară...' : '🔍 Compară Prețurile' }}
        </button>
      </div>
  
      <!-- RESULTS -->
      <div v-if="store.results.length > 0" class="results">
  
        <!-- CHEAPEST -->
        <div class="cheapest-card">
          <div class="cheapest-badge">🏆 CEL MAI IEFTIN</div>
          <h3>{{ store.cheapest.courier }}</h3>
          <div class="cheapest-price">{{ store.cheapest.price }} lei</div>
          <div class="cheapest-delivery">⏱️ Livrare în {{ store.cheapest.delivery_text }}</div>
          <a :href="store.cheapest.website" target="_blank" class="order-btn">
            Comandă acum →
          </a>
        </div>
  
        <!-- ALL RESULTS -->
        <div class="results-grid">
          <div
            v-for="(result, index) in store.results"
            :key="result.slug"
            class="result-card"
            :class="{ 'is-cheapest': index === 0 }"
          >
            <div class="result-rank">#{{ index + 1 }}</div>
            <div class="result-info">
              <div class="result-name">{{ result.courier }}</div>
              <div class="result-delivery">⏱️ {{ result.delivery_text }}</div>
            </div>
            <div class="result-price-wrap">
              <div class="result-price">{{ result.price }} lei</div>
              <div v-if="index > 0" class="result-diff">
                +{{ (result.price - store.results[0].price).toFixed(2) }} lei
              </div>
            </div>
            <a :href="result.website" target="_blank" class="result-btn">
              Vezi →
            </a>
          </div>
        </div>
  
      </div>
  
      <!-- ERROR -->
      <div v-if="store.error" class="error-msg">
        {{ store.error }}
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useCourierStore } from '../stores/useCourierStore'
  
  const store = useCourierStore()
  const weight = ref(1)
  
  function increaseWeight() {
    if (weight.value < 31) weight.value = Math.round((weight.value + 0.5) * 10) / 10
  }
  
  function decreaseWeight() {
    if (weight.value > 0.5) weight.value = Math.round((weight.value - 0.5) * 10) / 10
  }
  
  async function handleCompare() {
    if (weight.value < 0.1 || weight.value > 31) return
    await store.compare(weight.value)
  }
  </script>
  
  <style scoped>
  .home { max-width: 800px; margin: 0 auto; }
  
  /* HERO */
  .hero {
    text-align: center;
    margin-bottom: 48px;
  }
  
  .hero h1 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 12px;
    line-height: 1.2;
  }
  
  .hero h1 span { color: #fde68a !important; }
  
  .hero p {
    color: #64748b;
    font-size: 16px;
  }
  
  /* FORM */
  .compare-card {
    background: white;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    margin-bottom: 32px;
  }
  
  .compare-card h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
  }
  
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-group label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #374151;
  }
  
  .weight-input {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .weight-input button {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: white;
    font-size: 20px;
    cursor: pointer;
    color: #6366f1;
    font-weight: 700;
    transition: all 0.2s;
  }
  
  .weight-input button:hover {
    background: #6366f1;
    color: white;
    border-color: #6366f1;
  }
  
  .weight-input input {
    width: 100px;
    height: 40px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
  
  .hint {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 6px;
    display: block;
  }
  
  .compare-btn {
    width: 100%;
    padding: 14px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .compare-btn:hover { background: #4f46e5; }
  .compare-btn:disabled { background: #94a3b8; cursor: not-allowed; }
  
  /* CHEAPEST */
  .cheapest-card {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 16px;
    padding: 28px;
    color: white;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .cheapest-badge {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 12px;
    opacity: 0.9;
  }
  
  .cheapest-card h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  
  .cheapest-price {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 8px;
  }
  
  .cheapest-delivery {
    font-size: 14px;
    opacity: 0.85;
    margin-bottom: 20px;
  }
  
  .order-btn {
    display: inline-block;
    background: white;
    color: #6366f1;
    padding: 12px 28px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    transition: all 0.2s;
  }
  
  .order-btn:hover { transform: translateY(-2px); }
  
  /* RESULTS */
  .results-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .result-card {
    background: white;
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    border: 1.5px solid transparent;
    transition: all 0.2s;
  }
  
  .result-card:hover { border-color: #6366f1; }
  
  .result-card.is-cheapest {
    border-color: #6366f1;
    background: #fafafe;
  }
  
  .result-rank {
    font-size: 16px;
    font-weight: 700;
    color: #94a3b8;
    min-width: 32px;
  }
  
  .result-card.is-cheapest .result-rank { color: #6366f1; }
  
  .result-info { flex: 1; }
  
  .result-name {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .result-delivery {
    font-size: 12px;
    color: #64748b;
  }
  
  .result-price-wrap { text-align: right; }
  
  .result-price {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
  }
  
  .result-diff {
    font-size: 12px;
    color: #ef4444;
    margin-top: 2px;
  }
  
  .result-btn {
    padding: 8px 16px;
    background: #f1f5f9;
    color: #6366f1;
    border-radius: 6px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
    white-space: nowrap;
  }
  
  .result-btn:hover { background: #6366f1; color: white; }
  
  .error-msg {
    background: #fef2f2;
    color: #ef4444;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
  }
  </style>