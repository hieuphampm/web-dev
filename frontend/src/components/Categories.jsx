import { useQuery, useMutation } from "@apollo/client";
import { CATEGORIES_QUERY, DELETE_CATEGORY, ADD_CATEGORY } from "../graphql/categories";
import { Link } from "react-router-dom";
import { useState } from "react";

function Categories() {
    const { data, loading, error, refetch } = useQuery(CATEGORIES_QUERY);
    const [deleteCategory] = useMutation(DELETE_CATEGORY);
    
    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <pre className="text-red-500">{error.message}</pre>;

    const handleDelete = async (id) => {
        await deleteCategory({ variables: { id } });
        refetch();
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-white-800 mb-4">Categories</h2>
            <ul className="bg-gray-200 shadow-md rounded-lg p-4 divide-y">
                {data.categories.map((category) => (
                    <li key={category.id} className="flex justify-between items-center py-2">
                        <Link to={`/category/${category.id}`} className="text-blue-600 hover:underline">{category.name}</Link>
                        <button 
                            onClick={() => handleDelete(category.id)} 
                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <AddCategoryForm refetch={refetch} />
        </div>
    );
}

function AddCategoryForm({ refetch }) {
    const [name, setName] = useState("");
    const [addCategory] = useMutation(ADD_CATEGORY);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCategory({ variables: { input: { name } } });
        setName("");
        refetch();
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="New category name" 
                required 
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300"
            />
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Add
            </button>
        </form>
    );
}

export default Categories;