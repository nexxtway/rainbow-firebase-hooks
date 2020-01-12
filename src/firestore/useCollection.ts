import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import {
    CollectionRef,
    Query,
    UseCollectionData,
    UseCollectionHook,
    QuerySnapshot,
    QueryDocumentSnapshot,
} from './firestore';

function getData(docs: QueryDocumentSnapshot[], onlyIds: boolean): UseCollectionData {
    if (onlyIds) {
        return docs.map(doc => doc.id);
    }
    return docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
    }));
}

export interface UseCollectionProps {
    path: string;
    query?: (ref: CollectionRef) => Query;
    onlyIds?: boolean;
}

const defaultData: UseCollectionData = [];

export default function useCollection(props: UseCollectionProps): UseCollectionHook {
    const { path, query, onlyIds = false } = props;
    const { app } = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(defaultData);

    if (app) {
        useEffect(() => {
            const ref = app.firestore().collection(path);
            const finalQuery = query ? query(ref) : ref;

            setIsLoading(true);
            const unsubscribe = finalQuery.onSnapshot((querySnapshot: QuerySnapshot) => {
                setData(getData(querySnapshot.docs, onlyIds));
                setIsLoading(false);
            });
            return () => {
                return unsubscribe();
            };
        }, [props.path]);
    }
    return [data, isLoading];
}
