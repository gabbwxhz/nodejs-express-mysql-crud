/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { toast } from 'react-toastify'
import axios from 'axios'

import { FaEdit, FaTrash } from 'react-icons/fa'

const List = styled.ul`
   display: flex;
   background-color: #fff;
   padding: 20px;
   box-shadow: 0px 0px 5px #ccc;
   border-radius: 5px;
   gap: 50px;
`

const ListItem = styled.li`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding-top: 15px;
`

export default function ServicesList({ services, setServices, setOnEdit }) {
   const handleEdit = async (item) => {
      setOnEdit(item)
   }

   const handleDelete = async (cod_serv) => {
      await axios
         .delete('http://localhost:8800/services/' + cod_serv)
         .then(({ data }) => {
            const newArray = services.filter((service) => service.cod_serv != cod_serv)

            setServices(newArray)
            toast.success(data)
         })
         .catch(({ data }) => toast.error(data))

      setOnEdit(null)
   }

   return (
      <List>
         {services.map((item, i) => (
            <ListItem key={i}>
               <span>SERVIÇO: {item.servico}</span>
               <span>CATEGORIA: {item.categoria}</span>
               <span>DURAÇÃO: {item.duracao}</span>
               <span>VALOR: {item.valor}</span>
               <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                  <FaEdit cursor="pointer" onClick={() => handleEdit(item)} />
                  <FaTrash cursor="pointer" onClick={() => handleDelete(item.cod_serv)} />
               </div>
            </ListItem>
         ))}
      </List>
   )
}
