import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CATEGORY_QUERY, UPDATE_CATEGORY } from "../graphql/categories";
import { useState, useEffect } from "react";

function Category() {
    const { id } = useParams();
    const { data, loading, error, refetch } = useQuery(CATEGORY_QUERY, { variables: { id } });
    const [updateCategory] = useMutation(UPDATE_CATEGORY);
    const [name, setName] = useState("");

    useEffect(() => {
        if (data?.category) {
            setName(data.category.name); 
        }
    }, [data]);

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <pre className="text-red-500">{error.message}</pre>;
    if (!data?.category) return <p className="text-gray-600">Category not found</p>; 

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateCategory({ variables: { id, input: { name } } }); 
        refetch();
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-3xl font-bold text-white-800 mb-4">Category: {data.category.name}</h2>
            <form onSubmit={handleUpdate} className="flex items-center gap-2">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Update category name" 
                    required 
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default Category;
