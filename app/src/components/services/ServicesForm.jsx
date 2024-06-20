/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react'

import styled from 'styled-components'
import { toast } from 'react-toastify'
import axios from 'axios'

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

export default function ServicesForm({ getServices, onEdit, setOnEdit }) {
   const ref = useRef()

   useEffect(() => {
      if (onEdit) {
         const service = ref.current

         ;(service.servico.value = onEdit.servico),
            (service.categoria.value = onEdit.categoria),
            (service.duracao.value = onEdit.duracao),
            (service.valor.value = onEdit.valor)
      }
   }, [onEdit])

   const handleSubmit = async (e) => {
      e.preventDefault()

      const service = ref.current

      if (
         !service.servico.value ||
         !service.categoria.value ||
         !service.duracao.value ||
         !service.valor.value
      )
         return toast.warn('preencha todos os campos!')

      if (onEdit) {
         await axios
            .put('http://localhost:8800/services/' + onEdit.cod_serv, {
               servico: service.servico.value,
               categoria: service.categoria.value,
               duracao: service.duracao.value,
               valor: service.valor.value
            })
            .then(({ data }) => toast.success(data))
            .catch((err) => toast.error(err.response.data.error))
      } else {
         await axios
            .post('http://localhost:8800/services', {
               servico: service.servico.value,
               categoria: service.categoria.value,
               duracao: service.duracao.value,
               valor: service.valor.value
            })
            .then(({ data }) => toast.success(data))
            .catch((err) => toast.error(err.response.data.error))
      }

      setOnEdit(null)
      getServices()
   }

   return (
      <FormContainer ref={ref} onSubmit={handleSubmit}>
         <InputArea>
            <Label>Serviço</Label>
            <Input name="servico" />
         </InputArea>

         <InputArea>
            <Label>Categoria</Label>
            <Input name="categoria" />
         </InputArea>

         <InputArea>
            <Label>Duração</Label>
            <Input name="duracao" />
         </InputArea>

         <InputArea>
            <Label>Valor</Label>
            <Input name="valor" />
         </InputArea>

         <Button type="submit">SALVAR</Button>
      </FormContainer>
   )
}
