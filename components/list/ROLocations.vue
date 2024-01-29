<script setup>
    const items = ref([
        {
            id: "Q01-C01-R02"
        },
        {
            id: "Q01-C02-R02"
        }
    ])
</script>

<template>
    <label class="text-xl">Locations</label>
    <ul class="font-mono">
        <li class="ro-location-item" v-for="item in items">
            <UButton
                :padded="false"
                icon="i-heroicons-eye-20-solid"
                color="gray"
                square
                variant="link"
            />
            {{ item.id }}
            <UButton
                :padded="false"
                color="gray"
                variant="link"
            >
                <Icon size="24" name="material-symbols:variable-remove-rounded" color="darkred"/>
                <p style="color:darkred;">Remove</p>
            </UButton>
        </li>
    </ul>
</template>


<style>
.ro-location-item {
    display: grid;
    grid-template-columns: min-content auto min-content;
    gap: 1rem;
}
.addToLoc{
    display: block;
    margin: 1rem auto 1rem auto;
}
</style>