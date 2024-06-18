/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import EmployeesForm from '../components/employees/EmployeesForm'
import EmployeesList from '../components/employees/EmployeesList'

const Container = styled.div`
   width: 1000px;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
`

const Title = styled.h1``

export default function Employees() {
   const [users, setUsers] = useState([])
   const [onEdit, setOnEdit] = useState(null)

   const getUsers = async () => {
      try {
         const res = await axios.get('http://localhost:8800/employees')
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
            <Title>TESTE FUNCIONÁRIAS</Title>
            <EmployeesForm onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
            <EmployeesList users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
         </Container>
         <ToastContainer autoClose={3000} position="bottom-left" />
      </>
   )
}
