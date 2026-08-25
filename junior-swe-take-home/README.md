# Borrowing Power Calculator

## Overview

This project includes a JavaScript borrowing power calculator that takes a user's financial details and calculates their estimated borrowing power and monthly repayment created from Gen A. Eye 👀 at Ferocia.

The calculator utilizes a local API to get the tax and HEM (Household Expenditure Measure) values instead of calculating these itself.

The user input should be:

- Gross annual income
- Number of dependents
- Monthly expenses
- Total credit card limits

The calculator then uses these values to work out the user's borrowing power over a 30-year loan term with 7% interest.

## Coding Decisions

- **Factory / closure:** Used `createBorrowCalculator()` to keep the calculator functions and constants together to encapsulate and keep private.
- **API functions:** Reimplemented `getTax()` and `getHEM()` to use `fetch()` with the required Bearer token, response checking inside try/catch. Both return only the value needed by the calculator (`taxResult.tax` and `hemResult.hem`).
- **Async handling:** Made `calculateBorrowingPower()` asynchronous and used `await` for the API calls.
- **Input validation:** Added validation for negative inputs and return `0` borrowing power when invalid values are provided.

## Tests Added / Updated

- Standard borrowing power - changed expected monthly repayment amount based on calculators response.
- Negative inputs return `0`- required input validation above.
- Calculator Inputs should be a type of number.
- Higher credit card limits reduce borrowing power.
- Higher expenses reduce borrowing power.

## Setup and Dependencies

Make sure you have Node.js installed.

Install dependencies:

```
npm install
```

## Server

You wil need to run the development API in it's own terminal window.
(The server will be available at http://localhost:3000/).
To start the server run the following command:

```
npm run api
```

Note: You can stop the server with Ctrl+C

## Running the files

Run the calculator with:

```
npm start
```

## Testing

Run tests with:

```
npm test
```

All green ticks will be passed, otherwise when X marks the spot it's failed.
