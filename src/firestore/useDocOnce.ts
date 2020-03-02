import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import { Doc, DocumentSnapshot, UseDocHook } from './firestore';

export interface UseDocProps {
    path: string;
}

export default function useDocOnce(props: UseDocProps): UseDocHook {
    const { path } = props;
    const { app } = useContext(Context);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Doc | null>(null);

    useEffect(() => {
        if (app) {
            const ref = app.firestore().doc(path);
            ref.get()
                .then((doc: DocumentSnapshot) => {
                    if (doc.exists) {
                        setData({
                            id: doc.id,
                            data: doc.data(),
                        });
                    } else {
                        setData(null);
                    }
                    setIsLoading(false);
                })
                .catch((err: object) => {
                    setIsLoading(false);
                    console.log(err);
                });
        }
    }, [props.path]);

    return [data, isLoading];
}
