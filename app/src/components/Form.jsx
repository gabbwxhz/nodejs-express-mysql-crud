/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'

const FormContainer = styled.form`
   width: 1000px;
   display: flex;
   justify-content: space-between;
   align-items: flex-end;
   gap: 10px;
   flex-wrap: wrap;
   background-color: #fff;
   padding: 20px;
   box-shadow: 0px 0px 5px #ccc;
   border-radius: 5px;
`

const InputArea = styled.div`
   display: flex;
   flex-direction: column;
`

const Input = styled.input`
   width: 150px;
   padding: 10px;
   border: 1px solid #bbb;
   border-radius: 5px;
   height: 40px;
`

const Label = styled.label``

const Button = styled.button`
   padding: 10px 20px;
   cursor: pointer;
   border-radius: 5px;
   border: none;
   background-color: #2c73d2;
   color: white;
   height: 42px;
`

export default function Form({ getUsers, onEdit, setOnEdit }) {
   const ref = useRef()

   useEffect(() => {
      if (onEdit) {
         const user = ref.current

         user.nome.value = onEdit.nome
         user.email.value = onEdit.email
         user.telefone.value = onEdit.telefone
         user.cpf.value = onEdit.cpf
         user.data_nascimento.value = onEdit.data_nascimento
      }
   }, [onEdit])

   const handleSubmit = async (e) => {
      e.preventDefault()

      const user = ref.current

      if (
         !user.nome.value ||
         !user.email.value ||
         !user.telefone.value ||
         !user.cpf.value ||
         !user.data_nascimento.value
      )
         return toast.warn('preencha todos os campos!')

      if (onEdit) {
         await axios
            .put('http://localhost:8800/' + onEdit.id, {
               nome: user.nome.value,
               email: user.email.value,
               telefone: user.telefone.value,
               cpf: user.cpf.value,
               data_nascimento: user.data_nascimento.value
            })
            .then(({ data }) => toast.success(data))
            .catch((err) => toast.error(err.response.data.error))
      } else {
         await axios
            .post('http://localhost:8800', {
               nome: user.nome.value,
               email: user.email.value,
               telefone: user.telefone.value,
               cpf: user.cpf.value,
               data_nascimento: user.data_nascimento.value
            })
            .then(({ data }) => toast.success(data))
            .catch((err) => toast.error(err.response.data.error))
      }
      user.nome.value = ''
      user.email.value = ''
      user.telefone.value = ''
      user.cpf.value = ''
      user.data_nascimento.value = ''

      setOnEdit(null)
      getUsers()
   }

   return (
      <FormContainer ref={ref} onSubmit={handleSubmit}>
         <InputArea>
            <Label>Nome</Label>
            <Input name="nome" />
         </InputArea>

         <InputArea>
            <Label>Email</Label>
            <Input name="email" type="email" />
         </InputArea>

         <InputArea>
            <Label>Telefone</Label>
            <Input name="telefone" />
         </InputArea>

         <InputArea>
            <Label>CPF</Label>
            <Input name="cpf" />
         </InputArea>

         <InputArea>
            <Label>Data de Nascimento</Label>
            <Input name="data_nascimento" type="date" />
         </InputArea>

         <Button type="submit">SALVAR</Button>
      </FormContainer>
   )
}
