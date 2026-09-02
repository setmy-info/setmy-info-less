/*
 * Brand page behaviour for the test pages.
 *
 * The real pages drive this from Vue; the test pages have no framework, so this is the same
 * behaviour written as plain browser JS — no build step, no dependency. It only toggles
 * classes and the inline display, so what the e2e tests measure is the transferred CSS:
 *
 *   .pl        opens the privacy overlay      (#prv gets .open)
 *   .pvx       closes it again
 *   .ga        accepts consent                (#gb is hidden)
 *   .lb        selects a language             (.on moves to the clicked button)
 *   .dot       selects a panel                (.on moves to the clicked dot)
 *
 * Pug inlines this file into every page that includes it (script / include js/brand-page.js).
 */
(function () {
    "use strict";

    function byId(id) {
        return document.getElementById(id);
    }

    function on(selector, handler) {
        var nodes = document.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener("click", handler);
        }
    }

    function selectOne(group, chosen) {
        var nodes = document.querySelectorAll(group);
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] === chosen) {
                nodes[i].className += " on";
            } else {
                nodes[i].className = nodes[i].className
                    .replace(/(^|\s)on(\s|$)/, " ")
                    .replace(/\s+/g, " ")
                    .replace(/^\s|\s$/g, "");
            }
        }
    }

    function openPreview() {
        var preview = byId("prv");
        if (preview && preview.className.indexOf("open") === -1) {
            preview.className = (preview.className + " open").replace(
                /^\s/,
                "",
            );
        }
    }

    function closePreview() {
        var preview = byId("prv");
        if (preview) {
            preview.className = preview.className
                .replace(/(^|\s)open(\s|$)/, " ")
                .replace(/^\s|\s$/g, "");
        }
    }

    function acceptConsent() {
        var bar = byId("gb");
        if (bar) {
            bar.style.display = "none";
        }
    }

    function wire() {
        on(".pl", openPreview);
        on(".pvx", closePreview);
        on(".ga", acceptConsent);
        on(".lb", function (event) {
            selectOne(".lb", event.currentTarget);
        });
        on(".dot", function (event) {
            selectOne(".dot", event.currentTarget);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", wire);
    } else {
        wire();
    }

    // Exposed so a test can drive the page without going through a click.
    window.brandPage = {
        openPreview: openPreview,
        closePreview: closePreview,
        acceptConsent: acceptConsent,
    };
})();
