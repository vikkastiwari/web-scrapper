const { app, BrowserWindow, ipcMain } = require('electron');
const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

let mainWindow;

async function createWindow() {
  // Create the Electron browser window
  mainWindow = new BrowserWindow({
    width: isDev ? 1000 : 500,
    height: 600,    
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,  
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Load the index.html file
  mainWindow.loadFile('./renderer/index.html');
}

// Electron app event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC event handler for form submission
ipcMain.on('scrape:start', async (event, options) => {
  console.log(options);
  // Connect Puppeteer to the Electron browser window
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto(options.url, {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    // Get the displayed text and returns it
    // const quoteList = document.querySelectorAll(".quote");
    const quoteList = document.querySelectorAll(".w3-help");
     // --> https://www.gst.gov.in/help/helpmodules/

    // Convert the quoteList to an iterable array
    // For each quote fetch the text and author
    return Array.from(quoteList).map((quote) => {
      // Get the sub-elements from the previously fetched quote element
      // const text = quote.querySelector(".text").innerText;
      const text = quote.querySelector(".pad-t-24 p").innerText;
      // const author = quote.querySelector(".author").innerText;
      const author = quote.querySelector(".pad-l-10").innerText;

      return { text, author };
    });
  });

  // Display the quotes
  console.log(quotes);
  ExportData(quotes);

  // Click on the "Next page" button
  // await page.click(".pager > .next > a");

  // Close the browser
  await browser.close();

  mainWindow.webContents.send('scrape:success');
});

function ExportData(scrapData) {
  let filename='reports.xlsx';
  let data=scrapData;
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "People");
  XLSX.writeFile(wb,filename);
}

