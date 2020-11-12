

// Servidor
const express = require('express')//pra pegar uma dependencia q existe nesse projeto ou outro projeto e traz para esse arquivo JS "express"
const server = express()

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

// Configurar nunjucks (template engine)
const nunjucks = require('nunjucks') //importa o nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true, //guardar em memoria alguma coisa da page, mas n é necessário
})

// Iinicio e configuração do servidor
server
//receber os dados do req.body
.use(express.urlencoded({ extended: true }))  //esconde os dados do usuario d url
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public")) //chamando o css da pagina
//rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// Start do servidor
.listen(5500)