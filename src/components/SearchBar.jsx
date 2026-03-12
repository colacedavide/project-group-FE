//importo hook
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchBar() {
    //dichiaro navigazione
    const navigate = useNavigate()
    //imposto var di stato
    const [searched, setSearched] = useState("")

    //funzione per gestire il submit
    const handleSubmit = (e) => {
        e.preventDefault(); //fermo il broswer dal ricaricare la pagina
        navigate(`/search?query=${searched}`); //usenavigate mi porta sulla rotta search e aggiunge la var di stato searched
    }

    return (
        <form
            onSubmit={handleSubmit}>
            <input
                type="text"
                value={searched}
                onChange={(e) => setSearched(e.target.value)} />
            <button>cerca</button>
        </form>
    )
}

export default SearchBar