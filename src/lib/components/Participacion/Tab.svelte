<script lang="ts">
	let { group, label, value = $bindable(), id, children } = $props();
	let currentChecked = $derived(checked == id);
</script>

<input
	type="radio"
	name={group}
	role="tab"
	class="tab text-lg {value === id ? 'font-bold' : ''}"
	aria-label={label}
	bind:group={value}
	value={id}
/>

{#if value === id}
	<div role="tabpanel" class="flex- wrap tab-content flex rounded-box">
		{@render children()}
	</div>
{/if}
