<template>
  <div class="vista-previa-tab">
    <h2>Resumen del Partido</h2>
    <div class="equipos-container">
      <div class="equipo-columna">
        <h3>{{ equipoLocal.nombre }}</h3>
        <ul class="lista-eventos">
          <li
            v-for="evento in eventosLocal"
            :key="evento.id"
            class="evento-item"
          >
            <span class="minuto">{{ evento.minuto }}'</span>
            <div class="detalle-evento">
              <div v-if="evento.tipoEvento === 'GOL'" class="evento gol">
                <span class="icono">⚽</span>
                <span
                  ><strong>Gol de {{ evento.jugador.nombre }}</strong></span
                >
              </div>
              <div
                v-else-if="evento.tipoEvento === 'AMONESTACION'"
                class="evento amonestacion"
              >
                <span class="icono-tarjeta amarillo"></span>
                <span>{{ evento.jugador.nombre }}</span>
              </div>
              <div
                v-else-if="evento.tipoEvento === 'EXPULSION'"
                class="evento expulsion"
              >
                <span class="icono-tarjeta rojo"></span>
                <span>{{ evento.jugador.nombre }}</span>
              </div>
              <div
                v-else-if="evento.tipoEvento === 'SUSTITUCION'"
                class="evento sustitucion"
              >
                <div class="jugadores-sustitucion">
                  <span class="sale">
                    <span class="icono-cambio">▼</span>
                    {{ evento.jugadorSale.nombre }}
                  </span>
                  <span class="entra">
                    <span class="icono-cambio">▲</span>
                    {{ evento.jugadorEntra.nombre }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="equipo-columna">
        <h3>{{ equipoVisitante.nombre }}</h3>
        <ul class="lista-eventos">
          <li
            v-for="evento in eventosVisitante"
            :key="evento.id"
            class="evento-item"
          >
            <span class="minuto">{{ evento.minuto }}'</span>
            <div class="detalle-evento">
              <div v-if="evento.tipoEvento === 'GOL'" class="evento gol">
                <span class="icono">⚽</span>
                <span
                  ><strong>Gol de {{ evento.jugador.nombre }}</strong></span
                >
              </div>
              <div
                v-else-if="evento.tipoEvento === 'AMONESTACION'"
                class="evento amonestacion"
              >
                <span class="icono-tarjeta amarillo"></span>
                <span>{{ evento.jugador.nombre }}</span>
              </div>
              <div
                v-else-if="evento.tipoEvento === 'EXPULSION'"
                class="evento expulsion"
              >
                <span class="icono-tarjeta rojo"></span>
                <span>{{ evento.jugador.nombre }}</span>
              </div>
              <div
                v-else-if="evento.tipoEvento === 'SUSTITUCION'"
                class="evento sustitucion"
              >
                <div class="jugadores-sustitucion">
                  <span class="sale">
                    <span class="icono-cambio">▼</span>
                    {{ evento.jugadorSale.nombre }}
                  </span>
                  <span class="entra">
                    <span class="icono-cambio">▲</span>
                    {{ evento.jugadorEntra.nombre }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
// import axios from 'axios';

// --- State ---
// Las propiedades de 'data' se convierten en variables reactivas con ref()
const equipoLocal = ref({ id: 1, nombre: "Club Atlético de la Selva" });
const equipoVisitante = ref({ id: 2, nombre: "Deportivo Misionero" });

// Datos simulados. Se accede a su valor con .value
const eventosDelPartido = ref([
  {
    id: 1,
    minuto: 15,
    tipoEvento: "GOL",
    jugador: { nombre: "Javier Ríos" },
    equipoId: 1,
  },
  {
    id: 2,
    minuto: 25,
    tipoEvento: "AMONESTACION",
    jugador: { nombre: "Marcos Acuña" },
    equipoId: 2,
  },
  {
    id: 3,
    minuto: 48,
    tipoEvento: "AMONESTACION",
    jugador: { nombre: "Pedro Silva" },
    equipoId: 1,
  },
  {
    id: 4,
    minuto: 62,
    tipoEvento: "SUSTITUCION",
    jugadorSale: { nombre: "Javier Ríos" },
    jugadorEntra: { nombre: "Lucas Ocampos" },
    equipoId: 1,
  },
  {
    id: 5,
    minuto: 75,
    tipoEvento: "GOL",
    jugador: { nombre: "Esteban Paredes" },
    equipoId: 2,
  },
  {
    id: 6,
    minuto: 88,
    tipoEvento: "EXPULSION",
    jugador: { nombre: "Marcos Acuña" },
    equipoId: 2,
  },
  {
    id: 7,
    minuto: 70,
    tipoEvento: "SUSTITUCION",
    jugadorSale: { nombre: "Carlos Sanchez" },
    jugadorEntra: { nombre: "Luis González" },
    equipoId: 2,
  },
]);

// --- Computed ---
// Las propiedades computadas usan la función computed() importada de Vue
const eventosLocal = computed(() => {
  return eventosDelPartido.value
    .filter((e) => e.equipoId === equipoLocal.value.id)
    .sort((a, b) => a.minuto - b.minuto);
});

const eventosVisitante = computed(() => {
  return eventosDelPartido.value
    .filter((e) => e.equipoId === equipoVisitante.value.id)
    .sort((a, b) => a.minuto - b.minuto);
});

// --- Methods ---
// Los métodos se convierten en funciones normales (usualmente const con arrow function)
const fetchEventos = async () => {

};

// --- Lifecycle Hooks ---
// Los hooks como 'mounted' se importan y se usan como funciones
onMounted(() => {
  fetchEventos();
});
</script>

<style scoped>
.vista-previa-tab {
  font-family: sans-serif;
  padding: 1rem;
}
.equipos-container {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
}
.equipo-columna {
  flex: 1;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
}
.equipo-columna h3 {
  margin-top: 0;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
}
.lista-eventos {
  list-style: none;
  padding: 0;
  margin: 0;
}
.evento-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}
.minuto {
  font-weight: bold;
  margin-right: 1rem;
  width: 40px;
  text-align: center;
}
.detalle-evento {
  flex-grow: 1;
}
.evento {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.icono {
  font-size: 1.2rem;
}
.icono-tarjeta {
  display: inline-block;
  width: 12px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #333;
}
.amarillo {
  background-color: #ffeb3b;
}
.rojo {
  background-color: #f44336;
}
.sustitucion .jugadores-sustitucion {
  display: flex;
  flex-direction: column;
}
.sustitucion .sale {
  color: #d32f2f;
}
.sustitucion .entra {
  color: #388e3c;
}
.icono-cambio {
  font-weight: bold;
}
</style>
