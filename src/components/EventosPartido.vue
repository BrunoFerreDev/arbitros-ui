<template>
    <section class="bg-white shadow rounded-2xl p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Eventos del Partido</h2>

        <!-- Tabs internos -->
        <div class="flex space-x-4 mb-6 border-b border-gray-200">
            <button v-for="tab in subtabs" :key="tab.name" @click="selectedSubtab = tab.name" :class="[
                selectedSubtab === tab.name
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'py-2 px-1 border-b-2 font-medium text-sm'
            ]">
                {{ tab.label }}
            </button>
        </div>

        <!-- Amonestados -->
        <div v-if="selectedSubtab === 'amonestados'">
            <h3 class="text-lg font-semibold mb-2 text-gray-700">Amonestados</h3>
            <div class="space-y-3">
                <div v-for="(a, i) in amonestados" :key="i" class="flex items-center gap-3">
                    <input v-model="a.nombre" class="flex-1 border p-2 rounded-lg" placeholder="Jugador" />
                    <select name="tipo" id="tipo" class="border p-2 rounded-lg">
                        <option value="jugador">Jugador</option>
                        <option value="ct">C.Tecnico</option>
                    </select>
                    <input v-model="a.minuto" type="number" class="w-24 border p-2 rounded-lg" placeholder="Min"
                        min="1" />
                    <select v-model="a.equipo" class="border p-2 rounded-lg">
                        <option value="Local">Local</option>
                        <option value="Visitante">Visitante</option>
                    </select>
                    <button @click="amonestados.splice(i, 1)" class="text-red-500 hover:text-red-700">
                        <CircleX />
                    </button>
                    <button class="text-green-500 hover:text-green-700">
                        <CircleCheckBig />
                    </button>
                </div>
            </div>
            <button @click="amonestados.push({ nombre: '', minuto: '', equipo: '' })"
                class="mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                + Agregar Amonestado
            </button>
        </div>

        <!-- Expulsados -->
        <div v-else-if="selectedSubtab === 'expulsados'">
            <h3 class="text-lg font-semibold mb-2 text-gray-700">Expulsados</h3>
            <div class="space-y-3">
                <div v-for="(e, i) in expulsados" :key="i" class="flex items-center gap-3">
                    <input v-model="e.nombre" class="flex-1 border p-2 rounded-lg" placeholder="Jugador" />
                    <select name="tipo" id="tipo" class="border p-2 rounded-lg">
                        <option value="jugador">Jugador</option>
                        <option value="ct">C.Tecnico</option>
                    </select>
                    <input v-model="e.minuto" type="number" class="w-24 border p-2 rounded-lg" placeholder="Min"
                        min="1" />
                    <select v-model="e.equipo" class="border p-2 rounded-lg">
                        <option value="Local">Local</option>
                        <option value="Visitante">Visitante</option>
                    </select>
                    <button @click="expulsados.splice(i, 1)" class="text-red-500 hover:text-red-700">
                        <CircleX />
                    </button> <button class="text-green-500 hover:text-green-700">
                        <CircleCheckBig />
                    </button>
                </div>
            </div>
            <button @click="expulsados.push({ nombre: '', minuto: '', equipo: '' })"
                class="mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                + Agregar Expulsado
            </button>
        </div>

        <!-- Sustituciones -->
        <div v-else-if="selectedSubtab === 'sustituciones'">
            <h3 class="text-lg font-semibold mb-2 text-gray-700">Sustituciones</h3>
            <div class="space-y-3">
                <div v-for="(s, i) in sustituciones" :key="i" class="flex items-center gap-3">
                    <input v-model="s.entra" class="flex-1 border p-2 rounded-lg" placeholder="Jugador que entra" />
                    <input v-model="s.sale" class="flex-1 border p-2 rounded-lg" placeholder="Jugador que sale" />
                    <input v-model="s.minuto" type="number" class="w-24 border p-2 rounded-lg" placeholder="Min"
                        min="1" />
                    <select v-model="s.equipo" class="border p-2 rounded-lg">
                        <option value="Local">Local</option>
                        <option value="Visitante">Visitante</option>
                    </select>
                    <button @click="sustituciones.splice(i, 1)" class="text-red-500 hover:text-red-700">
                        <CircleX />
                    </button> <button class="text-green-500 hover:text-green-700">
                        <CircleCheckBig />
                    </button>
                </div>
            </div>
            <button @click="sustituciones.push({ entra: '', sale: '', minuto: '', equipo: '' })"
                class="mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                + Agregar Sustitución
            </button>
        </div>
        <!-- Goles -->
        <div v-else-if="selectedSubtab === 'goles'">
            <h3 class="text-lg font-semibold mb-2 text-gray-700">Goles</h3>
            <div class="space-y-3">
                <div v-for="(g, i) in goles" :key="i" class="flex items-center gap-3">
                    <input v-model="g.minuto" type="number" class="w-36 border p-2 rounded-lg" placeholder="Min"
                        min="1" />
                    <input v-model="g.jugador" class="flex-1 border p-2 rounded-lg" placeholder="Jugador" />
                    <select name="club" id="c" class="border p-2 rounded-lg w-32">
                        <option value="local">Local</option>
                        <option value="visita">Visita</option>
                    </select>
                    <button @click="goles.splice(i, 1)" class="text-red-500 hover:text-red-700">
                        <CircleX />
                    </button>
                    <button class="text-green-500 hover:text-green-700">
                        <CircleCheckBig />
                    </button>
                </div>
            </div>
            <button @click="goles.push({ minuto: '', equipo: '', jugador: '' })"
                class="mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                + Agregar Gol
            </button>

        </div>
    </section>

</template>

<script setup>
import { ref } from 'vue'
import { CircleX, CircleCheckBig } from 'lucide-vue-next';
const subtabs = [
    { name: 'amonestados', label: 'Amonestados' },
    { name: 'expulsados', label: 'Expulsados' },
    { name: 'sustituciones', label: 'Sustituciones' },
    { name: 'goles', label: 'Goles' }
]

const selectedSubtab = ref('amonestados')

const amonestados = ref([
    {
        entra: '',
        sale: '',
        minuto: '',
        equipo: '',
    },
])
const expulsados = ref([
    {
        jugador: '',
        minuto: '',
        equipo: '',
    },
])
const sustituciones = ref([
    {
        jugador: '',
        minuto: '',
        equipo: '',
    },
])
const goles = ref([
    {
        jugador: '',
        minuto: '',
        equipo: '',
    },
])
</script>
