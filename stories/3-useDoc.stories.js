import React from 'react';
import ReactJson from 'react-json-view';
import { Spinner } from 'react-rainbow-components';
import FirebaseProvider from '../src/firebase-provider';
import app from './firebase';
import useDoc from '../src/firestore/useDoc';

export default {
    title: 'useDoc',
};

const value = { app };

export const Base = () => {
    function Book() {
        const [data, isLoading] = useDoc({
            path: 'books/JUMdZUwPzD2bWERLaJ4u',
        });
        if (isLoading) {
            return <Spinner />;
        }
        return <ReactJson src={data || {}} />;
    }

    return (
        <FirebaseProvider value={value}>
            <Book />
        </FirebaseProvider>
    );
};
