import moment from "moment";

// test ted pada casto na vypisu. Mozna to opravi pridani cy.wait mezi jednotlive kroky
describe("SReality Cypress Interview task", () => {
  it("Sreality flat database", () => {
    const date = moment().format("DD.MM.YYYY");
    const state = "Ústecký";
    const city = "Most";

    cy.viewport(1920, 1080);
    cy.visit("https://www.sreality.cz/");
    cy.get('div[data-testid="dialog-overlay"]', {
      includeShadowDom: true,
    }).should("be.visible");
    cy.get("button[data-testid='button-agree']", {
      includeShadowDom: true,
    }).click();
    cy.get('div[data-testid="dialog-overlay"]', {
      includeShadowDom: true,
    }).should("not.exist");
    cy.get('a[ng-href="/hledani/byty"]').click();
    cy.get(".suggest-wrap-locality input").type(city);
    cy.get('button[type="submit"]').click();
    cy.get('span[list-select="listSelectConf"] .estate-sort .title').click();
    cy.contains("Nejlevnější").click();
    cy.get("h2").each((element) => {
      cy.get('img[src="/img/page-loader.gif"]').should("not.be.visible");
      cy.wrap(element).click();
      cy.url();
      cy.get(".location span.location-text").as("street");
      cy.get('span[itemprop="name"] span.name').as("adv_name");
      //toto nefunguje ve všech inzerátech - velikost bytu, navrhuju si to pak vytáhnout z názvu
      //   cy.get(
      //     "body > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(7) > ul:nth-child(1) > li:nth-child(9) > strong:nth-child(2) > span:nth-child(1)"
      //   ).as("size");
      cy.get('span[itemprop="price"]').as("price");
      cy.get(".back a").click();
    });
  });
});
