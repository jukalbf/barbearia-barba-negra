import React from 'react'

const Login = ({ loged }) => {
  return (
    <div className="login-container" style={{ display: "flex" }}>
        <h1>Barbearia Barba Negra</h1>
        <form>
            <label className="inputs">
                <span>Nome</span>
                <input type="text" placeholder="Marcos" />
            </label>
            <label className="inputs">
                <span>Numero de celular</span>
                <input type="text" placeholder='(xx) xxxxx-xxxx' />
            </label>
            <button type="button" onClick={loged}>Entrar</button>
        </form>
    </div>
  )
}

export default Login