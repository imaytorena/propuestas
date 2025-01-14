<script lang="ts">
  export let evaluaciones = {
    buena: 0,
    regular: 0,
    mala: 0
  };
  export let userVote: 'buena' | 'regular' | 'mala' | null = null;
  export let onVote: (rating: 'buena' | 'regular' | 'mala') => void;

  $: total = evaluaciones.buena + evaluaciones.regular + evaluaciones.mala;
  $: porcentajes = {
    buena: total > 0 ? (evaluaciones.buena / total) * 100 : 0,
    regular: total > 0 ? (evaluaciones.regular / total) * 100 : 0,
    mala: total > 0 ? (evaluaciones.mala / total) * 100 : 0
  };

  const getBarClass = (tipo: 'buena' | 'regular' | 'mala', isSelected: boolean) => {
    const baseClasses = 'h-8 transition-all duration-200 flex items-center justify-center text-white cursor-pointer hover:opacity-90';
    const colorClasses = {
      buena: 'bg-green-500',
      regular: 'bg-yellow-500',
      mala: 'bg-red-500'
    };
    return `${baseClasses} ${colorClasses[tipo]} ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`;
  };
</script>

<div class="bg-white rounded-lg p-4 shadow-sm">
  <h3 class="text-lg font-semibold mb-3">Evaluación de la propuesta</h3>
  <div class="space-y-2">
    <div class="flex items-center gap-2">
      <div class="flex-grow flex gap-1 h-8">
        {#if total > 0}
          <div
            class={getBarClass('buena', userVote === 'buena')}
            style="width: {porcentajes.buena}%"
            on:click={() => onVote('buena')}
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onVote('buena');
              }
            }}
            role="button"
            tabindex="0"
          >
            {#if porcentajes.buena > 15}
              {evaluaciones.buena}
            {/if}
          </div>
          <div
            class={getBarClass('regular', userVote === 'regular')}
            style="width: {porcentajes.regular}%"
            on:click={() => onVote('regular')}
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onVote('regular');
              }
            }}
            role="button"
            tabindex="0"
          >
            {#if porcentajes.regular > 15}
              {evaluaciones.regular}
            {/if}
          </div>
          <div
            class={getBarClass('mala', userVote === 'mala')}
            style="width: {porcentajes.mala}%"
            on:click={() => onVote('mala')}
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onVote('mala');
              }
            }}
            role="button"
            tabindex="0"
          >
            {#if porcentajes.mala > 15}
              {evaluaciones.mala}
            {/if}
          </div>
        {:else}
          <div class="w-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
            Sin evaluaciones
          </div>
        {/if}
      </div>
      <div class="text-sm text-gray-500 w-16 text-right">
        {total} votos
      </div>
    </div>
    
    <div class="flex justify-between text-sm text-gray-600">
      <button
        class="flex items-center gap-1 hover:text-green-600 transition-colors"
        class:text-green-600={userVote === 'buena'}
        on:click={() => onVote('buena')}
      >
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        Buena
      </button>
      <button
        class="flex items-center gap-1 hover:text-yellow-600 transition-colors"
        class:text-yellow-600={userVote === 'regular'}
        on:click={() => onVote('regular')}
      >
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
        </svg>
        Regular
      </button>
      <button
        class="flex items-center gap-1 hover:text-red-600 transition-colors"
        class:text-red-600={userVote === 'mala'}
        on:click={() => onVote('mala')}
      >
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" transform="rotate(180 10 10)" />
        </svg>
        Mala
      </button>
    </div>
  </div>
</div>
