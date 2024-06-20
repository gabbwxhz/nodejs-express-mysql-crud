import express from 'express'
import cors from 'cors'

import customerRoutes from './routes/customers.js'
import employeeRoutes from './routes/employees.js'
import serviceRoutes from './routes/services.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/customers', customerRoutes)
app.use('/employees', employeeRoutes)
app.use('/services', serviceRoutes)

app.listen(8800)