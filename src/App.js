/* 

-- para usar os icones de https://react-icons.github.io/react-icons/: 
npm install react-icons

-- precisa instalar um biblioteca para trabalhar com requisões HTTP.
No caso:
npm install axios
*/


import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import './services/api';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch() {
    if (input === '') {
      alert('Digite algum CEP');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
      
    } catch (error) {
      alert("Ops, erro");
      setInput('');
    }
    
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="white"/>
        </button>
      </div>

      {Object.keys(cep).length > 1 && (

        <main className='main'>
          <h2>{cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}

   
      
    </div>
  );
}

export default App;
