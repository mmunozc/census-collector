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
                                <select id="address">
                                    <option value="">Select the level of clarity</option>
                                    <option value="very_clear">Very clear</option>
                                    <option value="clear">Clear</option>
                                    <option value="somewhat_clear">Somewhat clear</option>
                                    <option value="unclear">Unclear</option>
                                    <option value="very_unclear">Very unclear</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="input-group"> 
                                <label htmlFor="satisfaction">Satisfaction with census process</label>
                                <select id="satisfaction">
                                    <option value="">Select your level of satisfaction</option>
                                    <option value="very_satisfied">Very Satisfied</option>
                                    <option value="satisfied">Satisfied</option>
                                    <option value="neutral">Neutral</option>
                                    <option value="mildly_satisfied">Mildly Dissatisfied</option>
                                    <option value="dissatisfied">Dissatisfied</option>
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
                                <select id="state">
                                    <option value="">Select the level of assistance and support</option>
                                    <option value="extremely_helpful">Extremely helpful</option>
                                    <option value="helpful">Very helpful</option>
                                    <option value="moderately_helpful">Moderately helpful</option>
                                    <option value="slightly_helpful">Slightly helpful</option>
                                    <option value="not_helpful">Not helpful at all</option>
                                </select>
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
