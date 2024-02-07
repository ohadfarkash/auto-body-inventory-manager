<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

const part_data = await $fetch('/api/part', {
    query: {
        id: route.params.id
    }
})

const locations = ref<any[]>([])
async function reloadLocations() {
    locations.value = await $fetch('/api/part/locations', {
        query: {
            id: route.params.id
        }
    })
}
onMounted(() => {
    reloadLocations()
})

const removeModalIsOpen = ref(false)
const removeModalData = reactive({
    location: '',
    qty: 0,
    error: false
})
const removeQty = ref(0)
function onRemove(e: any, row: any) {
    removeModalIsOpen.value = true
    removeModalData.location = row.id
    removeModalData.qty = row.qty
    removeQty.value = 1
}

function closeRemoveModal(e: any) {
    removeModalIsOpen.value = false
}


async function removePartFromLocation(e: any) {
    let qty = removeModalData.qty - removeQty.value
    if (qty <= 0) {
        try {
            const res = await $fetch('/api/part/locations', {
                method: 'DELETE',
                body: {
                    part_id: route.params.id,
                    location: removeModalData.location
                }
            })
            closeRemoveModal(null)
            reloadLocations()
        } catch (error) {
            removeModalData.error = true
        }
    } else {
        try {
            const res = await $fetch('/api/part/locations', {
                method: 'POST',
                body: {
                    part_id: route.params.id,
                    location: removeModalData.location,
                    qty: qty
                }
            })
            closeRemoveModal(null)
            reloadLocations()
        } catch (error) {
            removeModalData.error = true
        }
    }
}


const addModalIsOpen = ref(false)
const addModalData = reactive({
    location: '',
    qty: 0,
    error: false
})
const addQty = ref(0)
function onAdd(e: any, row: any) {
    addModalIsOpen.value = true
    addModalData.location = row.id
    addModalData.qty = row.qty
    addModalData.error = false
    addQty.value = 1
}
function closeAddModal(e: any) {
    addModalIsOpen.value = false
}
async function addPartToLocation(e: any) {
    try {
        const res = await $fetch('/api/part/locations', {
            method: 'POST',
            body: {
                part_id: route.params.id,
                location: addModalData.location,
                qty: addQty.value + addModalData.qty
            }
        })
        closeAddModal(null)
        reloadLocations()
    } catch (error) {
        addModalData.error = true
    }
}

const newModalIsOpen = ref(false)
const newLocation = ref('')
const newQty = ref(0)
const newModalData = reactive({
    error: false
})
function onNew() {
    newModalData.error = false
    newModalIsOpen.value = true
    newQty.value = 0
    newLocation.value = ''
}
function closeNewModal(e: any) {
    newModalIsOpen.value = false
}
async function addPartToNewLocation(e: any) {
    try {
        const res = await $fetch('/api/part/locations', {
            method: 'PUT',
            body: {
                part_id: route.params.id,
                location: newLocation.value,
                qty: newQty.value
            }
        })
        closeNewModal(null)
        reloadLocations()
    } catch (error) {
        newModalData.error = true
    }
}

</script>

