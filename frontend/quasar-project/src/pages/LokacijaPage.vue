<template>
  <q-page padding>
    <!-- content -->
    <div id="map" style="height:500px;"></div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

export default {
  setup() {
    const initialMap = ref(null);

    onMounted(() => {
      initialMap.value = L.map('map').setView([45.3282, 14.4378], 15);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(initialMap.value);

      L.marker([45.33157329171479, 14.43197595394375]).addTo(initialMap.value)
        .bindPopup('<b>Gradska knjižnica Rijeka</b><br>Ulica Viktora cara Emina 1')
        .openPopup();
    });

    return {
      initialMap
    };
  }
};
</script>

