Feature: article page

    Scenario: article rendering with specific properties
        Given page name is "article"
        When page is rendered
        And page element ID is "article"
        Then page should have title "article.html"
        And page element style "line-height" should be "27.2px"
        And page element font size should be "16px"
        And page element color should be "rgb(0, 0, 0)"
        And page is closed
