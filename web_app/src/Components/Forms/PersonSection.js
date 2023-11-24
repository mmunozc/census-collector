import React, { useState } from "react";
import "./PersonSection.css";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const questionsTemplate = [
  { key: "question1", text: "What is the person´s name?" },
  { key: "question2", text: "What is the person´s sex?" },
  {
    key: "question3",
    text: "Is the person of Hispanic, Latino, or Spanish origin?",
  },
  { key: "question4", text: "What is the person´s race?" },
  { key: "question5", text: 'What is the person´s age?"' },
  { key: "question6", text: "Highest education level completed?" },
];

const PersonSection = ({ onNext }) => {
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [persons, setPersons] = useState([
    { key: "Person1", questions: [...questionsTemplate] },
  ]);
  const [responses, setResponses] = useState({});

  function handlePageChange(selectedPage) {
    setCurrentPage(selectedPage.selected);
  }

  function handleInputChange(personKey, questionKey, value) {
    setResponses({
      ...responses,
      [personKey]: {
        ...responses[personKey],
        [questionKey]: value,
      },
    });
  }

  function handleSubmit() {
    try {
      console.log("Enviando respuestas:", responses); // Imprimir para verificar
      // Enviar las respuestas al backend
      // await axios.post("/ruta-del-backend", responses);

      // Llama a onNext o realiza cualquier otra acción
      onNext();
    } catch (error) {
      console.error("Error al enviar las respuestas:", error);
    }
  }

  function handleButtonClick() {
    navigate("/dashboard");
  }

  function addNewPerson() {
    const newPersonNumber = persons.length + 1;
    const newPersonKey = `Person${newPersonNumber}`;
    setPersons((persons) => [
      ...persons,
      { key: newPersonKey, questions: [...questionsTemplate] },
    ]);
  }

  return (
    <div className="person-container">
      <h2>Person Section</h2>
      <div className={`person-card`} key={persons[currentPage].key}>
        <h4>{persons[currentPage].key}</h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            {persons[currentPage].questions.map((question) => (
              <div className="col-12 col-md-6" key={question.key}>
                <div className="input-group">
                  <label htmlFor={question.key}>{question.text}</label>
                  <input
                    type="text"
                    id={question.key}
                    value={
                      responses[persons[currentPage].key]
                        ? responses[persons[currentPage].key][question.key] ||
                          ""
                        : ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        persons[currentPage].key,
                        question.key,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            previousLabel={"Previous "}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={persons.length}
            forcePage={currentPage}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />

          <button
            type="button"
            className="round-button mx-5"
            onClick={handleButtonClick}
          >
            Back
          </button>
          <button type="button" className="round-button" onClick={handleSubmit}>
            Save
          </button>
          <button
            type="button"
            className="round-button mx-5"
            onClick={addNewPerson}
          >
            Add new person
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonSection;
