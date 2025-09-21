# GameApp Frontend

A modern React TypeScript frontend application for the GameApp game management system.

## Features

- **Games Management**: Add, edit, and delete games with pricing, player counts, and duration
- **Members Management**: Manage member information including contact details
- **Collections**: Organize games into collections
- **Transactions**: Track game purchases and transactions
- **Recharges**: Manage member account recharges
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Form Validation**: Client-side validation using Zod and React Hook Form

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Hook Form** with Zod validation
- **Lucide React** for icons

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Backend server running on http://localhost:8080

## Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Configuration

The frontend is configured to connect to the backend API at `make the ,collection,memberhttp://localhost:8080`. If your backend runs on a different port or host, update the `API_BASE_URL` in `src/services/api.ts`.

## Running the Application

1. Start the development server:

```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `build` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── forms/          # Form components for each entity
│   ├── Button.tsx      # Custom button component
│   ├── Layout.tsx      # Main layout with navigation
│   ├── Modal.tsx       # Modal dialog component
│   └── Table.tsx       # Data table component
├── pages/              # Main page components
│   ├── GamesPage.tsx
│   ├── MembersPage.tsx
│   ├── CollectionsPage.tsx
│   ├── TransactionsPage.tsx
│   └── RechargesPage.tsx
├── services/           # API service layer
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component
├── App.css             # App styles
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## API Integration

The frontend integrates with the following backend endpoints:

- `GET/POST/DELETE /games` - Game management
- `GET/POST/DELETE /members` - Member management
- `GET/POST/DELETE /collections` - Collection management
- `GET/POST/DELETE /transactions` - Transaction management
- `GET/POST/DELETE /recharges` - Recharge management

## Features Overview

### Games Page
- View all games in a table format
- Add new games with detailed information
- Edit existing games
- Delete games with confirmation
- Display game status, pricing, and player requirements

### Members Page
- Manage member information
- Add/edit member contact details
- Delete members

### Collections Page
- Organize games into collections
- Add/edit collection descriptions

### Transactions Page
- Track game purchases
- Link transactions to members and games
- View transaction history

### Recharges Page
- Manage member account recharges
- Track recharge amounts and dates

## Styling

The application uses Tailwind CSS for styling with a custom color scheme:
- Primary colors: Blue theme
- Secondary colors: Gray theme
- Responsive design for mobile and desktop

## Development

To run in development mode with hot reloading:

```bash
npm start
```

The application will automatically reload when you make changes to the source files.

## Troubleshooting

1. **CORS Issues**: Ensure your backend CORS configuration allows requests from `http://localhost:3000`
2. **API Connection**: Verify the backend server is running on the correct port
3. **Dependencies**: Make sure all dependencies are installed with `npm install`

## License

This project is part of the GameApp system.

