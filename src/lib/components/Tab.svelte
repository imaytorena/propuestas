<script lang="ts">
	import { goto } from "$app/navigation";

	let { group, label, value = $bindable(), id, children, isLink = false } = $props();
</script>

<input
	type="radio"
	name={group}
	role="tab"
	class="tab text-lg rounded-box {value === id ? 'font-bold text-primary' : ''}"
	aria-label={label}
	bind:group={value}
	value={id}
	onclick={() => isLink && goto(id)}
/>

{#if value === id}
	<div role="tabpanel" class="flex-wrap tab-content flex rounded-box">
		{@render children()}
	</div>
{/if}

<style>
	.tab:is(input[type="radio"]) {
		@apply w-max border-2 border-b-0 border-base-200 mx-[1px];
	}
</style>
