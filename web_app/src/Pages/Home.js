import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    let navigate = useNavigate();
    function handleButtonClick() {
        navigate('/login');
    }
    return (
        <div className="split-screen-container" style={{ paddingTop: '60px' }}>
            <div className="left-pane" style={{ backgroundImage: `url('/assets/1.png')` }}></div>
            <div className="right-pane">
                <div className="text-container">
                    <h1 style={{ fontWeight: 'bold'}}>Electronic Census System</h1>
                    <p>Our promise is to simplify your census experience. With a few clicks, no waiting,
                        just a few moments of your time. Act fast, the deadline is approaching to make your
                        presence count.</p>
                    <button className="round-button" onClick={handleButtonClick}>Fill out form</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
