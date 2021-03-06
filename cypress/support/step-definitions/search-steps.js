import {
  searchComponent, searchInput, searchInnerIcon, searchIcon, searchInputNoiFrame,
} from '../../locators/search';
import { positionOfElement } from '../helper';

Then('Search component placeholder is set to {string}', (placeholder) => {
  searchInput().should('have.attr', 'placeholder', placeholder);
});

When('Type {string} text into search input', (text) => {
  searchInput().clear().type(text);
});

When('Type {string} text into search input in no iFrame', (text) => {
  searchInputNoiFrame().clear().type(text);
});

Then('Search component has input and {string} as icon', (iconType) => {
  searchInput().should('have.attr', 'data-element', 'input').and('be.visible');
  searchInnerIcon().eq(positionOfElement('second')).should('have.attr', 'data-component', 'icon')
    .and('be.visible')
    .and('have.attr', 'data-element', iconType)
    .and('be.visible');
});

Then('I click on cross icon', () => {
  searchInnerIcon().eq(positionOfElement('second')).click();
});

When('search input is empty', () => {
  searchInput().should('be.empty');
});

Then('Search component input has golden border', () => {
  searchInput().parent().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

When('I click onto search icon', () => {
  searchIcon().click({ force: true });
});

When('I click inside input', () => {
  searchInput().click();
});

Then('search icon has golden border', () => {
  searchIcon().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
});

Then('search icon has proper inner color', () => {
  const mintColor = 'rgb(0, 129, 93)';
  searchIcon().should('have.css', 'background-color', mintColor)
    .and('have.css', 'border-color', mintColor);
});

Then('search icon as button is visible', () => {
  searchIcon().should('exist').and('be.visible');
});

Then('search icon as button is not visible', () => {
  searchIcon().should('not.exist');
});

When('Search component is focused', () => {
  searchComponent().trigger('mouseover');
});

When('Search has golden bottom border', () => {
  searchComponent().should('have.css', 'border-bottom-color', 'rgb(204, 214, 219)');
});
