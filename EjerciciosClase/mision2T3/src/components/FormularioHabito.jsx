import { useState } from 'react';

export default function FormularioHabito({ onAddHabito }) {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      setError('Por favor, escribe el nombre del hábito.');
      return;
    }

    onAddHabito(nombreLimpio);
    setNombre('');
    setError('');
  };

  const handleChange = (e) => {
    setNombre(e.target.value);
    if (error) setError('');
  };

  return (
    <form className="formulario-habito" onSubmit={handleSubmit}>
      <div className="formulario-input-wrapper">
        <input
          type="text"
          id="input-nuevo-habito"
          value={nombre}
          onChange={handleChange}
          placeholder="Añade un nuevo hábito..."
          className={`input-habito ${error ? 'input-error' : ''}`}
          aria-label="Nombre del nuevo hábito"
        />
        <button type="submit" className="btn-anadir" id="btn-anadir-habito">
          <span>+ Añadir Hábito</span>
        </button>
      </div>

      {error && <p className="mensaje-error" role="alert">{error}</p>}
    </form>
  );
}
