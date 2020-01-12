import { useContext } from 'react';
import Context from '../context';
import { CurrentUser } from './firestore';

export default function useCurrentUser(): CurrentUser {
    const { app } = useContext(Context);
    if (app) {
        return app.auth().currentUser;
    }
    return null;
}
