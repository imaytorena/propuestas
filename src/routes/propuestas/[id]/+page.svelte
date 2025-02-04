<script lang="ts">
  import { onMount } from 'svelte';
  import EvaluacionGrafico from '$lib/components/EvaluacionGrafico.svelte';

  let propuesta = {
    id: '1',
    nombre: 'Propuesta de Investigación en Energías Renovables',
    descripcion: 'Proyecto de investigación sobre implementación de energías renovables en comunidades rurales. Este proyecto busca desarrollar soluciones sostenibles para comunidades que no tienen acceso a la red eléctrica convencional.',
    estado: 'pendiente',
    fechaEntrega: '2024-03-01',
    creador: {
      nombre: 'Ana García',
      id: '1'
    },
    categoria: {
      nombre: 'Sustentabilidad',
      id: '1'
    },
    evaluaciones: {
      buena: 15,
      regular: 5,
      mala: 2
    }
  };
  let error = '';
  let userVote: 'buena' | 'regular' | 'mala' | null = null;

  onMount(async () => {
    // try {
    //   const response = await get(`/api/propuestas/${$page.params.id}`);
    //   propuesta = response.propuesta;
    //   userVote = response.userVote;
    // } catch (e) {
    //   error = 'Error al cargar la propuesta';
    // }
  });

  async function handleVote(rating: 'buena' | 'regular' | 'mala') {
    try {
      // Optimistic update
      const oldVote = userVote;
      const oldEvaluaciones = { ...propuesta.evaluaciones };

      // Remove old vote if exists
      if (userVote) {
        propuesta.evaluaciones[userVote]--;
      }
      
      // Add new vote
      if (userVote !== rating) {
        propuesta.evaluaciones[rating]++;
        userVote = rating;
      } else {
        userVote = null;
      }

      // Send to server
      // try {
      //   await post(`/api/propuestas/${propuesta.id}/votar`, { rating });
      // } catch (e) {
      //   // Revert changes on error
      //   propuesta.evaluaciones = oldEvaluaciones;
      //   userVote = oldVote;
      //   throw e;
      // }
    } catch (e) {
      error = 'Error al registrar el voto';
    }
  }

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
</script>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    {#if error}
      <p class="text-red-500 mb-4">{error}</p>
    {:else}
      <div class="bg-base-100 rounded-lg shadow-lg p-8">
        <div class="flex justify-between items-start mb-6">
          <h1 class="text-3xl font-bold text-gray-900">{propuesta.nombre}</h1>
          <span class="px-3 py-1 rounded-full text-sm font-medium {getEstadoClass(propuesta.estado)}">
            {getEstadoText(propuesta.estado)}
          </span>
        </div>

        <div class="prose max-w-none mb-8">
          <p class="text-gray-600">{propuesta.descripcion}</p>
        </div>

        <!-- <div class="mb-8"> -->
          <!-- <EvaluacionGrafico
            evaluaciones={propuesta.evaluaciones}
            userVote={userVote}
            onVote={handleVote}
          /> -->
        <!-- </div> -->

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-base-200 bg-opacity-50 rounded-lg p-4">
            <h3 class="font-semibold text-gray-700 mb-2">Creador</h3>
            <div class="flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <a href="/usuarios/{propuesta.creador.id}" class="text-indigo-600 hover:text-indigo-500">
                {propuesta.creador.nombre}
              </a>
            </div>
          </div>

          <div class="bg-base-200 bg-opacity-50  rounded-lg p-4">
            <h3 class="font-semibold text-gray-700 mb-2">Categoría</h3>
            <div class="flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span class="text-gray-600">{propuesta.categoria.nombre}</span>
            </div>
          </div>
        </div>

        <div class="border-t pt-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center text-gray-500">
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Fecha de entrega: {propuesta.fechaEntrega}</span>
            </div>

            <div class="space-x-3">
              <button
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
              >
                Enviar Solicitud
              </button>
              {#if propuesta.creador.id === '1' /* Replace with actual user ID check */}
                <button
                  class="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Editar
                </button>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>