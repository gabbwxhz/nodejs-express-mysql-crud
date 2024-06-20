import express from 'express'

import {
   getCostumer,
   addCostumer,
   updateCostumer,
   deleteCostumer
} from '../controllers/customers.js'

const router = express()

router.get('/', getCostumer)

router.post('/', addCostumer)

router.put('/:cpf', updateCostumer)

router.delete('/:cpf', deleteCostumer)

export default router
