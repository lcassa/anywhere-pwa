# Anywhere/Lightning Polymer 3.0 + PWA approach to offline first POC

**Note:** This is under development by Leandro Cassa (lcassa@br.ibm.com), it is based of https://github.com/polymer/pwa-starter-kit

## Installation

Download or Clone this repository:

```
git clone https://github.ibm.com/Polymens/anywhere-pwa
cd anywhere-pwa
```

Install the dependencies using npm:

```
npm install
```

Run the app in development mode:

```
npm run dev
```

Run the app locally in production mode:

```
npm run build
npm run prod
```

This is just for server/production:
```
npm run build
npm start
```

## Available scripts

* **npm run dev** to run the application in development mode
* **npm run test** to run the application’s unit and integration tests (see the see the testing section for more details. To run just the unit or integration tests, both npm run test:unit and npm run test:integration are available.
* **npm run build** to build your application for production (see the building and deploying section for more details)
* **npm run** serve:static or npm run serve:prpl-server to serve the built application (see the building and deploying section for more details)