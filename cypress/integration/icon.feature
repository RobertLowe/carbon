Feature: Icon component
  I want to change Heading component properties

  Background: Open Icon component page
    Given I open "Icon" component page

  @positive
  Scenario Outline: Change type
    When I select type to "<type>"
    Then icon on preview is "<type>"
    Examples:
      | type              |
      | add               |
      | alert             |
      | analysis          |
      | arrow_down        |
      | arrow_left        |
      | arrow_right       |
      | arrow_up          |
      | attach            |
      | basket            |
      | bin               |
      | blocked           |
      | blocked_square    |
      | bulk_destroy      |
      | business          |
      | calendar          |
      | call              |
      | camera            |
      | card_view         |
      | caret_down        |
      | cart              |
      | chat              |
      | chart_bar         |
      | chart_line        |
      | chart_pie         |
      | chat_notes        |
      | chevron_down      |
      | chevron_left      |
      | chevron_right     |
      | chevron_up        |
      | clock             |
      | close             |
      | collaborate       |
      | copy              |
      | connect           |
      | credit_card       |
      | credit_card_slash |
      | cross             |
      | csv               |
      | delete            |
      | delivery          |
      | disputed          |
      | download          |
      | drag              |
      | drag_vertical     |
      | draft             |
      | dropdown          |
      | duplicate         |
      | edit              |
      | edited            |
      | email             |
      | error             |
      | favourite         |
      | favourite_lined   |
      | fax               |
      | feedback          |
      | filter            |
      | filter_new        |
      | fit_height        |
      | fit_width         |
      | folder            |
      | gift              |
      | graph             |
      | grid              |
      | home              |
      | image             |
      | in_progress       |
      | in_transit        |
      | info              |
      | individual        |
      | key               |
      | link              |
      | list_view         |
      | locked            |
      | location          |
      | logout            |
      | marker            |
      | message           |
      | messages          |
      | minus             |
      | mobile            |
      | pdf               |
      | people            |
      | person            |
      | phone             |
      | plus              |
      | print             |
      | progressed        |
      | question          |
      | refresh           |
      | remove            |
      | save              |
      | search            |
      | services          |
      | settings          |
      | share             |
      | shop              |
      | sort_down         |
      | sort_up           |
      | submitted         |
      | sync              |
      | tick              |
      | unlocked          |
      | upload            |
      | uploaded          |
      | view              |
      | warning           |
      | white-tick        |

  @positive
  Scenario Outline: Change bgTheme
    When I select bgTheme to "<bgTheme>"
    Then bgTheme is set to "<bgTheme>"
    Examples:
      | bgTheme     |
      | error       |
      | help        |
      | info        |
      | maintenance |
      | new         |
      | success     |
      | warning     |
      | default     |

  @positive
  Scenario Outline: Change bgShape
    When I select bgShape to "<bgShape>"
    Then bgShape is set to "<bgShape>"
    Examples:
      | bgShape      |
      | circle       |
      | rounded-rect |
      | square       |

  @positive
  Scenario Outline: Change tooltipMessage
    When I set tooltipMessage to "<tooltipMessage>"
    And I hover mouse onto icon
    Then tooltipPreview on preview is set to "<tooltipMessage>"
    Examples:
      | tooltipMessage          |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |
