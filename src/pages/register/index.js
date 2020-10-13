import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import '../../global.css';
import './register.css';
import logo from '../../assets/logo.png';
import {ArrowLeft} from 'react-feather';



export default function Register() {

        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [whatsapp, setWhatsApp] = useState('');
        const [provincia, setProvincia] = useState('');
        const [cidade, setCidade] = useState('');

        const history = useHistory();

    async function userRegister(e) {
        e.preventDefault()
        const dataUser = {
            name,
            email,
            whatsapp,
            provincia,
            cidade 

        } 

        try {
            const response = await api.post('company', dataUser) 
            history.push('/');
            alert(`Guarde em seguranca o seu ID: ${response.data.id}`)
        } catch (error) {
            alert('Erro no cadastro, tente novamente');
        }

       
    }



    return (
        <div className="register-container">
            <section className="register-session" >
                <div className="register-content">
                    <img src={logo} className="img-register" alt=""/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a 
                        encontrarem herois solidarios para seus casos</p>
                    <Link to="/" >
                        <ArrowLeft color="#440297" className="arrowLeft" size={16} />
                        voltar para o login
                    </Link>

                </div>

                <form onSubmit={userRegister} >
                    <input 
                        placeholder="Nome da Empresa"
                        className="register-input" 
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                        required
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        className="register-input"
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        placeholder="WhatsApp"
                        className="register-input"
                        value = {whatsapp}
                        onChange= {e => setWhatsApp(e.target.value)}
                        required
                    />
                    
                    <div className="input-group">
                        <input 
                            placeholder="Provincia" 
                            className="register-input"
                            value = {provincia}
                            onChange = {e => setProvincia(e.target.value)}
                            required
                        />
                        <input 
                            placeholder="Distrito ou Cidade"
                            className="register-input"
                            value = {cidade}
                            onChange = {e => setCidade(e.target.value)}
                            required

                        />
                    </div>

                    <button className="register-btn" type="submit" >
                        Cadastrar
                    </button>

                </form>
            </section>

        </div>
    )
}