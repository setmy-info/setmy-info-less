Feature: Simple math operations

    Scenario: Add two numbers
        Given I have two numbers 5 and 7
        When I add the two numbers
        Then the result should be 12
