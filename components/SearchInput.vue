<script setup>
const value = ref('')
const isLoading = ref(false)
function toggleLoading() {
    isLoading.value = !isLoading.value;
}
</script>

<template>
    <label class="text-xl">RO</label>
    <UInput 
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        v-model="value"
        placeholder="Enter an RO Number..."
        :loading="isLoading ? 'true' : null"
    />
  <button @click="toggleLoading">Toggle Loading</button>
</template>