<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<h1>Hi, {data.usuario.username}!</h1>
<p>Your user ID is {data.usuario.id}.</p>
<form method="post" action="?/logout" use:enhance>
	<button>Sign out</button>
</form>
