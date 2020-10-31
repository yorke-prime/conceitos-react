import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
}, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      "title" : `Novo Repositorio ${Date.now()}`,
	    "url" : "https://github.com/yorke-prime/conceitos-react",
	    "techs" : ["React", "React.js"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    
    const array = [...repositories];
    array.splice(array.findIndex(repository => repository.id === id), 1);
    setRepositories(array);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => 
        <li key={index}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
