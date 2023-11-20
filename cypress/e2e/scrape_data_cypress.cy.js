import ExcelJS from "exceljs";
import fs from "fs";
import moment from "moment";

describe("Web Scraping", () => {
  it("Scrape data from sreality", () => {
    const todayDate = moment().format("DD.MM.YYYY");
    // Replace with the URL you want to scrape
    cy.visit("https://www.sreality.cz/hledani/prodej/byty?region=Most");
    cy.get(".text-wrap").should("be.visible");

    const scrapedData = [];

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
        const url = $wrap.find("h2 a").attr("href");
        scrapedData.push({ title, locality, normPrice, url });
        console.log(scrapedData);
      })
      .then(() => {
        // Write data to JSON file after scraping is done
        cy.writeFile("scraped-data.json", scrapedData);
        // Log or process data
      });
  });
});
