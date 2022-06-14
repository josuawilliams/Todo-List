import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DeleteTodo } from "../store/actionFetch/TodoFetch"
export default function Table({ todos }) {
    const dispatch = useDispatch()
    
    const handleDelete = (id) => {
       dispatch(DeleteTodo(id))
    }
    return (
        <>
            <tbody>
                {todos.map((todo, index) => {
                    return <tr key={todo.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{todo.title}</td>
                        <td>
                            <button className="btn btn-primary">{todo.status}</button>
                        </td>
                        <td>
                            <Link to={`/update/${todo.id}`} type="button" id="button" className="btn btn-info">Update</Link>
                            <button onClick={() => handleDelete(todo.id)} type="button" id="button" className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </>
    )
}