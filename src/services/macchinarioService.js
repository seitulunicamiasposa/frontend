const getMacchinariByImp = async (impiantoId) => {
    const response = await fetch(`http://localhost:8000/impianti/${impiantoId}/macchinari`, {
      headers: {
        'Autorizzazione': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Errore nella ricerca del macchinario');
    }
    return await response.json();
  };
  
  const addMacchinario = async (impiantoId, macchinario) => {
    const response = await fetch(`http://localhost:8000/impianti/${impiantoId}/macchinari`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(macchinario),
    });
    if (!response.ok) {
      throw new Error("Errore nell'inserimento del macchinario.");
    }
    return await response.json();
  };
  
  export default { getMacchinariByImp, addMacchinario };