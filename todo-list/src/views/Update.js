import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { BASE_URL } from "../action/url";
import Swal from "sweetalert2";
export default function Update() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [input, setInputTodo] = useState({
        title: "",
        status: "",
    })
    useEffect(() => {
        fetch(BASE_URL + `${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                setInputTodo({
                    title: data.title,
                    status: data.status,
                });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (isLoading) {
        return <div className='loading'><div className="loader"></div></div>
    }
    const handleChange = (event) => {
        let { name, value } = event.target;
        setInputTodo({
            ...input,
            [name]: value
        })
    }

    const OnSubmit = (e) =>{
        e.preventDefault();
        fetch(BASE_URL + `${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)   
        })
        .then(res => res.json())
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
                navigate("/")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <section className="update">
                <form>
                    <div className="mb-3">
                        <h1><label htmlFor="exampleInputEmail1" className="form-label">Update To Do</label></h1><br />
                        <input style={{ paddingLeft: "210px", paddingRight: "150px" }} name="title" value={input.title} onChange={handleChange} type="text" className="form-control" placeholder='Update Todo' />
                    </div><br />

                    <select className="form-select" name="status" onChange={handleChange} value={input.status} aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        {input.status === "Complete" && <option selected value="Complete">Complete</option>}  
                        {input.status === "UnComplete" && <option selected value="UnComplete">UnComplete</option>}  
                        
                        {input.status === "Complete" && <option value="UnComplete">UnComplete</option>}  
                        {input.status === "UnComplete" && <option value="Complete">Complete</option>}  
                    </select><br />

                    <button type="submit" onClick={OnSubmit} className="btn btn-primary">Submit</button>
                </form>
            </section>
        </>
    )
}