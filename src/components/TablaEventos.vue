<template>
    <div class="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table class="w-full divide-y divide-gray-200 text-left text-sm">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-4 py-3 font-medium text-gray-700">Tipo</th>
                    <th class="px-4 py-3 font-medium text-gray-700">Minuto</th>
                    <th class="px-4 py-3 font-medium text-gray-700">Jugador</th>
                    <th class="px-4 py-3 font-medium text-gray-700">FICHA / DNI</th>
                    <th class="px-4 py-3 font-medium text-gray-700">Detalle Extra</th>
                    <th class="px-4 py-3 font-medium text-gray-700">Club</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-if="!eventosCargados || eventosCargados.length === 0">
                    <td colspan="4" class="px-4 py-4 text-center text-gray-500">
                        No hay eventos cargados para este partido.
                    </td>
                </tr>

                <tr v-for="evento in eventosCargados" :key="evento.id" :class="{
                    'bg-yellow-50 text-yellow-900': evento.tipo === 'AMONESTACION',
                    'bg-red-100 text-red-900': evento.tipo === 'EXPULSION',
                }">
                    <td class="px-4 py-4 font-medium">
                        <span v-if="evento.tipo === 'AMONESTACION'" class="mr-2 inline-block h-4 w-3 bg-yellow-400"
                            aria-hidden="true"></span>
                        <span v-if="evento.tipo === 'EXPULSION'" class="mr-2 inline-block h-4 w-3 bg-red-600"
                            aria-hidden="true"></span>
                        {{ capitalizar(evento.tipo) }}
                    </td>
                    <td class="px-4 py-4 text-gray-700">{{ evento.minuto }}'</td>
                    <td class="px-4 py-4 text-gray-700">
                        {{ evento?.jugador || 'Jugador no disponible' }}
                    </td>
                    <td class="px-4 py-4 text-gray-700">
                        {{ formatDni.format(evento?.dni) || '-' }}
                    </td>
                    <td class="px-4 py-4 text-gray-700">
                        {{ evento?.detalleExtra || '-' }}
                    </td>
                    <td class="px-4 py-4 text-gray-700">
                        {{ evento?.club || '-' }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
let formatDni = new Intl.NumberFormat('es-AR', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 });
// 1. Define la prop que el componente espera recibir
const props = defineProps({
    // Asumimos que es un array, puede venir de tu API
    eventosCargados: {
        type: Array,
        required: true,
        default: () => [], // Un array vacío como valor por defecto
    },
});

// 2. Función de ayuda para formatear el texto (opcional)
function capitalizar(texto) {
    if (!texto) return '';
    const str = texto.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}


</script>