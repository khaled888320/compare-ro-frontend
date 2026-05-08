<template>
  <div class="app">

    <!-- HEADER -->
    <header>
      <div class="header-inner">
        <div class="logo">
          <div class="logo-icon">📦</div>
          <span>Compare</span>Ro
        </div>
        <nav>
          <RouterLink to="/">📦 Curierat</RouterLink>
          <RouterLink to="/transport">🚗 Transport</RouterLink>
          <RouterLink to="/food">🍕 Mâncare</RouterLink>
        </nav>
      </div>
    </header>

    <!-- MAIN -->
    <main>
      <RouterView />
    </main>

    <!-- FOOTER -->
    <footer>
      <p>© 2026 CompareRo — Compară și economisește!</p>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>