<script lang="ts">
	import { loggedInUser } from './../../stores';

	let loggedInUser_value: string | null;

	loggedInUser.subscribe((value) => {
		loggedInUser_value = value;
	});
</script>

<div class="card p-4 m-5">
	<header class="card-header">
		<h2 class="h2">Todo</h2>
	</header>

	{#if loggedInUser_value}
		<section class="p-4">
			<h3 class="h3">Your personal list</h3>
			<div class="space-y-2">
				<label class="flex items-center space-x-2">
					<input class="checkbox" type="checkbox" checked />
					<p>Optionklajds 1</p>
					<p>Option 1</p>
				</label>
				<label class="flex items-center space-x-2">
					<input class="checkbox" type="checkbox" />
					<p>Option 2</p>
				</label>
				<label class="flex items-center space-x-2">
					<input class="checkbox" type="checkbox" />
					<p>Option 3</p>
				</label>
			</div>
		</section>
		<footer class="card-footer">
			<label class="label">
				<span>New item</span>
				<input class="input" type="text" placeholder="New item" />
			</label>
		</footer>
	{:else}
		<section class="p-4">
			<p>You have to login</p>
		</section>
		<footer class="card-footer">
			<a href="/login" class="btn variant-filled-success" data-sveltekit-preload-data="hover">
				Go to login
			</a>
		</footer>
	{/if}
</div>
