Feature: modal page

    Scenario: overlay rendering with specific properties
        Given page name is "modal"
        When page is rendered
        And page element ID is "overlay"
        Then page should have title "modal.html"
        And page element style "position" should be "fixed"
        And page element TOP should be 0
        And page element LEFT should be 0
        And page element WIDTH should be 2000
        And page element HEIGHT should be 1200
        And page element background color should be "rgba(0, 0, 0, 0.5)"
        And page is closed

    Scenario: modal dialog rendering with specific properties
        Given page name is "modal"
        When page is rendered
        And page element ID is "modal"
        Then page should have title "modal.html"
        And page element style "position" should be "fixed"
        And page element style "max-width" should be "640px"
        And page element style "width" should be "640px"
        And page element style "max-height" should be "960px"
        And page element background color should be "rgb(255, 255, 255)"
        And page element style "border-top-left-radius" should be "6px"
        And page is closed
