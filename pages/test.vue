<script setup>
const print = ref('')
function onScan(e) {
    print.value = e + ''
}
</script>

<template>
    <QRcodeScanner style="width: 400px; height: 400px;" @result="onScan" />
    <p>{{ print }}</p>
</template>