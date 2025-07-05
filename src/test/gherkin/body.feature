Feature: body page

    Scenario: body rendering with specific properties
        Given page name is "body"
        When page is rendered
        Then page should have title "body.html"
        And page element ID is "body"
        And that element margin should be "0px 0px 0px 0px"
        And that element padding should be "0px 0px 0px 0px"
        And that element font family should be "DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif"
        And that element font size should be "16px"
        And page is closed
