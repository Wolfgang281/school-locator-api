# 🏫 EduMap — School Locator API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** that allows users to add schools and retrieve them sorted by proximity to a given location.

---

## 🚀 Live Demo

| Resource         | Link                                              |
| ---------------- | ------------------------------------------------- |
| API (Production) | https://school-locator-api-eesr.onrender.com      |
| GitHub           | https://github.com/Wolfgang281/school-locator-api |

---

## 🛠 Tech Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express.js
- **Database:** MySQL (hosted on Railway)
- **Validation:** Joi
- **Deployment:** Render (API) + Railway (MySQL)

---

## 📁 Folder Structure

```
school-locator-api/
├── src/
│   ├── config/
│   │   ├── db.js           # MySQL pool + DB/table init
│   │   └── index.js        # Env config
│   ├── controllers/
│   │   └── school.controller.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   ├── validateBody.middleware.js
│   │   └── validateQuery.middleware.js
│   ├── routes/
│   │   └── school.routes.js
│   ├── utils/
│   │   └── distance.js     # Haversine formula
│   └── validators/
│       └── school.validator.js
├── app.js
├── server.js
├── .env.example
└── package.json
```

---

## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/Wolfgang281/school-locator-api.git
cd school-locator-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_management
```

### 4. Run the server

```bash
# Development
npm run dev

# Production
npm start
```

> The database and table are auto-created on first run — no manual SQL needed.

---

## 📡 API Endpoints

### `POST /addSchool`

Adds a new school to the database.

**Request Body:**

```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5494,
  "longitude": 77.2001
}
```

**Responses:**

| Status | Description               |
| ------ | ------------------------- |
| 201    | School added successfully |
| 400    | Validation failed         |
| 409    | Duplicate school name     |
| 500    | Internal server error     |

---

### `GET /listSchools`

Returns all schools sorted by distance from the user's location.

**Query Parameters:**

| Param     | Type   | Required |
| --------- | ------ | -------- |
| latitude  | number | ✅       |
| longitude | number | ✅       |

**Example:**

```
GET /listSchools?latitude=28.6139&longitude=77.2090
```

**Response:**

```json
{
  "success": true,
  "message": "Schools fetched successfully.",
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi",
      "latitude": 28.5494,
      "longitude": 77.2001,
      "distance": 7.43
    }
  ]
}
```

> `distance` is in **kilometers**, sorted nearest first using the Haversine formula.

---

## ✅ Validation Rules

| Field     | Rules                       |
| --------- | --------------------------- |
| name      | Non-empty string            |
| address   | Non-empty string            |
| latitude  | Number between -90 and 90   |
| longitude | Number between -180 and 180 |

---

## 🧪 Testing

Import `EduMap.postman_collection.json` into Postman and set the `base_url` variable to:

- **Local:** `http://localhost:3000`
- **Production:** `https://school-locator-api-eesr.onrender.com`

---

## 🗄 Database Schema

```sql
CREATE TABLE IF NOT EXISTS schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL UNIQUE,
  address   VARCHAR(500) NOT NULL,
  latitude  FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

---
