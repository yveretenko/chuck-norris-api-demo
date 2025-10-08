export const ChuckAPI = {
    random() {
        return fetch('https://api.chucknorris.io/jokes/random')
            .then(res => res.json());
    },

    randomFromCategory(category) {
        return fetch(`https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(category)}`)
            .then(res => res.json());
    },

    categories() {
        return fetch('https://api.chucknorris.io/jokes/categories')
            .then(res => res.json());
    },

    search(query) {
        return fetch(`https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => data.result || []);
    }
};