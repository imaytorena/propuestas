<script>
  import { onMount } from 'svelte';

  let mapElement;

  onMount(() => {
    // Coordenadas del centro de la Zona Metropolitana de Guadalajara
    const map = L.map(mapElement).setView([20.6597, -103.3496], 11);

    // Añadir el mapa base en escala de grises usando CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: 'OpenStreetMap, CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Definir los límites aproximados de la ZMG
    const zmgBounds = [
      [20.5200, -103.5000], // Suroeste
      [20.8000, -103.2000]  // Noreste
    ];
    
    // Restringir el área de visualización
    map.setMaxBounds(zmgBounds);
    map.on('drag', () => {
      map.panInsideBounds(zmgBounds, { animate: false });
    });

    return () => {
      map.remove();
    };
  });
</script>

<div bind:this={mapElement} id="map"></div>

<style>
  #map {
    height: 500px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
</style>
