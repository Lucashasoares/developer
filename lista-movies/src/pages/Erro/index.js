import { Link } from 'react-router-dom'
import './erro.css'

function Erro(){
    return(
        <div className='erro'>
            <h1>404</h1>
            <h2>Page don't Found</h2>
            <Link to="/">SHOW ALL MOVIES</Link> 
        </div>        
    )
}

export default Erro;