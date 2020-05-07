Feature: FlatTable sortable component
  I want to check FlatTable sortable component properties

  Background: Open FlatTable sortable component page
    Given I open sortable Test "Flat Table" component page in Iframe

  # will remove when Applitools will be implemented
  @positive
  Scenario Outline: Flat table header has <colorTheme> color
    When I select colorTheme to "<colorTheme>"
    Then Flat table header has "<color>" color
    Examples:
      | colorTheme        | color              |
      | dark              | rgb(51, 91, 109)   |
      | transparent-base  | rgb(242, 244, 245) |
      | light             | rgb(204, 214, 218) |
      | transparent-white | rgb(255, 255, 255) |