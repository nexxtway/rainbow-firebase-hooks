import * as Firebase from 'firebase';
import { useContext, useEffect, useState } from 'react';
import Context from '../context';

export type CollectionRef = Firebase.firestore.CollectionReference;

export type UseCollectionHook = (Doc[] | boolean)[];

export interface UseCollectionProps {
    path: string,
    query?: (ref: CollectionRef) =>  CollectionRef;
}

export interface Doc {
    id: string;
    data: any;
}

const defaultData: Doc[] = [];

export default function useCollectionOnce(props: UseCollectionProps): UseCollectionHook {
    const { path, query } = props;
    const { app } = useContext(Context);
    const [data, setData] = useState(defaultData);
    const [isLoading, setIsLoading] = useState(true);
    
    if (app) {
        useEffect(() => {
            const ref = app.firestore().collection(path);
            const finalQuery = query ? query(ref) : ref;
            
            finalQuery.get()
                .then((querySnapshot: Firebase.firestore.QuerySnapshot) => {
                    const ret: Doc[] = [];
                    querySnapshot.forEach((doc: Firebase.firestore.DocumentSnapshot) => {
                        ret.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    });
                    setData(ret);
                    setIsLoading(false);
                }).catch((err: any) => {
                    console.log(err)
                });
        }, [props.path]);
    }

    return [data, isLoading];
} 