const getImpianti = async () => {
  const response = await fetch('http://localhost:8000/impianti', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.status !== 200) {
    throw new Error('Failed to fetch plants');
  }
  return await response.json();
};

const addImpianto = async (impianto) => {
  const response = await fetch(`http://localhost:8000/impianti`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(impianto),
  });
  if (!response.ok) {
    throw new Error("Errore nell'inserimento dell'impianto.");
  }
  return await response.json();
};

const getImpiantoById = async (impiantoId) => {
  const response = await fetch(`http://localhost:8000/impianti/${impiantoId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.status !== 200) {
    throw new Error('Failed to fetch plant');
  }
  return await response.json();
};

export default { getImpianti, addImpianto, getImpiantoById };