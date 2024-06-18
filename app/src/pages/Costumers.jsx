/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Form from '../../src/components/Form'
import Grid from '../../src/components/Grid'

const Container = styled.div`
   width: 1000px;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
`

const Title = styled.h1``

export default function Costumers() {
   const [users, setUsers] = useState([])
   const [onEdit, setOnEdit] = useState(null)

   const getUsers = async () => {
      try {
         const res = await axios.get('http://localhost:8800')
         setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))
      } catch (err) {
         toast.error(err)
      }
   }

   useEffect(() => {
      getUsers()
   }, [setUsers])

   return (
      <>
         <Container>
            <Title>TESTE CLIENTES</Title>
            <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
            <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
         </Container>
         <ToastContainer autoClose={3000} position="bottom-left" />
      </>
   )
}
