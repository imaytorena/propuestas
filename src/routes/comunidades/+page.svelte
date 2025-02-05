<script lang="ts">
  import { onMount } from 'svelte';
  // import { get } from '$lib/utils/api';

  let comunidades = [{
    id: '1',
    nombre: 'Innovación Tecnológica',
    descripcion: 'Comunidad dedicada a compartir y desarrollar proyectos innovadores en tecnología.',
    imagen: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    categoria: 'Tecnología',
    miembros: 250,
    minColaboradores: 5,
    maxRepresentantes: 3,
    representantes: [{
      id: '1',
      nombre: 'Ana García'
    }, {
      id: '2',
      nombre: 'Carlos Ruiz'
    }]
  }, {
    id: '2',
    nombre: 'Desarrollo Sustentable',
    descripcion: 'Espacio para propuestas y proyectos enfocados en la sustentabilidad y el medio ambiente.',
    imagen: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    categoria: 'Medio Ambiente',
    miembros: 180,
    minColaboradores: 5,
    maxRepresentantes: 3,
    representantes: [{
      id: '3',
      nombre: 'María Sánchez'
    }]
  }, {
    id: '3',
    nombre: 'Educación Digital',
    descripcion: 'Comunidad para compartir recursos y proyectos educativos digitales.',
    imagen: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
    categoria: 'Educación',
    miembros: 320,
    minColaboradores: 5,
    maxRepresentantes: 3,
    representantes: [{
      id: '4',
      nombre: 'Juan Pérez'
    }, {
      id: '5',
      nombre: 'Laura Torres'
    }]
  }];
  let error = '';
  let showCreateModal = false;
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Comunidades</h1>
      <p class="mt-2 text-gray-600">Descubre comunidades basadas en intereses compartidos</p>
    </div>
  </div>

  {#if error}
    <div class="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
      {error}
    </div>
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each comunidades as comunidad (comunidad.id)}
      <div class="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div class="h-48 overflow-hidden">
          <img
            src={comunidad.imagen}
            alt={comunidad.nombre}
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-xl font-semibold">
              <a href="/comunidades/{comunidad.id}" class="text-gray-900 hover:text-primary">
                {comunidad.nombre}
              </a>
            </h2>
          </div>
          <p class="text-gray-600 mb-4 line-clamp-2">
            {comunidad.descripcion}
          </p>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm text-gray-500">
                <svg
                  class="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {comunidad.miembros} miembros
              </div>
              <div class="text-sm text-gray-500">
                Min. {comunidad.minColaboradores} colaboradores
              </div>
            </div>
            <div class="flex items-center gap-1 text-sm text-gray-500">
              <span>Representantes:</span>
              <div class="flex items-center">
                {#each comunidad.representantes as representante, i}
                  {#if i < 2}
                    <span class="text-gray-900">{representante.nombre}</span>
                    {#if i < comunidad.representantes.length - 1 && i < 1}
                      <span class="mx-1">,</span>
                    {/if}
                  {:else if i === 2}
                    <span class="ml-1 text-gray-500">y {comunidad.representantes.length - 2} más</span>
                  {/if}
                {/each}
                <span class="ml-1 text-gray-400">
                  ({comunidad.representantes.length}/{comunidad.maxRepresentantes})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>