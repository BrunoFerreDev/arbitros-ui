<template>
    <div class="p-6 bg-gray-100 min-h-screen font-sans">
        <div class="w-full max-w-4xl mx-auto">
            <div class="flex border-b border-gray-300">
                <button @click="activeTab = 'local'" :class="[
                    'py-3 px-6 text-lg font-medium transition-colors',
                    activeTab === 'local'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700',
                ]">
                    Equipo {{ local }}
                </button>
                <button @click="activeTab = 'visitante'" :class="[
                    'py-3 px-6 text-lg font-medium transition-colors',
                    activeTab === 'visitante'
                        ? 'border-b-2 border-red-600 text-red-600'
                        : 'text-gray-500 hover:text-gray-700',
                ]">
                    Equipo {{ visitante }}
                </button>
            </div>

            <div class="pt-6">
                <div v-show="activeTab === 'local'">
                    <FormSustitucion :partidoId="partidoId" :jugadores="props.teamLocal"
                        :sustituciones="substitutionsLocal" :equipo="local" />
                    <ListaSustitucion :sustituciones="substitutionsLocal" />
                </div>
                <div v-show="activeTab === 'visitante'">
                    <FormSustitucion :partidoId="partidoId" :jugadores="props.teamVisitante"
                        :sustituciones="substitutionsVisitante" :equipo="visitante" />
                    <ListaSustitucion :sustituciones="substitutionsVisitante" />
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import FormSustitucion from './FormSustitucion.vue';
import axios from 'axios';
import ListaSustitucion from './ListaSustitucion.vue';
const props = defineProps({
    partidoId: Number,
    local: String,
    visitante: String,
    idClubLocal: Number,
    idClubVisitante: Number,
    teamLocal: Object,
    teamVisitante: Object,
});
// --- LÓGICA PRINCIPAL ---
const activeTab = ref('local'); // 'local' o 'visitante'
const MAX_SUBSTITUTIONS = 5;

// Almacenamos las sustituciones realizadas
const substitutionsLocal = ref([]);
const substitutionsVisitante = ref([]);

const traerSustLocal = () => {
    axios.get('http://localhost:8080/api/sustituciones/' + props.partidoId)
        .then(response => {
            console.log(response.data);
            substitutionsLocal.value = response.data.sustitucionesLocal
;
        })
        .catch(error => {
            console.error(error);
        })
}

const traerSustVisitante = () => {
    axios.get('http://localhost:8080/api/sustituciones/' + props.partidoId)
        .then(response => {
            console.log(response.data);
            substitutionsVisitante.value = response.data.sustitucionesVisitante;
        })
        .catch(error => {
            console.error(error);
        })
}
onMounted(() => {
    traerSustLocal();
    traerSustVisitante();
})


</script>