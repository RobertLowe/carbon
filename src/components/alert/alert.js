import React from 'react';
import Dialog from '../dialog';

/**
 * A Alert widget.
 *
 * == How to use a Alert in a component:
 *
 * In your file
 *
 *   import Alert from 'carbon/lib/components/alert';
 *
 * To render a Alert:
 *
 *   <Alert cancelHandler={ customEventHandler } />
 *
 * The component rendering the Alert must pass down a prop of 'open' in order to open the alert.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Alert
 * @constructor
 */
class Alert extends Dialog {

  constructor() {
    super();
  }

  /**
   * Returns HTML and text for the alert title. Overrides super method.
   *
   * @method dialogTitle
   */
  get dialogTitle() {
    let mainTitle = 'ui-dialog__title';
    let combinedTitle = mainTitle + ' ui-alert__title';

    return (
        this.props.title ?
          <h2 className={ combinedTitle }>{ this.props.title }</h2> :
          null
    );
  }

  /**
   * Returns classes for the alert, combines with dialog class names..
   *
   * @method dialogClasses
   */
  get dialogClasses() {
    let classes = super.dialogClasses;
    classes += ' ui-alert__alert';
    return classes;
  }
}

export default Alert;
