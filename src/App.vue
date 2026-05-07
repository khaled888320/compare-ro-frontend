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

    <!-- FOOTER -->
    <footer>
      <p>© 2026 CompareRo — Compară și economisește!</p>
    </footer>

  </div>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #1e293b;
}

/* HEADER */
header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  font-size: 22px;
  font-weight: 800;
  color: #1e293b;
}

.logo span {
  color: #6366f1;
}

nav {
  display: flex;
  gap: 32px;
}

nav a {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s;
}

nav a:hover {
  color: #6366f1;
}

main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
}

footer {
  text-align: center;
  padding: 24px;
  color: #94a3b8;
  font-size: 13px;
  border-top: 1px solid #e2e8f0;
  margin-top: 60px;
}
</style>