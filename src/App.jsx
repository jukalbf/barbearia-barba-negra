import React, { useState, useEffect } from "react";
import { fakeDB } from "./fakeDatabase";

// Estilos
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
  },
  buttonCancel: {
    backgroundColor: "#f44336",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  list: {
    listStyleType: "none",
    padding: "0",
    marginTop: "10px",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutButton: {
    marginTop: "20px",
    backgroundColor: "#008CBA",
  },
};

// Componente de Login
const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let user = fakeDB.findUser(phoneNumber);
    if (!user) {
      fakeDB.addUser({ name, phoneNumber });
      user = fakeDB.findUser(phoneNumber);
    }
    onLogin(user);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Número de telefone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente de Agendamentos
const Agendamentos = ({ user, onLogout }) => {
  const [serviceType, setServiceType] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointments, setAppointments] = useState(user.appointments);

  const services = [
    { id: "haircut", name: "Corte de cabelo" },
    { id: "beard", name: "Barba" },
  ];

  // Atualiza o estado de agendamentos sempre que houver uma mudança no banco de dados
  useEffect(() => {
    setAppointments(fakeDB.findUser(user.phoneNumber).appointments);
  }, [user.phoneNumber]);

  const handleServiceChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  const handleAppointment = () => {
    if (serviceType && appointmentTime) {
      const newAppointment = {
        service: serviceType,
        time: appointmentTime,
      };
      fakeDB.addAppointment(user.phoneNumber, newAppointment);
      // Atualiza a lista de agendamentos diretamente com o banco de dados
      setAppointments(fakeDB.findUser(user.phoneNumber).appointments);
      setServiceType("");
      setAppointmentTime("");
    }
  };

  const handleCancelAppointment = (index) => {
    fakeDB.cancelAppointment(user.phoneNumber, index);
    // Atualiza a lista de agendamentos diretamente com o banco de dados
    setAppointments(fakeDB.findUser(user.phoneNumber).appointments);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Bem-vindo, {user.name}</h2>
        <button
          onClick={onLogout}
          style={{ ...styles.button, ...styles.logoutButton }}
        >
          Logout
        </button>

        <div style={{ marginTop: "20px" }}>
          <h3>Agendamento</h3>
          <form>
            <select
              value={serviceType}
              onChange={handleServiceChange}
              style={styles.select}
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>

            {serviceType && (
              <input
                type="time"
                value={appointmentTime}
                onChange={handleTimeChange}
                style={styles.input}
                required
              />
            )}

            <button
              type="button"
              onClick={handleAppointment}
              style={styles.button}
            >
              Agendar
            </button>
          </form>

          <h4>Agendamentos</h4>
          {appointments.length > 0 ? (
            <ul style={styles.list}>
              {appointments.map((appointment, index) => (
                <li key={index} style={styles.listItem}>
                  {appointment.service} - {appointment.time}{" "}
                  <button
                    onClick={() => handleCancelAppointment(index)}
                    style={{ ...styles.button, ...styles.buttonCancel }}
                  >
                    Cancelar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Você não tem agendamentos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return <div>{!user ? <Login onLogin={handleLogin} /> : <Agendamentos user={user} onLogout={handleLogout} />}</div>;
};

export default App;
