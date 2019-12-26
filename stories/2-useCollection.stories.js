import React from 'react';import Firebase from 'firebase';
import FirebaseProvider from '../src/firebase-provider';
import app from './firebase';
import useCollection from '../src/firestore/useCollection';
import ListOfBooks from './components/list-of-books';

export default {
	title: 'useCollection',
};

const value = { app };

export const Base = () => {	
	
	function Books() {
		const [data, isLoading] = useCollection({
            path: 'books',
            queryId: 'top-10-books'
        });
		return <ListOfBooks data={data} isLoading={isLoading} />;
	}

	return (
		<FirebaseProvider value={value}>
			<Books />
		</FirebaseProvider>	
	)
};

