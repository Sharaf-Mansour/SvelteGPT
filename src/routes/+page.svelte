<script>
	let { form } = $props();
	import { enhance } from '$app/forms';
	import Navbar from '../lib/Navbar.svelte';
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
</script>

<Navbar />
<h1 data-aos="fade-right" class="text-center text-light fs-1 mt-5 mb-5">SvelteGPT</h1>

<form class="text-center container" action="?/prompt" method="post" use:enhance>
	<select
		data-aos="fade-right"
		class="form-control bg-dark text-light form-select fs-1"
		name="model"
	>
		{#each models as model (model.name)}
			<option value={model.name}>{model.name}</option>
		{/each}
	</select>
	<br />
	<textarea
		data-aos="fade-down"
		class="form-control bg-dark text-light fs-1 mt-3 mb-3"
		name="prompt"
		placeholder="Prompt"
	></textarea>
	<br />
	<button
		data-aos="fade-up"
		class="form-control btn-primary btn-lg btn fs-1 fw-medium"
		type="submit">SUBMIT</button
	>
</form>

<!-- response -->
<section class="container mt-4" data-aos="fade-left">
	<div class="card bg-dark text-light">
		<div class="card-body">
			<h2 class="text-center mb-3">Response</h2>
			{#if form}
				<h3 class="text-center mb-3">{form.response}</h3>
			{:else}
				<h3 class="text-center mb-3">No Response</h3>
			{/if}
		</div>
	</div>
</section>

<style>
	textarea::placeholder {
		color: #fff;
		opacity: 0.5;
	}
</style>
