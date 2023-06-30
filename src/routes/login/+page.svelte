<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '../../Firebase';
	import {
		// getAuth,
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword
	} from 'firebase/auth';
	import { loggedInUser } from './../../stores';

	let email = '';
	let password = '';

	// const auth = getAuth(app);

	async function login() {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			loggedInUser.set(user.user.email);
			await goto('/todo');
		} catch (e) {
			console.log(e);
		}
	}

	async function register() {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			if (user.user.email) {
				loggedInUser.set(user.user.email);
			}
			await goto('/todo');
		} catch (e) {
			console.log(e);
		}
	}
</script>

<div class="card p-4 m-5">
	<header class="card-header">
		<h2 class="h2">Login</h2>
	</header>
	<form>
		<section class="p-4">
			<label class="label">
				<span>Email</span>
				<input class="input" type="email" placeholder="Email" bind:value={email} />
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" type="password" placeholder="Password" bind:value={password} />
			</label>
		</section>
		<footer class="card-footer">
			<button on:click={login} type="submit" class="btn variant-filled-success">Login</button>
			<span>or</span>
			<button on:click={register} type="button" class="btn variant-filled-tertiary">Register</button
			>
		</footer>
	</form>
</div>
