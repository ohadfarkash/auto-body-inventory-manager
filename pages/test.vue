<script setup>

async function onClick() {
    const res = await $fetch('/api/ro/locations', {
        method: 'DELETE',
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