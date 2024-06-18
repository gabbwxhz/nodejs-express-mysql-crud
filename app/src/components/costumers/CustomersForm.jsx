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

export default function CustomersForm({ getUsers, onEdit, setOnEdit }) {
   const ref = useRef()

   useEffect(() => {
      if (onEdit) {
         const user = ref.current

         ;(user.cpf.value = onEdit.cpf),
            (user.nome.value = onEdit.nome),
            (user.aniversario.value = onEdit.aniversario),
            (user.telefone.value = onEdit.telefone),
            (user.email.value = onEdit.email),
            (user.genero.value = onEdit.genero),
            (user.rg.value = onEdit.rg),
            (user.cep.value = onEdit.cep),
            (user.endereco.value = onEdit.endereco),
            (user.numero_endereco.value = onEdit.numero_endereco),
            (user.complemento.value = onEdit.complemento)
      }
   }, [onEdit])

   const handleSubmit = async (e) => {
      e.preventDefault()

      const user = ref.current

      if (
         !user.cpf.value ||
         !user.nome.value ||
         !user.aniversario.value ||
         !user.telefone.value ||
         !user.email.value ||
         !user.genero.value ||
         !user.rg.value ||
         !user.cep.value ||
         !user.endereco.value ||
         !user.numero_endereco.value ||
         !user.complemento.value
      )
         return toast.warn('preencha todos os campos!')

      if (onEdit) {
         await axios
            .put('http://localhost:8800//customers/' + onEdit.cpf, {
               cpf: user.cpf.value,
               nome: user.nome.value,
               aniversario: user.aniversario.value,
               telefone: user.telefone.value,
               email: user.email.value,
               genero: user.genero.value,
               rg: user.rg.value,
               cep: user.cep.value,
               endereco: user.endereco.value,
               numero_endereco: user.numero_endereco.value,
               complemento: user.complemento.value
            })
            .then(({ data }) => toast.success(data))
            .catch((err) => toast.error(err.response.data.error))
      } else {
         await axios
            .post('http://localhost:8800/customers', {
               cpf: user.cpf.value,
               nome: user.nome.value,
               aniversario: user.aniversario.value,
               telefone: user.telefone.value,
               email: user.email.value,
               genero: user.genero.value,
               rg: user.rg.value,
               cep: user.cep.value,
               endereco: user.endereco.value,
               numero_endereco: user.numero_endereco.value,
               complemento: user.complemento.value
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
            <Label>CPF</Label>
            <Input name="cpf" />
         </InputArea>

         <InputArea>
            <Label>Aniversário</Label>
            <Input type="date" name="aniversario" />
         </InputArea>

         <InputArea>
            <Label>Telefone</Label>
            <Input name="telefone" />
         </InputArea>

         <InputArea>
            <Label>Email</Label>
            <Input name="email" />
         </InputArea>

         <InputArea>
            <Label>Gênero</Label>
            <Input name="genero" />
         </InputArea>

         <InputArea>
            <Label>RG</Label>
            <Input name="rg" />
         </InputArea>

         <InputArea>
            <Label>CEP</Label>
            <Input name="cep" />
         </InputArea>

         <InputArea>
            <Label>Endereço</Label>
            <Input name="endereco" />
         </InputArea>

         <InputArea>
            <Label>Número</Label>
            <Input name="numero_endereco" />
         </InputArea>

         <InputArea>
            <Label>Complemento</Label>
            <Input name="complemento" />
         </InputArea>

         <Button type="submit">SALVAR</Button>
      </FormContainer>
   )
}
