import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux"
import Button from 'react-bootstrap/Button';


import './Client.css';

import ThemeProvider from 'react-bootstrap/ThemeProvider'

function Client() {

  const key = useSelector(state => state.key)
  const id_u = useSelector(state => state.id_u)
  const name_u= useSelector(state => state.name_u)
  const role_u= useSelector(state => state.role_u)


  console.log('----------------')
  console.log(key)
  console.log(id_u)
  console.log(name_u)
  console.log(role_u)
  console.log('----------------')

  const asd=()=>{
    console.log('----------------')
    console.log(key)
    console.log(id_u)
    console.log(name_u)
    console.log(role_u)
    console.log('----------------')
  }

  return (

    <>
      {
        // <div class="row">
        //   <div class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
        //     <img src="ttr.jpg" alt="..."/>

        //   </div>
        //   <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8"> 
        //   <img src="ttr.jpg" alt="..."/>
        //   </div>
        //   <div class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
        //   <img src="ttr.jpg" alt="..." />
        //   </div>
        // </div>
      }

      <div class="container text-center">
        <div class="row">
          <div class="col">
            Column
          </div>
          <div class="col">
            Column
          </div>
          <div class="col">
            Column
          </div>
        </div>
        <Button onClick={asd}>KEY</Button>
      </div>
      


    </>
  );
}

export default Client;