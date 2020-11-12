const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format') //desestruturar. Tirou de um aquivo js um objeto inteiro


function pageLanding(req, res) { //apresentação da pagina inicial
    return res.render("index.html") //chama o css (o render vai renderizar a pagina chamando objetos)
}

async function pageStudy(req, res) { //apresentação da página estudos
    const filters = req.query //recebendo os dados filtrados da página, e enviando de volta pro frontend e avaliando se foi selecionbado ou n (dinamismo na aplicação)
    
    if (!filters.subject || !filters.weekday || !filters.time) { // se tiver algum filtro desses vazio...
        return res.render("study.html", { filters, subjects, weekdays })
    }

    // converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.* 
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    // caso haja erro na hora da consulta do banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject) //trouxe o nome da matéria, ao invez do número registrado no bd
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })
        
    } catch (error) {
        console.log(error)
    }
   
}

function pageGiveClasses(req, res) {
    //se não, mostrar a página
    return res.render("give-classes.html" ,{subjects, weekdays})
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,  
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0] // += (significa q ele é igual a ele mesmo ex: queryString = queryString) 
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString) 
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}