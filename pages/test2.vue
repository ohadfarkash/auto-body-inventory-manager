<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  part_id: undefined,
  part_name: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email && !state.part_name) {
    errors.push({ path:'part_name', message: 'At least one field required' })
  }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}



const columns = [{
    key: 'pn',
    label: 'PN',
    class: 'w-32'
}, {
    key: 'name',
    label: 'Name',
    class: 'w-auto'
}, {
    key: 'qty',
    label: 'Qty',
    class: 'w-20 td_remove'
}, {
    key: 'locate',
    class: 'w-32 td_remove'
}]
const items = ref([
    {
        pn: "1004420-04-P",
        name: "ASY,HRN,MDLS,ALL,BUMP FR",
        qty: 10
    }
])
function onLocate(e: any, row: any){

}
</script>

<template>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Part ID" name="part_id">
            <UInput v-model="state.part_id" />
        </UFormGroup>

        <UFormGroup label="Part Name" name="part_name">
            <UInput v-model="state.part_name" />
        </UFormGroup>

        <UButton type="submit" class="block ml-auto">
            Search for Part
        </UButton>
    </UForm>

    <UTable class="w-full" :rows="items" :columns="columns" :ui="{ base: 'w-full', tr: { base: 'align-top' } }">
        <template #view-data="{ row }">
            <UButton :padded=" false " icon="i-heroicons-eye-20-solid" color="gray" square variant="link" />
        </template>
        <template #description-data="{ row }">
            <span class="whitespace-pre-line">{{ row.description }}</span>
        </template>
        <template #locate-data="{ row }">
            <UButton class="remove_button" :padded=" false " color="gray" variant="link" @click="onLocate($event, row)">
                <Icon size="24" name="material-symbols:location-on" color="orange" />
                <p style="color:orange;">Locations</p>
            </UButton>
        </template>
    </UTable>
</template>