Feature: Body page

    Scenario: body parameters
        Given page name is "body"
        When page is compiled
        When page is rendered
        Then page title should be "body.html"
        Then coordinates of the element "body" should be 0, 0 and 2000, 1200.
        Then page is closed
