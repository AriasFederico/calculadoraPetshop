import './App.css'
import { Calculadora } from './modules/Calculadora.jsx';

function App() {
  
  return (
    <div className='App'>
      <h1>Calculadora de porcentajes</h1>
      <div className="calculadoraPorDefecto calculadoraMargin">
        <Calculadora/>
      </div>
    </div>
  )
}

export default App
