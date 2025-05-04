# Countries Explorer 🌎

A modern React application that allows users to explore detailed information about countries around the world using the REST Countries API.

**Live Demo:** [Countries Explorer](https://countries-explorer-react.netlify.app)

## 📋 Features

- **Interactive Country Explorer**: Browse through countries with a visually appealing interface
- **Search Functionality**: Search for countries by name with real-time filtering
- **Multiple Filtering Options**: Filter countries by region or language
- **Detailed Country Pages**: View comprehensive details about each country including:
  - Name, flag, and coat of arms
  - Population, region, and capital
  - Languages, currencies, and borders
  - Geographic details
- **User Authentication**: Register and login system with protected routes
- **Responsive Design**: Fully responsive interface that works on all devices
- **Beautiful UI**: Modern design with animations, transitions, and a clean aesthetic

## 🛠️ Technology Stack

- **Frontend Framework**: React (Functional Components)
- **Language**: JavaScript
- **Routing**: React Router v6
- **CSS Framework**: Tailwind CSS
- **HTTP Client**: Axios
- **Authentication**: Custom implementation with localStorage
- **Testing**: Jest and React Testing Library

## 🚀 API Integration

This application integrates with the [REST Countries API](https://restcountries.com/) using the following endpoints:

- `GET /all`: To fetch all countries
- `GET /name/{name}`: To search for countries by name
- `GET /region/{region}`: To filter countries by region
- `GET /alpha/{code}`: To get detailed information about a specific country

## 🔧 Setup and Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/countries-explorer.git
   cd countries-explorer
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. The application will open in your default browser at `http://localhost:3000`

## 🧪 Running Tests

Run the test suite to ensure everything is working correctly:

```bash
npm test
# or
yarn test
```

For coverage report:

```bash
npm test -- --coverage
# or
yarn test --coverage
```

## 📁 Project Structure

```
countries-explorer/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── ...
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BackgroundCarousel.jsx
│   │   ├── CountryCard.jsx
│   │   ├── EnhancedSearchBar.jsx
│   │   ├── LanguageFilter.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RegionFilter.jsx
│   │   ├── Register.jsx
│   │   └── SearchBar.jsx
│   ├── context/             # React context for state management
│   │   └── AuthContext.jsx
│   ├── pages/               # Main page components
│   │   ├── CountryDetails.jsx
│   │   └── HomePage.jsx
│   ├── services/            # API and authentication services
│   │   ├── api.js
│   │   └── authService.js
│   ├── __Tests__/           # Test files
│   │   ├── Integration/
│   │   │   ├── AuthFlow.test.jsx
│   │   │   └── HomePage.test.jsx
│   │   └── Unit/
│   │       ├── RegionFilter.test.jsx
│   │       └── SearchBar.test.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   └── setupTests.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── jest.config.js
└── README.md
```

## 🔒 Authentication

The application implements a frontend authentication system:

- **Registration**: Users can create a new account
- **Login**: Existing users can log in
- **Protected Routes**: Certain routes require authentication
- **Session Management**: User sessions are managed with localStorage

## 💡 Challenges and Solutions

### API Data Structure
**Challenge**: The REST Countries API returns complex nested data structures that needed careful handling.

**Solution**: Created utility functions to parse and transform API data before rendering, ensuring consistency in the UI.

### Authentication
**Challenge**: Implementing a secure authentication system without a dedicated backend.

**Solution**: Used localStorage for session management with proper validation and error handling, while ensuring a good UX with clear feedback for authentication failures.

### Testing
**Challenge**: Setting up effective tests for asynchronous API interactions and user flows.

**Solution**: Utilized Jest mocks for API calls and implemented integration tests to verify the complete authentication flow and country data display.

### React Router Warnings
**Challenge**: Addressing React Router future flag warnings in the test environment.

**Solution**: Modified the test setup to suppress specific warnings while maintaining test integrity.

## 📱 Responsive Design

The application is fully responsive and provides an optimal viewing experience across a wide range of devices:

- Desktop: Full-featured interface with grid layouts
- Tablet: Adjusted layouts for medium-sized screens
- Mobile: Streamlined UI for small screens with touch-friendly elements

## 🔜 Future Improvements

- Add ability for users to save favorite countries
- Implement dark/light theme toggle
- Add more detailed country statistics and historical data
- Implement map visualization for geographic data
- Add language translation features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [REST Countries API](https://restcountries.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
