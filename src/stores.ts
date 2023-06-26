import { writable } from 'svelte/store';

export const loggedInUser = writable('' as string | null)

export const isLoggedIn = writable(false)