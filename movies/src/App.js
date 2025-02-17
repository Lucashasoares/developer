import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pegando a API Key do arquivo .env
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const apiUrl = 'https://api.themoviedb.org/3/search/movie';

  // Função para buscar filmes
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey, // Chave de API
          query: query, // Palavra-chave digitada pelo usuário
          language: 'pt-BR' // Para trazer os resultados em português
        }
      });

      setMovies(response.data.results || []);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Testando a API quando o componente carregar
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=batman&language=pt-BR`)
      .then(response => response.json())
      .then(data => console.log('Teste da API:', data))
      .catch(error => console.error("Erro na requisição:", error));
  }, []); // Esse efeito só roda uma vez, ao montar o componente

  return (
    <div className="App">
      <h1>Buscador de Filmes</h1>

      <input
        type="text"
        placeholder="Digite o nome do filme..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200"}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.release_date ? movie.release_date.split('-')[0] : 'Sem data'}</p>
            </div>
          ))
        ) : (
          <p>Nenhum filme encontrado.</p>
        )}
      </div>

      {/* BOTÃO PARA VOLTAR AO PORTFÓLIO */}
      <a 
        href="https://lucasdeveloper.ca" 
        className="btn btn-primary back-to-portfolio"
      >
        Back to Portfolio
      </a>

    </div>
  );
}

export default App;
