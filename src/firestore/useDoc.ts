import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import { Doc, DocumentSnapshot, UseDocHook } from './firestore';

export interface UseDocProps {
    path: string;
}

export default function useDoc(props: UseDocProps): UseDocHook {
    const { path } = props;
    const { app } = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Doc | null>(null);

    if (app) {
        useEffect(() => {
            const ref = app.firestore().doc(path);
            setIsLoading(true);
            const unsubscribe = ref.onSnapshot(
                (doc: DocumentSnapshot) => {
                    if (doc.exists) {
                        setData({
                            id: doc.id,
                            data: doc.data(),
                        });
                    } else {
                        setData(null);
                    }
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
        }, [props.path]);
    }
    return [data, isLoading];
}
