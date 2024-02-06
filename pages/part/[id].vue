<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

const part_data = await $fetch('/api/part', {
    query: {
        id: route.params.id
    }
})

const items = ref<any[]>([])


function onRemove(e: any, row: any) {
    window.location.href = `/part/${row.id}`
}

</script>

<template>
    <header>
        <img class="logo" src="/images/logo.png">
        <h1>Inventory Manager</h1>
    </header>
    <UBreadcrumb divider="/" :links="[{ label: 'Home', to: '/' }, { label: 'Stock Parts', to: '/parts' }, {label: 'Part ' + $route.params.id, to: ''}]" />
    
    <div class="data_fields">
        <h2>Internal ID:</h2>
        <p>{{ $route.params.id }}</p>
        <h2>Part Number:</h2>
        <p>{{ part_data.part_num }}</p>
        <h2>Part Name:</h2>
        <p>{{ part_data.name }}</p>
    </div>

    <div class="parts_table">
            <h2 class="id text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">ID</h2>
            <h2 class="desc text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">Description</h2>
            <h2 class="id-desc text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">ID / Description</h2>
            <h2 class="qty text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">Qty</h2>
            <h2></h2>
            <div class="sep"></div>
            <template v-for="item in items">
                <p class="id px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.part_num }}</p>
                <p class="desc px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.name }}</p>
                <p class="id-desc px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.part_num + ' / ' + item.name }}</p>
                <p class="qty px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.qty }}</p>
                <UButton class="remove_button" :padded="false" color="gray" variant="link"
                    @click="onRemove($event, item)">
                    <Icon size="24" name="material-symbols:location-on" color="orange" />
                    <p style="color:orange;">Locations</p>
                </UButton>
                <div class="sep"></div>
            </template>
        </div>
</template>

<style>
.parts_table {
    display: grid;
    grid-template-columns: min-content auto min-content min-content;

    & .id {
        white-space: nowrap;
    }

    & .id-desc {
        display: none;
    }

    .desc {
        white-space: wrap;
    }

    & .sep {
        grid-column: 1 / 5;
        border-bottom: 1px solid rgb(235, 235, 235);
    }

    & .sep:first-child {
        border-bottom: 1px solid lightgray;
    }

    & .sep:last-child {
        display: none;
    }

    @media only screen and (max-width: 480px) {
        & {
            grid-template-columns: auto min-content min-content;
        }
        .id {
            display: none;
        }

        .desc {
            display: none;
        }

        .id-desc {
            display: block;
        }

        .remove_button p {
            display: none;
        }
    }
}

.data_fields {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: min-content auto;
    align-items: baseline;
    column-gap: 1rem;
    & > h2 {
        font-weight: bold;
        white-space: nowrap;
    }

    margin-bottom: 2rem;
}
</style>