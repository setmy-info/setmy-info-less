Feature: landing composition page

    Scenario: a public landing page is composed from base + extended + fancy classes
        Given page name is "landing"
        When page is rendered
        And page element ID is "siteHeader"
        Then page should have title "landing.html"
        And page element WIDTH should be 2000
        And page element ID is "hero"
        And page element WIDTH should be 2000
        And page element HEIGHT should be 360
        And page element ID is "ctaButton"
        And page element HEIGHT should be 50
        And page element ID is "tileImage"
        And page element HEIGHT should be 200
        And page is closed
