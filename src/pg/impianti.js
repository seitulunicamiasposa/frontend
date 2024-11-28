import React, { useEffect, useState } from 'react';
import macchinarioService from '../services/macchinarioService.js';
import Table from '../componenti/tabella.js';
import Button from '../componenti/bottone.js';
import Form from '../componenti/form.js';
import { useNavigate, useParams } from 'react-router-dom';
import impiantiService from '../services/impiantiService.js';

const Impianti = () => {
  const [impianti, setImpianti] = useState([]);
  const [macchinari, setMacchinari] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState('');
  //const { impiantoId } = useParams();

  useEffect(() => {
    const fetchImpianti = async () => {
      if (id) {
        console.log('id', id);
        
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
    navigate('/')
}

  return (
    <div>
      <h2>Gestione degli Impianti e dei Macchinari</h2>
     <div> 
     <label>Cerca e Aggiungi macchinari alla lista</label><br></br>
      <button className='searchId' onClick={() => setShowText(!showText)}>Cerca per ID</button>
      {showText && (
        <input type='text' placeholder='Inserisci ID...' value={id} onChange={(e) => setId(e.target.value)}/>
      )} {
        showText && ( 
          <Form
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
        {impianti.name} - {impianti.location} - {impianti.description} 
        <ul>
        {macchinari.map((macchinari) => ( 
          <li key={macchinari.id}> 
          {macchinari.name} - {macchinari.type} - {macchinari.status}
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