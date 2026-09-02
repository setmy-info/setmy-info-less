/*
 * Side navigation open/close for the test pages.
 *
 * The Angular components drive #sidenav from ModalService ([style.display] bound to
 * modalService.isOpen()). The test pages have no framework, so this is the same behaviour
 * written as plain browser JS: the header's hamburger button opens the panel, the panel's
 * own close button and any menu link close it again. Nothing here styles anything — it only
 * flips the inline display, so what the e2e tests measure is the transferred CSS.
 *
 * Pug inlines this file into every page that includes it (script / include js/...).
 */
(function () {
    "use strict";

    var HIDDEN = "none";
    var VISIBLE = "";

    function sideNavigationPanel() {
        return document.getElementById("sidenav");
    }

    function setDisplay(value) {
        var panel = sideNavigationPanel();
        if (panel) {
            panel.style.display = value;
        }
    }

    function open() {
        setDisplay(VISIBLE);
    }

    function close() {
        setDisplay(HIDDEN);
    }

    function toggle() {
        var panel = sideNavigationPanel();
        if (!panel) {
            return;
        }
        if (panel.style.display === HIDDEN) {
            open();
        } else {
            close();
        }
    }

    function on(elementId, handler) {
        var element = document.getElementById(elementId);
        if (element) {
            element.addEventListener("click", handler);
        }
    }

    function wire() {
        on("menuButton", toggle);
        on("sideNavigationCloseButton", close);
        var links = document.querySelectorAll(
            "#sideNavigationContentPanel li.sideNavMenuItems > a",
        );
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", close);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", wire);
    } else {
        wire();
    }

    // Exposed so a test can drive the panel without going through a click.
    window.sideNavigationPanel = {
        open: open,
        close: close,
        toggle: toggle,
    };
})();
