import { SEARCH_COMPONENT, SEARCH_DEFAULT_ID, CROSS_ICON,
  SEARCH_WITH_SEARCH_BUTTON_ID } from './locators';
import { BUTTON_DATA_COMPONENT_PREVIEW } from '../button/locators';

// DS locators
export const searchDefault = () => cy.iFrame(SEARCH_DEFAULT_ID);
export const searchWithButton = () => cy.iFrame(SEARCH_WITH_SEARCH_BUTTON_ID);
export const searchDefaultInput = () => searchDefault().find('input');
export const searchDefaultInnerIcon = () => searchDefault().find('span:nth-child(1)');
export const searchCrossIcon = () => searchDefault().find(CROSS_ICON);
export const searchWitchButtonInput = () => searchWithButton().find('input');
export const searchButton = () => searchWithButton().find(BUTTON_DATA_COMPONENT_PREVIEW);

// component preview locators
export const searchInput = () => cy.iFrame(SEARCH_COMPONENT).find('input');
export const searchIcon = () => cy.iFrame('button[type="button"]');

// component preview locators in no iFrame
export const searchInputNoiFrame = () => cy.get(SEARCH_COMPONENT).find('input');
