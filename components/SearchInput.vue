<script setup>
const value = defineModel()
const isLoading = ref(false)
defineEmits(['search'])
</script>

<template>
    <label class="text-xl">Repair Order Number</label>
    <div class="search_bar">
        <UInput 
            class="search_input"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="xl"
            v-model="value"
            placeholder="Enter an RO Number..."
            :loading="isLoading ? true : null"
            @keyup.enter="$emit('search')"
        />
        <UButton
        size="xl"
        @click="$emit('search')"
        >
            Search
        </UButton>
    </div>
</template>

<style>
.search_bar{
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: .5rem;
    &>.search_input{
        flex-grow: 1;
    }
}
</style>