import { access } from 'fs';
import { deleteCookie } from '../../src/utils/cookie';

///

describe('add ingredients to constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('add bun', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');

    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  it('add ingredient', () => {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 2')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 4')
      .should('exist');
  });
});

describe('ingredient modal works', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });
  it('open modal', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get('[data-cy=burger-ingredients]').contains('Ингредиент 5').click();
    cy.get('#modals').contains('Ингредиент 5').should('exist');
  });
  it('close modal on button click', () => {
    cy.contains('Ингредиент 5').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-close-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('close modal on overlay click', () => {
    cy.contains('Ингредиент 5').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Orders modal works', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });
  afterEach(() => {
    window.localStorage.clear();
    cy.setCookie('accessTokent', '');
  });
  it('make order on click', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.contains('Оформить заказ').click();
    cy.get('#modals').contains('123456').should('exist');
  });
  it('close order modal and reset constructor on click ', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.contains('Оформить заказ').click();
    cy.get('[data-cy=modal-close-button]').click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 2')
      .should('not.exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 4')
      .should('not.exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 1')
      .should('not.exist');
  });
});
