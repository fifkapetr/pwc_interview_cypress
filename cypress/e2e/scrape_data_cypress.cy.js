import ExcelJS from "exceljs";
import fs from "fs";
import moment from "moment";

describe("Web Scraping", () => {
  it("Scrape data from sreality", () => {
    const city = "Most";
    const todayDate = moment().format("DD.MM.YYYY");
    // Replace with the URL you want to scrape
    cy.visit(`https://www.sreality.cz/hledani/prodej/byty?region=${city}`);
    cy.get(".text-wrap").should("be.visible");
    cy.get(".per-page .sort").click();
    cy.xpath(
      '//span[contains(@class, "per-page-select right-arrow opened")]//button[contains(text(), "60")]'
    ).click();
    cy.get(".text-wrap").should("be.visible");
    const scrapedData = [];
    cy.wait(5000);
    // Scrape data
    cy.get(".text-wrap")
      .each(($wrap) => {
        // Extract data here
        const title = $wrap.find("h2").text().trim();
        const locality = $wrap.find(".locality").text().trim();
        const normPrice = $wrap
          .find(".norm-price")
          .text()
          .replace(/\s|Kč/g, "")
          .trim();
        const url = "https://www.sreality.cz" + $wrap.find("h2 a").attr("href");
        //get ID from URL: /detail/prodej/byt/2+1/most-most-slovenskeho-narodniho-povstani/1375532364
        const advId = url.split("/").pop();
        scrapedData.push({ title, locality, normPrice, url, advId });
        console.log(scrapedData);
      })
      .then(() => {
        // Write data to JSON file after scraping is done
        cy.writeFile("scraped-data.json", scrapedData);
        // Log or process data
      });
  });
});
