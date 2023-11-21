import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown => !passwordShown);
    };

    const eyeOpenIcon = `${process.env.PUBLIC_URL}/assets/vista.png`;
    const eyeClosedIcon = `${process.env.PUBLIC_URL}/assets/invisible.png`; 

    return (
        <div className="login-container">
            <div className="login-card">
                <form>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" required style={{ borderRadius: '15px' }} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type={passwordShown ? "text" : "password"} id="password" required style={{ borderRadius: '15px' }} />
                        <img src={passwordShown ? eyeClosedIcon : eyeOpenIcon} alt="Toggle password visibility" className="password-toggle-icon" onClick={togglePasswordVisibility}/>
                    </div>
                    <button className="round-button" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
