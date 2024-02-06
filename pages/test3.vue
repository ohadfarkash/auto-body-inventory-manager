<script setup lang="ts">
const part_id = ref(0)
const items = ref([
    {
        pn: "1004420-04-P",
        name: "ASY,HRN,MDLS,ALL,BUMP FR",
        qty: 10
    }
])


function onLocate(e: any, row: any) {

}
function search(e: any) {

}
</script>

<template>
    <div class="data_fields">
        <h2>Internal ID:</h2>
        <p>###</p>
        <UButton color="gray">
            <Icon name="material-symbols:content-copy-outline"></Icon>
        </UButton>
        <h2>Part Number:</h2>
        <p>ID-######-##</p>
        <UButton color="gray">
            <Icon name="material-symbols:content-copy-outline"></Icon>
        </UButton>
        <h2>Part Name:</h2>
        <p>Some Name for a Part</p>
        <UButton color="gray">
            <Icon name="material-symbols:content-copy-outline"></Icon>
        </UButton>
    </div>
    <ListPartLocations :items="items" :part_id="part_id" @delete="search" />
</template>

<style>
.data_fields {
    display: grid;
    grid-template-columns: min-content auto min-content;
    align-items: baseline;
    gap: .5rem;
    & > h2 {
        font-weight: bold;
        white-space: nowrap;
    }

    margin-bottom: 2rem;
}
</style>