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

A reusable React hook to handle all API requests using Axios, with built-in loading and error state management.

---

### 🔗 Usage

```js
const { sendRequest, loading, error, data } = useApi();
```

You can then use it like:

```js
const fetchStudents = async () => {
  const result = await sendRequest({
    url: "/students",
    method: "GET",
  });

  if (result) {
    console.log("Fetched data:", result);
  }
};
```

---

### 📦 Features

- ✅ Centralized API logic using Axios  
- ✅ Handles `loading` state automatically  
- ✅ Captures and exposes any `error` messages  
- ✅ Supports dynamic HTTP methods and request body  
- ✅ Clean abstraction to keep components simple  

---

### 🛠️ Function Signature

```js
await sendRequest({
  url: "/your-endpoint",     // required
  method: "POST",            // optional (default: GET)
  body: { name: "John" },    // optional
});
```

---

### 🧠 Internal Logic Notes

```js
/**
 * ✅ BASE_URL + url: Combined using template literals
 *    → `${BASE_URL}${url}` results in full request path like "http://localhost:8080/students"
 * 
 * ✅ data: body (not `${body}`) — body is passed as an object, not a string
 *    → `${body}` would result in "[object Object]" and break backend parsing
 * 
 * ✅ error?.response?.data?.message:
 *    → This safely accesses backend-sent error messages
 *    → If no backend message, falls back to generic `error.message`
 * 
 * ✅ Optional chaining (?.):
 *    → Prevents crash if `error.response` or `data` is undefined
 * 
 * 🔁 Returns:
 *    - data: response from backend
 *    - loading: true/false during the request
 *    - error: string if something went wrong
 *    - sendRequest: async function to make API call
 */
```

---

### 🔄 Hook Return Values

| Name          | Type      | Description                                  |
|---------------|-----------|----------------------------------------------|
| `data`        | `any`     | Response data from the API                   |
| `loading`     | `boolean` | True while request is in progress            |
| `error`       | `string`  | Error message if the request fails           |
| `sendRequest` | `function`| Function to trigger the API call             |

---

### 📁 Example API Call Response

Assuming your backend returns:

```json
{
  "id": "1",
  "name": "Riddle",
  "course": "CS"
}
```

The `data` state will contain the same object and can be rendered or used as needed.

---

> ✅ This hook is perfect for simple REST APIs, reduces repetition, and improves readability in React components.

### Example Usage:

```js
// GET all students
sendRequest({ url: "/students", method: "GET" });

// POST new student
sendRequest({ url: "/students", method: "POST", body: student });

// DELETE student by ID
sendRequest({ url: `/students/${id}`, method: "DELETE" });
```

# 📘 Why is a Non-Parameterized Constructor Needed in `StudentModel.java`?

In your `StudentModel` class, the **non-parameterized (default) constructor** is important for several key reasons:

---

## 🧱 1. Frameworks like Spring and Jackson Need It

When using `@RequestBody` in Spring Boot:

```java
@PostMapping("/add")
public String addStudent(@RequestBody StudentModel student) {
    ...
}
```

- Jackson (the library used to convert JSON into Java objects) uses **reflection** to create the object.
- It **requires a no-arg constructor** to create the object before setting its properties.

If the no-arg constructor is missing, you’ll get errors like:

> `"Cannot construct instance of StudentModel: no suitable constructor found"`

---

## 🔁 2. Your Parameterized Constructor Uses `this()`

```java
public StudentModel(String name, String age, String course) {
    this(); // Calls the no-arg constructor to initialize `id`
    ...
}
```

- This chaining means your parameterized constructor **depends on the existence** of the no-arg constructor.
- Without the no-arg constructor, `this()` would cause a compile-time error.

---

## 🧪 3. Useful for Manual Object Creation

Having a no-arg constructor allows object creation like this:

```java
StudentModel student = new StudentModel();
student.setName("Riddle");
student.setAge(21);
student.setCourse("CS");
```

This is useful during testing or when working in simple setups without constructors.

---

## ✅ Summary

| Reason | Explanation |
|--------|-------------|
| Jackson / Spring | Uses reflection to instantiate objects and requires a no-arg constructor |
| Constructor chaining | Your own constructor calls the default one via `this()` |
| Manual creation | Useful for creating and modifying object fields step-by-step |

> 🔑 **Always include a no-arg constructor** in Java POJOs when working with Spring Boot, Jackson, or similar frameworks.



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
