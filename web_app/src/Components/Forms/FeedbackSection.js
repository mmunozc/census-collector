import React from 'react';
import './FeedbackSection.css'
import { useNavigate } from 'react-router-dom';

const FeedbackSection = ({ onNext }) => {
    let navigate = useNavigate();
    function handleButtonClick() {
        navigate('/dashboard');
    }
    return (
        <div className="feedback-container">
            <h2>Feedback Section</h2>
            <div className="feedback-card">
                <form>
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group">
                                <label htmlFor="address">Clarity of questions</label>
                                <input type="text" id="address" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group"> 
                                <label htmlFor="satisfaction">Satisfaction with census process</label>
                                <select id="satisfaction">
                                    <option value="">Select your level of satisfaction</option>
                                    <option value="very_satisfied">Very Satisfied</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group">
                                <label htmlFor="city">Time taken to complete</label>
                                <input type="text" id="city" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-group">
                                <label htmlFor="state">Assistance and support</label>
                                <input type="text" id="state" />
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

export default FeedbackSection;
