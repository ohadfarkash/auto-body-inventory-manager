<script setup>
const value = ref('')
function onkeyup(e){
    console.log(e)
    console.log(value)
}
</script>

<template>

    <SearchInput @search="onkeyup" v-model="value"/>
</template>