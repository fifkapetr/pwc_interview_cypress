import ExcelJS from "exceljs";
import fs from "fs";
import moment from "moment";

const jsonToExcel = async () => {
  // Read the JSON file
  const data = JSON.parse(fs.readFileSync("scraped-data.json", "utf-8"));
  const todayDate = moment().format("DD.MM.YYYY");
  // Create a new workbook and a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sreality " + todayDate);

  // Add columns
  worksheet.columns = [
    { header: "Název", key: "title", width: 30 },
    { header: "Lokalita", key: "locality", width: 30 },
    { header: "Cena", key: "normPrice", width: 15 },
    { header: "URL", key: "url", width: 30 },
    { header: "ID inzerátu", key: "advId", width: 15 },
  ];

  // Add rows
  worksheet.addRows(data);

  // Write to file
  await workbook.xlsx.writeFile("scraped-data.xlsx");
  console.log("Excel file created");
};

jsonToExcel().catch((err) => console.error(err));
