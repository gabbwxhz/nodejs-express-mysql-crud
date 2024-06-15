/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'

import { FaEdit, FaTrash } from 'react-icons/fa'

const Table = styled.table`
   width: 100%;
   background-color: #fff;
   padding: 20px;
   box-shadow: 0px 0px 5px #ccc;
   border-radius: 5px;
   margin: 20px auto;
`

const Thead = styled.thead``

const Tbody = styled.tbody``

const Tr = styled.tr``

const Td = styled.td`
   padding-top: 15px;
   text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
   width: ${(props) => (props.width ? props.width : 'auto')};
   padding-left: ${(props) => (props.paddingleft ? props.paddingleft : '0')};
`

const Th = styled.th`
   text-align: start;
   border-bottom: inset;
   padding-bottom: 5px;
`

export default function Grid({ users, setUsers, setOnEdit }) {
   const formatedDate = (date) => {
      return new Date(date).toLocaleDateString('pt-br')
   }

   const handleEdit = async (item) => {
      setOnEdit(item)
   }

   const handleDelete = async (id) => {
      await axios
         .delete('http://localhost:8800/' + id)
         .then(({ data }) => {
            const newArray = users.filter((user) => user.id != id)

            setUsers(newArray)
            toast.success(data)
         })
         .catch(({ data }) => toast.error(data))

      setOnEdit(null)
   }

   return (
      <Table>
         <Thead>
            <Tr>
               <Th>Nome</Th>
               <Th>Email</Th>
               <Th>Telefone</Th>
               <Th>CPF</Th>
               <Th>Data de Nascimento</Th>
               <Th></Th>
               <Th></Th>
            </Tr>
         </Thead>
         <Tbody>
            {console.log(users)}
            {users.map((item, i) => (
               <Tr key={i}>
                  <Td width="30%">{item.nome}</Td>
                  <Td width="30%">{item.email}</Td>
                  <Td width="22%">{item.telefone}</Td>
                  <Td width="30%">{item.cpf}</Td>
                  <Td width="30%">{formatedDate(item.data_nascimento)}</Td>
                  <Td paddingleft="20px" align="center" width="5%">
                     <FaEdit cursor="pointer" onClick={() => handleEdit(item)} />
                  </Td>
                  <Td paddingleft="13px" align="center" width="5%">
                     <FaTrash cursor="pointer" onClick={() => handleDelete(item.id)} />
                  </Td>
               </Tr>
            ))}
         </Tbody>
      </Table>
   )
}
