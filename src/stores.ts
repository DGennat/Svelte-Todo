import { writable } from 'svelte/store';

export const loggedInUser = writable('bla' as string | null)