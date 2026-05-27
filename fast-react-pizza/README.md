# Fast React Pizza Co. 🍕

A professional React application for ordering pizzas, built with Vite and React.

## Project Structure

This project uses a **feature-based architecture** for better organization and scalability:

```
src/
├── features/          # Feature-based modules
│   ├── cart/         # Shopping cart functionality
│   ├── menu/         # Menu display and items
│   ├── order/        # Order creation and management
│   └── user/         # User-related features
├── ui/               # Reusable UI components (buttons, inputs, pages)
├── services/         # API interaction code
├── utils/            # Helper functions (date, number formatting, etc.)
├── assets/           # Static assets
├── App.jsx           # Main App component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

### Folder Descriptions

- **features/**: Contains feature-specific components, hooks, and logic. Each feature folder is self-contained.
- **ui/**: Reusable, presentational components used across the application.
- **services/**: Code for interacting with external APIs.
- **utils/**: Stateless helper functions for common operations.

## Getting Started

```bash
npm install
npm run dev
```

## Tech Stack

- React + Vite
- Feature-based architecture
