//Importanto biblioteca express
import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json()) 
//Fazendo que o express use json

//Rotas
app.post('/users', async (req, res) => {
    await prisma.user.create({  
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body) //Mostro que criei e o código de sucesso
})

app.get('/users', async (req, res) => {
    let usuarios = []
    if(req.query){
        //Procurar um usuario especifico
        usuarios = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    }else {
        //Todos os usuarios
        usuarios = await prisma.user.findMany()
    }

    res.status(200).json(usuarios) //Mostro que  ocorreu com sucesso
})

//Usando :id eu passo que :id é vai vir uma variavel
app.put('/users/:id', async (req, res) => {
    await prisma.user.update({   
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(202).json(req.body) 
})


app.delete('/users/:id', async (req, res) => { 
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message : 'Usuário deletado com sucesso'})
})


app.listen(3000) //Avisando a porta do sv

/*
    //Definindo uma rota
    1 - Tipo ode rota / Método HTTP
    2 - Endereço de acesso ex: www.notlife/usuarios
    req - Requisição
    res - Response
*/