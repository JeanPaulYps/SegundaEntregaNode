const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const bodyParser = require("body-parser")
const fs = require("fs")
const funciones = require("./funciones")
const helpers = require("./helpers")

const directorioPublico = path.join(__dirname, "../public")
const directorioPartials = path.join(__dirname, "../partials")
app.use(express.static(directorioPublico))
hbs.registerPartials(directorioPartials)
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('views/images'));
app.set('view engine', 'hbs')




app.get('/', function (req, res)
{
    res.render('main')
})


app.get('/crear', function (req, res)
{
    res.render('crear')
})

app.post('/creacionCurso', (req,res) => 
{
    curso = req.body
    curso["estado"] = "Disponible"
    if(funciones.crearCurso(curso))
    {
        res.render("mensaje", {mensaje: "El curso ha sido registrado con exito"})
    } 
    else
    {
        res.render("mensaje", {mensaje: "El curso ya existe"})
    }
})

app.get('/verCursos', function (req, res)
{
    res.render('verCursos')
})


app.get('/inscribir', function (req, res)
{
    res.render('inscribir')
})

app.post('/inscribir', function (req,res)
{
    datos = req.body
    estudiante = 
    {
        "nombre": datos.nombre,
        "CC": datos.CC,
        "correo": datos.correo,
        "telefono": datos.telefono
    }
    matricula = 
    {
        "CC": datos.CC,
        "CursoId": datos.CursoID
    }

    if (funciones.crearEstudiante(estudiante))
    {
        if (funciones.crearMatricula(matricula))
        {
            res.render("mensaje", {mensaje: "El estudiante ha sido registrado con exito"})
        }
        else
        {
            res.render("mensaje", {mensaje: "error"})
        }
    }
    else
    {
        if (funciones.crearMatricula(matricula))
        {
            res.render("mensaje", {mensaje: "¡El usuario ya existia!, se ha matriculado el usuario exitosamente"})
        }
        else
        {

            res.render("mensaje", {mensaje: "¡El usuario ya esta matriculado!"})
        }

    }
})

app.get('/verInscritos', function (req, res)
{
    res.render('verInscritos')
})

app.get('/verCurso/:id', function(req, res){
    cursos = require("./cursos.json")
    console.log(cursos)
    if (cursos.filter(curso => curso.ID == req.params.id)[0].estado == "Disponible")
    {
        res.render('verCurso', {
            id: req.params.id
        })
    }
    else
    {
        res.send("Error")
    }

 })

 app.get('/cerrarCurso/:id', function (req,res)
 {
    funciones.cerrarCurso(req.params.id)
    res.redirect("/verCursos")
 })

 app.post('/eliminarMatricula/', function(req,res)
{
    datos = req.body
    funciones.borrarMatricula(datos)
    res.redirect("/verInscritos")
})

app.listen(3000, () =>
{
    console.log("Escuchando en el puerto 3000")
})