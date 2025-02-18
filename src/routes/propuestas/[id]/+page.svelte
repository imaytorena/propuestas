<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';
  const { data } = $props();
  
  let { propuesta }: PageData = $derived(data);
  let loading : { bar: boolean } = getContext('loading');
  loading.bar = true;

  onMount(() => {
    loading.bar = false;
  });

  function handleEdit() {
    goto(`/propuestas/${propuesta?.id}/editar`);
  }

  function formatDate(date: Date | null) {
    return date ? date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    {#if propuesta}
    <div class="bg-base-100 rounded-lg shadow-lg p-8">
      <div class="flex justify-end mb-4">
        <button
          class="btn btn-primary"
          onclick={handleEdit}
        >
          Editar Propuesta
        </button>
      </div>
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-3xl font-bold text-gray-900">{propuesta.nombre}</h1>
        <!-- <span class="px-3 py-1 rounded-full text-sm font-medium {getEstadoClass(propuesta.estado)}">
          {getEstadoText(propuesta.estado)}
        </span> -->
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
            <!-- <a href="/usuarios/{propuesta.creador.id}" class="text-indigo-600 hover:text-indigo-500">
              {propuesta.creador.nombre}
            </a> -->
          </div>
        </div>

        <div class="bg-base-200 bg-opacity-50  rounded-lg p-4">
          <h3 class="font-semibold text-gray-700 mb-2">Categoría</h3>
          <div class="flex flex-wrap gap-2">
            {#if propuesta.categorias}
              {#each propuesta.categorias as categoria}
                <span class="badge badge-primary">{categoria.categoria.nombre}</span>
              {/each}
            {/if}
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
            <span>Fecha de entrega: {formatDate(propuesta?.fechaEntrega)}</span>
          </div>
        </div>
      </div>
    </div>
    {/if}
  </div>
</div>