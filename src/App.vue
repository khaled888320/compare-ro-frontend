<template>
  <div class="app">

    <header>
      <div class="header-inner">
        <div class="logo">
          <div class="logo-icon">📦</div>
          <span>Compare</span>Ro
        </div>

        <nav :class="{ open: menuOpen }">
          <RouterLink to="/" @click="menuOpen = false">📦 Curierat</RouterLink>
          <RouterLink to="/transport" @click="menuOpen = false">🚗 Transport</RouterLink>
          <RouterLink to="/food" @click="menuOpen = false">🍕 Mâncare</RouterLink>
        </nav>

        <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>© 2026 CompareRo — Compară și economisește!</p>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>