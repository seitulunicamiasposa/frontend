/*const login = async (username, password) => {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "username" : username, "password": password }),
    });
    if (!response.ok) {
      throw new Error('Login fallito.');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
  };*/

  
  const logout = () => {
    localStorage.removeItem('token');
  };
  
export default { login, logout };