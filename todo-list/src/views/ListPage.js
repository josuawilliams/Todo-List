import { useEffect, useState } from 'react';
import { BASE_URL } from '../action/url';
import Table from '../component/table';
import Swal from 'sweetalert2'

export default function ListPage() {
    const [input, setInputTodo] = useState(
        {
            title: '',
        }
    );
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setTodos(data)
            }).catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <div className='loading'><div className="loader"></div></div>
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputTodo({
            ...input,
            [name]: value
        })
    }
    const onClickHandle = (e) => {
        e.preventDefault()
        fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(data => {
                if (data === "Todo is required") {
                    Swal.fire(
                        'Something Wrong',
                        `${data}`,
                        'error'
                    )

                } else {
                    Swal.fire(
                        'Okayy',
                        `${data.message}`,
                        'success'
                    )
                    setTodos([...todos, data.data])
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <section className='dashboard'>
            <form>
                <div className="mb-3">
                    <h1><label htmlFor="exampleInputEmail1" className="form-label">Create To Do</label></h1>
                    <input value={input.title} onChange={handleChange} name='title' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='create Todo' />
                </div>
                <button onClick={onClickHandle} type="submit" className="btn btn-primary">Submit</button>
            </form>
            </section>
            <div id="container">
                <table className="table table-bordered" >
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">ToDo</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <Table todos={todos} />
                </table>
            </div>
        </>
    )
}