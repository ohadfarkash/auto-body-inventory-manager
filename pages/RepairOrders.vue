<template>
    <header>
        <img class="logo" src="/images/logo.png">
        <h1>Inventory Manager</h1>
    </header>
    <UBreadcrumb divider="/" :links="[{ label: 'Home', to: '/' }, { label: 'Repair Orders', to: '/repairorders' }]" />
    <div>
        <SearchInput />
        <UButton class="addToLoc" size="xl">
            Add RO to a Location
        </UButton>
        <ListROLocations2 />
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
</style>