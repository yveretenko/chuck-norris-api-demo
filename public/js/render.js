function renderFavouritesPanel(favs) {
    const $list = $('#favourite-jokes-list');
    $list.find('.joke-item:not(#fav-joke-template)').remove();

    if (!favs.length) {
        return;
    }

    const $template = $('#fav-joke-template');

    favs.forEach(j => {
        const $clone = $template.clone()
            .removeClass('d-none')
            .removeAttr('id')
            .data('joke', j);

        $clone.find('.joke-id').text(j.id);
        $clone.find('.joke-text').text(j.value);
        $clone.find('.joke-last-update').text(DateTimeUtils.timeAgo(j.updated_at));
        $clone.find('.joke-link').attr('href', j.url || '#');

        $clone.find('.favourite-btn').find('i').removeClass('fa-regular').addClass('fa-solid');

        $list.append($clone);
    });
}

function updateFavouriteStars(favs) {
    const favIds = favs.map(j => j.id);

    $('#jokes-list').find('.joke-item').each(function() {
        const $card = $(this);
        const joke = $card.data('joke');

        if (!joke) return;

        const $icon = $card.find('.favourite-btn i');

        $icon.toggleClass('fa-solid', favIds.includes(joke.id));
        $icon.toggleClass('fa-regular', !favIds.includes(joke.id));
    });
}