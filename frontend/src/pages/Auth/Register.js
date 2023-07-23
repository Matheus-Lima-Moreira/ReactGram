import './Auth.css';

// Components
import { Link } from 'react-router-dom';

// Hooks
import { useState, useEffect } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    };

    console.log(user);
  }

  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className='subtitle'>Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nome'
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type='email'
          placeholder='E-mail'
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type='password'
          placeholder='Senha'
          onChange={(e) => setPassowrd(e.target.value)}
          value={password || ""}
        />
        <input
          type='password'
          placeholder='Confirmar Senha'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />
        <button type='submit'>Cadastrar</button>
      </form>
      <p>
        Já possui uma conta?? <Link to='/login'>Clique aqui para entrar</Link>
      </p>
    </div>
  )
}

export default Register