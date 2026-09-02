# Thiqah Backend 

## Introduction

ThiQah is a records-management application for customers and business owners. It helps users manage agreements, assets, linked documents, and property inspections.

This repository contains the REST API for ThiQah. It is built with Node.js, Express, MongoDB, Mongoose, and JWT authentication.

## Repositories

- [Frontend Repository](https://github.com/HusainAlmajed/Project-4-FrontEnd)
- [Backend Repository](https://github.com/HusainAlmajed/Project-4-BackEnd)

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- CORS
- dotenv
- Morgan
- Nodemon

## Data Models

### User

Stores account and profile information.

- `username`
- `email`
- `password`
- `phone`
- `role` — `admin`, `customer`, or `owner`
- `profileImage`

Passwords are hashed with bcrypt before they are stored.

### Business

Created when an owner signs up.

- `owner`
- `name`
- `type` — `shop`, `property`, or `insurance`
- `customers`
- `employees`
- `profileImage`

### Asset

Represents an item or property connected to an agreement.

- `name`
- `assetType` — `equipment`, `vehicle`, `property`, `electronic`, or `other`
- `owner`
- `business`

### Agreement

Connects an asset to a customer.

- `type` — `warranty` or `insurance`
- `startDate`
- `endDate`
- `status` — `active`, `expiring soon`, or `expired`
- `description`
- `owner`
- `customer`
- `asset`

### Document

Stores a document linked to an agreement.

- `title`
- `documentType` — `contract`, `receipt`, `warranty`, `insurance`, or `other`
- `url`
- `agreement`

### Inspection

Stores a before or after inspection linked to an agreement.

- `inspectionType` — `before` or `after`
- `images`
- `notes`
- `date`
- `agreement`

## API Routes

All routes below, except authentication routes, require a valid JWT.

### Authentication

| Method | Route | Purpose |
|---|---|---|
| POST | `/sign-up/customer` | Create a customer account |
| POST | `/sign-up/owner` | Create an owner account and business |
| POST | `/sign-in` | Sign in and receive a JWT |

### User Profile

| Method | Route | Purpose |
|---|---|---|
| GET | `/users/:userId` | Get one user profile |
| PUT | `/users/:userId` | Update one user profile |

### Assets

| Method | Route | Purpose |
|---|---|---|
| GET | `/assets` | Get all assets |

### Agreements

| Method | Route | Purpose |
|---|---|---|
| GET | `/agreements` | Get all agreements |
| POST | `/agreements` | Create an agreement and its linked asset |
| GET | `/agreements/:agreementId` | Get one agreement |
| PUT | `/agreements/:agreementId` | Update one agreement |
| DELETE | `/agreements/:agreementId` | Delete an agreement and its linked asset |

### Documents

| Method | Route | Purpose |
|---|---|---|
| GET | `/documents` | Get all documents |
| POST | `/documents` | Create a document |
| GET | `/documents/:documentId` | Get one document |
| PUT | `/documents/:documentId` | Update a document |
| DELETE | `/documents/:documentId` | Delete a document |

### Inspections

| Method | Route | Purpose |
|---|---|---|
| GET | `/inspections` | Get all inspections |
| POST | `/inspections` | Create an inspection |
| GET | `/inspections/:inspectionId` | Get one inspection |
| PUT | `/inspections/:inspectionId` | Update an inspection |
| DELETE | `/inspections/:inspectionId` | Delete an inspection |

### Admin Routes

Admin routes require a valid JWT and an account with the `admin` role.

| Method | Route | Purpose |
|---|---|---|
| GET | `/admin/users` | Get all users |
| GET | `/admin/users/:userId` | Get one user |
| PUT | `/admin/users/:userId` | Update a user’s role |
| DELETE | `/admin/users/:userId` | Delete a user |
| GET | `/admin/businesses` | Get all businesses |
| GET | `/admin/businesses/:businessId` | Get one business |
| DELETE | `/admin/businesses/:businessId` | Delete a business |

## Authentication

ThiQah uses JWT authentication.

After signing up or signing in, the API returns a token. Protected requests must send the token in this format:

```text
Authorization: Bearer <token>
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB connection string

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HusainAlmajed/Project-4-BackEnd.git
```

2. Move into the project folder:

```bash
cd Project-4-BackEnd
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

5. Start the server:

```bash
npm run dev
```

Or run it without Nodemon:

```bash
npm start
```

The API runs on:

```text
http://localhost:3000
```

## Current Features

- Customer and owner registration
- Owner business creation during owner registration
- JWT authentication
- User profile viewing and editing
- Agreement creation with a linked asset
- Document CRUD operations
- Inspection CRUD operations
- Admin user and business management
- MongoDB relationships between users, businesses, assets, agreements, documents, and inspections

## Current Implementation Notes

- Agreement types currently support `warranty` and `insurance`.
- Asset types include `property`, allowing inspections to be linked to property agreements.
- Admin routes are protected by an admin-only middleware.
- Document, inspection, agreement, and asset routes require a valid JWT.