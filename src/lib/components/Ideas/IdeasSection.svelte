<script lang="ts">
  import * as m from '$lib/paraglide/messages';

  type EditLog = {
    fecha: string;
    usuario: string;
    textoAnterior: string;
    textoNuevo: string;
  };

  type Idea = {
    id: string;
    texto: string;
    autor: string;
    fecha: string;
    likes: number;
    editing?: boolean;
    showingHistory?: boolean;
    editHistory: EditLog[];
  };

  let ideas: Idea[] = [
    {
      id: '1',
      texto: 'Crear un programa de mentorías entre estudiantes de diferentes semestres',
      autor: 'María García',
      fecha: '2025-01-10',
      likes: 15,
      editHistory: [
        {
          fecha: '2025-01-09',
          usuario: 'María García',
          textoAnterior: 'Crear un programa de mentorías',
          textoNuevo: 'Crear un programa de mentorías entre estudiantes de diferentes semestres'
        }
      ]
    },
    {
      id: '2',
      texto: 'Implementar un sistema de reciclaje en todas las facultades',
      autor: 'Juan Pérez',
      fecha: '2025-01-09',
      likes: 12,
      editHistory: []
    },
    {
      id: '3',
      texto: 'Organizar ferias de emprendimiento interdisciplinarias',
      autor: 'Ana Martínez',
      fecha: '2025-01-08',
      likes: 8,
      editHistory: []
    }
  ];

  let newIdeaText = '';
  let isAddingIdea = false;

  function addIdea() {
    if (newIdeaText.trim()) {
      const newIdea: Idea = {
        id: (ideas.length + 1).toString(),
        texto: newIdeaText,
        autor: 'Usuario Actual', // This should come from your auth system
        fecha: new Date().toISOString().split('T')[0],
        likes: 0,
        editHistory: []
      };
      ideas = [newIdea, ...ideas];
      newIdeaText = '';
      isAddingIdea = false;
    }
  }

  function startEditing(idea: Idea) {
    ideas = ideas.map(i => ({
      ...i,
      editing: i.id === idea.id,
      showingHistory: false
    }));
  }

  function saveEdit(idea: Idea) {
    const currentIdea = ideas.find(i => i.id === idea.id);
    if (currentIdea && currentIdea.texto !== idea.texto) {
      const newEditLog: EditLog = {
        fecha: new Date().toISOString().split('T')[0],
        usuario: 'Usuario Actual', // This should come from your auth system
        textoAnterior: currentIdea.texto,
        textoNuevo: idea.texto
      };
      
      ideas = ideas.map(i => i.id === idea.id ? {
        ...i,
        editing: false,
        editHistory: [newEditLog, ...i.editHistory]
      } : {
        ...i,
        editing: false
      });
    }
  }

  function cancelEdit(idea: Idea) {
    ideas = ideas.map(i => ({
      ...i,
      editing: false
    }));
  }

  function toggleHistory(idea: Idea) {
    ideas = ideas.map(i => ({
      ...i,
      showingHistory: i.id === idea.id ? !i.showingHistory : false,
      editing: false
    }));
  }
</script>

