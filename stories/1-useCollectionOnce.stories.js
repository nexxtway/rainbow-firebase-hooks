import React from 'react';import Firebase from 'firebase';
import FirebaseProvider from '../src/firebase-provider';
import app from './firebase';
import useCollectionOnce from '../src/firestore/useCollectionOnce';
import ListOfBooks from './components/list-of-books';

export default {
	title: 'useCollectionOnce',
};

const value = { app };

export const Base = () => {	
	
	function Books() {
		const [data, isLoading] = useCollectionOnce({
			path: 'books',
		});
		return <ListOfBooks data={data} isLoading={isLoading} />;
	}

	return (
		<FirebaseProvider value={value}>
			<Books />
		</FirebaseProvider>	
	)
};

export const WithQuery = () => {
	
	function Books() {
		const [data, isLoading] = useCollectionOnce({
			path: 'books',
			query: query => query.where('name', '==', 'Prediction Machines'),
		});
		return <ListOfBooks data={data} isLoading={isLoading} />;
	}

	return (
		<FirebaseProvider value={value}>
			<Books />
		</FirebaseProvider>	
	)	
}

export const WithArrayContains = () => {
	
	function Books() {
		const [data, isLoading] = useCollectionOnce({
			path: 'books',
			query: query => query.where('authors', 'array-contains', 'Ajay Agrawal'),
		});
		return <ListOfBooks data={data} isLoading={isLoading} />;
	}

	return (
		<FirebaseProvider value={value}>
			<Books />
		</FirebaseProvider>	
	)	
}