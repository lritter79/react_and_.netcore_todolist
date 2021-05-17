import Table from 'react-bootstrap/Table'
import { FaTimes } from 'react-icons/fa'
//import Constant from './Constant'
import CategoryCrudOperations from './CategoryCrudOperations'

const CategoryTable = ({ token, categories, setCategories }) => {



    const deleteCategory = async (id) => {
        setCategories(prev => prev.filter(cat => cat.id !== id))
        await CategoryCrudOperations.deleteCategory(token, id)
    }

    return (
        <>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Category Name</th>
                        <th>Color</th>                      
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) =>
                    (<tr key={index}>
                        <td>
                            <FaTimes
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => deleteCategory(category.id)}
                            />
                        </td>
                        <td>{category.name}</td>
                        <td><p style={{color: category.color}}>{category.color}</p></td>
                    </tr>)
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default CategoryTable