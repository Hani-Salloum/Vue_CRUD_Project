<template>
  <div class=" min-h-full">
    <NavBar />
    <main>
      <div class="max-w-[1200px] mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from './NavBar.vue';
</script>