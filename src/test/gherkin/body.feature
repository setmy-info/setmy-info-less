Feature: Body page

    Scenario: body parameters
        Given page name is "body"
        Given page is compiled
        When it is rendered
        Then title should be "body.html"
        Then closed
