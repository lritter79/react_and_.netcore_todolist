
import { useState, useEffect } from 'react'
import AddCategory from './AddCategory'
import CategoryTable from './CategoryTable'



const CategoryContainer = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log('use effect in cat container')
        setIsLoading(false)
    }, [])

    return (
        <>
            {isLoading ? 
                (<>
                    <h1>Loading...</h1>
                </>) : 
                (<>
                    <AddCategory categories={categories} setCategories={setCategories} />
                    <CategoryTable categories={categories} setCategories={setCategories} />
                </>) 
            } 
        </>                   
    )
}

export default CategoryContainer