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
    const [cate, setCate] = useState("");
    const [subCate, setSubCate] = useState("");
    const [names, setNames] = useState("");
    const [detail, setDetail] = useState("");
    const [message, setMessage] = useState(""); // For success/error messages
    const [loading, setLoading] = useState(false); // To disable submit during request

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

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCate(e.target.value);
        setSubCate(""); // Reset subcategory when category changes
    };

    const onChangeSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSubCate(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(""); // Clear message before submitting

        const categoryArray = [
            { names, detail }
        ];

        const bodyData = {
            nestedDetail: categoryArray,
            cate: cate,
            subCate: subCate
        };

        try {
            const response = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to add nested details');
            }
            console.log(result)

            // Clear form and display success message
            setNames("");
            setDetail("");
            setCate("");
            setSubCate("");
            setMessage("Nested details added successfully!");
        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    const selectedCategory = category.find((item) => item._id === cate);

    return (
        <div className="w-[50%] mx-auto mt-3">
            <form onSubmit={handleSubmit} className="space-y-2">
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

                {/* Subcategory Dropdown */}
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

                {/* Names Input */}
                <input
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    type="text"
                    className="p-2 w-full bg-gray-100 rounded-md"
                    required
                    placeholder="Name"
                />

                {/* Detail Input */}
                <input
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    type="text"
                    className="p-2 w-full bg-gray-100 rounded-md"
                    required
                    placeholder="Detail"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`bg-blue-500 p-2 px-5 text-white hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>

            {/* Success/Error Message */}
            {message && (
                <div className={`mt-3 p-2 text-white ${message.includes("success") ? "bg-green-500" : "bg-red-500"}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Page;