<template>
    <UModal class="removeModal" v-model="removeModalIsOpen">
        <UCard>
            <template #header>
                <div class="flex flex-row items-center">
                    <h1 class="text-xl font-bold">Remove Parts From Location</h1>
                    <UButton class="ml-auto block" :padded="false" color="gray" variant="link"
                        icon="i-heroicons-x-mark-20-solid" square size="xl" @click="closeRemoveModal"></UButton>
                </div>
            </template>

            <div class="body">
                <h2 class="mb-2 font-semibold text-lg">Enter Qty to Remove</h2>
                <UInput v-model="removeQty" :max="removeModalData.qty" min="0" class="qty" size="xl" name="qty"
                    type="number" placeholder="Enter Qty" />
                <UDivider type="dashed" />
                <div class="grid">
                    <p class="loc_info">Location:</p>
                    <p>{{ removeModalData.location }}</p>
                    <p class="qty_info">Current Qty:</p>
                    <p>{{ removeModalData.qty }}</p>
                    <p class="qty_info">Qty after removal:</p>
                    <p>{{ removeModalData.qty - removeQty }}</p>
                </div>
            </div>

            <template #footer>
                <div class="w-100">
                    <UButton class="ml-auto block bg-red-800" size="xl" @click="removePartFromLocation">Remove</UButton>
                </div>
            </template>
        </UCard>
    </UModal>


    <UModal class="addModal" v-model="addModalIsOpen">
        <UCard>
            <template #header>
                <div class="flex flex-row items-center">
                    <h1 class="text-xl font-bold">Add Parts To Location</h1>
                    <UButton class="ml-auto block" :padded="false" color="gray" variant="link"
                        icon="i-heroicons-x-mark-20-solid" square size="xl" @click="closeAddModal"></UButton>
                </div>
            </template>

            <div class="body">
                <h2 class="mb-2 font-semibold text-lg">Enter Qty to Add</h2>
                <UInput v-model="addQty" min="0" class="qty" size="xl" name="qty" type="number"
                    placeholder="Enter Qty" />
                <UDivider type="dashed" />
                <div class="grid">
                    <p class="loc_info">Location:</p>
                    <p>{{ addModalData.location }}</p>
                    <p class="qty_info">Current Qty:</p>
                    <p>{{ addModalData.qty }}</p>
                    <p class="qty_info">Qty after adding:</p>
                    <p>{{ addModalData.qty + addQty }}</p>
                </div>
            </div>

            <template #footer>
                <div class="w-100 flex flex-row justify-between">
                    <p class="text-red-800" v-show="addModalData.error">Could not add part to location!</p>
                    <UButton class="ml-auto block bg-green-800" size="xl" @click="addPartToLocation">Add</UButton>
                </div>
            </template>
        </UCard>
    </UModal>

    <UModal class="newModal" v-model="newModalIsOpen">
        <UCard>
            <template #header>
                <div class="flex flex-row items-center">
                    <h1 class="text-xl font-bold">Add Parts To Location</h1>
                    <UButton class="ml-auto block" :padded="false" color="gray" variant="link"
                        icon="i-heroicons-x-mark-20-solid" square size="xl" @click="closeNewModal"></UButton>
                </div>
            </template>

            <div class="body">
                <h2 class="mb-2 font-semibold text-lg">Enter Location</h2>
                <UInput v-model="newLocation" class="qty" size="xl" name="location" />
                <h2 class="mb-2 font-semibold text-lg mt-4">Enter Qty to Add</h2>
                <UInput v-model="newQty" min="0" class="qty" size="xl" name="qty" type="number"
                    placeholder="Enter Qty" />
            </div>

            <template #footer>
                <div class="w-100 flex flex-row justify-between">
                    <p class="text-red-800" v-show="newModalData.error">Could not add part to location!</p>
                    <UButton class="ml-auto block bg-green-800" size="xl" @click="addPartToNewLocation">Add</UButton>
                </div>
            </template>
        </UCard>
    </UModal>

    <header>
        <img class="logo" src="/images/logo.png">
        <h1>Inventory Manager</h1>
    </header>
    <UBreadcrumb divider="/"
        :links="[{ label: 'Home', to: '/' }, { label: 'Stock Parts', to: '/parts' }, { label: 'Part ' + $route.params.id, to: '' }]" />

    <div class="data_fields">
        <h2>Internal ID:</h2>
        <p>{{ $route.params.id }}</p>
        <h2>Part Number:</h2>
        <p>{{ part_data.part_num }}</p>
        <h2>Part Name:</h2>
        <p>{{ part_data.name }}</p>
    </div>

    <div class="locations_table">
        <h2 class="id text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">Location
        </h2>
        <h2 class="desc text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
            Description</h2>
        <h2 class="qty text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">Qty</h2>
        <h2></h2>
        <div class="head_sep"></div>
        <template v-for="item in locations" v-if="locations.length > 0">
            <p class="id px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.id }}</p>
            <p class="desc px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.description }}</p>
            <p class="qty px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.qty }}</p>
            <div class="flex flex-col justify-center gap-2">
                <UButton class="remove_button" :padded="false" color="gray" variant="link" @click="onAdd($event, item)">
                    <Icon size="24" name="material-symbols:variable-add-rounded" color="darkgreen" />
                    <p style="color:darkgreen;">Add</p>
                </UButton>
                <UButton class="remove_button" :padded="false" color="gray" variant="link" @click="onRemove($event, item)">
                    <Icon size="24" name="material-symbols:variable-remove-rounded" color="darkred" />
                    <p style="color:darkred;">Remove</p>
                </UButton>
            </div>
            <div class="sep"></div>
        </template>
        <div v-else class="col-span-full flex flex-col justify-center m-6">
            <Icon class="m-auto" size="48" name="material-symbols:database" color="lightgray" />
            <p class="m-auto text-gray-400">No Locations Found</p>
        </div>
    </div>

    <div class="w-100">
        <UButton @click="onNew" class="ml-auto block" color="gray">Add to New Location</UButton>
    </div>
</template>

<style>
.removeModal,
.addModal {
    .body {
        div.grid {
            margin-top: 1rem;
            display: grid;
            grid-template-columns: min-content min-content;
            gap: 1rem;

            p {
                white-space: nowrap;
            }
        }

        .qty {
            margin-bottom: 1.5rem;
        }
    }
}

.locations_table {
    display: grid;
    grid-template-columns: min-content auto min-content min-content;

    & .id {
        white-space: nowrap;
    }

    .desc {
        white-space: pre-line;
    }

    .head_sep {
        grid-column: 1 / 5;
        border-bottom: 1px solid lightgray;
    }

    & .sep {
        grid-column: 1 / 5;
        border-bottom: 1px solid rgb(235, 235, 235);
    }

    & .sep:last-child {
        display: none;
    }

    @media only screen and (max-width: 480px) {
        .remove_button p {
            display: none;
        }
    }
}

.data_fields {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: min-content auto;
    align-items: baseline;
    column-gap: 1rem;

    &>h2 {
        font-weight: bold;
        white-space: nowrap;
    }

    margin-bottom: 2rem;
}</style>