import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { Button, Input, Spinner } from 'react-rainbow-components';
import FirebaseProvider from '../src/firebase-provider';
import app from './firebase';
import createSetDocAction from '../src/firestore/createSetDocAction';
import useCollection from '../src/firestore/useCollection';

export default {
    title: 'createSetDocAction',
};

const value = { app };

export const Base = () => {
    function AddBook() {
        const [value, setValue] = useState('');
        const [setDoc, isLoading] = createSetDocAction({ path: 'books/myCustomId' });
        const [data] = useCollection({
            path: 'books',
        });

        return (
            <div>
                <Button label="Add Book" onClick={() => setDoc({ name: value })} />
                <Input
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    style={{ marginTop: 24, marginBottom: 24 }}
                />
                {isLoading ? <Spinner /> : <ReactJson src={data || {}} />}
            </div>
        );
    }

    return (
        <FirebaseProvider value={value}>
            <AddBook />
        </FirebaseProvider>
    );
};
