<script setup>
const isOpen = defineModel()

const location = ref('')
function onkeyup(e){
    
}

function closeModal(){
    isOpen.value = false
}
</script>

<template>
    <UModal class="location_modal" v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="header">
                    <h1>Add RO to Location</h1>
                    <UButton class="ml-auto block" :padded="false" color="gray" variant="link"
                        icon="i-heroicons-x-mark-20-solid" square size="xl" @click="closeModal"></UButton>
                </div>
            </template>
            <div>
                <p class="pb-4">Enter a Location ID to add Repair Order to location.</p>
                <UInput size="xl" color="gray" variant="outline" placeholder="A##-B##-C##" v-model="location" @keyup="onkeyup"/>
            </div>
            <template #footer>
                <div class="footer">
                    <UButton class="ml-auto block" size="xl" @click="closeModal">Add</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<style>
.location_modal {
    & h1 {
        font-weight: bold;
        font-size: 1.2rem;
    }

    & .header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: space-between;
    }

    & .footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }
}
</style>