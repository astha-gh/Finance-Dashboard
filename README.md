# Finance Data Processing & Access Control Backend

A role-based backend system for managing financial transactions and generating analytical insights via secure APIs.

This project demonstrates backend architecture, API design, role-based access control, and data aggregation for a finance dashboard system.

---

## Live API

Base URL:
https://finance-dashboard-2-toci.onrender.com

---

##  API Documentation

Postman Documentation:
https://documenter.getpostman.com/view/39629641/2sBXiqDnyt

---

## Features

-  User Authentication (JWT-based)
-  Role-Based Access Control (Admin, Analyst, Viewer)
-  Transaction Management (CRUD operations)
-  Filtering (by type, category, date range)
-  Dashboard Analytics (income, expenses, net balance)
-  Input Validation & Error Handling
-  Deployed and publicly accessible API

---

## Roles & Permissions

| Role     | Permissions |
|----------|------------|
| Viewer   | View dashboard data only |
| Analyst  | View transactions + dashboard insights |
| Admin    | Full access (create, update, delete, manage users) |

---

## Demo Credentials

Use these credentials to quickly test the system:

### Admin
- Email: admin@gmail.com
- Password: backend

### Analyst
- Email: analyst@gmail.com
- Password: backend

### Viewer
- Email: viewer@gmail.com
- Password: backend

---

## 📡 API Overview

### Auth
- POST /api/auth/register → Register new user
- POST /api/auth/login → Login & get token

### Transactions
- GET /api/transactions → View transactions (with filters) (Admin + Analyst)
- POST /api/transactions → Create transaction (Admin)
- PATCH /api/transactions/:id → Update transaction (Admin)
- DELETE /api/transactions/:id → Delete transaction (Admin)

### Dashboard
- GET /api/dashboard/summary → Financial summary

---

## Authentication

Protected routes require a JWT token: 
Authorization : Bearer <token>

---

## Example Response(All responses present in postman documentation)

### Dashboard Summary

```json
"totalIncome": 230011,
    "totalExpense": 7538785486,
    "netBalance": -7538555475,
    "categoryBreakdown": [
        {
            "_id": "Railways",
            "total": 6768654986
        }
    ],
    "recentTransactions": [
        {
            "_id": "69d0b125a314bc54972c4f58",
            "user": {
                "_id": "69cfc41b8410949f331e7eff",
                "name": "Admin",
                "email": "admin@gmail.com"
            },
            "amount": 6767676767,
            "type": "expense",
            "category": "Railways",
            "date": "2026-04-04T06:35:17.765Z",
            "note": "Serving in miltary",
            "createdAt": "2026-04-04T06:35:17.779Z",
            "updatedAt": "2026-04-04T06:35:17.779Z",
            "__v": 0
        }
    ]
}
```

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## Setup Instructions

```bash
git clone https://github.com/astha-gh/Finance-Dashboard
cd Finance-Dashboard
npm install
npm run dev
```

---

## Key Design Decisions

- Implemented role-based access control using middleware
- Used MongoDB for flexible schema design
- Designed modular structure (routes, controllers, middleware)
- Used aggregation logic for dashboard analytics instead of simple queries

---

## Assumptions

- System is designed as a shared finance dashboard (not user-isolated)
- Analysts can view all transactions
- Only Admin can modify financial records
- Viewer role is restricted to read-only dashboard access

---

## Future Improvements

- Pagination for large datasets
- Advanced analytics (monthly trends, category insights)
- Rate limiting for API protection
- Unit & integration testing

---

## Author

Astha Devadiga
