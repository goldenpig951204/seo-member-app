$(document).ready(function() {
    setTimeout(function() {
        if (!isAdmin) {
            $(".sf-account, .sf-myspyfu-container").remove();
        }
        $(".guarantee + a.sf-global-component").attr("href", "/mainpurchase/?page=default");
    }, 3000);
    

    $(document).on("click", ".search-button", function(event) {
        let classList = $(".sf-international-search .flag-icon").attr("class");
        let prefix = "";
        if (classList.includes("flag-icon-us")) {
            prefix = "www";
        } else if (classList.includes("flag-icon-au")) {
            prefix = "www-au";
        } else if (classList.includes("flag-icon-br")) {
            prefix = "www-br";
        } else if (classList.includes("flag-icon-ca")) {
            prefix = "www-ca";
        } else if (classList.includes("flag-icon-de")) {
            prefix = "www-de";
        } else if (classList.includes("flag-icon-fr")) {
            prefix = "www-fr";
        } else if (classList.includes("flag-icon-in")) {
            prefix = "www-in";
        } else if (classList.includes("flag-icon-ie")) {
            prefix = "www-ie";
        } else if (classList.includes("flag-icon-it")) {
            prefix = "www-it";
        } else if (classList.includes("flag-icon-mx")) {
            prefix = "www-mx";
        } else if (classList.includes("flag-icon-nl")) {
            prefix = "www-nl";
        } else if (classList.includes("flag-icon-uk")) {
            prefix = "www-uk";
        } else if (classList.includes("flag-icon-sg")) {
            prefix = "www-sg";
        } else if (classList.includes("flag-icon-es")) {
            prefix = "www-es";
        }
        if (locale !== prefix) {
            event.preventDefault();
            event.stopPropagation();
            prevUrl = window.location.href;
            window.location.href = `/lang/spyfu?prefix=${prefix}&prev_url=${prevUrl}`;
        }
    });
});