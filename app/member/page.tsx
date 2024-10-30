"use client";
import { useEffect, useState } from "react";

interface Member {
  _id: string;
  names: string;
}

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [cname, setCname] = useState("");
  const [detail, setDetail] = useState(""); // Changed to string for more flexibility
  const [selectedMember, setSelectedMember] = useState("");
  const [message, setMessage] = useState(""); // For success/error messages

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/member');
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data.member);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare data to be sent
    const formData = {
      cname,
      detail,
      member: selectedMember, // Use the selected member's ID
    };

    console.log("Form Data:", formData); // Log the form data

    try {
      const response = await fetch('/api/booktype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("Response Status:", response.status); // Log response status
      const result = await response.json();
      console.log("Response Result:", result); // Log response result

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create member');
      }

      console.log(result); // Handle success (e.g., show a message)
      setMessage("Member created successfully!"); // Success message

      // Optionally reset the form after submission
      setCname("");
      setDetail("");
      setSelectedMember("");
    } catch (error: any) {
      console.error(error); // Handle error
      setMessage("Error: " + error.message); // Error message
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          <option value="" disabled>Select a member</option>
          {members.map((item) => (
            <option key={item._id} value={item._id}>
              {item.names}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          placeholder="CName"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
        />

        <input
          type="text" // Changed to text to allow for detailed descriptions
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          placeholder="Detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)} // Use the value as a string
        />

        <button
          type="submit"
          className="bg-blue-500 p-2 px-5 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>} {/* Display messages */}
    </div>
  );
}
