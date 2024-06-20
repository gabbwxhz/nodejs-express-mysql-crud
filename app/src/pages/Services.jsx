/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ServicesForm from '../components/services/ServicesForm'
import ServicesList from '../components/services/ServicesList'

const Container = styled.div`
   width: 1000px;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
`

const Title = styled.h1``

export default function Services() {
   const [services, setServices] = useState([])
   const [onEdit, setOnEdit] = useState(null)

   const getServices = async () => {
      try {
         const res = await axios.get('http://localhost:8800/services')
         setServices(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))
      } catch (err) {
         toast.error(err)
      }
   }

   useEffect(() => {
      getServices()
   }, [setServices])

   return (
      <>
         <Container>
            <Title>TESTE SERVIÇOS</Title>
            <ServicesForm onEdit={onEdit} setOnEdit={setOnEdit} getServices={getServices} />
            <ServicesList services={services} setServices={setServices} setOnEdit={setOnEdit} />
         </Container>
         <ToastContainer autoClose={3000} position="bottom-left" />
      </>
   )
}
