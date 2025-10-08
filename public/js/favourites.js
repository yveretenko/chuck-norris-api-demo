export class Favourites {
    static KEY = 'chuck_favourites';
    static listeners = [];

    static getAll() {
        return JSON.parse(localStorage.getItem(Favourites.KEY) || '[]');
    }

    static add(joke) {
        let favs = Favourites.getAll();

        if (!favs.find(j => j.id === joke.id)) {
            favs.push(joke);
            localStorage.setItem(Favourites.KEY, JSON.stringify(favs));
            Favourites.triggerChange();
        }
    }

    static remove(id) {
        let favs = Favourites.getAll().filter(j => j.id !== id);

        localStorage.setItem(Favourites.KEY, JSON.stringify(favs));
        Favourites.triggerChange();
    }

    static has(id) {
        return Favourites.getAll().some(j => j.id === id);
    }

    static onChange(cb) {
        Favourites.listeners.push(cb);
    }

    static triggerChange() {
        Favourites.listeners.forEach(cb => cb(Favourites.getAll()));
    }
}
