Feature: body page

    Scenario: body rendering with specific properties
        Given page name is "body"
        When page is rendered
        Then page should have title "body.html"
        And page element ID is "body"
        And that element margin should be "0px 0px 0px 0px"
        And page is closed
