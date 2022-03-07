import { useState, useEffect } from 'react'
import SearchResults from './SearchResults'
import "./SearchBar.css"

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchDisplay, setSearchDisplay] = useState(false)

    const [cards, setCards] = useState([])

    useEffect(() => {
        fetch(
            `https://api.jsonbin.io/b/622640587caf5d67836199ee`
        )
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(console.error)
    }, [])

    const searchingCards =
        cards &&
        cards
            .filter(
                (searchedCard) =>
                    searchedCard.title.toLowerCase().includes(searchTerm.toLowerCase()
                    ))

    return (
        <div className="Searchbar">
            <div className="searchbar-element">
                <form method="get">
                    <div className="searchbar-field">
                        <div className="searchbar-input">
                            <input
                                type="text"
                                placeholder="Rechercher"
                                onChange={(e) => { setSearchTerm(e.target.value); setSearchDisplay(false) }}
                                value={searchTerm}
                            />
                        </div>

                        {searchTerm !== '' ?
                            <div className='clear-button'>
                                <button onClick={() => { setSearchTerm(''); setSearchDisplay(false) }}><span><i className="material-icons">clear</i></span></button>
                            </div>
                            :
                            null
                        }

                        <div className="searchbar-logo" id="s-cover">
                            <button type="button" onClick={() => searchTerm !== '' ? setSearchDisplay(true) : null}>
                                <div id="s-circle">
                                </div>
                                <span>
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {searchTerm !== '' && searchDisplay ?
                    <div className='pop-up'>
                        <div className='animate__animated animate__jackInTheBox'>
                        <div className='pop-up-results'>
                            <SearchResults searchingCards={searchingCards} />
                            <div className='clear-button-pop-up'>
                                <button onClick={(e) => { setSearchDisplay(false); (e).preventDefault() }}><span><i className="material-icons">clear</i></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                null}
        </div>
    )
}

export default SearchBar

