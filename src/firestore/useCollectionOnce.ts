import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import { CollectionRef, Query, UseCollectionData, UseCollectionHook, QuerySnapshot } from './firestore';
import getData from '../helpers/getData';

export interface UseCollectionOnceProps {
    path: string;
    query?: (ref: CollectionRef) => Query;
    onlyIds?: boolean;
}

const defaultData: UseCollectionData = [];

export default function useCollectionOnce(props: UseCollectionOnceProps): UseCollectionHook {
    const { path, query, onlyIds = false } = props;
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
                    setData(getData(querySnapshot.docs, onlyIds));
                    setIsLoading(false);
                })
                .catch((err: object) => {
                    setIsLoading(false);
                    console.log(err);
                });
        }, [props.path]);
    }

    return [data, isLoading];
}
