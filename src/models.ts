import type {
    serverTimestamp
} from 'firebase/firestore';

export interface Todos {
    todo: string;
    isDone: boolean;
    user: string;
    timestamp: typeof serverTimestamp;
    id: string;
}