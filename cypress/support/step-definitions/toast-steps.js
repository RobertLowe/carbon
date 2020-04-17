import { toastPreview, toastComponent } from '../../locators/toast';
import { getDataElementByValue } from '../../locators';


Then('Toast icon is set to {string}', (val) => {
  toastPreview().then(($el) => {
    expect($el[0].firstElementChild.getAttribute('data-element')).to.equal(val);
  });
});

Then('Toast children is set to {string}', (text) => {
  toastComponent().then(($el) => {
    expect($el[0].children[1].textContent).to.equal(text);
  });
});

Then('Toast component is visible', () => {
  toastPreview().should('be.visible');
});

Then('Toast component is not visible', () => {
  toastComponent().should('not.exist');
});

Then('Toast component has a close icon', () => {
  getDataElementByValue('close').should('be.visible');
});

Then('Toast component has no close icon', () => {
  getDataElementByValue('close').should('not.exist');
});

Then('Toast has background-color {string} and border {string} color', (color) => {
  toastComponent().then(($el) => {
    expect(window.getComputedStyle($el[0].children[0]).getPropertyValue('background-color')).to.equal(color);
    expect(window.getComputedStyle($el[0]).getPropertyValue('border-color')).to.equal(color);
  });
});
