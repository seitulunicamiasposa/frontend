import "./dashboard.css";
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Table from '../componenti/tabella.js';
import Button from '../componenti/bottone.js';
import Form from '../componenti/form.js';
import impiantiService from "../services/impiantiService.js";

function Dashboard() {
    const [impianti, setImpianti] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();
    const isAdmin = location.state?.isAdmin;
    const navigate = useNavigate()

    useEffect(() => {
        const fetchImpianti = async () => {
            const data = await impiantiService.getImpianti();
            setImpianti(data);
        };
        fetchImpianti();
    }, []);

    const handleAddImpianto = async (impianto) => {
        await impiantiService.addImpianto(impianto);
        setImpianti([...impianti, impianto]);
        setShowForm(false);
      };

    function pathImpianti(){
        navigate('/impianti', {state: {isAdmin}});
    }
    function pathMacchinari(){
        navigate('/macchinari');
    }
    function logout(){
        localStorage.removeItem('token');
        navigate('/')
    }
    
    return (
        <div className="container"> 
            <button className="Btn" onClick={logout}>
            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="text">Logout</div>
            </button>
                <h1>Dashboard</h1>
                <p>Benvenuto nella Dashboard</p>
                <div className="add-button">
                    {isAdmin && <Button onClick={() => setShowForm(!showForm)}>Aggiungi Impianto</Button>}
                    {showForm && (
                        <Form
                        onSubmit={handleAddImpianto} 
                        fields={[
                            { label: 'Nome', name: 'name', type: 'text', required: true },
                            { label: 'Posizione', name: 'location', type: 'text', required: true },
                            { label: 'Descrizione', name: 'description', type: 'text', required: true },
                        ]}
                        />
                    )}
                </div>
                <ul>
                    <lh>lista degli impianti</lh>
                    {impianti.map((impianti) => (
                        <li key={impianti._id}>
                            <b>id:</b> {impianti._id}  
                            <button onClick={pathImpianti}>nome: {impianti.name} -
                                 location: {impianti.location} - 
                                description: {impianti.description} - 
                                n. macchinari {impianti.machinery.length}
                                
                            </button>
                        </li>))}
                </ul>  
    </div>
    );
}

export default Dashboard;

/*                <div className="btns">
                    <button  onClick={pathImpianti}> <h3>Primo impianto</h3> <Table
                     headers={['Nome', 'Posizione', 'Descrizione', 'Numero di Macchinari']}
                     data={impianti.map((impianto) => ({
                       name: impianto.name,
                       location: impianto.location,
                       description: impianto.description,
                       machineryCount: impianto.machineryCount,
                     }))}
                /></button>
                    <button  onClick={pathImpianti}> <h3>Secondo impianto</h3> <Table
                     headers={['Nome', 'Posizione', 'Descrizione', 'Numero di Macchinari']}
                     data={impianti.map((impianto) => ({
                       name: impianto.name,
                       location: impianto.location,
                       description: impianto.description,
                       machineryCount: impianto.machineryCount,
                     }))}
                /></button>
                    <button onClick={pathImpianti}> <h3>Terzo impianto</h3> <Table
                     headers={['Nome', 'Posizione', 'Descrizione', 'Numero di Macchinari']}
                     data={impianti.map((impianto) => ({
                       name: impianto.name,
                       location: impianto.location,
                       description: impianto.description,
                       machineryCount: impianto.machineryCount,
                     }))}
                /></button>
                    <button onClick={pathImpianti}> <h3>Quarto impianto</h3> <Table
                     headers={['Nome', 'Posizione', 'Descrizione', 'Numero di Macchinari']}
                     data={impianti.map((impianto) => ({
                       name: impianto.name,
                       location: impianto.location,
                       description: impianto.description,
                       machineryCount: impianto.machineryCount,
                     }))}
                /></button>
            </div> */

