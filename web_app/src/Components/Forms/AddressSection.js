import React from 'react';
import './AddressSection.css'
import { useNavigate } from 'react-router-dom';

const AddressSection = ({ onNext }) => {
    let navigate = useNavigate();
    function handleButtonClick() {
        navigate('/dashboard');
    }
    return (
        <div className="address-container">
            <h2>Address Section</h2>
            <div className="address-card">
                <form>
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group">
                                <label htmlFor="address">Full address</label>
                                <input type="text" id="address" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-group">
                                <label htmlFor="addInformation"> Additional information</label>
                                <input type="text" id="addInformation" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="input-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="input-group">
                                <label htmlFor="state">State</label>
                                <input type="text" id="state" />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="input-group">
                                <label htmlFor="postalCode">Postal code</label>
                                <input type="text" id="postalCode" />
                            </div>
                        </div>
                    </div>

                    <button type="button" className="round-button" onClick={handleButtonClick}>Back</button>
                    <button type="button" className="round-button mx-5" onClick={onNext}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddressSection;
