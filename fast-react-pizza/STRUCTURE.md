# Fast React Pizza - Project Structure Guide

## Feature-Based Architecture

### 📁 src/features/
Feature-specific modules - each folder contains all components, hooks, and logic for that feature:

- **cart/** - Shopping cart: cart items, cart overview, cart slice
- **menu/** - Menu display: menu component, menu items  
- **order/** - Order management: create order, order details
- **user/** - User features: user profile, user slice

### 📁 src/ui/
Reusable UI components that don't belong to a specific feature:
- Buttons, Inputs, Loaders
- Homepage, Error page
- Layout components

### 📁 src/services/
API interaction layer:
- apiRestaurant.js - Pizza API integration
- apiGeocoding.js - Geocoding services

### 📁 src/utils/
Stateless helper functions:
- Date formatting
- Currency/number formatting
- Calculations and transformations

## Benefits of This Structure

✅ **Co-location**: Related files are grouped together
✅ **Scalability**: Easy to add new features
✅ **Maintainability**: Clear separation of concerns
✅ **Navigation**: Less jumping between distant folders
✅ **Team-friendly**: Clear ownership of feature areas

## Working with Features

When adding a new feature:
1. Create a folder in `features/`
2. Add all related components, hooks, and logic inside
3. Export public API from an index file (optional)
4. Keep feature-specific state and logic encapsulated

When creating reusable components:
1. Generic UI components → `ui/`
2. API calls → `services/`
3. Helper functions → `utils/`

