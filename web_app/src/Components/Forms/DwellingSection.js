import React, { useState } from 'react';
import './DwellingSection.css';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { dwellingPages } from '../../utils/questions';
import axios from '../../api/axios'; 

const DwellingSection = ({ onNext }) => {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [responses, setResponses] = useState({});

    function handlePageChange(selectedPage) {
        setCurrentPage(selectedPage.selected);
    }

    function handleInputChange(questionText, value) {
        setResponses({
            ...responses,
            [questionText]: value,
        });
    }

    async function handleSubmit() {
        try {
            console.log('Enviando respuestas:', responses); // Imprimir para verificar
            // Enviar las respuestas al backend
            await axios.post('/ruta-del-backend', responses);

            // Llama a onNext o realiza cualquier otra acción
            onNext();
        } catch (error) {
            console.error('Error al enviar las respuestas:', error);
        }
    }

    const pages = dwellingPages;
    const itemsPerPage = 1;
    const offset = currentPage * itemsPerPage;
    const currentPageData = pages[offset];

    return (
        <div className="dwelling-container">
            <h2>Dwelling Section</h2>
            <div className="dwelling-card">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                        {currentPageData.questions.map((question) => (
                            <div className="col-12 col-md-6" key={question.key}>
                                <div className="input-group">
                                    <label htmlFor={question.key}>{question.text}</label>
                                    <input 
                                      type="text" 
                                      id={question.key} 
                                      value={responses[question.text] || ''} 
                                      onChange={(e) => handleInputChange(question.text, e.target.value)} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <ReactPaginate
                        previousLabel={'Previous '} nextLabel={'Next'} breakLabel={'...'} pageCount={pages.length}
                        marginPagesDisplayed={2} pageRangeDisplayed={3} onPageChange={handlePageChange}
                        containerClassName={'pagination'} activeClassName={'active'} />

                    <button type="button" className="round-button" onClick={() => navigate('/dashboard')}>
                        Back
                    </button>
                    <button type="button" className="round-button mx-5" onClick={handleSubmit}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DwellingSection;
