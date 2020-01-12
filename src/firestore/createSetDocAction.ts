import { useContext, useEffect, useState } from 'react';
import Context from '../context';
import { DocumentReference, FirestoreError } from './firestore';
import getPath from '../helpers/getPath';

type PathFunc = (...args: any[]) => string;

export interface Props {
    path: string | PathFunc;
}

interface Data {
    [key: string]: any;
}

type Action = (data?: Data, ...args: any[]) => Promise<DocumentReference | FirestoreError> | void;

type ReturnType = [Action, boolean];

export default function createSetDocAction(props: Props): ReturnType {
    const { path } = props;
    const { app } = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [action, setAction] = useState<Action>(() => () => undefined);

    if (app) {
        useEffect(() => {
            setAction(() => async (data: Data, ...args: any[]) => {
                try {
                    setIsLoading(true);
                    const docRef = await app
                        .firestore()
                        .doc(getPath(path, ...args))
                        .set({
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
