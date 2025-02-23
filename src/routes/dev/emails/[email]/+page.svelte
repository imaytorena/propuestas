<script lang="ts">
	import { getContext } from 'svelte';
	import type { PageData } from './$types';
    import { page } from '$app/state';
	const { data } = $props();

	let { html, text, emails }: PageData = $derived(data);
	let loading : { bar: boolean } = getContext('loading');

	$effect(() => {
		loading.bar = false;
	});
</script>

<div class="container mx-auto mb-4">
    <div class="border border-gray-300 p-4">
    {#each emails as email, index}
            <a href="/dev/emails/{email}" class={`btn btn-link no-underline ${email === page.params.email ? 'text-primary underline' : 'text-black'} monospace whitespace-pre-line break-words text-base wrap`}>
                {email}
            </a>
            { emails.length - 1 !== index ? ' | ': ''}
    {/each}
    </div>
</div>

<div class="container mx-auto grid grid-cols-2 gap-4">
	<div class="border border-gray-300 p-4">
		{@html html}
	</div>
	<div class="border border-gray-300 p-4">
		<p class="monospace whitespace-pre-line break-words text-base wrap">
			{text}
		</p>
	</div>
</div>
