import React, { useEffect, useState } from "react";
import useApi from "../../hooks/infoStudent.js"; // adjust path if needed

const Home = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
  });

  const { sendRequest, loading, error } = useApi();

  useEffect(() => {
    fetchStudents();
  });

  const fetchStudents = async () => {
    const data = await sendRequest({ url: "/students", method: "GET" });
    if (data) setStudents(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await sendRequest({
      url: "/students",
      method: "POST",
      body: student,
    });
    if (created) {
      setStudents((prev) => [...prev, created]);
      setStudent({ name: "", age: "", email: "", course: "" });
    }
  };

  const handleDelete = async (id) => {
    const deleted = await sendRequest({
      url: `/students/${id}`,
      method: "DELETE",
    });
    if (deleted !== null) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Student Info Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
          <input
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="col-span-1 p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200"
          />
          <input
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="col-span-1 p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200"
          />
          <input
            name="age"
            type="number"
            value={student.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="col-span-1 p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200"
          />
          <input
            name="course"
            value={student.course}
            onChange={handleChange}
            placeholder="Course"
            required
            className="col-span-1 p-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200"
          />
          <button
            type="submit"
            className="col-span-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            Add Student
          </button>
        </form>

        {loading && <p className="text-gray-400 mt-2">Loading...</p>}
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}

        <div className="mt-8 text-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">
            Student List:
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-600 rounded-xl overflow-hidden text-sm">
              <thead className="bg-gray-700 text-indigo-300">
                <tr>
                  <th className="p-3 border-b border-gray-600">ID</th>
                  <th className="p-3 border-b border-gray-600">Name</th>
                  <th className="p-3 border-b border-gray-600">Email</th>
                  <th className="p-3 border-b border-gray-600">Age</th>
                  <th className="p-3 border-b border-gray-600">Course</th>
                  <th className="p-3 border-b border-gray-600 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="bg-gray-800 hover:bg-gray-700 transition">
                    <td className="p-3 border-b border-gray-700 text-gray-400 truncate max-w-[150px]">{s.id}</td>
                    <td className="p-3 border-b border-gray-700">{s.name}</td>
                    <td className="p-3 border-b border-gray-700">{s.email}</td>
                    <td className="p-3 border-b border-gray-700">{s.age}</td>
                    <td className="p-3 border-b border-gray-700">{s.course}</td>
                    <td className="p-3 border-b border-gray-700 text-center">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No students added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
