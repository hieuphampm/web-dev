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

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;
    if (!data?.category) return <p>Category not found</p>; 

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateCategory({ variables: { id, input: { name } } }); 
        refetch();
    };

    return (
        <div>
            <h2>Category: {data.category.name}</h2>
            <form onSubmit={handleUpdate}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Update category name" 
                    required 
                    style={{height:'30px', borderRadius: '10px'}}
                />
                <button type="submit" style={{marginLeft:'20px'}}>Update</button>
            </form>
        </div>
    );
}

export default Category;
