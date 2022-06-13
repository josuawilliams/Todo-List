import { Link } from "react-router-dom"
import { BASE_URL } from "../action/url"
export default function Table({ todos }) {
    const handleDelete = (id) => {
        fetch(BASE_URL + `${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(data => {
            window.location.reload()
        })
        .catch(err => {
                console.log(err);
        })
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