import { jest } from '@jest/globals';
import { ChuckAPI } from '../public/js/chuck-api.js';

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

test('random() fetches a joke', async () => {
    const mockJoke = { id: '1', value: 'Test joke' };
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockJoke,
    });

    const joke = await ChuckAPI.random();
    expect(fetch).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/random');
    expect(joke).toEqual(mockJoke);
});

test('randomFromCategory() fetches joke with category', async () => {
    const mockJoke = { id: '2', value: 'Category joke' };
    const category = 'celebrity';
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockJoke,
    });

    const joke = await ChuckAPI.randomFromCategory(category);
    expect(fetch).toHaveBeenCalledWith(
        `https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(category)}`
    );
    expect(joke).toEqual(mockJoke);
});

test('categories() fetches categories list', async () => {
    const mockCats = ['cat1', 'cat2'];
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCats,
    });

    const cats = await ChuckAPI.categories();
    expect(fetch).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/categories');
    expect(cats).toEqual(mockCats);
});

test('search() fetches search results', async () => {
    const query = 'funny';
    const mockResult = { result: [{ id: '3', value: 'Search joke' }] };
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResult,
    });

    const jokes = await ChuckAPI.search(query);
    expect(fetch).toHaveBeenCalledWith(
        `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`
    );
    expect(jokes).toEqual(mockResult.result);
});

test('search() returns empty array if no result', async () => {
    const query = 'nothing';
    const mockResult = {};
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResult,
    });

    const jokes = await ChuckAPI.search(query);
    expect(jokes).toEqual([]);
});
