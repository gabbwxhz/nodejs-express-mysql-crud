import { db } from '../db.js'

export const getEmployee = (_, res) => {
   const q = 'SELECT * from funcionarias'

   db.query(q, (err, data) => {
      if (err) return res.json(err)

      return res.status(200).json(data)
   })
}

export const addEmployee = (req, res) => {
   const q =
      'INSERT INTO funcionarias (cpf, nome, nome_agenda, rg, data_nascimento, cargo) VALUES (?)'

   const values = [
      req.body.cpf,
      req.body.nome,
      req.body.nome_agenda,
      req.body.rg,
      req.body.data_nascimento,
      req.body.cargo
   ]

   db.query(q, [values], (err) => {
      if (err) {
         if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'funcionario(a) ja cadastrada!' })
         }
         return res.json(err)
      }

      return res.status(200).json('funcionario(a) cadastrada com sucesso!')
   })
}

export const updateEmployee = (req, res) => {
   const q =
      'UPDATE funcionarias SET `nome` = ?, `nome_agenda` = ?, `rg` = ?, `data_nascimento` = ?, `cargo` = ? WHERE `cpf` = ?'

   const values = [
      req.body.nome,
      req.body.nome_agenda,
      req.body.rg,
      req.body.data_nascimento,
      req.body.cargo
   ]

   db.query(q, [...values, req.params.cpf], (err) => {
      if (err) return res.json(err)

      return res.status(200).json('funcionario(a) atualziada com sucesso!')
   })
}

export const deleteEmployee = (req, res) => {
   const q = 'DELETE FROM funcionarias WHERE `cpf` = ? '

   db.query(q, [req.params.cpf], (err) => {
      if (err) return res.json(err)

      return res.status(200).json('funcionario(a) deletada com sucesso')
   })
}
