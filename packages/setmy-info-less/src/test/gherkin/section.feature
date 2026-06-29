Feature: section page

    Scenario: section rendering with specific properties
        Given page name is "section"
        When page is rendered
        And page element ID is "section"
        Then page should have title "section.html"
        And page element style "max-width" should be "1024px"
        And page element padding should be "20px 10px 20px 10px"
        And page element style "width" should be "1024px"
        And page is closed
