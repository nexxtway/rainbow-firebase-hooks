import * as React from 'react';
import * as Firebase from 'firebase';
import Context from './context';

export interface ProviderProps {
    value: { app: Firebase.app.App };
    children: React.ReactChildren;
}

export default function FirebaseProvider(props: ProviderProps) {
    const { value, children } = props;
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}