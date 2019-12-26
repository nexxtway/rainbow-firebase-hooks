import Firebase from 'firebase';

export type CollectionRef = Firebase.firestore.CollectionReference;

export interface Doc {
    id: string;
    data: Firebase.firestore.DocumentData | undefined;
    changeType?: Firebase.firestore.DocumentChangeType;
}

export type UseCollectionHook = (Doc[] | boolean)[];

export type DocumentSnapshot = Firebase.firestore.DocumentSnapshot;
export type QuerySnapshot = Firebase.firestore.QuerySnapshot;
export type DocumentChange = Firebase.firestore.DocumentChange;