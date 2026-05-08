<template>
  <div class="app">

    <!-- HEADER -->
    <header>
      <div class="header-inner">
        <div class="logo">
          📦 <span>Compare</span>Ro
        </div>
        <nav>
          <a href="#courier">Curierat</a>
          <a href="#transport">Transport</a>
          <a href="#food">Mâncare</a>
        </nav>
      </div>
    </header>

    <!-- MAIN -->
    <main>
      <RouterView />
    </main>

    <!-- NAV -->
    <nav>
  <RouterLink to="/">📦 Curierat</RouterLink>
  <RouterLink to="/transport">🚗 Transport</RouterLink>
  <RouterLink to="/food">🍕 Mâncare</RouterLink>
</nav>

    <!-- FOOTER -->
    <footer>
      <p>© 2026 CompareRo — Compară și economisește!</p>
    </footer>

  </div>
</template>

<script setup>
</script>
