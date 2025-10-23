<template>
  <h3 class="text-lg font-semibold mb-2 text-gray-700">
    Sustituciones por numero de casaca
  </h3>
  <div class="space-y-3">
    <div
      v-for="(s, i) in sustituciones"
      :key="i"
      class="flex items-center gap-3"
    >
      <select
        name="titulares"
        id="titulares"
        class="border p-2 rounded-lg w-[300px]"
      >
        <option value="" selected disabled>Selecciona un Titular (1-11)</option>

        <template v-for="n in 11" :key="'titular-' + n">
          <option :value="n">Jugador N {{ n }}</option>
        </template>
      </select>
      <select
        name="suplentes"
        id="suplentes"
        class="border p-2 rounded-lg w-[300px]"
      >
        <option value="" selected disabled>
          Selecciona un Suplente (12-18)
        </option>

        <template v-for="n in 7" :key="'suplente-' + (n + 11)">
          <option :value="n + 11">Jugador N {{ n + 11 }}</option>
        </template>
      </select>
      <select v-model="s.equipo" class="border p-2 rounded-lg">
        <option :value="props.equipos.local.id">
          {{ props.equipos.local.nombre }}
        </option>
        <option :value="props.equipos.visitante.id">
          {{ props.equipos.visitante.nombre }}
        </option>
      </select>
      <button
        @click="sustituciones.splice(i, 1)"
        class="text-red-500 hover:text-red-700"
      >
        <CircleX />
      </button>
      <button class="text-green-500 hover:text-green-700">
        <CircleCheckBig />
      </button>
    </div>
  </div>
  <button
    @click="sustituciones.push({ entra: '', sale: '', minuto: '', equipo: '' })"
    class="mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
  >
    + Agregar Sustitución
  </button>
</template>
<script setup>
import { ref } from "vue";
import { CircleCheckBig } from "lucide-vue-next";
import { CircleX } from "lucide-vue-next";
const props = defineProps({
  equipos: Object,
});
const sustituciones = ref([
  {
    ingresa: "",
    sale: "",
    minuto: "",
    equipo: "",
  },
]);
</script>
