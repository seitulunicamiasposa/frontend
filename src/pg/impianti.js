import React, { useEffect, useState } from 'react';
import macchinarioService from '../services/macchinarioService.js';
import Table from '../componenti/tabella.js';
import Button from '../componenti/bottone.js';
import Form from '../componenti/form.js';
import { useNavigate, useLocation } from 'react-router-dom';
import impiantiService from '../services/impiantiService.js';

const Impianti = () => {
  const [impianti, setImpianti] = useState([]);
  const [macchinari, setMacchinari] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const location = useLocation();
  const isAdmin = location.state?.isAdmin;

  useEffect(() => {
    const fetchImpianti = async () => {
      if (id) {
        const impiantoData = await impiantiService.getImpiantoById(id);
        setImpianti(impiantoData);
        const macchinariData = await macchinarioService.getMacchinariByImp(id);
        setMacchinari(macchinariData);
      }
    };
    fetchImpianti();
  }, [id]);

  const handleAddMacchinario = async (impianto) => {
    await macchinarioService.addMacchinario(impianto);
    setImpianti([...impianti, impianto]);
    setShowForm(false);
  };

  function pathImpianti(){
    navigate('/impianti')
  }

  function pathMacchinari(){
    navigate('/macchinari')
  }
  function logout(){
    localStorage.removeItem('token');
    navigate('/')
}

  return (
    <div>
         <button className="Btn" onClick={logout}>
            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="text">Logout</div>
            </button>
      <h2>Gestione degli Impianti e dei Macchinari</h2>
     <div> 
     <label>Cerca e Aggiungi macchinari alla lista</label><br></br>
      <button className='searchId' onClick={() => setShowText(!showText)}>Cerca per ID</button>
      {showText && (
        <input type='text' placeholder='Inserisci ID...' value={id} onChange={(e) => setId(e.target.value)}/>
      )} {isAdmin &&
        showText && ( 
          <Form label='Aggiungi Macchinario'
          onSubmit={handleAddMacchinario} 
          fields={[
              { label: 'Nome', name: 'name', type: 'text', required: true },
              { label: 'Tipo', name: 'type', type: 'text', required: true },
              { label: 'Stato', name: 'status', type: 'text', required: true },
          ]}
          />
        )
      }
      </div>
      <div>
        nome impianto: {impianti.name} - location: {impianti.location} - description: {impianti.description} 
        <ul>
         <lh>lista dei macchinari:</lh> 
        {macchinari.map((macchinari) => ( 
          <li key={macchinari.id}> 
          nome: {macchinari.name} - tipo: {macchinari.type} - stato: {macchinari.status}
          </li>
          ))}
        </ul>
      </div> 
    </div>
  );
};

export default Impianti;

/*<Button onClick={() => setShowForm(!showForm)}>Aggiungi Macchinario</Button>
{showForm && (
  <Form
    onSubmit={handleAddMacchinario}
    fields={[
      { label: 'Nome', name: 'name', type: 'text', required: true },
      { label: 'Tipo', name: 'location', type: 'text', required: true },
      { label: 'Stato', name: 'description', type: 'text', required: true },
    ]}
  />
)}*/