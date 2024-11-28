/*import React, { useEffect, useState } from 'react';
import macchinarioService from '../services/macchinarioService.js';
import Table from '../componenti/tabella.js';
import Button from '../componenti/bottone.js';
import Form from '../componenti/form.js'; 


const Macchinari = ({ impiantoId }) => {
  const [macchinari, setMacchinari] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchMacchinari = async () => {
      const data = await macchinarioService.getMacchinariByImp(impiantoId);
      setMacchinari(data);
    };
    fetchMacchinari();
  }, [impiantoId]);

  const handleAddMacchinari = async (machine) => {
    await macchinarioService.addMacchinario(impiantoId, machine);
    setMacchinari([...macchinari, machine]);
    setShowForm(false);
  };

  return (
    <div>
      <h2>Gestione dei Macchinari</h2>
     <Button onClick={() => setShowForm(!showForm)}>Aggiungi Macchinario</Button>
      {showForm && (
        <Form
          onSubmit={handleAddMacchinari}
          fields={[
            { label: 'Nome', name: 'name', type: 'text', required: true },
            { label: 'Tipo', name: 'type', type: 'text', required: true },
            { label: 'Stato', name: 'status', type: 'text', required: true },
          ]}
        />
      )}
      <Table
        headers={['Nome', 'Tipo', 'Stato']}
        data={macchinari.map((machine) => ({
          name: machine.name,
          type: machine.type,
          status: machine.status,
        }))}
      />
    </div>
  );
};

export default Macchinari;*/