<template>
    <div class="food">
  
      <div class="hero">
        <h1>Compară prețurile <span>livrării</span></h1>
        <p>Glovo, Tazz sau Bolt Food — găsește cea mai ieftină livrare!</p>
      </div>
  
      <div class="compare-card">
        <h2>🍕 Comparare Livrare Mâncare</h2>
  
        <div class="form-group">
          <label>Orașul tău</label>
          <select v-model="city" class="text-input">
  <option value="">Selectează orașul</option>
  <optgroup label="Moldova">
    <option value="iasi">Iași</option>
    <option value="bacau">Bacău</option>
    <option value="suceava">Suceava</option>
    <option value="piatra-neamt">Piatra Neamț</option>
    <option value="botosani">Botoșani</option>
    <option value="vaslui">Vaslui</option>
    <option value="focsani">Focșani</option>
    <option value="galati">Galați</option>
    <option value="braila">Brăila</option>
  </optgroup>
  <optgroup label="Transilvania">
    <option value="cluj">Cluj-Napoca</option>
    <option value="brasov">Brașov</option>
    <option value="sibiu">Sibiu</option>
    <option value="targu-mures">Târgu Mureș</option>
    <option value="oradea">Oradea</option>
    <option value="alba-iulia">Alba Iulia</option>
    <option value="bistrita">Bistrița</option>
    <option value="sfantu-gheorghe">Sfântu Gheorghe</option>
    <option value="miercurea-ciuc">Miercurea Ciuc</option>
    <option value="deva">Deva</option>
    <option value="zalau">Zalău</option>
  </optgroup>
  <optgroup label="Muntenia & București">
    <option value="bucuresti">București</option>
    <option value="ploiesti">Ploiești</option>
    <option value="pitesti">Pitești</option>
    <option value="targoviste">Târgoviște</option>
    <option value="alexandria">Alexandria</option>
    <option value="giurgiu">Giurgiu</option>
    <option value="calarasi">Călărași</option>
    <option value="slobozia">Slobozia</option>
  </optgroup>
  <optgroup label="Oltenia">
    <option value="craiova">Craiova</option>
    <option value="ramnicu-valcea">Râmnicu Vâlcea</option>
    <option value="targu-jiu">Târgu Jiu</option>
    <option value="drobeta-turnu-severin">Drobeta-Turnu Severin</option>
    <option value="slatina">Slatina</option>
    <option value="alexandria">Alexandria</option>
  </optgroup>
  <optgroup label="Banat & Vest">
    <option value="timisoara">Timișoara</option>
    <option value="arad">Arad</option>
    <option value="resita">Reșița</option>
    <option value="deva">Deva</option>
  </optgroup>
  <optgroup label="Dobrogea">
    <option value="constanta">Constanța</option>
    <option value="tulcea">Tulcea</option>
  </optgroup>
</select>
        </div>
  
        <div class="form-group">
          <label>Valoare comandă (lei)</label>
          <div class="weight-input">
            <button @click="decreaseOrder">−</button>
            <input v-model.number="orderValue" type="number" min="10" max="500" step="5" />
            <button @click="increaseOrder">+</button>
          </div>
          <span class="hint">Valoarea comenzii afectează taxa de livrare</span>
        </div>
  
        <button class="compare-btn" @click="handleCompare" :disabled="!city">
          🔍 Compară Livrarea
        </button>
      </div>
  
      <!-- RESULTS -->
      <div v-if="results.length > 0" class="results">
  
        <div class="cheapest-card">
          <div class="cheapest-badge">🏆 CEL MAI IEFTIN</div>
          <h3>{{ results[0].name }}</h3>
          <div class="cheapest-price">{{ results[0].delivery_fee }} lei livrare</div>
          <div class="cheapest-delivery">⏱️ {{ results[0].eta }} minute</div>
          <a :href="results[0].link" target="_blank" class="order-btn">
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
              <div class="result-price">{{ result.delivery_fee }} lei</div>
              <div v-if="index > 0" class="result-diff">
                +{{ (result.delivery_fee - results[0].delivery_fee).toFixed(2) }} lei
              </div>
            </div>
            <a :href="result.link" target="_blank" class="result-btn">
              Deschide →
            </a>
          </div>
        </div>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const city = ref('')
  const orderValue = ref(50)
  const results = ref([])
  
  const services = [
    {
      name: 'Tazz',
      slug: 'tazz',
      base_fee: 5.99,
      free_delivery_threshold: 100,
      eta: 35,
      link: 'https://tazz.ro'
    },
    {
      name: 'Bolt Food',
      slug: 'bolt-food',
      base_fee: 6.99,
      free_delivery_threshold: 80,
      eta: 30,
      link: 'https://food.bolt.eu'
    },
    {
      name: 'Glovo',
      slug: 'glovo',
      base_fee: 7.99,
      free_delivery_threshold: 120,
      eta: 40,
      link: 'https://glovoapp.com'
    },
  ]
  
  function decreaseOrder() {
    if (orderValue.value > 10) orderValue.value -= 5
  }
  
  function increaseOrder() {
    if (orderValue.value < 500) orderValue.value += 5
  }
  
  function handleCompare() {
    results.value = services.map(service => {
      const fee = orderValue.value >= service.free_delivery_threshold
        ? 0
        : service.base_fee
  
      return {
        ...service,
        delivery_fee: fee
      }
    }).sort((a, b) => a.delivery_fee - b.delivery_fee)
  }
  </script>
  
  <style scoped>
  .food { max-width: 800px; margin: 0 auto; }
  
  .text-input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.2s;
    background: white;
  }
  
  .text-input:focus {
    outline: none;
    border-color: #6366f1;
  }
  </style>