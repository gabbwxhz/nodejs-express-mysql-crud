import { db } from '../db.js'

export const getService = (_, res) => {
   const q = 'SELECT * FROM servicos'

   db.query(q, (err, data) => {
      if (err) return res.json(err)

      return res.status(200).json(data)
   })
}

export const addService = (req, res) => {
   const q = 'INSERT INTO servicos (servico, categoria, duracao, valor) VALUES (?)'

   const values = [req.body.servico, req.body.categoria, req.body.duracao, req.body.valor]

   db.query(q, [values], (err) => {
      if (err) return res.json(err)

      return res.status(200).json('servico cadastrado com sucesso!')
   })
}

export const updateService = (req, res) => {
   const q =
      'UPDATE servicos SET `servico` = ?, `categoria` = ?, `duracao` = ?, `valor` = ? WHERE `cod_serv` = ?'

   const values = [req.body.servico, req.body.categoria, req.body.duracao, req.body.valor]

   db.query(q, [...values, req.params.cod_serv], (err) => {
      if (err) return res.json(err)

      return res.status(200).json('servico atualizado com sucesso!')
   })
}

export const deleteService = (req, res) => {
   const q = 'DELETE FROM servicos WHERE `cod_serv` = ?'

   db.query(q, [req.params.cod_serv], (err) => {
      if (err) return res.json(err)

      return res.status(200).json('servico deletado com sucesso!')
   })
}