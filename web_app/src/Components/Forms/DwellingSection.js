import React, { useState } from 'react';
import './DwellingSection.css';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const DwellingSection = ({ onNext }) => {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageChange(selectedPage) {
        setCurrentPage(selectedPage.selected);
    }

    function handleButtonClick() {
        navigate('/dashboard');
    }

    const pages = [
        {
            key: 1,
            questions: [
                {
                    key: 'question1',
                    text: 'Type of dwelling',
                },
                {
                    key: 'question2',
                    text: 'Tenure',
                },
                {
                    key: 'question3',
                    text: 'Length of residence',
                }, {
                    key: 'question4',
                    text: 'Number of rooms',
                }, {
                    key: 'question5',
                    text: 'Basic utilities',
                },
                {
                    key: 'question6',
                    text: 'Housing conditions',
                }
            ],
        },
        {
            key: 2,
            questions: [
                {
                    key: 'question7',
                    text: 'Occupancy',
                },
                {
                    key: 'question8',
                    text: 'Housing expenses',
                },                
                {
                    key: 'question9',
                    text: 'Heating and cooling systems',
                },
                {
                    key: 'question10',
                    text: 'Internet access',
                }
            ],
        },
    ];

    const itemsPerPage = 1;
    const offset = currentPage * itemsPerPage;
    const currentPageData = pages[offset];

    return (
        <div className="dwelling-container">
            <h2>Dwelling Section</h2>
            <div className="dwelling-card">
                <form>
                    <div className="row">
                        {currentPageData.questions.map((question) => (
                            <div className="col-12 col-md-6">
                                <div className="input-group" key={question.key}>
                                    <label htmlFor={question.key}>{question.text}</label>
                                    <input type="text" id={question.key} />
                                </div>
                            </div>
                            ))}
                            </div>
                    <ReactPaginate
                        previousLabel={'Previous '} nextLabel={'Next'} breakLabel={'...'} pageCount={pages.length}
                        marginPagesDisplayed={2} pageRangeDisplayed={3} onPageChange={handlePageChange}
                        containerClassName={'pagination'} activeClassName={'active'} />

                    <button type="button" className="round-button" onClick={handleButtonClick}>Back</button>
                    <button type="button" className="round-button mx-5" onClick={onNext}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default DwellingSection;