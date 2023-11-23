import React from 'react';
import './Support.css';

function Support() {

    return (
        <div className="split-screen-container">
            <div className="left-pane">
                <div className="button-container">
                    <h1 style={{ fontWeight: 'bold'}}>Support Center</h1>
                    <p>Contact us through any of the platforms below for support and assistance.</p>
                    <a href="https://wa.me/3003843232" className="round-button" target="_blank" rel="noopener noreferrer">WhatsApp</a><br></br>
                    <a href="tel:+3003843232" className="round-button">Call Us</a><br></br>
                    <a href="mailto:support@bolumbia.com" className="round-button" target="_blank" rel="noopener noreferrer">Email Us</a>
                </div>
            </div>
            <div className="right-pane" style={{ backgroundImage: `url('/assets/support-image.png')` }}></div>
        </div>
    );
}

export default Support;
