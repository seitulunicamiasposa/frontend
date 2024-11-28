import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errore, setErrore] = useState('');
    const navigate = useNavigate();

 const check = async (e) => {
    e.preventDefault();
        if(username === '' || password === '') { 
            setErrore('CAMPI VUOTI! Inserisci username e password');
        } else { 
            try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username" : username, "password": password }),
              });
            if(response.status === 200) {
                setErrore('');
                const isAdmin = (username === "admin")
                navigate('/dashboard', {state: {isAdmin}});
            } else {
                setErrore('Credenziali errate!');
            }
            } catch (error) {
                setErrore('Errore di connessione!');
        }
    }
}

    return (

        <div className="container">

            <div className="head">
            <h1>ACCEDI</h1>
            <p>Effettua l'accesso per accedere alla Dashboard</p>
            </div>

            <form onSubmit={check}>
            <div className="inputUser">
            <label>Username</label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="inputPass">
            <label>Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errore} 
            <br></br><button id="login">Login</button>
            </form>

        </div>
    );
}

export default Login;