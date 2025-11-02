import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api';
import './filme.css'
import { toast } from 'react-toastify'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const [genre, setGenre] = useState([])

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "d38f1e9aa4722184f19a90fb17444e91"
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                    setGenre(response.data.genres)                    
                })
                .catch(() => {
                    console.log("filme nao encontrado");
                    navigate("/", { replace: true } );
                    return;
                })
        }

        loadFilme();

        return () => {
            console.log("componente desmontado")
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){            
            toast.warn("This movie is already on your list.");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        
        toast.success("Movie saved successfully!")
    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Loading details...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Overview</h3>
            <span>{filme.overview}</span>
            <strong>Average: {filme.vote_average} / 10</strong>
            <p><strong>Genre: </strong>{genre.map(g => g.name).join(', ')}</p>
            <p><strong>Status: </strong>{filme.status}</p>
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Save</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer` }>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;