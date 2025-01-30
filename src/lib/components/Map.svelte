<script lang="ts">
  import { onMount } from 'svelte';
  import colonias from '$lib/data/zmg-colonias.json';
	import type { Geometry } from 'geojson';
	import type { LeafletMouseEvent, GeoJSON } from 'leaflet';
  
  let mapElement: string | HTMLElement;
  export let onColoniaClick = (colonia: any) => {console.log(colonia)};

  function getStyle(feature: any) {
    return {
      fillColor: '#2F855A', // Un verde bosque suave
      weight: 2,
      opacity: 1,
      color: '#E2E8F0',
      dashArray: '3',
      fillOpacity: 0.2
    };
  }

  function highlightFeature(e: any) {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      color: '#48BB78',
      dashArray: '',
      fillOpacity: 0.5
    });
    layer.bringToFront();
  }

  function resetHighlight(e: LeafletMouseEvent, geoJson: GeoJSON<any, Geometry>) {
    geoJson.resetStyle(e.target);
  }

  onMount(() => {
    // Coordenadas del centro de la Zona Metropolitana de Guadalajara
    const map = L.map(mapElement).setView([20.6597, -103.3496], 12);

    // Añadir el mapa base en escala de grises usando CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: 'OpenStreetMap, CartoDB',
      subdomains: 'abcd',
      maxZoom: 17,
      minZoom: 11
    }).addTo(map);

    // Añadir las colonias como una capa interactiva
    const geoJson = L.geoJSON(colonias, {
      style: getStyle,
      onEachFeature: (feature, layer) => {
        // Popup con información de la colonia
        layer.bindPopup(`
          <div class="font-bold">${feature.properties.nombre}</div>
          <div class="text-sm">${feature.properties.municipio}</div>
        `);

        // Eventos de interacción
        layer.on({
          mouseover: highlightFeature,
          mouseout: (e) => resetHighlight(e, geoJson),
          click: (e) => {
            map.fitBounds(e.target.getBounds());
            onColoniaClick(feature.properties);
          }
        });
      }
    }).addTo(map);

    // Definir los límites aproximados de la ZMG
    const zmgBounds: number[][] = [
      [20.5200, -103.5000], // Suroeste
      [20.8000, -103.2000]  // Noreste
    ];
    
    // Restringir el área de visualización
    map.setMaxBounds(zmgBounds);
    map.on('drag', () => {
      return map.panInsideBounds(zmgBounds, { animate: false });
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
    border-radius: 12px;
    box-shadow: 0 4px 15px -3px rgba(47, 133, 90, 0.1);
    border: 5px solid #37AA56;
  }

  :global(.leaflet-popup-content) {
    margin: 8px 12px;
    font-family: 'Delius', cursive;
  }

  :global(.leaflet-popup-content-wrapper) {
    border-radius: 8px;
    background: #f0f7f4;
  }

  :global(.leaflet-popup-tip) {
    background: #f0f7f4;
  }
</style>
