$(document).ready(() => {
    $(".send").click((event) => {
        if (!($(".receiver").val().length > 0)) {
            event.preventDefault();
            $(".receiver").css({
                borderColor: "red"
            });
            $(".receiver").focus(() => {
                $(".receiver").css({
                    borderColor: "rgb(74, 74, 248)"
                });
            });
        }
        if (!($(".content").val().length > 0)) {
            event.preventDefault();
            $(".content").css({
                borderColor: "red"
            });
            $(".content").focus(() => {
                $(".content").css({
                    borderColor: "rgb(74, 74, 248)"
                });
            });
        }
    });
});