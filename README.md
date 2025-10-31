

# Adventure Booking System

## Overview

The **Adventure Booking System** is a full-stack web application that allows users to browse adventure experiences, select available slots, apply promotional codes, and complete bookings seamlessly. The system uses **Next.js/React** for the frontend and **Express.js** for the backend to handle bookings, slot management, and promo code validation.

This application is designed to be **modular, scalable, and user-friendly**.

---

## Features

* **Browse Adventures:** Users can view adventure experiences with images, descriptions, and details.
* **Dynamic Slot Selection:** Adventure slots are dynamically fetched from the backend.
* **Promo Code Validation:** Apply promo codes at checkout with real-time validation from the backend.
* **Form Validation:** Checkout forms use `react-hook-form` with validations for name, email, and agreement checkbox.
* **Responsive UI:** Works seamlessly on desktop and mobile devices.
* **Seamless Checkout:** Total amount is dynamically calculated, and validated bookings are sent to the backend.
* **API-driven Backend:** Express.js backend handles slot availability, bookings, and promo code verification.
* **State Management:** Global state using React Context API.

---

## Tech Stack

* **Frontend:** Next.js, React, React Hook Form, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB 
* **State Management:** React Context API
* **UI Components:** Shadcn/ui, React Hot Toast for notifications
* **Date Handling:** Day.js
* **Routing:** Next.js `useRouter`

---

## Project Structure

```
bookit/
├── .env
├── .git/
├── .gitignore
├── .next/
├── app/
│   ├── AppContext.tsx
│   ├── Checkout/
│   ├── components/
│   ├── Confirmed/
│   ├── Details/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── assets/
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── data.js
│   ├── lib/
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   └── server.js
├── components/
├── components.json
├── eslint.config.mjs
├── lib/
├── next-env.d.ts
├── next.config.ts
├── node_modules/
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
├── README.md
└── tsconfig.json
```

---

## Installation

### Backend Setup (Express)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install express mongoose cors dotenv
```

3. Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. Start the server:

```bash
node server.js
```

The Express backend will run on `http://localhost:5000`.

---

### Frontend Setup (Next.js)

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000` and communicate with the Express backend.

---

## API Endpoints

* **GET /api/adventures** – Fetch all adventure experiences
* **POST /api/bookings** – Create a new booking
* **POST /api/promo/validate** – Validate a promo code and return discount details

---

## Usage

1. Open the homepage (`/`) to browse adventures.
2. Select an adventure to view available slots fetched from the backend.
3. Fill in **name, email, and promo code** at checkout.
4. Select a slot date and time.
5. Click **Checkout** to send booking data to the backend.
6. On successful booking, a confirmation is displayed.

---

## Promo Code Validation

* Promo codes are validated via an **Express API endpoint**.
* If valid, the discount is applied automatically to the total amount.
---

## Future Improvements

* Add **user authentication** for booking history.
* Admin panel for managing adventures, slots, and promo codes.
* Email or SMS notifications on successful booking.
* Dynamic pricing based on seasonality or demand.
* Integration with payment gateways for real-time payments.


Do you want me to do that next?
