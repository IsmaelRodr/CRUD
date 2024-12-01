const mongoose = require('mongoose')

const Funcionarios = mongoose.model('Funcionarios',{
    nome:String,
    email:String,
    cargo:String,
    salario:Number
  });

  module.exports = Funcionarios

  