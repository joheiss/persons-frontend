# Persons Frontend

Angular Web UI for managing Persons and viewing Requests.

## Features

- **Person List View**: Display all persons in a table with view, edit, and delete actions
- **Person Detail View**: View detailed information about a person
- **Person Edit View**: Edit person's name, salary, and comment fields
- **Requests List View**: View all requests sorted by changedAt timestamp in descending order
- **Toast Notifications**: Success and error messages with 10-second display duration

## Prerequisites

- Node.js (v20.11.1 or higher)
- npm
- Angular CLI (installed globally or via npx)

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

1. Start the Angular development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

2. Make sure the backend API is running on `http://localhost:3000`

## Build

Build the project for production:
```bash
npm run build
```

## API Endpoints

The frontend communicates with the following backend endpoints:
- `GET /persons` - Get all persons
- `GET /persons/:id` - Get a specific person
- `PUT /persons/:id` - Update a person (returns 202 ACCEPTED)
- `DELETE /persons/:id` - Delete a person (returns 202 ACCEPTED)
- `GET /requests` - Get all requests

## Project Structure

- `src/app/components/` - Angular components
  - `home/` - Home component with navigation
  - `person-list/` - Person list view
  - `person-detail/` - Person detail view
  - `person-edit/` - Person edit view
  - `requests-list/` - Requests list view
  - `toast/` - Toast notification component
- `src/app/services/` - Angular services
  - `person.service.ts` - Person API service
  - `request.service.ts` - Request API service
  - `toast.service.ts` - Toast notification service
- `src/app/models/` - TypeScript models
  - `person.model.ts` - Person and UpdatePersonDto interfaces
  - `request.model.ts` - Request interface and enums

## Technologies

- Angular 19
- Bootstrap 5
- Bootstrap Icons
- RxJS
- TypeScript
