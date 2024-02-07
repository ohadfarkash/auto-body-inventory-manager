<script setup>
const baseurl = '/api/ro/locations'
const items = ref([])
const ro = ref('')
const showAddButton = ref(false)

await useFetch(baseurl, {
    query: { ro },
    onRequest({ request, options }) {
        //console.log("[fetch request]", request, options);
    },
    async onRequestError({ request, options, error }) {
        // Log error
        console.log("[fetch request error]", request, error);
    },
    onResponse({ request, response, options }) {
        //console.log("[fetch response]", request, response._data);
        items.value = response._data.map(v => {
            v.remove = { class: 'text-right' }
            return v
        })
    },
    onResponseError({ request, response, options }) {
        //console.log(response)
    }
});

const ro_number = ref('')

function search() {
    showAddButton.value = !!ro_number.value.length
    ro.value = ro_number.value
    triggerRef(ro)
}

const modalData = reactive({roNum:ro_number, isOpen:false})
function openAddToLocationModal(){
    modalData.isOpen = true
}
watch(toRefs(modalData).isOpen, v=>{
    if (!v) {
        search()
    }
})


</script>

<template>
    <header>
        <img class="logo" src="/images/logo.png">
        <h1>Inventory Manager</h1>
    </header>
    <UBreadcrumb divider="/" :links="[{ label: 'Home', to: '/' }, { label: 'Repair Orders', to: '/repairorders' }]" />
    <div>
        <SearchInput @search="search" v-model="ro_number" />
        <div :style="showAddButton ? 'height: 6.75rem;' : 'height: 0px;'" class="addToLocWrapper">
            <UButton class="addToLoc" size="xl" @click="openAddToLocationModal">
                Add RO to a Location
            </UButton>
        </div>
        <ListROLocations :items="items" :ro_number="ro_number" @delete="search"/>
    </div>
    <ModalLocationInput v-model="modalData"/>
</template>
  
<style>
.addToLocWrapper{
    overflow: hidden;
    transition-property: height;
    transition-duration: 150ms;
    display: flex;
    align-items: center;
    justify-content: center;
}
.addToLoc{
    display: block;
    margin: 2rem auto 2rem auto;
}
</style>