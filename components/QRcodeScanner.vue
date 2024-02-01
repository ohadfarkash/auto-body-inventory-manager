<script setup>
import { Html5QrcodeScanner } from 'html5-qrcode'
onMounted(() => {
    const scanner = new Html5QrcodeScanner('qr-code-full-region', {
        fps: 10,
        qrbox: 300
    });
    scanner.render(onScanSuccess)
})

const emit = defineEmits(['result'])
function onScanSuccess(decodedText, decodedResult) {
    emit('result', decodedText, decodedResult);
}
function startScan() {

}
</script>

<template>
    <div>
        <div id="qr-code-full-region"></div>
        <button @click="startScan">Start Scan</button>
    </div>
</template>