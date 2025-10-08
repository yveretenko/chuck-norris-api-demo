# Chuck Norris Jokes App

Simple single-page app to fetch jokes from [Chuck Norris API](https://api.chucknorris.io/).

## Features

- Random joke
- Random joke from category
- Free text search
- Favourites panel
- Responsive: mobile, tablet, desktop

## Usage

1. Open in browser.
2. Choose mode (Random, Category, Search).
3. Click "Get a joke" to fetch jokes.
4. Click ❤️ to add/remove favourites. They appear in the right panel.


## Dependencies

- [Bootstrap 5](https://getbootstrap.com/)
- [jQuery 3.7+](https://jquery.com/)
- [FontAwesome](https://fontawesome.com/)

### Dev Dependencies (for testing)

- **Jest** – JavaScript testing framework
- **jest-localstorage-mock** – mock `localStorage` in tests

## Notes

- Favourites are stored in `localStorage`.
- Panel is responsive; collapses on mobile/tablet with burger toggle.

## Running Tests

This project uses **Jest** to test the Favourites class.

1. Make sure dependencies are installed:

```bash
npm install
```
    
2. Run tests:

```bash
npm test
```

The tests cover:

Favourites class:
- Adding a joke to favourites
- Removing a joke by ID
- Checking if a joke is in favourites
- Triggering callbacks on change

ChuckAPI:
- Fetching a random joke
- Fetching a random joke from a specific category
- Fetching the list of categories
- Searching for jokes by free text
- Handling empty search results