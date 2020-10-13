import React, { useState, useEffect } from 'react';
import {Power, Trash2} from 'react-feather'; 
import {Link, useHistory} from 'react-router-dom';
import logo from '../../assets/logo.png';
 
import './main.css';
import '../../global.css'; 
import api from '../../services/api';
 

export default function Main() {

    const [casos, setCasos] = useState([]);

    const companyId = localStorage.getItem('companyId');
    const companyName = localStorage.getItem('companyName');
    
    const history = useHistory(); 

    useEffect(() => {
        api.get('perfil', {
            headers: {
                company_id: companyId
            }
        }).then(response => {
            setCasos(response.data)
        })
        
    }, [companyId])

    async function casosDelete(id) {
        
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    company_id: companyId
                }
            })

            setCasos(casos.filter(caso => caso.id !== id))
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function logOut() {
        localStorage.clear()
        
        history.push('/');
    }

    



    return (
        <div className="main-container">
            <header>
                
                <img className="img-main" src={logo} alt=""/>
                <h3>Bem vindo, {companyName}</h3> 
                
               <Link to="/register-case" className="main-btn" >Cadastrar novo caso</Link>
               <button className="power" onClick={logOut} >
                    <Power color="#440297"/>
                </button>
               
               

            </header>

            <h2>Casos Cadastrado</h2>

            <ul>
               { casos.map(caso => (
                    <li key={caso.id}>

                       
                            
                            <div className="case-content1">
                                <div>
                                    <div className = "case-content-group">
                                        <strong>Caso: </strong>
                                        <span>{caso.title}</span>
                                    </div>
        
                                    <div className = "case-content-group">
                                        <strong>Descrição</strong>
                                        <p className = "group2">{caso.description}</p>
                                    </div>
        
                                    <div className = "case-content-group">
                                        <strong >Valor: </strong> 
                                        <span>   
                                        {Intl.NumberFormat('pt-PR', {style: 'currency', currency: 'Mzn'})
                                        .format(caso.value)}
                                        </span>
                                    </div>
        
                                    <button onClick={() => casosDelete(caso.id)}>
                                        <Trash2 color="#440297" className="trash2" />
                                    </button> 
                                </div>
        
                                 
                                
                            </div> 
                            
                    </li>
                   ))
               }
              
            </ul>
        </div>
    )
}