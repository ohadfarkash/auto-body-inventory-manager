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
body {
  margin: 1rem auto 0 auto;
  max-width: 720px;
}

@media only screen and (max-width: 720px) {
  body {
    margin: 1rem;
  }
}

header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  &>h1 {
    font-size: 2.2rem;
    font-weight: 600;
  }

  margin-bottom: 2rem;
}

img.logo {
  height: 6rem;
}
</style>