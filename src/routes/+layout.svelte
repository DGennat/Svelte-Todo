<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<h1 class="h1">Svelte Todo</h1>
	</svelte:fragment>

	<slot />
	<svelte:fragment slot="footer">
		<nav>
			<a class="anchor" href="/">home</a>
			<a class="anchor" href="/login">login</a>
			<a class="anchor" href="/todo">todo</a>
		</nav>
	</svelte:fragment>
</AppShell>
