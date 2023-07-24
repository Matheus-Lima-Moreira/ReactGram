import './Auth.css';

// Components
import { Link } from 'react-router-dom';
import Message from '../../components/Message';

// Hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { register, reset } from '../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      passwordConfirmation
    };

    dispatch(register(user));
  }

  // Clean all auth states
  useEffect(() => {
    return () => {
      dispatch(reset());
    }
  }, [dispatch]);

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
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation || ""}
        />
        {!loading && <input type='submit' value="Cadastrar" />}
        {loading && <input type='submit' value="Aguarde..." disabled />}
        {error && <Message type='error' msg={error} />}
      </form>
      <p>
        Já possui uma conta?? <Link to='/login'>Clique aqui para entrar</Link>
      </p>
    </div>
  )
}

export default Register