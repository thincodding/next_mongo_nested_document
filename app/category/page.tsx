"use client";

import React, { useEffect, useState } from "react";

interface Category {
  _id: string;
  cname: string;
  subcategory?: Subcategory[];
}

interface Subcategory {
  _id: string;
  subname: string;
  nested?: NestedDetail[];
}

interface NestedDetail {
  _id: string;
  names: string;
}

function Page() {
  const [category, setCategory] = useState<Category[]>([]);
  const [cate, setCate] = useState(""); // Selected Category ID
  const [subCate, setSubCate] = useState(""); // Selected Subcategory ID

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("/api/category");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategory(data.category);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchCategory();
  }, []);

  // Handle category change
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCate(e.target.value);
    setSubCate(""); // Reset subcategory when category changes
  };

  // Handle subcategory change
  const onChangeSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubCate(e.target.value);
  };

  // Find the selected category
  const selectedCategory = category.find((item) => item._id === cate);

  return (
    <div className="w-[50%] mx-auto mt-3">
      <form action="" className="space-y-2">
        {/* Category Dropdown */}
        <select
          value={cate}
          onChange={onChangeCategory}
          className="p-2 w-full bg-gray-100 rounded-md"
          required
        >
          <option value="">Select Category</option>
          {category.map((item) => (
            <option key={item._id} value={item._id}>
              {item.cname}
            </option>
          ))}
        </select>

        {/* Subcategory Dropdown (Based on selected category) */}
        <select
          value={subCate}
          onChange={onChangeSubCategory}
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          disabled={!selectedCategory?.subcategory?.length}
        >
          <option value="">Select Subcategory</option>
          {selectedCategory?.subcategory?.map((sub_item) => (
            <option key={sub_item._id} value={sub_item._id}>
              {sub_item.subname}
            </option>
          ))}
        </select>

        {/* Nested Details Dropdown (Based on selected subcategory) */}
        <select className="p-2 w-full bg-gray-100 rounded-md" required>
          <option value="">Select Nested Detail</option>
          {selectedCategory?.subcategory
            ?.find((sub_item) => sub_item._id === subCate)
            ?.nested?.map((nest_item) => (
              <option key={nest_item._id} value={nest_item._id}>
                {nest_item.names}
              </option>
            ))}
        </select>

        <input
          type="text"
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          placeholder="Student Name"
        />

        <input
          type="text"
          className="p-2 w-full bg-gray-100 rounded-md"
          required
          placeholder="Student Name"
        />

        <button
          type="submit"
          className="bg-blue-500 p-2 px-5 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Page;
