<template>
    <!-- Grid Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Tarjetas Resumen -->
        <div class="lg:col-span-2 space-y-6">

            <!-- Próximos Partidos -->
            <section class="bg-white shadow rounded-2xl p-5">
                <div class="flex items-center justify-between mb-3">
                    <h2 class="text-xl font-semibold text-gray-800">Próximos Partidos</h2>
                    <button class="text-sm text-green-600 hover:underline">Ver todos</button>
                </div>

                <ul class="divide-y divide-gray-200">
                    <li v-for="(partido, i) in proximosPartidos" :key="i"
                        class="py-3 flex justify-between items-center">
                        <div>
                            <p class="font-medium text-gray-700">
                                {{ partido.local }} vs {{ partido.visitante }}
                            </p>
                            <p class="text-sm text-gray-500">
                                {{ partido.fechaCalendario }} · {{ partido.hora }}
                            </p>
                        </div>
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Asignado</span>
                        <span>Rol : {{ }}</span>
                    </li>
                </ul>
            </section>

            <!-- Últimos Partidos Dirigidos -->
            <section class="bg-white shadow rounded-2xl p-5">
                <div class="flex items-center justify-between mb-3">
                    <h2 class="text-xl font-semibold text-gray-800">Últimos Partidos Dirigidos</h2>
                    <button class="text-sm text-green-600 hover:underline">Ver historial</button>
                </div>

                <ul class="divide-y divide-gray-200">
                    <li v-for="(partido, i) in ultimosPartidos" :key="i" class="py-3 flex justify-between">
                        <div>
                            <p class="font-medium text-gray-700">
                                {{ partido.local }} vs {{ partido.visitante }}
                            </p>
                            <p class="text-sm text-gray-500">{{ partido.fechaCalendario }}</p>
                        </div>
                        <span class="text-sm font-medium text-gray-600">Resultado: {{ partido.resultado }}</span>
                    </li>
                </ul>
            </section>

        </div>

        <!-- Columna lateral -->
        <div class="space-y-6">
            <!-- Estadísticas -->
            <section class="bg-white shadow rounded-2xl p-5">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Mis Estadísticas</h2>
                <ul class="space-y-3">
                    <li class="flex justify-between text-gray-700">
                        <span>Partidos dirigidos</span>
                        <strong>{{ estadisticas.partidos }}</strong>
                    </li>
                    <li class="flex justify-between text-gray-700">
                        <span>Tarjetas mostradas</span>
                        <strong>{{ estadisticas.tarjetas }}</strong>
                    </li>
                    <li class="flex justify-between text-gray-700">
                        <span>Promedio de goles</span>
                        <strong>{{ estadisticas.promedioGoles }}</strong>
                    </li>
                </ul>
            </section>

            <!-- Notificaciones -->
            <section class="bg-white shadow rounded-2xl p-5">
                <h2 class="text-xl font-semibold text-gray-800 mb-3">Notificaciones</h2>
                <ul class="space-y-2">
                    <li v-for="(notif, i) in notificaciones" :key="i"
                        class="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                        <p class="text-sm text-gray-700">{{ notif.mensaje }}</p>
                        <p class="text-xs text-gray-400 mt-1">{{ notif.fecha }}</p>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

const proximosPartidos = ref([
    // { local: 'Club A', visitante: 'Club B', fecha: '10/10/2025', hora: '16:00' },
    // { local: 'Club C', visitante: 'Club D', fecha: '12/10/2025', hora: '18:30' },
])

const ultimosPartidos = ref([
    // { local: 'Club X', visitante: 'Club Y', fecha: '03/10/2025', resultado: '2 - 1' },
    // { local: 'Club Z', visitante: 'Club W', fecha: '29/09/2025', resultado: '0 - 0' },
])
const susp = ref([
    // { local: 'Club A', visitante: 'Club B', fecha: '10/10/2025', hora: '16:00' },
    // { local: 'Club C', visitante: 'Club D', fecha: '12/10/2025', hora: '18:30' },
])
const estadisticas = ref({
    partidos: 45,
    tarjetas: 130,
    promedioGoles: 2.4,
})

const notificaciones = ref([
    { mensaje: 'Nueva designación para el Torneo Clausura', fecha: '05/10/2025' },
    { mensaje: 'Cambio de horario en el partido Club A vs Club B', fecha: '04/10/2025' },
])
const proximos = () => {
    axios.get('http://localhost:8080/api/arbitros/designaciones?idArbitro=1&estado=PENDIENTE').then((response) => {
        const prox = response.data
        prox.forEach(element => {
            proximosPartidos.value.push(element.partido)
            console.log(proximosPartidos.value);
            
        });
    }).catch((error) => {
        console.error(error);
    });
}
const finalizados = () => {
    axios.get('http://localhost:8080/api/arbitros/designaciones?idArbitro=1&estado=FINALIZADO').then((response) => {
        ultimosPartidos.value = response.data
    }).catch((error) => {
        console.error(error);
    });
}
const suspendidos = () => {
    axios.get('http://localhost:8080/api/arbitros/designaciones?idArbitro=1&estado=SUSPENDIDO').then((response) => {
        susp.value = response.data
    }).catch((error) => {
        console.error(error);
    });
}
onBeforeMount(() => {
    proximos()
})
</script>

<style scoped></style>
