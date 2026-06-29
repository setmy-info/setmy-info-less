Feature: IDE experimental frames page

    Scenario: experimental frames page is generated from the IDE workspace
        Given page name is "experimental-frames"
        When page is rendered
        And page element ID is "body"
        Then page should have title "experimental-frames.html"
        And page element padding should be "0px 0px 0px 0px"
        And page element ID is "verticalDivider"
        And page element WIDTH should be 8
        And page element ID is "horizontalLeftDivider"
        And page element HEIGHT should be 4
        And page element ID is "horizontalRightDivider"
        And page element HEIGHT should be 4
        And page element ID is "body"
        And page element style "cursor" should be "auto"
        And page is closed