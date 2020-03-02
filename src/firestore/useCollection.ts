import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import { CollectionRef, Query, UseCollectionData, UseCollectionHook, QuerySnapshot } from './firestore';
import getData from '../helpers/getData';

export interface UseCollectionProps {
    path: string;
    query?: (ref: CollectionRef) => Query;
    onlyIds?: boolean;
}

const defaultData: UseCollectionData = [];

export default function useCollection(props: UseCollectionProps): UseCollectionHook {
    const { path, query, onlyIds = false } = props;
    const { app } = useContext(Context);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(defaultData);

    if (app) {
        useEffect(() => {
            const ref = app.firestore().collection(path);
            const finalQuery = query ? query(ref) : ref;

            const unsubscribe = finalQuery.onSnapshot(
                (querySnapshot: QuerySnapshot) => {
                    setData(getData(querySnapshot.docs, onlyIds));
                    setIsLoading(false);
                },
                (err: object) => {
                    setIsLoading(false);
                    console.log(err);
                },
            );
            return () => {
                return unsubscribe();
            };
        }, [props.path, props.onlyIds]);
    }
    return [data, isLoading];
}
