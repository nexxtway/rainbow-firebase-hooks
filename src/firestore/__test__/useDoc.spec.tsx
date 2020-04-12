import * as React from 'react';
import Firebase from 'firebase';
import { mount } from 'enzyme';
import * as firebase from '@firebase/testing';
import waitForExpect from 'wait-for-expect';
import * as fs from 'fs';
import { Spinner } from 'react-rainbow-components';
import FirebaseProvider from './../../firebase-provider';
import useDoc from './../useDoc';

function User(): JSX.Element {
    const [user, isLoading] = useDoc({
        path: '/users/user123',
    });
    if (isLoading) {
        return <Spinner />;
    }
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
            wrapper.update();
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
            wrapper.update();
            expect(wrapper.find('h1').text()).toBe('Leandro');
        });
    });
    it('should resolve isLoading as true when data is loading', () => {
        const component = (
            <FirebaseProvider value={contextValue}>
                <User />
            </FirebaseProvider>
        );
        const wrapper = mount(component);
        expect(wrapper.find('Spinner').exists()).toBe(true);
        expect(wrapper.find('h1').exists()).toBe(false);
    });
    it('should resolve isLoading as false when data was loaded', async () => {
        const component = (
            <FirebaseProvider value={contextValue}>
                <User />
            </FirebaseProvider>
        );
        const wrapper = mount(component);
        await contextValue.app
            .firestore()
            .doc('/users/user123')
            .update({ name: 'Nexxtway' });
        await waitForExpect(() => {
            wrapper.update();
            expect(wrapper.find('Spinner').exists()).toBe(false);
            expect(wrapper.find('h1').text()).toBe('Nexxtway');
        });
    });

    afterAll(() => {
        contextValue.app.delete();
    });
});
