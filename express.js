import express from 'express'
import cursos from './cursos'
import yargs from 'yargs'

const servidor = () => {
  const app = express()
 
  app.get('/', function (req, res) {
    res.send(texto)
  })
   
  app.listen(3000)
}


const options = {
  id: {
    demand: true,
    alias: 'i'
  },
  nombre: {
    demand: true,
    alias: 'n'
  },
  cedula: {
    demand: true,
    alias: 'c'
  },
}

const imprimir =  (indice) => {
  if (indice < cursos.length) {
    let curso = cursos[indice]
    setTimeout(() => {
      console.log("El curso de "+
      curso.nombre+" tiene una duración de "+
      curso.duracion+" y cuesta $"+curso.valor+" y el id es "+curso.id)
      imprimir(indice+1)
    }, 2000)
  }
}

const argumentos = yargs.command('inscribir', 'Inscribirme en un curso', options).argv

let texto = 'Esperando inscripción'

if (argumentos.i) {
  let curso = cursos.find((curso) => {
    return curso.id == argumentos.i
  })
  if (curso) {
    texto = "El estudiante " + argumentos.n + " con cédula " + argumentos.c + "\n" +
    " esta matriculado en el curso de "+ curso.nombre+" tiene una duración de "+ "\n" +
    curso.duracion+" y cuesta $"+curso.valor
    servidor()
  } else {
    console.log("El curso seleccionado no existe intente de nuevo.");
    imprimir(0)
  }
}else{
  imprimir(0)
}