import { db } from '../db.js'

export const getCostumer = (_, res) => {
   const q = 'SELECT * FROM clientes'

   db.query(q, (err, data) => {
      if (err) return res.json(err)

      return res.status(200).json(data)
   })
}

export const addCostumer = (req, res) => {
   const q =
      'INSERT INTO clientes (cpf, nome, aniversario, telefone, email, genero, rg, cep, endereco, numero_endereco, complemento) VALUES (?)'

   const values = [
      req.body.cpf,
      req.body.nome,
      req.body.aniversario,
      req.body.telefone,
      req.body.email,
      req.body.genero,
      req.body.rg,
      req.body.cep,
      req.body.endereco,
      req.body.numero_endereco,
      req.body.complemento
   ]

   db.query(q, [values], (err) => {
      if (err) {
         if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'cliente ja cadastrado!' })
         }
         return res.json(err)
      }

      return res.status(200).json('cliente criado com sucesso!')
   })
}

export const updateCostumer = (req, res) => {
   const q =
      'UPDATE clientes SET `nome` = ?, `aniversario` = ?,`telefone` = ?, `email` = ?,  `genero` = ?, `rg` = ?, `cep` = ?, `endereco` = ?, `numero_endereco` = ?, `complemento` = ?  WHERE `cpf` = ?'

   const values = [
      req.body.nome,
      req.body.aniversario,
      req.body.telefone,
      req.body.email,
      req.body.genero,
      req.body.rg,
      req.body.cep,
      req.body.endereco,
      req.body.numero_endereco,
      req.body.complemento
   ]

   console.log(req.body)

   db.query(q, [...values, req.params.cpf], (err) => {
      if (err) return res.json(err)

      return res.status(200).json('cliente atualizado com sucesso!')
   })
}

export const deleteCostumer = (req, res) => {
   const q = 'DELETE FROM clientes WHERE `cpf` = ?'

   db.query(q, [req.params.cpf], (err) => {
      if (err) res.json(err)

      return res.status(200).json('cliente deletado com sucesso!')
   })
}
