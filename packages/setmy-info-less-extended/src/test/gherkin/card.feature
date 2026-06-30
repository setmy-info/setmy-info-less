Feature: card page

    Scenario: card rendering with specific properties
        Given page name is "card"
        When page is rendered
        And page element ID is "card"
        Then page should have title "card.html"
        And page element padding should be "20px 20px 20px 20px"
        And page element background color should be "rgb(255, 255, 255)"
        And page element style "border-top-width" should be "2px"
        And page element style "border-top-color" should be "rgb(204, 204, 204)"
        And page element style "border-top-left-radius" should be "6px"
        And page is closed
