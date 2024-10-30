"use client";
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  cname: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [sname, setSname] = useState("");
  const [age, setAge] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/course');
        console.log("Fetching courses..."); // Debug log
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        console.log("Courses fetched:", data); // Debug log
        setCourses(data.courses);
        // console.log("course is ", data.courses)
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate age and other fields
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge)) {
      setError("Age must be a valid number");
      return;
    }

    // Prepare students array
    const studentDataArray = [
      { sname, age: parsedAge },
    ];

    const bodyData = {
      students: studentDataArray,
      course: selectedCourse, 
    };

    try {
      const response = await fetch('/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData), // Send the structured body
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create students');
      }

      console.log(result)

      // Handle success (resetting fields, etc.)
    } catch (err: any) {
      setError(err.message);
    }
  };


  if (loading) return <div>Loading courses...</div>;

  return (
    <div className="w-2/3 mx-auto mt-4">
    
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          placeholder="Student Name"
          value={sname}
          onChange={(e) => setSname(e.target.value)}
        />
        <input
          type="number"
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="" disabled>Select a course</option>
          {courses.map((item) => (
            <option key={item._id} value={item._id}>
              {item.cname}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 p-2 px-5 text-white hover:bg-blue-600"
          disabled={loading} // Disable button while loading
        >
          Submit
        </button>
      </form>

      {/* Display success message */}
      {successMessage && (
        <div className="mt-4 text-green-500">
          {successMessage}
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}
