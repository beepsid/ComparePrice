# E-Compare: Price Comparison Web App

E-Compare is a web-based application that compares product prices across multiple e-commerce platforms, specifically Amazon and eBay. This README provides a guide on setting up the project from scratch, including the installation of necessary dependencies and configuration.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Future Development](#future-development)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project requires setting up a backend server in Node.js with Express and Axios for web scraping, along with a React frontend for the user interface. You will need to create the backend and frontend folders and add the appropriate files before running the app.

## Features

- **Product Search**: Users can input a product name and get prices and details from Amazon and eBay.
- **Platform Identification**: Each product result includes a label with the source platform (Amazon or eBay).
- **Responsive Design**: The app is accessible on desktop and mobile devices.
- **Error Handling**: User-friendly error messages are displayed for invalid input or network issues.

## Tech Stack

- **Backend**: Node.js, Express, Axios
- **Frontend**: React, Axios

## Setup Instructions

To run this project, start by downloading the files provided (`server.js`, `scrapers/` folder, `frontend/` folder) and follow these setup instructions.

### Backend Setup

1. **Set Up Project Folder**: Create a project folder, and inside it, copy and place `server.js` and the `scrapers/` folder containing:
   - `amazonScraper.js`
   - `ebayScraper.js`

2. **Initialize Node.js Project**:
   - Open a terminal in the root project directory and run:
     ```bash
     npm init -y
     ```

3. **Install Dependencies**: Install Express and Axios for the backend by running:
   ```bash
   npm install express axios

4. Configure `server.js`: Verify that your `server.js` file includes code to handle requests, fetch data from Amazon and eBay, and serve it via an endpoint.

5. **Start the Backend**: Run the backend server using:
   ```bash
   node server.js
   ```
   
The server should be accessible at `http://localhost:3000`.

### Frontend Setup

1. **Install React Dependencies**: Run the following command to install React and other required packages:
    ```bash
    npm install
    ```

2. **Set Up React Project:**: Inside the project directory, Use `create-react-app` to scaffold your React application:
   ```bash
   npx create-react-app frontend
   ```

3. **Configure the API Endpoint in React**: Ensure that the API requests in your React components are directed to `http://localhost:3000/search`. Update the frontend directory files with those provided in this repository.

4. **Set Up Project Folder**: In the folder created, copy and place the data from frontend folder to your respective project folder:
   - `/frontend/src`

4. **Start the Frontend**: Run the frontend with:
   ```bash
   npm start
   ```
   
This will start the frontend server, typically at `http://localhost:3001`.

## Usage

1. Open your browser and navigate to the frontend URL: `http://localhost:3001`.
2. Enter a product name into the search bar and press "Search".
3. The app will fetch and display a list of matching products from Amazon and eBay.

## Future Development

- **Add More E-commerce Platforms**: Extend scraping capabilities to include additional e-commerce websites.
- **Mobile App**: Develop a cross-platform mobile app for both Android and iOS.
- **User Accounts**: Allow users to save their favorite products and comparison history.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

## Demonstration

### Home Page

![Screenshot 2024-11-11 195339](https://github.com/user-attachments/assets/23a31c2b-9337-45a5-815b-cf5faa1e450b)

### Search Page

![Screenshot 2024-11-11 195439](https://github.com/user-attachments/assets/a74063df-ce19-45fa-8aa2-51b03da9cb55)

### This is the base build when I first build the app

## License

This project is licensed under the MIT License.
