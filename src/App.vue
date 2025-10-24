<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
const arbitro = ref({
    nombre: 'Juan Pérez',
})

</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6 ">

        <Header :arbitro="arbitro" />
        <RouterView />
    </div>
</template>

<style scoped></style>