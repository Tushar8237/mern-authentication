import React from 'react'
import './Profile.scss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { signOut } from '../../redux/user-slice/user';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      const response = await axios('api/auth/signout')
      dispatch(signOut())
      console.log(response.data)
      navigate('/sign-in')
      toast.success(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{
      padding: "5rem"
    }}>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
