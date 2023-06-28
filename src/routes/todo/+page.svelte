<script lang="ts">
	import {
		addDoc,
		collection,
		deleteDoc,
		doc,
		getDocs,
		query,
		serverTimestamp,
		setDoc,
		where
	} from 'firebase/firestore';
	import { loggedInUser } from './../../stores';
	import { db } from './../../Firebase';

	let loggedInUser_value: string | null;

	loggedInUser.subscribe((value) => {
		loggedInUser_value = value;
	});

	interface Todos {
		todo: string;
		isDone: boolean;
		user: string;
		timestamp: Object;
		id: string;
	}

	const todosCollection = collection(db, 'todos');

	let todoList: Todos[] = [];

	async function loadTodos() {
		if (loggedInUser_value) {
			const q = query(todosCollection, where('user', '==', loggedInUser_value));
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
			todoList = todos;
		}
	}
	loadTodos();

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
		loadTodos();
	}

	async function deleteTodo(id: string) {
		await deleteDoc(doc(db, 'todos', id));
		todoList = todoList.filter((todo) => todo.id !== id);
	}
</script>

<div class="card p-4 m-5">
	<header class="card-header">
		<h2 class="h2">Todo</h2>
	</header>

	{#if loggedInUser_value}
		<section class="p-4">
			<h3 class="h3">Your personal list</h3>
			<div class="space-y-2">
				{#each todoList as todo}
					<label class="flex items-center space-x-2">
						<input
							class="checkbox"
							type="checkbox"
							bind:checked={todo.isDone}
							on:change={update(todo.id, todo.isDone)}
						/>
						<p>{todo.todo}</p>
						<button on:click={deleteTodo(todo.id)} type="button" class="badge variant-filled-error"
							>X</button
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
