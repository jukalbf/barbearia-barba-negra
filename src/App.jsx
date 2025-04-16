import { useState } from "react";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [loged, setLoged] = useState(false);

  return (
    <div className="app">
      <Login loged={setLoged(true)}/>
      {loged && (
        <div className="home-container">
          <h1>Bem vindo a Barbeariar Barba Negra</h1>
          <main>
            <form>
              <label className="inputs-agendameto">
                <span>Tipo de corte</span>
              </label>
            </form>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
