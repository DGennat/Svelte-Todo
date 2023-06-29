<script lang="ts">
	import {
		addDoc,
		collection,
		deleteDoc,
		doc,
		getDocs,
		query,
		serverTimestamp,
		setDoc
		// where
	} from 'firebase/firestore';
	import { loggedInUser, todoList } from './../../stores';
	import { db } from './../../Firebase';
	import { send, receive } from './../../transition';
	import type { Todos } from '../../models';
	// import { ProgressBar } from '@skeletonlabs/skeleton';

	let loggedInUser_value: string | null = '';

	loggedInUser.subscribe((value) => {
		loggedInUser_value = value;
	});

	let todoList_value: Todos[] = [];

	todoList.subscribe((value) => {
		todoList_value = value;
	});

	const todosCollection = collection(db, 'todos');

	async function loadTodos() {
		if (loggedInUser_value) {
			// const q = query(todosCollection, where('user', '==', loggedInUser_value));
			const q = query(todosCollection);
			const querySnapshot = await getDocs(q);
			let todos: Todos[] = [];
			querySnapshot.forEach((todo) => {
				todos.push({
					todo: todo.data().todo,
					isDone: todo.data().isDone,
					user: todo.data().user,
					timestamp: todo.data().timestamp,
					id: todo.id
				});
			});
			// todoList = todos;
			// todoList.set(todos.filter((todo) => todo.user === loggedInUser_value));
			todoList.set(todos);
		}
	}

	if (!todoList_value[0]) {
		loadTodos();
	}

	let newTodo = '';

	async function addNewTodo() {
		const todo = {
			todo: newTodo,
			isDone: false,
			user: loggedInUser_value,
			timestamp: serverTimestamp()
		};
		try {
			await addDoc(todosCollection, todo);
			newTodo = '';
			loadTodos();
			document.getElementById('newTodoInput')!.focus();
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	async function update(id: string, done: boolean) {
		await setDoc(doc(db, 'todos', id), { isDone: done }, { merge: true });
	}

	async function deleteTodo(id: string) {
		await deleteDoc(doc(db, 'todos', id));
		todoList_value = todoList_value.filter((todo) => todo.id !== id);
	}
</script>

<!-- <ProgressBar label="Progress Bar" value={50} max={100} /> -->
<div class="card p-4 m-5">
	<header class="card-header">
		<h2 class="h2">Todo</h2>
	</header>

	{#if loggedInUser_value}
		<section class="p-4">
			<h3 class="h3">Your personal list</h3>
			<div class="space-y-2">
				{#each todoList_value.filter((todo) => todo.user === loggedInUser_value) as todo}
					<!-- {#each todoList.filter((todo) => todo.isDone === false) as todo (todo.id)} -->
					<label class="flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							bind:checked={todo.isDone}
							on:change={() => update(todo.id, todo.isDone)}
						/>
						<p>{todo.todo}</p>
						<button
							on:click={() => deleteTodo(todo.id)}
							type="button"
							class="badge variant-filled-error">X</button
						>
					</label>
				{/each}
			</div>
		</section>

		<footer class="card-footer">
			<form>
				<span>Add a new item:</span>
				<div class="flex items-center">
					<label class="label">
						<input
							id="newTodoInput"
							class="input"
							type="text"
							placeholder="todo"
							bind:value={newTodo}
						/>
					</label>
					<button on:click={addNewTodo} type="submit" class="btn variant-filled-success">Add</button
					>
				</div>
			</form>
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
