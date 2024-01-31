<script setup>

async function onClick() {
    const res = await $fetch('/api/ro/locations', {
        method: 'PUT',
        body: {
            ro: 11555,
            location: 'S01-C01-R03'
        }
    })
    console.log(res)
}
</script>

<template>
    <button @click="onClick">Click Me!</button>
</template>