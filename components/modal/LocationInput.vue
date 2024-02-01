<script setup>
const modal = defineModel()
const {roNum, isOpen} = toRefs(modal.value)
const inputBar = ref()

const location = ref('')
function onkeyup(e){
    if (e.key == 'Enter'){
        onClickAdd()
    }
}


function closeModal(){
    isOpen.value = false
}

const showError = ref(false)
const errorMsg = ref('')

watch(isOpen, v=>{
    if (v){
        showError.value = false;
        location.value = '';
    }
})
onMounted(() => {
    console.log(inputBar)
})

async function onClickAdd() {
    try {
        const res = await $fetch('/api/ro/locations', {
            method: 'PUT',
            body: {
                ro: roNum.value,
                location: location.value
            }
        },)
        console.log("success")
        closeModal()
    } catch (error) {
        showError.value = true
        errorMsg.value = error.statusMessage
    }
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
                <p class="error_msg" v-show="showError">{{ errorMsg }}</p>
            </div>
            <template #footer>
                <div class="footer">
                    <UButton class="ml-auto block" size="xl" @click="onClickAdd">Add</UButton>
                </div>
            </template>
        </UCard>
    </UModal>
    <UForm ref="inputBar" :state="reactive({})"></UForm>
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

    & .error_msg {
        margin-top: 1rem;
        color: darkred;
    }
}
</style>