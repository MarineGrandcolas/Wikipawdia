import React from 'react'
import { useState, useEffect } from 'react'
import CatHunt from '../../assets/cat-hunt.png'
import CatHunt0 from '../../assets/cat-hunt-zero.png'
import GenerateCard from '../cards/GenerateCard'
import './AssetsFilter.css'


const AssetsFilter = () => {
    const [devClicked, setDevClicked] = useState('')
    const [techClicked, setTechClicked] = useState('')
    const [formatClicked, setFormatClicked] = useState('')

    const [cards, setCards] = useState([])

    useEffect(() => {
        fetch(
            `https://api.jsonbin.io/b/622640587caf5d67836199ee`
        )
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(console.error)
    }, [])

    const buttons = [
        [
            'front',
            ['html', 'CSS', 'Javascript', 'Node', 'React', 'Git', 'Github']
        ],
        [
            'back',
            ['BDD', 'Express', 'MySQL', 'Git', 'Github']
        ],
        [
            'format',
            ['Diaporama', 'Image', 'Site Internet', 'Vidéo']
        ]
    ]

    const resetFilters = (e) => {
        e.preventDefault();
        setTechClicked('');
        setFormatClicked('');
    }

    const filteringCards =
        cards &&
        cards
            .filter(
                (searchedCard) =>
                    searchedCard.devtype.includes(devClicked)
                    && searchedCard.tags.includes(techClicked)
                    && searchedCard.format.includes(formatClicked)
            )

    return (
        <div className="AssetsFilter">
            <div className='filter-container'>
            <div className='animate__animated animate__fadeInRight'>
                <div className="filters-box-main">
                    <p>Ton projet porte sur quel type de dev ?</p>
                    <div className="buttons-stylized">
                        <button type='button' onClick={(e) => { setDevClicked(`${buttons[0][0]}`); resetFilters(e) }}>
                            {buttons[0][0]}
                        </button>

                        <button type='button' onClick={(e) => { setDevClicked(`${buttons[1][0]}`); resetFilters(e) }}>{buttons[1][0]}</button>
                    </div>
                </div>

                {devClicked === 'front' ?
                    <div className='animate__animated animate__fadeInRight'>
                        <div className="filters-box-main">
                            <p>Ok ! Sur quelle techno ?</p>
                            <div className="buttons-stylized">
                                {buttons[0][1].map((button, index) => <button type='button' key={index} onClick={(e) => { e.preventDefault(); setTechClicked(`${button}`)}}>{button}</button>)}
                            </div>
                        </div>
                    </div>
                    :
                    null
                }

                {devClicked === 'back' ?
                    <div className='animate__animated animate__fadeInRight'>
                        <div className="filters-box-main">
                            <p>Ok! Sur quelle techno ?</p>
                            <div className="buttons-stylized" id="">
                                {buttons[1][1].map((button, index) => <button type='button' key={index} onClick={(e) => { e.preventDefault(); setTechClicked(`${button}`)}}>{button}</button>)}
                            </div>
                        </div>
                    </div>
                    :
                    null
                }

                {techClicked !== '' ?
                    <div className='animate__animated animate__fadeInRight'>
                        <div className="filters-box-main">
                            <p>Ca marche ! Avec quel format es-tu le plus à l'aise ?</p>
                            <div className="buttons-stylized">
                                {buttons[2][1].map((button, index) => <button type='button' key={index} onClick={(e) => {e.preventDefault(); setFormatClicked(`${button}`)}}>
                                    {button}
                                </button>)}
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                </div>
                <div className='filter-results'>
                    {formatClicked !== '' ?
                        <div>
                            {filteringCards.length ?
                                <div className='display-cards-flex'>
                                    <div className='display-cards-title'>
                                    <h1>Résultats de la chat-sse</h1>
                                    <div className='animate__animated animate__bounce animate__infinite'>
                                        <img src={CatHunt} alt="results cat" className='results-cards-cat' />
                                    </div>
                                </div>
                                    {filteringCards.map((resultCard, index) =>
                                        <div key={index}>
                                            <GenerateCard card={resultCard} />
                                        </div>)}
                                </div>
                                :
                                <div className='display-cards-flex'>
                                    <div className='display-cards-title'>
                                    <h1>Uh oh, rien pour le moment ...</h1>
                                    <div className='animate__animated animate__bounce animate__infinite'>
                                        <img src={CatHunt0} alt="no result cat" className="results-cards-cat" />
                                    </div>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        null
                }
                    </div> 
            </div>
        </div>
    )
}

export default AssetsFilter
