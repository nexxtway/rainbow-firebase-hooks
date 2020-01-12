import Firebase from 'firebase';

export type Query = Firebase.firestore.Query;

export type CollectionRef = Firebase.firestore.CollectionReference;

export interface Doc {
    id: string;
    data: Firebase.firestore.DocumentData | undefined;
}

export type UseCollectionHook = [Doc[], boolean];
export type UseDocHook = [Doc | null, boolean];

export type DocumentSnapshot = Firebase.firestore.DocumentSnapshot;
export type QuerySnapshot = Firebase.firestore.QuerySnapshot;

export type DocumentReference = Firebase.firestore.DocumentReference;
export type FirestoreError = Firebase.firestore.FirestoreError;

export type CurrentUser = Firebase.User | null;
