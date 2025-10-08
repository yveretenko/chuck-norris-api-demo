$(function() {
    $('input[name="mode"]').on('change', function() {
        const $selected = $(this);

        $('#joke-search-form').find('.toggleable').addClass('d-none');

        $selected.closest('.form-check').next('.toggleable').removeClass('d-none');
    });

    $('input[name="mode"]:checked').trigger('change');
});