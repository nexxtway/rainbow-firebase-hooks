import * as React from 'react';
import * as Firebase from 'firebase';

export interface ContextValue {
    app: Firebase.app.App | null;
}

const defaultValue: ContextValue = { app: null };
export default React.createContext(defaultValue);