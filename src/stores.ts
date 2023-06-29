import { writable } from 'svelte/store';
import type { Todos } from './models';

export const loggedInUser = writable('' as string | null)

export const isLoggedIn = writable(false)

export const todoList = writable([] as Todos[])