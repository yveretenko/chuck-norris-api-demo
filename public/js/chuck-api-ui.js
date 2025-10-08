import { ChuckAPI } from './chuck-api.js';
import { Favourites } from './favourites.js';

$(function() {
    const $categoriesContainer = $('#categories-list');
    const $template = $categoriesContainer.find('#category-template');

    ChuckAPI.categories().then(categories => {
        categories.forEach(cat => {
            const $container = $template.clone().removeClass('d-none');

            $container.find('.btn').text(cat);

            $categoriesContainer.append($container);
        });

        $template.remove();
    });

    $categoriesContainer.on('click', '.btn', function() {
        const $clicked = $(this);

        $categoriesContainer.find('.btn').removeClass('active');

        $clicked.addClass('active');
    });

    $('#joke-search-form').on('submit', function(e) {
        e.preventDefault();

        const $submit = $(this).find('button[type="submit"]');

        $submit.addClass('disabled');

        const mode = $('input[name="mode"]:checked').val();
        const $template = $('#joke-template');

        let promise;

        let category = $('#categories-list').find('.active').text().toLowerCase();
        
        if(mode === 'random') {
            promise = ChuckAPI.random().then(j => [j]);
        } else if(mode === 'category') {
            if(!category) {
                alert('Please select a category');
                return;
            }

            promise = ChuckAPI.randomFromCategory(category).then(j => [j]);
        } else if(mode === 'search') {
            const query = $(this).find('input[name="query"]').val();

            if(!query) {
                alert('Please enter a search query');
                return;
            }

            promise = ChuckAPI.search(encodeURIComponent(query));
        } else {
            return;
        }

        promise.then(jokes => {
            const jokesList = $('#jokes-list');

            jokesList.find('.joke-item:not(#joke-template)').remove();

            jokes.forEach(j => {
                const $clone = $template.clone().removeClass('d-none').attr('id','');

                $clone.data('joke', j);
                $clone.removeAttr('id')

                $clone.find('.joke-id').text(j.id || '');
                $clone.find('.joke-text').text(j.value || '');
                $clone.find('.joke-last-update').text(DateTimeUtils.timeAgo(j.updated_at));
                $clone.find('.joke-link').attr('href', j.url || '#');

                const $categoriesContainer = $clone.find('.joke-categories');
                const $categoryTemplate = $categoriesContainer.find('span');

                (j.categories || []).forEach(cat => {
                    const $span = $categoryTemplate.clone().text(cat);
                    $categoriesContainer.append($span);
                });

                $categoryTemplate.remove();

                jokesList.append($clone);
            });

            updateFavouriteStars(Favourites.getAll());
        }).catch(() => {
            alert('Error fetching jokes');
        }).always(() => {
            $submit.removeClass('disabled');
        });
    });

    $('#jokes-list, #favourites-panel').on('click', '.favourite-btn', function() {
        const $card = $(this).closest('.joke-item');
        const joke = $card.data('joke');

        if (Favourites.has(joke.id)) {
            Favourites.remove(joke.id);
        } else {
            Favourites.add(joke);
        }

        return false;
    });

    Favourites.onChange(favs => {
        renderFavouritesPanel(favs);
        updateFavouriteStars(favs);
    });

    renderFavouritesPanel(Favourites.getAll());
});