<script>
	import { enhance } from '$app/forms';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import github from 'svelte-highlight/styles/github';
	const models = [
		{
			name: 'codegeex4'
		},
		{
			name: 'deepseek-coder-v2'
		},
		{
			name: 'codestral'
		},
		{
			name: 'llama3'
		}
	];
	let { form } = $props();
</script>

<svelte:head>
	{@html github}
</svelte:head>
<h1>SvelteGPT</h1>

<form action="?/prompt" method="post" use:enhance>
	<select name="model">
		{#each models as model (model.name)}
			<option value={model.name}>{model.name}</option>
		{/each}
	</select>
	<br />
	<textarea name="prompt" placeholder="Prompt"> </textarea>
	<button type="submit">Submit</button>
</form>

{#if form}
	<h2>Response</h2>
	<Highlight language={json} code={form.response} let:highlighted>
		<LineNumbers {highlighted} />
	</Highlight>
{/if}
