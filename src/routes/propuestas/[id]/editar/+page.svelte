<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';
  const { data } = $props();
  
  let { propuesta }: PageData = $derived(data);
  let loading : { bar: boolean } = getContext('loading');
  loading.bar = true;

  let formData = $state({
    nombre:  "",
    descripcion: "",
    fechaEntrega: "",
    categorias: []
  });

  $effect(() => {
    formData = {
      nombre: propuesta?.nombre ?? "",
      descripcion: propuesta?.descripcion ?? "",
      fechaEntrega: propuesta?.fechaEntrega?.toISOString().split('T')[0] ?? "", // Format date for input
      categorias: propuesta?.categorias?.map(c => c.categoria.id) ?? []
    }
  });

  onMount(() => {
    loading.bar = false;
  });

  async function handleSubmit(e: SubmitEvent) {
    try {
      e.preventDefault();
      loading.bar = true;
      const response = await fetch(`/api/propuestas/${propuesta?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la propuesta');
      }

      goto(`/propuestas/${propuesta?.id}`);
    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      loading.bar = false;
    }
  }

  function handleCancel() {
    goto(`/propuestas/${propuesta?.id}`);
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <div class="bg-base-100 rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Editar Propuesta</h1>

      <form onsubmit={handleSubmit} class="space-y-6">
        <div class="form-control w-full">
          <label class="label" for="nombre">
            <span class="label-text">Nombre</span>
          </label>
          <input
            type="text"
            id="nombre"
            bind:value={formData.nombre}
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="descripcion">
            <span class="label-text">Descripción</span>
          </label>
          <textarea
            id="descripcion"
            bind:value={formData.descripcion}
            class="textarea textarea-bordered h-32"
            required
          ></textarea>
        </div>

        <div class="form-control w-full">
          <label class="label" for="fechaEntrega">
            <span class="label-text">Fecha de Entrega</span>
          </label>
          <input
            type="date"
            id="fechaEntrega"
            bind:value={formData.fechaEntrega}
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            class="btn btn-ghost"
            onclick={handleCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="btn btn-primary"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
