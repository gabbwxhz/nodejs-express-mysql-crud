/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'

const FormContainer = styled.form`
   width: 1200px;
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

export default function EmployeesForm({ getUsers, onEdit, setOnEdit }) {
   const ref = useRef()

   useEffect(() => {
      if (onEdit) {
         const user = ref.current

         ;(user.cpf.value = onEdit.cpf),
            (user.nome.value = onEdit.nome),
            (user.nome_agenda.value = onEdit.nome_agenda),
            (user.data_nascimento.value = onEdit.data_nascimento),
            (user.rg.value = onEdit.rg),
            (user.cargo.value = onEdit.cargo)
      }
   }, [onEdit])

   const handleSubmit = async (e) => {
      e.preventDefault()

      const user = ref.current

      if (
         !user.cpf.value ||
         !user.nome.value ||
         !user.nome_agenda.value ||
         !user.data_nascimento.value ||
         !user.rg.value ||
         !user.cargo.value
      )
         return toast.warn('preencha todos os campos!')

      if (onEdit) {
         await axios
            .put('http://localhost:8800/employees/' + onEdit.cpf, {
               cpf: user.cpf.value,
               nome: user.nome.value,
               nome_agenda: user.nome_agenda.value,
               data_nascimento: user.data_nascimento.value,
               rg: user.rg.value,
               cargo: user.cargo.value
            })
            .then(({ data }) => toast.success(data))
            .catch((err) => toast.error(err.response.data.error))
      } else {
         await axios
            .post('http://localhost:8800/employees', {
               cpf: user.cpf.value,
               nome: user.nome.value,
               nome_agenda: user.nome_agenda.value,
               data_nascimento: user.data_nascimento.value,
               rg: user.rg.value,
               cargo: user.cargo.value
            })
            .then(({ data }) => toast.success(data))
            .catch((err) => toast.error(err.response.data.error))
      }

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
            <Label>Nome agenda</Label>
            <Input name="nome_agenda" />
         </InputArea>

         <InputArea>
            <Label>CPF</Label>
            <Input name="cpf" />
         </InputArea>

         <InputArea>
            <Label>RG</Label>
            <Input name="rg" />
         </InputArea>

         <InputArea>
            <Label>Data de nascimento</Label>
            <Input type="date" name="data_nascimento" />
         </InputArea>

         <InputArea>
            <Label>Cargo</Label>
            <Input name="cargo" />
         </InputArea>

         <Button type="submit">SALVAR</Button>
      </FormContainer>
   )
}
