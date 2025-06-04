# 🎯 Student Info Frontend (React)

A simple React frontend to interact with the Spring Boot backend API for managing student records. This app allows users to **add**, **view**, and **delete** student records via a clean and responsive UI.

---

## 🚀 Tech Stack

- React
- Axios
- Tailwind CSS (for styling)
- Custom React Hook (`useApi`) for API requests

---

## 🧱 Project Structure

```
src/
├── components/
│   └── Home.jsx           # Main UI and logic
├── hooks/
│   └── infoStudent.js     # Custom hook for API calls
├── App.jsx
└── main.jsx
```

---

## 🧠 Features

✅ Fetch all students on mount  
✅ Submit new student to backend  
✅ Display student list in a table  
✅ Delete student by ID  
✅ Custom reusable hook for handling API requests

---

## 🧰 Custom Hook – `useApi.js`

Handles all API requests using Axios.

```js
const { sendRequest, loading, error } = useApi();
```

### Example Usage:

```js
// GET all students
sendRequest({ url: "/students", method: "GET" });

// POST new student
sendRequest({ url: "/students", method: "POST", body: student });

// DELETE student by ID
sendRequest({ url: `/students/${id}`, method: "DELETE" });
```

---

## 📄 Home Component – `Home.jsx`

### Form Fields

- `name` – student name  
- `email` – student email  
- `age` – student age  
- `course` – student course  

### Core Logic

- Fetches students from backend on load
- Displays them in a table
- Submits new student to backend
- Deletes student using their ID

### Table Layout

| ID (UUID) | Name | Email | Age | Course | Action |
|-----------|------|-------|-----|--------|--------|
| ...       | ...  | ...   | ... | ...    | Delete |

---

## 🔗 Backend Integration

The app is configured to communicate with the Spring Boot API:

```
http://localhost:8080/students
```

> Make sure your backend has CORS enabled:
```java
@CrossOrigin("http://localhost:5173")
```

---

## 🖼 UI

- Built with Tailwind CSS  
- Responsive design  
- Clean layout using cards and tables

---

## 🛠 To Run the Project

1. Install dependencies:

```bash
npm install
```

2. Start the frontend dev server:

```bash
npm run dev
```

> Make sure the Spring Boot backend is running on `localhost:8080`.

---

## 📌 Future Improvements

- Add `Edit` functionality  
- Validate form inputs  
- Show loading spinners and success/error toasts  
- Add pagination for long lists  
- Store email on the backend

---

> _Frontend built for learning, with ❤️ using React and Tailwind._
