import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import BootstrapTable from 'react-bootstrap-table-next';
import ClearSearchButton from 'react-bootstrap-table-next';

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import ToolkitProvider from 'react-bootstrap-table2-toolkit';
//import  {Search} from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import './Login.css';



function Login() {

    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');
    const [attempt, setAttempt] = useState(0);

    const dispatch = useDispatch()
    const key = useSelector(state => state.key)
    const id_u = useSelector(state => state.id_u)
    const name_u = useSelector(state => state.name_u)
    const username_u = useSelector(state => state.username_u)
    const role_u = useSelector(state => state.role_u)

    const getKEY = (data) => {
        dispatch({ type: "KEY", payload: data })
    }
    const getID = (data) => {
        dispatch({ type: "ID", payload: data })
    }
    const getNAME = (data) => {
        dispatch({ type: "NAME", payload: data })
    }
    const getUSERNAME = (data) => {
        dispatch({ type: "USERNAME", payload: data })
    }
    const getROLE = (data) => {
        dispatch({ type: "ROLE", payload: data })
    }

    const navigate = useNavigate();

    console.log('------------')
    console.log(key)
    console.log(id_u)
    console.log(name_u)
    console.log(role_u)
    console.log('------------')

    

    const login_token = () => {
        console.log('запрос токена')
        
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api-sb-token/token/login/',
            data: {
                username: login,
                password: password
            }
        })
            .then(res => {
                console.log('Токен получен->' + res.data.auth_token);
                getKEY(`Token ${res.data.auth_token}`)
                
            })
            .catch(error => {
                console.log('ERROR-->>')
                console.log(error)
                getROLE('anonim')
                setAttempt(1)

                
              });
            
        
            
    }

    const login_user_id = () => {

        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api-sb-user/users/me/',
            headers: {

                Authorization: key
            }
        }

        )
            .then(res => {
                console.log("USER определен->")
                console.log(res.data);
                getID(res.data.id)
            });
    }

    
    const login_user_detail = () => {

        axios({
            method: 'get',
            url: `http://127.0.0.1:8000/users/${id_u}/`,
            headers: {

                Authorization: key
            }
        }

        )
            .then(res => {
                console.log("Данные юзера->")
                console.log(res.data);
                getUSERNAME(res.data.username)
                getNAME(res.data.first_name);
                getROLE(res.data.groups[0])

            });
    }

    // const print_user = () => { // тестовая функция
      
    // console.log('------------')
    // console.log(key)
    // console.log(id_u)
    // console.log(username_u)
    // console.log(name_u)
    // console.log(role_u)
    // console.log('------------')
        
    // }

    // const Delete_key = () => { // тестовая функция
    //     getKEY('')   
    // }

   

    if (key !=='') {
        login_user_id();
    }

    if (id_u !=='') {
        login_user_detail();
    }

    
    switch (role_u) {
        case 'client':
            navigate("/")
         break;
        case 'service': 
            navigate("/")
        break;
        case 'manager': 
            navigate("/") 
        break;
        case 'anonim': 
            if (attempt ===1) {
            alert('введен не верный логин или пароль ')
            navigate("/")
        }
        break;
        default:
            //alert('введен не верный пароль или логин'); 
        break;
    }
    
 
    
    return (

        <>
            <body class="text-center">

                <main class="form-signin">
                    
                    
                    {//<img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
                    }
                    <h1 class="h3 mb-3 fw-normal">Пожалуйста введите догин и пароль выданные администратором</h1>
                    
                    <div class="row justify-content-center align-items-center">
                        <input class="w-50 form-control" id="floatingInput" placeholder="Введите логин" onChange={e => setLogin(e.target.value)} />
                        <label for="floatingInput">Логин пользователя</label>
                    </div>
                    <p></p>
                    
                    <div class="row justify-content-center align-items-center" >
                        <input class="w-50 form-control" id="floatingPassword" placeholder="Введите пароль" onChange={e => setPassword(e.target.value)} />
                        <label for="floatingPassword">Пароль пользователя</label>
                    </div>
                    
                    <p></p>
                    
                    <button class="w-50 btn btn-lg btn-primary" type="submit" onClick={login_token} style={{ background: "#163e6c" }}>
                    Ввод
                    </button>
                       
                    <div class="delta"></div>
                    {
                    // <Button onClick={login_user_id} >User</Button>
                    // <Button onClick={login_user_detail} >User_ALL</Button>
                    // <Button onClick={Delete_key} >Reset Token</Button>
                    // <Button onClick={print_user} >Print Data</Button>
                    // <Link to="/">login</Link>
                    }
                
                </main>



            </body>

        </>
    );
}

export default Login;