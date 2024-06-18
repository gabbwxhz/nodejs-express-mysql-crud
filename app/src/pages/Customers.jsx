/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import CustomersForm from '../components/costumers/CustomersForm'
import CustomersList from '../components/costumers/CustomersList'

const Container = styled.div`
   width: 1000px;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
`

const Title = styled.h1``

export default function Customers() {
   const [users, setUsers] = useState([])
   const [onEdit, setOnEdit] = useState(null)

   const getUsers = async () => {
      try {
         const res = await axios.get('http://localhost:8800/customers')
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
            <CustomersForm onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
            <CustomersList users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
         </Container>
         <ToastContainer autoClose={3000} position="bottom-left" />
      </>
   )
}
