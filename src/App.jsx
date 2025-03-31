import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // Importa Firebase
import { collection, addDoc } from "firebase/firestore";
import "./App.css"; // Importa estilos

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(30);

  useEffect(() => {
    let timer;
    if (juegoIniciado && tiempoRestante > 0) {
      timer = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      guardarEnFirestore();
      setJuegoIniciado(false);
    }
    return () => clearInterval(timer);
  }, [juegoIniciado, tiempoRestante]);

  const iniciarJuego = () => {
    if (!nombre || !edad) {
      alert("Por favor, ingresa tu nombre y edad.");
      return;
    }
    setPuntaje(0);
    setTiempoRestante(30);
    setJuegoIniciado(true);
    moverCirculo();
  };

  const aumentarPuntaje = () => {
    if (juegoIniciado) {
      setPuntaje((prev) => prev + 1);
      moverCirculo();
    }
  };

  const guardarEnFirestore = async () => {
    try {
      await addDoc(collection(db, "puntajes"), {
        nombre,
        edad,
        puntaje,
        fecha: new Date(),
      });
      alert(`¡Tiempo terminado! Puntaje guardado: ${puntaje}`);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar el puntaje.");
    }
  };

  const moverCirculo = () => {
    const circle = document.getElementById("circle");
    if (circle) {
      const x = Math.random() * (window.innerWidth - 100);
      const y = Math.random() * (window.innerHeight - 100);
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
    }
  };

  return (
    <div className="container">
      {!juegoIniciado ? (
        <div className="inicio">
          <h2>Ingrese sus datos</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
          <button onClick={iniciarJuego}>Iniciar Juego</button>
        </div>
      ) : (
        <div className="juego">
          <h2>Tiempo: {tiempoRestante}s</h2>
          <div className="score">Puntaje: {puntaje}</div>
          <div id="circle" className="circle" onClick={aumentarPuntaje}></div>
        </div>
      )}
    </div>
  );
}

export default App;
