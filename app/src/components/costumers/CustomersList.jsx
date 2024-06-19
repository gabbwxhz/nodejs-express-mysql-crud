/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'

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

export default function CustomersList({ users, setUsers, setOnEdit }) {
   const formatedDate = (date) => {
      return new Date(date).toLocaleDateString('pt-br')
   }

   const handleEdit = async (item) => {
      setOnEdit(item)
   }

   const handleDelete = async (cpf) => {
      await axios
         .delete('http://localhost:8800/customers/' + cpf)
         .then(({ data }) => {
            const newArray = users.filter((user) => user.cpf != cpf)

            setUsers(newArray)
            toast.success(data)
         })
         .catch(({ data }) => toast.error(data))

      setOnEdit(null)
   }

   return (
      <List>
         {users.map((item, i) => (
            <ListItem key={i}>
               <span>NOME: {item.nome}</span>
               <span>CPF: {item.cpf}</span>
               <span>ANIVERSÁRIO: {formatedDate(item.aniversario)}</span>
               <span>TELEFONE: {item.telefone}</span>
               <span>EMAIL: {item.email}</span>
               <span>GENERO: {item.genero}</span>
               <span>RG: {item.rg}</span>
               <span>CEP: {item.cep}</span>
               <span>ENDEREÇO: {item.endereco}</span>
               <span>NUMERO: {item.numero_endereco}</span>
               <span>COMPLEMENTO: {item.complemento}</span>
               <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                  <FaEdit cursor="pointer" onClick={() => handleEdit(item)} />
                  <FaTrash cursor="pointer" onClick={() => handleDelete(item.cpf)} />
               </div>
            </ListItem>
         ))}
      </List>
   )
}
