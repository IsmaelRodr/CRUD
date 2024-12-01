const router = require('express').Router()

const Funcionarios = require('../models/Funcionarios')


// Create - criação de dados
router.post('/', async (req,res) => {

    // req.body
    const {nome,email,cargo,salario} = req.body

    if(!nome){
        res.status(422).json({error: 'O nome é obrigatorio!'})
        return
    }
    if(!email){
        res.status(422).json({error: 'O email é obrigatorio!'})
        return
    }
    if(!cargo){
        res.status(422).json({error: 'O cargo é obrigatorio!'})
        return
    }
    if(!salario){
        res.status(422).json({error: 'O salario é obrigatorio!'})
        return
    }
    
    const funcionarios = {
        nome,
        email,
        cargo,
        salario,
    }

    // create
    try {

        // criando dados
        await Funcionarios.create(funcionarios)

        res.status(201).json({message: 'Funcionario inserido no sistema com sucesso!'})

    } 
    catch (error) {
        res.status(500).json({error: error})
    }
})

// Read - Leitura de dados
router.get('/', async (req,res) =>{

    try {

        const funcionario = await Funcionarios.find()

        res.status(200).json(funcionario)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req,res) =>{

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const funcionario = await Funcionarios.findOne({_id: id})

        if(!funcionario){
            res.status(422).json({message: 'O Funcionário não foi encontrado!'})
            return
        }

        res.status(200).json(funcionario)

    } catch (error) {
        res.status(500).json({error: error})
    }

})


// Update - atualização de dados ( PUT ,PATCH)
router.patch('/:id', async (req,res) =>{

    const id = req.params.id

    const {nome,email,cargo,salario} = req.body

    const funcionarios = {
        nome,
        email,
        cargo,
        salario,
    }

    try {
        
        const updatedFuncionario = await Funcionarios.updateOne({_id: id}, funcionarios)

        if(updatedFuncionario.matchedCount === 0){
            res.status(422).json({message: 'O Funcionário não foi encontrado!'})
            return
        }

        res.status(200).json(funcionarios)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Delete - remover funcionario
router.delete('/:id', async (req,res) =>{

    const id = req.params.id

    const funcionario = await Funcionarios.findOne({_id: id})

    if(!funcionario){
        res.status(422).json({message: 'O Funcionário não foi encontrado!'})
        return
    }

    try {
        
        await Funcionarios.deleteOne({_id: id})
        res.status(200).json({message: 'Funcionário removido com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})


module.exports = router