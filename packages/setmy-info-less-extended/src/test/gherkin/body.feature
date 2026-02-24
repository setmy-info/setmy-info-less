Feature: body page

    Scenario: body rendering with specific properties
        Given page name is "body"
        When page is rendered
        And page element ID is "body"
        Then page should have title "body.html"
        And page element margin should be "0px 0px 0px 0px"
        And page element padding should be "0px 0px 0px 0px"
        And page element font family should be "DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif"
        And page element font size should be "16px"
        And page element X should be 0
        And page element Y should be 0
        And page element WIDTH should be 2000
        And page element HEIGHT should be 1200
        And page element TOP should be 0
        And page element LEFT should be 0
        And page element background color should be "rgba(0, 0, 0, 0)"
        And page element color should be "rgb(0, 0, 0)"
        And page is closed
