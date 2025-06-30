Feature: Body page

    Scenario: Main html parts
        Given page name is "main"
        When page is compiled
        When page is rendered
        Then page title should be "main.html"
        Then coordinates of the element "body" should be 0, 0 and 2000, 1200.
        Then element with id "body" should have margin "0px 0px 0px 0px", padding "0px 0px 0px 0px", font "Arial", font size "16px", width 2000px, height 1200px, background color "rgba(0, 0, 0, 0)", text color "rgb(0, 0, 0)"
        Then page is closed
