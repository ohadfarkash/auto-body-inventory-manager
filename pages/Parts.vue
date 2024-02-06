<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
    part_num: '',
    part_name: ''
})

// const validate = (state: any): FormError[] => {
//   const errors = []
//   if (!state.email && !state.part_name) {
//     errors.push({ path:'part_name', message: 'At least one field required' })
//   }
//   return errors
// }

const items = ref<any[]>([])
async function onSubmit(event: FormSubmitEvent<any>) {
    const res = await $fetch('/api/part/names', {
        method: 'GET',
        query: {
            num: state.part_num,
            name: state.part_name
        }
    })
    items.value = res
}

function onLocate(e: any, row: any) {
    window.location.href = `/part/${row.id}`
}
</script>

<template>
    <header>
        <img class="logo" src="/images/logo.png">
        <h1>Inventory Manager</h1>
    </header>
    <UBreadcrumb divider="/" :links="[{ label: 'Home', to: '/' }, { label: 'Stock Parts', to: '/parts' }]" />
    <div>
        <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Part Number" name="part_num">
                <UInput v-model="state.part_num" />
            </UFormGroup>

            <UFormGroup label="Part Name" name="part_name">
                <UInput v-model="state.part_name" />
            </UFormGroup>

            <div class="flex flex-row justify-end gap-4">
                <UButton type="button" variant="solid" color="gray" class="block flex flex-row items-center">
                    <Icon size="1rem" name="material-symbols:add" />
                    <p>Add New Part</p>
                </UButton>
                <UButton type="submit" class="block ">
                    Search for Part
                </UButton>
            </div>
        </UForm>
        <div class="parts_table">
            <h2 class="pn text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">Part
                Number</h2>
            <h2 class="name text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">Name
            </h2>
            <h2 class="pn-name text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
                Part Number / Name</h2>
            <h2 class="qty text-left rtl:text-right px-3 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">Qty
            </h2>
            <h2></h2>
            <div class="sep"></div>
            <template v-for="item in items">
                <p class="pn px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.part_num }}</p>
                <p class="name px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.name }}</p>
                <p class="pn-name px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.part_num + ' / ' + item.name }}</p>
                <p class="qty px-3 py-4 text-gray-500 dark:text-gray-400 text-sm">{{ item.qty }}</p>
                <UButton class="locate_button" :padded="false" color="gray" variant="link"
                    @click="onLocate($event, item)">
                    <Icon size="24" name="material-symbols:location-on" color="orange" />
                    <p style="color:orange;">Locations</p>
                </UButton>
                <div class="sep"></div>
            </template>
        </div>

    </div>
</template>
  
<style>
body {
    margin: 1rem auto 0 auto;
    max-width: 720px;
}

header {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    &>h1 {
        font-size: 2.2rem;
        font-weight: 600;
    }
}

img.logo {
    height: 6rem;
}

label {
    display: block;
    font-weight: bold;
    margin: 1rem 0 .5rem 0;
}

.addToLocWrapper {
    overflow: hidden;
    transition-property: height;
    transition-duration: 150ms;
    display: flex;
    align-items: center;
    justify-content: center;
}

.addToLoc {
    display: block;
    margin: 2rem auto 2rem auto;
}

.parts_table {
    display: grid;
    grid-template-columns: min-content auto min-content min-content;

    & .pn {
        white-space: nowrap;
    }

    & .pn-name {
        display: none;
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
        .pn {
            display: none;
        }

        .name {
            display: none;
        }

        .pn-name {
            display: block;
        }

        .locate_button p {
            display: none;
        }
    }
}
</style>