import { useQuery, useMutation } from "@apollo/client";
import { CATEGORIES_QUERY, DELETE_CATEGORY, ADD_CATEGORY } from "../graphql/categories";
import { Link } from "react-router-dom";
import { useState } from "react";

function Categories() {
    const { data, loading, error, refetch } = useQuery(CATEGORIES_QUERY);
    const [deleteCategory] = useMutation(DELETE_CATEGORY);
    
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const handleDelete = async (id) => {
        await deleteCategory({ variables: { id } });
        refetch();
    };

    return (
        <div>
            <h2 className="text-3xl font-bold underline m-2">Categories</h2>
            <ul>
                {data.categories.map((category) => (
                    <li key={category.id}>
                        <Link to={`/category/${category.id}`}>{category.name}</Link>
                        <button onClick={() => handleDelete(category.id)} className="ml-4 font-mono text-sm text-red-50" >Delete</button>
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
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" required style={{height:'30px', borderRadius: '10px'}}/>
            <button type="submit" style={{marginLeft: '20px'}}>Add</button>
        </form>
    );
}

export default Categories;