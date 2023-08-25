# Image Resizer

Electron application that allows you to scrape website data.

![Screenshot from 2023-08-25 22-13-08](https://github.com/vikkastiwari/web-scrapper/assets/51874681/8459b225-e326-4637-b952-1a73b12ba940)

## Url

Currently, it scrapes static publicly available data from this URL -> https://www.gst.gov.in/help/helpmodules/

## Usage

Install dependencies:

```bash

npm install
```

Run:

```bash
npm start
```

You can also use `Electronmon` to constantly run and not have to reload after making changes

```bash
npx electronmon .
```

## Packaging

There are multiple ways to package Electron apps. I would suggest [Electron Forge](https://www.electronforge.io/). I have implemented packaging into this app.

## Developer Mode

If your `NODE_ENV` is set to `development` then you will have the dev tools enabled and available in the menu bar. It will also open them by default.

When set to `production`, the dev tools will not be available.
