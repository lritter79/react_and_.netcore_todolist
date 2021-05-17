
import { useState, useEffect } from 'react'
import AddCategory from './AddCategory'
import CategoryTable from './CategoryTable'
import { useToken } from '../api-authorization/UserContext'
import CategoryCrudOperations from './CategoryCrudOperations'

const CategoryContainer = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showAddCat, setShowAddCat] = useState(true)
    const { token } = useToken()

    useEffect(() => {
        console.log('use effect in cat container')
        
        setIsLoading(false)
        const getCategories = async () => {
            try {
                //console.log(CrudOperations)                               
                //console.log(`token = ${token}`)
                //console.log(`user = ${userId}`)
                if (token !== undefined) {
                    const catsFromServer = await CategoryCrudOperations.getCategoriesByUser(token?.id, token?.token)
                    console.log(catsFromServer)
                    setIsLoading(false)
                    setCategories(catsFromServer)
                }
                
            } catch (error) {
                //showToast('error', error)
            }
        }

        getCategories()

        return function cleanup() {
            setCategories([])
        }

    }, [])

    return (
        <>
            {isLoading ? 
                (<>
                    <h1>Loading...</h1>
                </>) : 
                (<>
                    <AddCategory categories={categories} token={token} setCategories={setCategories} />
                    <CategoryTable categories={categories} token={token} setCategories={setCategories} />
                </>) 
            } 
        </>                   
    )
}

export default CategoryContainer