<script setup>
const value = ref('')
const isLoading = ref(false)
function toggleLoading() {
    isLoading.value = !isLoading.value;
}
</script>

<template>
    <label class="text-xl">Repair Order Number</label>
    <div>
        <UInput 
            icon="i-heroicons-magnifying-glass-20-solid"
            size="xl"
            v-model="value"
            placeholder="Enter an RO Number..."
            :loading="isLoading ? true : null"
            @keyup.enter="toggleLoading"
        />
    </div>
</template>

<style>
.addToLoc{
    display: block;
    margin: 1rem auto 1rem auto;
}
</style>