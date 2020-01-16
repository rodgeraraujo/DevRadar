import React, { useEffect, useState } from "react";
import api from './services/api';

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevItem from './Components/DevItem';
import DevForm from './Components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const apiResponse = await api.get('/devs');

      setDevs(apiResponse.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
       
    const apiResponse = await api.post('/devs', data)  
    
    setDevs([...devs, apiResponse.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
