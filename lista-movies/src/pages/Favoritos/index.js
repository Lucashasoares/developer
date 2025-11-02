import './favoritos.css';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

function Favoritos(){

    const [Filmes, setFilmes] = useState([])

    useEffect(() => {

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id){
        let filtroFilmes = Filmes.filter( (item) =>{
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success("Movie successfully removed!")
    }

    return(
        <div className='meus-filmes'>
            <h1>Favorite movies</h1>

            {Filmes.length === 0 && <span>You don't have any saved movies :(</span>}

            <ul>
                {Filmes.map((item) =>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>See Datails</Link>
                                <button onClick={() => excluirFilme(item.id)}>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;