<section class="pb-16">
  <div class="container mx-auto px-4">
    <div class="text-center max-w-4xl mx-auto mb-12">
      <h2 class="text-4xl font-bold text-primary mb-4">Ideas...</h2>
      <h3 class="text-3xl font-bold text-base-content mb-4">¿Tienes una idea que debería conocer nuestra comunidad universitaria?</h3>
      <p class="text-xl text-base-content/80 w-2xl  mx-auto mb-8">
        Queremos compartir propuestas enfocadas en las necesidades y deseos de los estudiantes de la UDG.
      </p>
      
      <div class="card bg-base-100 shadow-xl max-w-2xl mx-auto">
          <div class="card-body">
            <textarea
              class="textarea textarea-bordered w-full h-32 mb-4"
              placeholder="Escribe tu idea aquí..."
              bind:value={newIdeaText}
            ></textarea>
            <div class="card-actions justify-end">
              <button 
                class="btn btn-ghost"
                on:click={() => {
                  isAddingIdea = false;
                  newIdeaText = '';
                }}
              >
                Cancelar
              </button>
              <button 
                class="btn btn-primary"
                on:click={addIdea}
                disabled={!newIdeaText.trim()}
              >
                Publicar Idea
              </button>
            </div>
          </div>
        </div>
    </div>

    <div class="relative">
      <div class="overflow-x-auto snap-x snap-mandatory pb-6 hide-scrollbar">
        <div class="flex gap-4 px-4">
          {#each ideas.slice(0, 6) as idea}
            <div class="snap-start shrink-0 w-[300px]">
              <div class="card bg-base-100 shadow-xl h-full">
                <div class="card-body">
                  {#if idea.editing}
                    <textarea
                      class="textarea textarea-bordered w-full h-32 mb-4"
                      bind:value={idea.texto}
                    ></textarea>
                    <div class="card-actions justify-end">
                      <button 
                        class="btn btn-ghost btn-sm"
                        on:click={() => cancelEdit(idea)}
                      >
                        Cancelar
                      </button>
                      <button 
                        class="btn btn-primary btn-sm"
                        on:click={() => saveEdit(idea)}
                      >
                        Guardar
                      </button>
                    </div>
                  {:else if idea.showingHistory}
                    <div class="mb-4">
                      <h3 class="font-semibold mb-2">Historial de Ediciones</h3>
                      {#if idea.editHistory.length === 0}
                        <p class="text-base-content/70 text-sm">No hay ediciones previas</p>
                      {:else}
                        <div class="space-y-3">
                          {#each idea.editHistory as log}
                            <div class="bg-base-200 p-3 rounded-lg text-sm">
                              <div class="flex justify-between text-base-content/70 mb-1">
                                <span>{log.usuario}</span>
                                <span>{log.fecha}</span>
                              </div>
                              <div class="space-y-1">
                                <p class="line-through text-base-content/70">{log.textoAnterior}</p>
                                <p class="text-success">{log.textoNuevo}</p>
                              </div>
                            </div>
                          {/each}
                        </div>
                      {/if}
                    </div>
                    <div class="card-actions justify-end">
                      <button 
                        class="btn btn-ghost btn-sm"
                        on:click={() => toggleHistory(idea)}
                      >
                        Cerrar Historial
                      </button>
                    </div>
                  {:else}
                    <p class="text-lg mb-4">{idea.texto}</p>
                    <div class="flex justify-between items-center text-sm text-base-content/70">
                      <span>{idea.autor}</span>
                      <span>{idea.fecha}</span>
                    </div>
                    <div class="card-actions justify-between items-center mt-4">
                      <div class="flex gap-2">
                        <button class="btn btn-ghost btn-sm gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {idea.likes}
                        </button>
                        <div class="flex items-center gap-1">
                          <button 
                            class="btn btn-ghost btn-sm tooltip"
                            data-tip="Editar idea"
                            on:click={() => startEditing(idea)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          {#if idea.editHistory.length > 0}
                            <button 
                              class="btn btn-ghost btn-sm tooltip"
                              data-tip="Ver historial de ediciones"
                              on:click={() => toggleHistory(idea)}
                            >
                              <span class="text-xs bg-base-300 px-2 py-0.5 rounded-full">
                                {idea.editHistory.length}
                              </span>
                            </button>
                          {/if}
                        </div>
                      </div>
                      <button class="btn btn-primary btn-sm">
                        Convertir en Propuesta
                      </button>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/each}

          <!-- "Ver más" card -->
          <div class="snap-start shrink-0 w-[300px]">
            <a href="/ideas" class="card bg-base-100 shadow-xl h-full hover:shadow-2xl transition-shadow">
              <div class="card-body items-center justify-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <h3 class="text-xl font-semibold text-primary">Ver más ideas</h3>
                <p class="text-base-content/70">Explora todas las ideas de la comunidad</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll indicators -->
      <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {#each Array(Math.min(3, ideas.length + 1)) as _, i}
          <button 
            class="w-2 h-2 rounded-full transition-colors duration-200"
            class:bg-primary={i === 0}
            class:bg-base-300={i !== 0}
          ></button>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
