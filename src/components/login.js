
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"


const Login = props => {
    const initialUserState = {
        name: "",
        id: ""
    }
    const [user, setUser] = useState(initialUserState)

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const navigate = useNavigate()

    const login = () => {
        props.login(user)
        navigate('/')
    }

    return (
        <div className="submit-form">
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input type="text" name="name" id="name" className="form-control"
                        required
                        value={user.name}
                        onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID</label>
                    <input type="text" name="id" id="id" className="form-control"
                        required
                        value={user.id}
                        onChange={handleInputChange} />
                </div>

                <button type="submit" className="btn btn-success" onClick={login} >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login