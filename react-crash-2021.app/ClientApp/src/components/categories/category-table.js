import Table from 'react-bootstrap/Table'
import { FaTimes } from 'react-icons/fa'
//import Constant from './Constant'

const CategoryTable = ({ categories, setCategories }) => {



    return (
        <>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Message</th>                      
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) =>
                    (<tr key={index}>
                        <td>X
                        <FaTimes
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => setCategories(prev => prev.filter(cat => cat.id !== category.id))}
                            />
                        </td>
                        <td>{category.name}</td>
                        <td>{category.color}</td>
                    </tr>)
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default CategoryTable