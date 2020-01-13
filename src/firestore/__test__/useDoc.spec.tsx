import * as React from 'react';
import Firebase from 'firebase';
import { mount } from 'enzyme';
import * as firebase from '@firebase/testing';
import waitForExpect from 'wait-for-expect';
import * as fs from 'fs';
import FirebaseProvider from './../../firebase-provider';
import useDoc from './../useDoc';

function User(): JSX.Element {
    const [user] = useDoc({
        path: '/users/user123',
    });
    return <h1>{user?.data?.name}</h1>;
}

describe('useDoc()', () => {
    let contextValue: { app: Firebase.app.App };
    beforeAll(() => {
        return firebase
            .loadFirestoreRules({
                projectId: 'fir-hooks-66a0b',
                rules: fs.readFileSync('./firestore.rules', 'utf8'),
            })
            .then(() => {
                const app = firebase.initializeTestApp({
                    projectId: 'fir-hooks-66a0b',
                });
                contextValue = { app };
                return app
                    .firestore()
                    .collection('users')
                    .doc('user123')
                    .set({ name: 'Maxx' });
            });
    });
    it('should resolve the doc data', async () => {
        const component = (
            <FirebaseProvider value={contextValue}>
                <User />
            </FirebaseProvider>
        );
        const wrapper = mount(component);
        await waitForExpect(() => {
            expect(wrapper.find('h1').text()).toBe('Maxx');
        });
    });
    it('should keep listening for chaging on a doc', async () => {
        const component = (
            <FirebaseProvider value={contextValue}>
                <User />
            </FirebaseProvider>
        );
        const wrapper = mount(component);
        await contextValue.app
            .firestore()
            .doc('/users/user123')
            .update({ name: 'Leandro' });
        await waitForExpect(() => {
            expect(wrapper.find('h1').text()).toBe('Leandro');
        });
    });

    afterAll(() => {
        contextValue.app.delete();
    });
});
