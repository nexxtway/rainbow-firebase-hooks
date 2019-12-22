import * as React from 'react';
import * as Firebase from 'firebase';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Context from './context';

export interface ProviderProps {
    value: { app: Firebase.app.App };
    children: React.ReactChildren;
}

export default function FirebaseProvider(props: ProviderProps): JSX.Element {
    const { value, children } = props;
    return <Context.Provider value={value}>{children}</Context.Provider>;
}
