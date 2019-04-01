const fs = require("fs")
listaCursos = []
listaMatriculas = []
listaEstudiantes = []

const crearCurso = (curso) => 
{
    listarCursos()
    let duplicado = listaCursos.find(cursosGuardados => cursosGuardados.ID == curso.ID)
    if (!duplicado)
    {
        listaCursos.push(curso)
        guardarCurso()
        return true
    }
    else
    {
        return false
    }
}



const listarCursos = () =>
{
    try
    {
        listaCursos = require("./cursos.json")
    }
    catch(error)
    {
        listaCursos = []
    }

}

const cerrarCurso = (ID) =>
{
    listarCursos()
    listaCursos.filter(curso => curso.ID == ID)[0].estado = "Cerrado"
    guardarCurso()
}

const guardarCurso = () =>
{
    let datos = JSON.stringify(listaCursos)
    fs.writeFile("src/cursos.json", datos,(err) =>
    {
        if (err) throw (err)
        console.log("Archivo creado con exito")
    } )
}

//

const crearEstudiante = (estudiante) => 
{
    listarEstudiantes()
    let duplicado = listaEstudiantes.find(estudiantesGuardados => estudiantesGuardados.CC == estudiante.CC)
    if (!duplicado)
    {
        listaEstudiantes.push(estudiante)
        guardarEstudiantes()
        return true
    }
    else
    {
        return false
    }
}

const listarEstudiantes = () =>
{
    try
    {
        listaEstudiantes = require("./estudiantes.json")
    }
    catch(error)
    {
        listaEstudiantes = []
    }

}

const guardarEstudiantes = () =>
{
    let datos = JSON.stringify(listaEstudiantes)
    fs.writeFile("src/estudiantes.json", datos,(err) =>
    {
        if (err) throw (err)
        console.log("Archivo creado con exito")
    } )
}

//

const crearMatricula = (matricula) => 
{
    listarMatriculas()
    let duplicado = listaMatriculas.find(matriculasGuardadas => matriculasGuardadas.CC == matricula.CC && matriculasGuardadas.CursoId == matricula.CursoId)

    if (!duplicado)
    {
        listaMatriculas.push(matricula)
        guardarMatriculas()
        return true
    }
    else
    {
        console.log("Ya existe otra matricula con esos registros")
        return false
    }
}

const listarMatriculas = () =>
{
    try
    {
        listaMatriculas = require("./matriculas.json")
    }
    catch(error)
    {
        listaMatriculas = []
    }

}

const guardarMatriculas = () =>
{
    let datos = JSON.stringify(listaMatriculas)
    fs.writeFile("src/matriculas.json", datos,(err) =>
    {
        if (err) throw (err)
        console.log("Archivo creado con exito")
    } )
}

const borrarMatricula = (datos) =>
{
    listarMatriculas()
    indice = -1
    for (i = 0; i < listaMatriculas.length; i ++)
    {
        if (datos.CC == listaMatriculas[i].CC && datos.cursoID == listaMatriculas[i].CursoId)
        {
            indice = i
            break
        }
    }
    if (indice >= 0)
    {
        listaMatriculas.splice(i,1)
        guardarMatriculas()
    }
}

module.exports = 
{
    crearCurso,
    listaCursos,
    listarCursos,
    listaEstudiantes,
    crearEstudiante,
    listarEstudiantes,
    listaMatriculas,
    crearMatricula,
    listarMatriculas,
    guardarCurso,
    guardarMatriculas,
    borrarMatricula,
    cerrarCurso
}
