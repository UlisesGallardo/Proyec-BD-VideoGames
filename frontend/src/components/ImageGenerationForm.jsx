import React, { useState } from "react";
import {Button , Input} from "react-bootstrap"
import env from "react-dotenv";

//console.log(env.API_TOKEN)
const API_TOKEN = env.API_TOKEN;

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      //runwayml/stable-diffusion-v1-5
      //https://api-inference.huggingface.co/models/prompthero/openjourney
      //
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo generar la imagen");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (<div className="container al-c mt-3">
    <h1>Stable <span>Diffusion</span></h1>
    <p> Generacion de Imagenes</p>
    <form className="gen-form" onSubmit={handleSubmit}>
      <input type="text" name="input" placeholder="type your prompt here..." />
      <Button type="submit" variant="outline-info">Generar</Button>
    </form>
    <div>
    {loading && <div className="loading">cargando...</div>}
    {!loading && output && (
      <div className="result-image">
        <img src={output} alt="art"  />
      </div>
    )}
    </div>

    </div>);
  
};

export default ImageGenerationForm;