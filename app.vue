<template>
<NuxtPage />
</template>

<style>
body {
  margin: 1rem auto 0 auto;
  max-width: 720px;
}

@media only screen and (max-width: 720px) {
  body {
    margin: 1rem;
  }
}

header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  &>h1 {
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 600;
  }

  margin-bottom: 2rem;
}

img.logo {
  height: 4rem;
}

label {
    display: block;
    font-weight: bold;
    margin: 1rem 0 .5rem 0;
}
</style>