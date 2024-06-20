import express from 'express'

import { getService, addService, updateService, deleteService } from '../controllers/services.js'

const router = express()

router.get('/', getService)

router.post('/', addService)

router.put('/:cod_serv', updateService)

router.delete('/:cod_serv', deleteService)

export default router
