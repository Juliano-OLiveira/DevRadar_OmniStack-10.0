import React, { useState, useEffect } from 'react';
import '../src/css/global.css';
import '../src/css/app.css';
import '../src/css/sidebar.css';
import '../src/css/main.css';
import api from '../src/services/api'
import DevItem from './components/DeveItem';
import DevForms from './components/DevForms';


// COmponete -> Bloco isolado de Html, Css e JS, no qual não interfere no restante da aplicação
// Propridades: infromações que um componente pai passa para o componete filho
// Estado -> Infromaçoes mantidas pelo componete (Lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loaDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loaDevs();

  }, []);

  async function handleAddev(data) {
   
    const response = await api.post('/devs', data);
    
    setDevs([...devs, response.data]);
    
  }




  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
       <DevForms onSubmit={handleAddev}/>
      </aside>

      <main>
        <ul>
       {devs.map(dev =>(
          <DevItem key={dev._id} dev={dev}    />
       ))}


        </ul>
      </main>
    </div>
  );
}

export default App;
