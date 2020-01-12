import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import { DocumentReference, FirestoreError } from './firestore';

export interface Props {
    path: string;
}

interface Data {
    [key: string]: any;
}

type Action = (data?: Data) => Promise<DocumentReference | FirestoreError> | void;

type ReturnType = [Action, boolean];

export default function createAddDocAction(props: Props): ReturnType {
    const { path } = props;
    const { app } = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [action, setAction] = useState<Action>(() => () => undefined);

    if (app) {
        useEffect(() => {
            setAction(() => async (data: Data) => {
                try {
                    setIsLoading(true);
                    const docRef = await app
                        .firestore()
                        .collection(path)
                        .add({
                            ...data,
                            createdAt: new Date(),
                        });
                    setIsLoading(false);
                    return docRef;
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                    return error;
                }
            });
        }, [props.path]);
    }
    return [action, isLoading];
}
