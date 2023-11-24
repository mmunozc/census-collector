import React, { useState } from "react";
import "./FeedbackSection.css";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"; // Asegúrate de importar axios

const FeedbackSection = ({ onNext }) => {
  let navigate = useNavigate();

  // Crear estados para cada campo de entrada
  const [clarity, setClarity] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [assistance, setAssistance] = useState("");

  function handleButtonClick() {
    navigate("/dashboard");
  }

  async function handleSubmit() {
    if (!clarity || !satisfaction || !timeTaken || !assistance) {
      return window.alert("Please fill all fields");
    }
    if (timeTaken < 0 || timeTaken > 1000) {
      return window.alert("Please enter a valid time (between 0 and 1000)");
    }
    try {
      const feedbackData = {
        clarity,
        satisfaction,
        timeTaken,
        assistance,
      };

      console.log("Enviando feedback:", feedbackData); // Imprimir para verificar
      // Enviar el feedback al backend
      await axios.post("/ruta-del-backend", feedbackData);

      // Llama a onNext o realiza cualquier otra acción
      onNext();
    } catch (error) {
      console.error("Error al enviar el feedback:", error);
    }
  }

  return (
    <div className="feedback-container">
      <h2>Feedback Section</h2>
      <div className="feedback-card">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            {/* Clarity of questions */}
            <div className="col-6">
              <div className="input-group">
                <label htmlFor="clarity">Clarity of questions</label>
                <select
                  id="clarity"
                  value={clarity}
                  onChange={(e) => setClarity(e.target.value)}
                >
                  <option value="">Select your level of clarity</option>
                  <option value="very_clear">Very clear</option>
                  <option value="clear">Clear</option>
                  <option value="somewhat_clear">Somewhat clear</option>
                  <option value="unclear">Unclear</option>
                  <option value="very_unclear">Very unclear</option>
                </select>
              </div>
            </div>
            {/* Satisfaction with census process */}
            <div className="col-12 col-md-6">
              <div className="input-group">
                <label htmlFor="satisfaction">
                  Satisfaction with census process
                </label>
                <select
                  id="satisfaction"
                  value={satisfaction}
                  onChange={(e) => setSatisfaction(e.target.value)}
                >
                  <option value="">Select your level of satisfaction</option>
                  <option value="very_satisfied">Very Satisfied</option>
                  <option value="satisfied">Satisfied</option>
                  <option value="neutral">Neutral</option>
                  <option value="mildly_satisfied">Mildly Dissatisfied</option>
                  <option value="dissatisfied">Dissatisfied</option>
                </select>
              </div>
            </div>
            {/* Time taken to complete */}
            <div className="col-6">
              <div className="input-group">
                <label htmlFor="timeTaken">
                  Time taken to complete (Minutes)
                </label>
                <input
                  type="number"
                  id="timeTaken"
                  value={timeTaken}
                  min={0}
                  max={1000}
                  onChange={(e) => setTimeTaken(e.target.value)}
                />
              </div>
            </div>
            {/* Assistance and support */}
            <div className="col-6">
              <div className="input-group">
                <label htmlFor="assistance">Assistance and support</label>
                <select
                  id="assistance"
                  value={assistance}
                  onChange={(e) => setAssistance(e.target.value)}
                >
                  <option value="">
                    Select the level of assistance and support
                  </option>
                  <option value="extremely_helpful">Extremely helpful</option>
                  <option value="helpful">Very helpful</option>
                  <option value="moderately_helpful">Moderately helpful</option>
                  <option value="slightly_helpful">Slightly helpful</option>
                  <option value="not_helpful">Not helpful at all</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="round-button"
            onClick={handleButtonClick}
          >
            Back
          </button>
          <button
            type="button"
            className="round-button mx-5"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSection;
