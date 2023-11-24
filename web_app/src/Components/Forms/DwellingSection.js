import React, { useState } from 'react';
import './DwellingSection.css';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { dwellingPages } from '../../utils/questions';

const DwellingSection = ({ onNext }) => {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageChange(selectedPage) {
        setCurrentPage(selectedPage.selected);
    }

    function handleButtonClick() {
        navigate('/dashboard');
    }

    const pages = dwellingPages;
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