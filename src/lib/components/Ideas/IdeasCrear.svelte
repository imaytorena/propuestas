<script lang="ts">
	let { ideas } = $props();
	let newIdeaText: string = $state('');

	const onclick = async () => {
		try {
			const response = await fetch(`/api/ideas`, { method: 'POST', body: JSON.stringify({ contenido: newIdeaText }) });
			const {idea} = await response.json();
			newIdeaText = '';
			ideas.unshift( idea );
		} catch (e: Error | any) {
			console.error(e?.message ?? 'Hubo un error');
			// TODO: Mostrar toast o algo
		}
	};
</script>
<div class="card bg-base-100 shadow-xl w-full mx-auto mb-12">
	<div class="card-body">
		<h2 class="card-title text-primary mb-4">Tienes alguna idea que mejoraría nuestra calidad ambiental?</h2>
		<textarea
			class="textarea textarea-bordered w-full h-32 mb-4"
			placeholder="Escribe tu idea aquí..."
			bind:value={newIdeaText}
		></textarea>
		<div class="card-actions justify-end">
			<button
				class="btn btn-primary text-white disabled:bg-primary/10"
				{onclick}
				disabled={!newIdeaText.trim()}
			>
				Publicar Idea
			</button>
		</div>
	</div>
</div>