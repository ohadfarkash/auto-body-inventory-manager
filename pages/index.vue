<script setup lang="ts">
const route = useRoute()

const links = [
  {
    label: 'Repair Order Locations',
    to: '/repairorders'
  },
  {
    label: 'Stock-Part Locations',
    to: '/parts'
  }
]
</script>

<template>
  <header>
    <img class="logo" src="/images/logo.png">
    <h1>Inventory Manager</h1>
  </header>

  <UVerticalNavigation :links="links" />
</template>
  
<style>
</style>