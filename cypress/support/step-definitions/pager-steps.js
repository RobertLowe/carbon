import {
  pagerSummary, pageSelect, maxPages, pagerNavigation, pageInput,
} from '../../locators/pager';

Then('totalRecords is set to {string}', (totalRecords) => {
  pagerSummary().should('have.text', `${totalRecords} records`);
});

Then('pageSize is set to {string}', (pageSize) => {
  pageSelect().should('have.value', pageSize);
});

Then('pageSize is visible', () => {
  pageSelect().should('be.visible');
});

Then('pageSize is not visible', () => {
  pageSelect().should('not.be.visible');
});

Then('I am on 1st of {string} pages', (count) => {
  maxPages().should('have.text', ` of ${count}`);
});

Then('{word} pagination arrow is disabled', (direction) => {
  pagerNavigation(direction).should('have.class', `carbon-pager__${direction}--disabled`);
});

Then('I paginate {word} {int} times', (direction, count) => {
  for (let i = 0; i < count; i++) {
    pagerNavigation(direction).click({ force: true }); //click force true because element is overlapping
  }
});

When('I type {string} to input pagination', (pageNumber) => {
  pageInput().clear().type(`${pageNumber}{enter}`);
});
