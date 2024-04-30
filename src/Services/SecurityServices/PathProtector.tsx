import React from 'react'
import {  Outlet } from 'react-router-dom';

import Swal from 'sweetalert2';

function PathProtector() {

  const token = localStorage.getItem("token");

  if (token) {
    return (
      <>
        <Outlet />
      </>
    )
  } else {
    window.location.href = '/';
    setTimeout(() => {
      Swal.fire('wrong url','you are not authenticated','warning');
    }, 2000);
    return null; 
  }
}

export default PathProtector;