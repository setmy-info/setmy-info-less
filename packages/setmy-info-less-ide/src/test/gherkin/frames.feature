Feature: IDE frames page

    Scenario: NetBeans-style frame layout is provided by the IDE package
        Given page name is "frames"
        When page is rendered
        And page element ID is "body"
        Then page should have title "frames.html"
        And page element padding should be "0px 0px 0px 0px"
        And page element ID is "contentHeader"
        And page element HEIGHT should be 50
        And page element ID is "content"
        And page element HEIGHT should be 1125
        And page element ID is "sectionLeft"
        And page element WIDTH should be 588
        And page element ID is "verticalSeparator"
        And page element WIDTH should be 8
        And page element ID is "contentFooter"
        And page element HEIGHT should be 25
        And page is closed