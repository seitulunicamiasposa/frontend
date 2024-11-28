import './App.css';
import Login from './pg/login.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pg/dashboard.js';
import Impianti from './pg/impianti.js';
import Macchinari from './pg/macchinari.js';

function App(){
  return (
    <Router>
    <body className="img">
    <div className="App">
      <header className="App-header">
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/impianti' element={<Impianti />} />
          <Route path='/macchinari' element={<Macchinari />} />
          </Routes>
      </header>
    </div>
    </body>
    </Router>
  );
}

export default App;
