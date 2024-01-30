<script setup>
const columns = [{
    key: 'view',
    class: 'td_view'
}, {
    key: 'id',
    label: 'ID',
    class: 'td_id'
}, {
    key: 'description',
    label: 'Description',
    class: 'w-auto'
}, {
    key: 'remove',
    class: 'td_remove'
}]
defineProps(['items'])
</script>

<template>
    <label class="text-xl">Locations of Repair Order</label>
    <UTable class="w-full" :rows="items" :columns="columns" :ui="{ base: 'w-full', tr: { base: 'align-top' } }">
        <template #view-data="{ row }">
            <UButton :padded=" false " icon="i-heroicons-eye-20-solid" color="gray" square variant="link" />
        </template>
        <template #description-data="{ row }">
            <span class="whitespace-pre-line">{{ row.description }}</span>
        </template>
        <template #remove-data="{ row }">
            <UButton :padded=" false " color="gray" variant="link">
                <Icon size="24" name="material-symbols:variable-remove-rounded" color="darkred" />
                <p style="color:darkred;">Remove</p>
            </UButton>
        </template>
    </UTable>
</template>

<style>
.td_view{
    width: 3rem;
    white-space: nowrap;
}
.td_id{
    width: 8rem;
}
.td_remove{
    width: 10rem;
}
</style>