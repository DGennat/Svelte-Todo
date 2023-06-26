<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { AppBar, AppShell, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import MdHome from 'svelte-icons/md/MdHome.svelte';
	import IoMdLogIn from 'svelte-icons/io/IoMdLogIn.svelte';
	import IoMdCheckbox from 'svelte-icons/io/IoMdCheckbox.svelte';
	import FaUserAltSlash from 'svelte-icons/fa/FaUserAltSlash.svelte';
	import IoMdLogOut from 'svelte-icons/io/IoMdLogOut.svelte';
	import { loggedInUser } from '../stores';

	let loggedInUser_value;

	loggedInUser.subscribe((value) => {
		loggedInUser_value = value;
	});
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="f">
			<h1 class="h1">Svelte Todo</h1>
			<svelte:fragment slot="trail">
				{#if loggedInUser_value}
					<div class="icon-small flex">
						<IoMdLogOut />
					</div>
				{:else}
					<div class="icon-small flex">
						<FaUserAltSlash />
					</div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="footer">
		<TabGroup
			justify="justify-evenly"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			rounded=""
			border=""
			class="bg-surface-100-800-token w-full"
		>
			<TabAnchor href="/">
				<svelte:fragment slot="lead">
					<div class="icon">
						<MdHome />
					</div>
				</svelte:fragment>
			</TabAnchor>
			<TabAnchor href="/login">
				<svelte:fragment slot="lead">
					<div class="icon">
						<IoMdLogIn />
					</div>
				</svelte:fragment>
			</TabAnchor>
			<TabAnchor href="/todo">
				<svelte:fragment slot="lead">
					<div class="icon">
						<IoMdCheckbox />
					</div>
				</svelte:fragment>
			</TabAnchor>
		</TabGroup>
	</svelte:fragment>
</AppShell>

<style>
	.icon {
		width: 40px;
		height: 40px;
	}

	.icon-small {
		width: 28px;
		height: 28px;
	}
</style>
