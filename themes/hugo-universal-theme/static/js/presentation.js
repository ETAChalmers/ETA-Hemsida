setInterval(() => {
    $('#presentation-time').text(new Date().toLocaleTimeString("se", {hour: "2-digit", minute: "2-digit"}));
}, 100);

function reset_to_welcome() {
    $('#presentation-item').hide();
    $('#presentation-welcome').show();
    $('#presentation-search-input').val("");
}

function set_item(item_id) {
    $.getJSON("/auction/presentation/index.json", function(data) {
        $('#presentation-search-input').val("");

        var item = data.items.find(item => item.id === item_id);

        if (typeof item == 'undefined') {
            make_search_red();
        } else {
            reset_search_color();

            $('#presentation-welcome').hide();

            $('#presentation-item-title').text(item.title);
            $('#presentation-item-description').text(item.description);

            if (item.image !== undefined) {
                $('#presentation-item-img').attr("src", item.image);
            } else {
                $('#presentation-item-img').attr("src", "/img/missing-image.png");
            }

            $('#presentation-item-category').text(item.category);
            $('#presentation-item-status').text(item.status);
            $('#presentation-item-id').text(item.id);
            $('#presentation-item').show();
        }
    });
}

function make_search_red() {
    $('#presentation-search-input').css("background-color", "#ff8888");
}

function reset_search_color() {
    $('#presentation-search-input').css("background-color", "");
}

jQuery(document).ready(function(){
    $('#presentation-search-input').focus();

    $('#presentation-search-input').on('input', function (e) {
        let current = $('#presentation-search-input').val();
        $('#presentation-search-input').val(current.replace(/[^0-9A-Z]/g, "_"));
    });
    $('#presentation-search-input').on('keypress', function (e) {
        if (e.which === 13) {
            if ($('#presentation-search-input').val() == "") {
                reset_to_welcome()
            } else {
                set_item($('#presentation-search-input').val());
            }
        }
    });
});
