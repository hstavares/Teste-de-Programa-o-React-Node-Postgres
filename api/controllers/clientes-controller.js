const pool = require("../db");
const crypto = require("crypto");
const coordenadasService = require("../services/coordenadas-service");

exports.index = async (req, res, next) => {
  const q = 'SELECT * FROM public."Clientes"';
  pool.query(q, (err, result) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados", err);
      return res
        .status(500)
        .json({ error: "Erro na consulta ao banco de dados" });
    } else {
      console.log("Resultado da consulta:", result.rows);
      return res.status(200).json(result.rows);
    }
  });
};

exports.create = async (req, res, next) => {
  const q = 'SELECT * FROM public."Clientes" WHERE "Email" = $1';
  const i =
    'INSERT INTO public."Clientes" ("Id", "Nome", "Email", "Telefone", "CoordX", "CoordY") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [
    generateHash(),
    req.body.nome,
    req.body.email,
    req.body.telefone,
    Math.floor(Math.random() * 500) + 1,
    Math.floor(Math.random() * 500) + 1,
  ];
  try {
    const result = await pool.query(q, [req.body.email]);

    if (result.rows.length > 0) {
      return res
        .status(409)
        .send({ success: false, message: "Usuário já cadastrado" });
    } else {
      const cadastrarCliente = await pool.query(i, values);
      return res
        .status(201)
        .send({ success: true, message: "Usuario cadastrado com sucesso!" });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.gerarRota = async (req, res) => {
  const q = 'SELECT "Nome", "CoordX", "CoordY" FROM public."Clientes"';
  try {
    const result = await pool.query(q);
    if (result.rows.length > 0) {
      const coordList = result.rows.map((coord) => ({
        Nome: coord.Nome,
        CoordX: parseFloat(coord.CoordX),
        CoordY: parseFloat(coord.CoordY),
      }));
      const { distancia, rota } =
        coordenadasService.calcularMenorDistancia(coordList);
      return res.status(200).send({
        melhorRota: rota,
        distancia,
      });
    }else{
      return res.status(409).send({
        message: "cadastre clientes para calcular a rota"
      })
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

//GERA ID's UNICOS
const generateHash = () => {
  const hash = crypto.createHash("sha256");
  const timestamp = new Date().getTime().toString();
  hash.update(timestamp);
  return hash.digest("hex").slice(0, 32);
};
