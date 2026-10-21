import './App.css'
import Quiz from './components/Quiz';

function App() {

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Trivial de la Academia</h1>
      </header>
      <section className="quiz-wrapper">
        <Quiz />
      </section>
    </main>
  );
}

export default App
