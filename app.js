const express = require("express");
const pt = require("puppeteer");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/screenshot", async (req, res) => {
  const url = req.query.url;
  const browser = await pt.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(url);
  await page.waitForTimeout(1500);
  const buffer = await page.screenshot();

  res.set({
    "Content-type": "image/png",
    "Content-Disposition": "inline;filename=screenshot.png",
  });
  return res.send(buffer);
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
