<script lang="ts">
	import { Head } from 'svelte-email';

	const { head, description } = $props();
</script>

<Head>
	<title>ColectividApp - {head}</title>
	<link
		href="https://fonts.googleapis.com/css?family=Delius"
		rel="stylesheet"
		type="text/css"
	/>
	<meta name="description" content={description} />
</Head>
