# Countries Explorer 🌎

A modern React application that allows users to explore detailed information about countries around the world using the REST Countries API.

**Live Demo:** [Countries Explorer](https://doncountry.netlify.app/)

## 📋 Features

- **Interactive Country Explorer**: Browse through countries with a visually appealing interface
- **Enhanced Search Functionality**: 
  - Real-time search with country name suggestions
  - Instant filtering as you type
  - Clear search functionality
- **Advanced Filtering Options**: 
  - Filter countries by region with dropdown selection
  - Region-specific country listings
- **Detailed Country Pages**: View comprehensive details about each country including:
  - Name, flag, and coat of arms
  - Population, region, and capital
  - Languages, currencies, and borders
  - Geographic details
- **User Authentication**: Register and login system with protected routes
- **Responsive Design**: Fully responsive interface that works on all devices
- **Beautiful UI**: Modern design with animations, transitions, and a clean aesthetic
- **Error Handling**: Graceful error handling for API failures with user-friendly messages

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

- `GET /all`: Fetch all countries for initial display
- `GET /name/{name}`: Search for countries by name with partial matching
- `GET /region/{region}`: Filter countries by specific region (e.g., Asia, Europe, Americas)
- `GET /alpha/{code}`: Get detailed information about a specific country by its code

The API integration includes:
- Efficient error handling for failed requests
- Loading states for better user experience
- Debounced search to prevent excessive API calls
- Proper error messages for user feedback

## 🔧 Setup and Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/it22248244/country_explorer_project.git
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

## 🧪 Testing

The project includes comprehensive test coverage:

### Unit Tests
- EnhancedSearchBar component tests
  - Search functionality
  - Suggestion display
  - Error handling
  - Clear search functionality
- RegionFilter component tests
  - Region selection
  - Filter application

### Integration Tests
- HomePage integration tests
  - Initial country loading
  - Region filtering
  - Search functionality
  - Error handling
- Authentication flow tests
  - Registration
  - Login
  - Protected routes

Run the test suite:
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
│   └── netlify.toml
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
│   │   └── Register.jsx
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

### Enhanced Search Implementation
**Challenge**: Implementing real-time search with suggestions while maintaining performance.

**Solution**: 
- Implemented debounced search to prevent excessive API calls
- Added suggestion display with country flags
- Implemented clear search functionality
- Added proper error handling for failed searches

### Region Filtering
**Challenge**: Efficiently filtering countries by region while maintaining good UX.

**Solution**:
- Implemented dropdown-based region selection
- Added loading states during region changes
- Ensured smooth transitions between region views
- Implemented proper error handling for region filtering

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
