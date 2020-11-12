const subjects = [ //matérias q estavam no meu html q quando selecionadas, envia pro frontend a materia. No array sempre a primeira posiçãop vai ser 0
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [ 
    "domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// Funcionalidades

function getSubject(subjectNumber) { //transformou a posição numerica da matéria selecionada em texto no front end.
    const position = +subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":")
    return  Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}