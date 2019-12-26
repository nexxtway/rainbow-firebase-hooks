import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import { Doc, CollectionRef, UseCollectionHook, DocumentSnapshot, QuerySnapshot } from './firestore';

export interface UseCollectionOnceProps {
    path: string;
    query?: (ref: CollectionRef) => CollectionRef;
}

const defaultData: Doc[] = [];

export default function useCollectionOnce(props: UseCollectionOnceProps): UseCollectionHook {
    const { path, query } = props;
    const { app } = useContext(Context);

    const [data, setData] = useState(defaultData);
    const [isLoading, setIsLoading] = useState(true);

    if (app) {
        useEffect(() => {
            const ref = app.firestore().collection(path);
            const finalQuery = query ? query(ref) : ref;

            finalQuery
                .get()
                .then((querySnapshot: QuerySnapshot) => {
                    const ret: Doc[] = [];
                    querySnapshot.forEach((doc: DocumentSnapshot) => {
                        ret.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    });
                    setData(ret);
                    setIsLoading(false);
                })
                .catch((err: object) => {
                    console.log(err);
                });
        }, [props.path]);
    }

    return [data, isLoading];
}
