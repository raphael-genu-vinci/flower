import React, { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

function RegisterForm() {
    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [alertData, setAlertData] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        await axios.post("http://localhost:8081/user/register", { name, password, confirmPassword, email }, )
            .then((res) => {
                setAlertData({ message: res.data.message, type: res.data.type })
            })
            .catch((err) => {
                setAlertData({ message: err.response.data.message, type: err.response.data.type })
            })
            .finally(() => setLoading(false))
        
    }
    function capitalizeFirstLetter(string) {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
        
    return (
        <div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div> // This can be replaced with a more complex loading indicator
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            )}
            {alertData && (
                <Alert severity={alertData.type}>
                    <AlertTitle>{capitalizeFirstLetter(alertData.type)}</AlertTitle>
                </Alert>
            )}
        </div>
    );
    
}

export default RegisterForm