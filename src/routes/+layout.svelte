<script lang="ts">
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
	import { onMount } from 'svelte';
	import { auth } from '../Firebase';
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	let loggedInUser_value: string | null;

	loggedInUser.subscribe((value) => {
		loggedInUser_value = value;
	});

	// const auth = getAuth(app);

	onMount(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					loggedInUser.set(user.email);
				} else {
					loggedInUser.set('');
				}
			},
			(error) => {
				loggedInUser.set('');
				console.log(error);
			}
		);
	});

	async function logOut() {
		await signOut(auth);
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="flex column ">
			<svelte:fragment slot="lead">
				<h1 class="h1">Svelte Todo</h1>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div>{loggedInUser_value}</div>
				{#if loggedInUser_value}
					<a
						href="/"
						class="btn-icon variant-filled"
						data-sveltekit-preload-data="hover"
						on:click={logOut}
					>
						<div class="icon-small">
							<IoMdLogOut />
						</div>
					</a>
				{:else}
					<div class="icon-small flex">
						<FaUserAltSlash />
					</div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<LightSwitch class="ms-2 mt-5 left-0" />

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
