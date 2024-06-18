import express from 'express'

import {
   getEmployee,
   addEmployee,
   updateEmployee,
   deleteEmployee
} from '../controllers/employees.js'

const router = express()

router.get('/', getEmployee)

router.post('/', addEmployee)

router.put('/:cpf', updateEmployee)

router.delete('/:cpf', deleteEmployee)

export default router
