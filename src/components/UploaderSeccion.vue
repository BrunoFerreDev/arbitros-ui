<template>
  <div class="mb-8">
    <h3
      class="text-xl font-semibold mb-3"
      :class="{
        'text-blue-700': color === 'blue',
        'text-red-700': color === 'red',
        'text-green-700': color === 'green',
      }"
    >
      {{ titulo }}
    </h3>

    <!-- Zona de carga -->
    <div
      class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition"
      :class="{
        'border-blue-300 hover:border-blue-500': color === 'blue',
        'border-red-300 hover:border-red-500': color === 'red',
        'border-green-300 hover:border-green-500': color === 'green',
      }"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @click="fileInput.click()"
    >
      <input
        type="file"
        multiple
        ref="fileInput"
        class="hidden"
        accept=".jpg,.jpeg,.png,.pdf"
        @change="handleFiles"
      />
      <p class="text-gray-500">
        Arrastre aquí los archivos o haga clic para seleccionar (máx. 2)
      </p>
    </div>

    <!-- Vista previa -->
    <div
      v-if="archivos.length"
      class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <div
        v-for="(file, i) in archivos"
        :key="i"
        class="relative border rounded-xl p-3 bg-gray-50 flex flex-col items-center justify-center"
      >
        <!-- Imagen -->
        <div v-if="file.preview && file.tipo !== 'pdf'">
          <img
            :src="file.preview"
            alt="preview"
            class="h-32 object-cover rounded-lg mb-2"
          />
        </div>

        <!-- PDF -->
        <div v-else class="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span class="text-sm text-gray-600 mt-1">{{ file.nombre }}</span>
        </div>

        <!-- Botón eliminar -->
        <button
          class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          @click.stop="eliminarArchivo(i)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  titulo: String,
  color: {
    type: String,
    default: 'blue',
  },
  modelValue: Array,
})
const emit = defineEmits(['update:modelValue'])

const archivos = ref([...props.modelValue])
const fileInput = ref(null)

watch(archivos, (n) => emit('update:modelValue', n))

const handleFiles = (e) => procesarArchivos(e.target.files)
const handleDrop = (e) => procesarArchivos(e.dataTransfer.files)

const procesarArchivos = (files) => {
  if (archivos.value.length >= 2) {
    alert('Solo puedes subir 2 archivos como máximo.')
    return
  }
  Array.from(files).slice(0, 2 - archivos.value.length).forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      archivos.value.push({
        nombre: file.name,
        tipo: file.type.includes('pdf') ? 'pdf' : 'imagen',
        preview: file.type.includes('image') ? e.target.result : null,
      })
    }
    reader.readAsDataURL(file)
  })
}

const eliminarArchivo = (index) => archivos.value.splice(index, 1)
</script>
