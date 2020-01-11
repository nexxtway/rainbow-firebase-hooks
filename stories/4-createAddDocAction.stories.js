import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { Button, Input, Spinner } from 'react-rainbow-components';
import FirebaseProvider from '../src/firebase-provider';
import app from './firebase';
import createAddDocAction from '../src/firestore/createAddDocAction';
import useCollection from '../src/firestore/useCollection';

export default {
    title: 'createAddDocAction',
};

const value = { app };

export const Base = () => {
    function AddBook() {
        const [value, setValue] = useState('');
        const [addDoc, isLoading] = createAddDocAction({ path: 'books' });
        const [data] = useCollection({
            path: 'books',
        });

        return (
            <div>
                <Button label="Add Book" onClick={() => addDoc({ name: value })} />
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
