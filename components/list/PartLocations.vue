<script setup>
const columns = [{
    key: 'view',
    class: 'w-10'
}, {
    key: 'pn',
    label: 'PN',
    class: 'w-[8.5rem]'
}, {
    key: 'description',
    label: 'Description',
    class: 'w-auto'
}, {
    key: 'qty',
    label: 'Qty',
    class: 'w-10'
},  {
    key: 'remove',
    class: 'w-[8rem]'
}]
const props = defineProps(['items', 'part_id'])
const emit = defineEmits(['delete'])

async function deleteLocation(e, row){
    if (window.confirm(`Are you sure you want to remove ${props.ro_number} from ${row.id}?`)){
        try {
            const res = await $fetch('/api/ro/locations', {
                method: 'DELETE',
                body: {
                    ro: props.ro_number,
                    location: row.id
                }
            })
            emit('delete', [res])
            //console.log(res)
        } catch (error) {
            console.error(error)
        }
    }
}

</script>

<template>
    <label class="text-xl">Locations of Part</label>
    <UTable class="w-full" :rows="items" :columns="columns" :ui="{ base: 'w-full', tr: { base: 'align-top' } }">
        <template #view-data="{ row }">
            <UButton :padded=" false " icon="i-heroicons-eye-20-solid" color="gray" square variant="link" />
        </template>
        <template #description-data="{ row }">
            <span class="whitespace-pre-line">{{ row.description }}</span>
        </template>
        <template #remove-data="{ row }">
            <UButton class="remove_button" :padded=" false " color="gray" variant="link" @click="deleteLocation($event, row)">
                <Icon size="24" name="material-symbols:variable-remove-rounded" color="darkred" />
                <p style="color:darkred;">Remove</p>
            </UButton>
        </template>
    </UTable>
</template>

<style>
@media only screen and (max-width: 720px) {
    .remove_button p {
        display: none;
    }
}
</style>