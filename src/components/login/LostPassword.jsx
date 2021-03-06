import React from 'react'
import {useState, useEffect} from 'react'
import './LostPassword.css'

const LostPassword = () => {
    const [email, setEmail] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='LostPassword'>
            <form onSubmit={handleSubmit} className='form-container'>
                <input type="text" placeholder="Entrer votre adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} className='input-visual'/>
                <button className='valid-button' /*onClick={() => setIsUserLoggedIn(true)}*/>Mot de passe perdu</button>
            </form>
        </div>
    )
}

export default LostPassword
