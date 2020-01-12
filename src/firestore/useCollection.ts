import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import { Doc, CollectionRef, Query, UseCollectionHook, QuerySnapshot } from './firestore';

export interface UseCollectionProps {
    path: string;
    query?: (ref: CollectionRef) => Query;
}

const defaultData: Doc[] = [];

export default function useCollection(props: UseCollectionProps): UseCollectionHook {
    const { path, query } = props;
    const { app } = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(defaultData);

    if (app) {
        useEffect(() => {
            const ref = app.firestore().collection(path);
            const finalQuery = query ? query(ref) : ref;

            setIsLoading(true);
            const unsubscribe = finalQuery.onSnapshot((querySnapshot: QuerySnapshot) => {
                setData(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    })),
                );
                setIsLoading(false);
            });
            return () => {
                return unsubscribe();
            };
        }, [props.path]);
    }
    return [data, isLoading];
}
