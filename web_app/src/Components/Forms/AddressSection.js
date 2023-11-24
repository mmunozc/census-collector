import React, { useState } from "react";
import "./AddressSection.css";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const AddressSection = ({ onNext }) => {
  let navigate = useNavigate();

  // Crear estados para cada campo de entrada
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = async () => {
    try {
      const addressData = {
        address,
        additionalInfo,
        city,
        state,
        postalCode,
      };

      console.log(addressData);
      // Aquí envías los datos al backend
      await axios.post("/ruta-del-backend", addressData);

      // Llama a onNext o realiza cualquier otra acción después de enviar los datos
      onNext();
    } catch (error) {
      console.error("Error al enviar la dirección:", error);
    }
  };

  return (
    <div className="address-container">
      <h2>Address Section</h2>
      <div className="address-card">
        <form>
          <div className="row">
            <div className="col-6">
              <div className="input-group">
                <label htmlFor="address">Full address</label>
                <input 
                  type="text" 
                  id="address"
                  value={address}
                  onChange={e => setAddress(e.target.value)} 
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group">
                <label htmlFor="addInformation"> Additional information</label>
                <input 
                  type="text" 
                  id="addInformation"
                  value={additionalInfo}
                  onChange={e => setAdditionalInfo(e.target.value)} 
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input 
                  type="text" 
                  id="city"
                  value={city}
                  onChange={e => setCity(e.target.value)} 
                />
              </div>
            </div>
            <div className="col-4">
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input 
                  type="text" 
                  id="state"
                  value={state}
                  onChange={e => setState(e.target.value)} 
                />
              </div>
            </div>
            <div className="col-4">
              <div className="input-group">
                <label htmlFor="postalCode">Postal code</label>
                <input 
                  type="text" 
                  id="postalCode"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)} 
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="round-button"
            onClick={() => navigate("/dashboard")}
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

export default AddressSection;
