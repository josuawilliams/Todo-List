import { FETCH_TODO } from "../../action/url"
import { BASE_URL } from "../../action/url"
import Swal from "sweetalert2"

export function dataTodo(payload) {
    return{
        type: FETCH_TODO,
        payload
    }
}

export function GetTodoList() {
    return (dispatch, getState) => {
       return fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}

export function DeleteTodo(id) {
    return (dispatch, getState) => {
        return fetch(BASE_URL + `${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(
                'Okayy',
                `${data.message}`,
                'success'
            )
            const filtered = getState().todo.filter(item => item.id !== id)
            dispatch(dataTodo(filtered))
        })
        .catch(err => {
                console.log(err);
        })
    }
}

