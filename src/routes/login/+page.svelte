<script>
	let email = '';
	let password = '';

	function login() {
		console.log('login was called', email, password);
	}

	function register() {
		console.log('register was called', email, password);
	}
</script>

<div class="card p-4 m-5">
	<header class="card-header">
		<h2 class="h2">Login</h2>
	</header>
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
		<button on:click={login} type="button" class="btn variant-filled-success">Login</button>
		<span>or</span>
		<button on:click={register} type="button" class="btn variant-filled-tertiary">Register</button>
	</footer>
</div>
