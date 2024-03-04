<template>
    <header class="bg-white shadow-lg h-16 flex justify-between items-stretch">
      <router-link :to="{name: 'home'}" class="inline-flex items-center h-full px-5 text-blue-500 font-bold">Home</router-link>
      <div class="flex items-center gap-1">
        <router-link :to="{name: 'home'}" class="inline-flex items-center px-2 h-full transition-colors hover:bg-blue-500 hover:text-white">Show users</router-link>
        <router-link :to="{name: 'add_user'}" class="inline-flex items-center px-2 h-full transition-colors hover:bg-blue-500 hover:text-white">Add a user</router-link>
      </div>
    </header>
</template>

<script setup>
</script>