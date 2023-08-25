# Image Resizer

Electron application that allows you to scrape website data.

![Screenshot from 2023-08-25 22-40-47](https://github.com/vikkastiwari/web-scrapper/assets/51874681/ecdfc953-a12a-4c97-87b3-fae298824b6a)

## Usage

Install dependencies:

```bash

npm install
```

Run:

```bash
npm start
```

Currently, it scrapes static publicly available data from below mentioned URL

```bash
https://www.gst.gov.in/help/helpmodules/
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
