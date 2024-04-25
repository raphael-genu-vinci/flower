import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [register, setRegister] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8081/user/register", { name, password, confirmPassword, email }, )
            .then((res) => {
                console.log(res)
                setRegister(true)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }
        
  return (
    <div>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="name">Username</label>
            <input type="text" id="name" name="name" onChange={(e) => setUsername(e.target.value)} value={name}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default RegisterForm