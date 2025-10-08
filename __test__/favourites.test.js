/**
 * @jest-environment jsdom
 */
import { Favourites } from '../public/js/favourites.js'

describe('Favourites class', () => {
    beforeEach(() => {
        localStorage.clear();
        Favourites.listeners = [];
    });

    test('add() stores a joke if not already present', () => {
        const joke = { id: '1', value: 'Test joke' };
        Favourites.add(joke);

        const stored = JSON.parse(localStorage.getItem(Favourites.KEY));
        expect(stored).toHaveLength(1);
        expect(stored[0]).toEqual(joke);
    });

    test('add() does not duplicate jokes', () => {
        const joke = { id: '1', value: 'Test joke' };
        Favourites.add(joke);
        Favourites.add(joke);

        const stored = JSON.parse(localStorage.getItem(Favourites.KEY));
        expect(stored).toHaveLength(1);
    });

    test('remove() deletes joke by id', () => {
        const joke1 = { id: '1', value: 'A' };
        const joke2 = { id: '2', value: 'B' };
        Favourites.add(joke1);
        Favourites.add(joke2);

        Favourites.remove('1');
        const stored = JSON.parse(localStorage.getItem(Favourites.KEY));
        expect(stored).toHaveLength(1);
        expect(stored[0]).toEqual(joke2);
    });

    test('has() returns true if joke exists', () => {
        const joke = { id: '1', value: 'Test' };
        Favourites.add(joke);

        expect(Favourites.has('1')).toBe(true);
        expect(Favourites.has('2')).toBe(false);
    });

    test('onChange() triggers callback on add and remove', () => {
        const cb = jest.fn();
        Favourites.onChange(cb);

        const joke = { id: '1', value: 'Test' };
        Favourites.add(joke);
        Favourites.remove('1');

        expect(cb).toHaveBeenCalledTimes(2);
        expect(cb).toHaveBeenLastCalledWith([]);
    });
});
