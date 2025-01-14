<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  // import { get } from '$lib/utils/api';

  let comunidad = {
    id: '1',
    nombre: 'Innovación Tecnológica',
    descripcion: 'Comunidad dedicada a compartir y desarrollar proyectos innovadores en tecnología. Aquí podrás encontrar propuestas relacionadas con desarrollo de software, hardware, inteligencia artificial y más.',
    imagen: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    categoria: 'Tecnología',
    miembros: 250,
    minColaboradores: 5,
    maxRepresentantes: 3,
    representantes: [{
      id: '1',
      nombre: 'Ana García',
      imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      fechaInicio: '2024-12-01',
      activo: true
    }, {
      id: '2',
      nombre: 'Carlos Ruiz',
      imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      fechaInicio: '2024-12-01',
      activo: true
    }],
    propuestas: [{
      id: '1',
      nombre: 'Sistema de Monitoreo IoT',
      descripcion: 'Desarrollo de un sistema de monitoreo ambiental usando IoT.',
      estado: 'en_progreso',
      contribuciones: 8
    }, {
      id: '2',
      nombre: 'App de Realidad Aumentada',
      descripcion: 'Aplicación educativa usando realidad aumentada.',
      estado: 'pendiente',
      contribuciones: 3
    }],
    colaboradoresDestacados: [{
      id: '3',
      nombre: 'María Sánchez',
      imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      contribuciones: 15
    }, {
      id: '4',
      nombre: 'Juan Pérez',
      imagen: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      contribuciones: 12
    }]
  };
  let error = '';

  onMount(async () => {
    // try {
    //   comunidad = await get(`/api/comunidades/${$page.params.id}`);
    // } catch (e) {
    //   error = 'Error al cargar la comunidad';
    // }
  });

  function getEstadoClass(estado: string) {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_progreso':
        return 'bg-blue-100 text-blue-800';
      case 'finalizado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getEstadoText(estado: string) {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'en_progreso':
        return 'En Progreso';
      case 'finalizado':
        return 'Finalizado';
      default:
        return estado;
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="container mx-auto px-4 py-8">
  {#if error}
    <div class="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
      {error}
    </div>
  {:else}
    <div class="max-w-5xl mx-auto">
      <!-- Cabecera -->
      <div class="relative h-64 rounded-xl overflow-hidden mb-8">
        <img
          src={comunidad.imagen}
          alt={comunidad.nombre}
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div class="p-6 text-white">
            <div class="flex items-center gap-2 mb-2">
              <h1 class="text-4xl font-bold">{comunidad.nombre}</h1>
              <span class="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                {comunidad.categoria}
              </span>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center">
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
              <div class="text-sm">
                Mínimo {comunidad.minColaboradores} colaboradores
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contenido Principal -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Descripción -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-4">Acerca de la comunidad</h2>
            <p class="text-gray-600">{comunidad.descripcion}</p>
          </div>

          <!-- Propuestas -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Propuestas Activas</h2>
              <a
                href="/propuestas/nueva?comunidad={comunidad.id}"
                class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Nueva Propuesta
              </a>
            </div>
            <div class="space-y-4">
              {#each comunidad.propuestas as propuesta}
                <div class="border rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-medium">
                        <a
                          href="/propuestas/{propuesta.id}"
                          class="text-gray-900 hover:text-indigo-600"
                        >
                          {propuesta.nombre}
                        </a>
                      </h3>
                      <p class="text-sm text-gray-600 mt-1">{propuesta.descripcion}</p>
                      <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        {propuesta.contribuciones} colaboradores
                      </div>
                    </div>
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full {getEstadoClass(propuesta.estado)}"
                    >
                      {getEstadoText(propuesta.estado)}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Representantes -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold">Representantes</h2>
              <span class="text-sm text-gray-500">
                {comunidad.representantes.length}/{comunidad.maxRepresentantes}
              </span>
            </div>
            <div class="space-y-4">
              {#each comunidad.representantes as representante}
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      src={representante.imagen}
                      alt={representante.nombre}
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div class="ml-3">
                      <a
                        href="/usuarios/{representante.id}"
                        class="font-medium text-gray-900 hover:text-indigo-600"
                      >
                        {representante.nombre}
                      </a>
                      <p class="text-sm text-gray-500">
                        Desde {formatDate(representante.fechaInicio)}
                      </p>
                    </div>
                  </div>
                  {#if representante.activo}
                    <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  {/if}
                </div>
              {/each}
            </div>
          </div>

          <!-- Colaboradores Destacados -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold mb-4">Colaboradores Destacados</h2>
            <div class="space-y-4">
              {#each comunidad.colaboradoresDestacados as colaborador}
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      src={colaborador.imagen}
                      alt={colaborador.nombre}
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div class="ml-3">
                      <a
                        href="/usuarios/{colaborador.id}"
                        class="font-medium text-gray-900 hover:text-indigo-600"
                      >
                        {colaborador.nombre}
                      </a>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">
                    {colaborador.contribuciones} contribuciones
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>