const hbs = require("hbs")
const funciones = require("./funciones")

hbs.registerHelper('ListarCursos', () =>
{
    let texto = ""
    cursos = require("./cursos.json")
    cursos.forEach(curso => {
        if (curso.estado == "Disponible")
        {

            texto = texto + 
                    "<tr>" +
                    `<td> <a href = "verCurso/${curso.ID}">` + curso.nombre + "</a></td>" +
                    "<td>" + curso.descripcion + "</td>" +
                    "<td>" + curso.valor + "</td>" +
                    `<td><form class="form-inline" action = "/cerrarCurso/${curso.ID}">
                        <button class="btn btn-danger" type="submit">Cerrar</button>
                    </form></td>`
                    "</tr>"
        }
       
    })
    return texto
})


hbs.registerHelper('NombresCursos', () =>
{
    let texto = ""
    cursos = require("./cursos.json")
    cursos.forEach(curso => {
        if (curso.estado == "Disponible")
        {
            texto += `<option value ="${curso.ID}"> ${curso.nombre} </option>`
        }
    })
    return texto
})

hbs.registerHelper('MostrarInteresados', () =>
{
    cursos = require("./cursos.json")
    estudiantes = require("./estudiantes.json")
    matriculas = require("./matriculas.json")
    texto =""

    cursos.forEach( curso =>
        {
            if (curso.estado == "Disponible")
            {
                texto += `<table class="table table-striped"> 
                    <thead>
                    <tr>
                            <th colspan="5" style="text-align:center">${curso.nombre}</th>
                    </tr>`
                texto += `<tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Eliminar</th>
                    </tr></thead>`
                let estudiantesMatriculados = matriculas.filter(matricula =>
                    matricula.CursoId == curso.ID 
                )
                estudiantesMatriculados.forEach( est =>
                    {
                        estudiante = estudiantes.filter(iterador => est.CC == iterador.CC)
                        estudiante = estudiante[0]
                        texto += `<tr>
                        <td>${estudiante.CC}</td>
                        <td>${estudiante.nombre}</td>
                        <td>${estudiante.correo}</td>
                        <td>${estudiante.telefono}</td>
                        <td><form class="form-inline" action = "/eliminarMatricula" method="POST">
                            <input type="hidden" name="CC" value="${estudiante.CC}">
                            <input type="hidden" name="cursoID" value="${curso.ID}">
                            <button class="btn btn-sm btn-danger" type="submit">Eliminar</button>
                        </form></td>
                        </tr>`
                    })
                texto += `</table><br/>`
            }
            
        })

    return texto
    
})

hbs.registerHelper('verCurso', (objeto) =>
{
    let ID = objeto.data.root.id
    
    cursos = require("./cursos.json")
    curso = cursos.filter(curso => curso.ID == ID)[0]
    texto = `<table class = "table table-bordered"><thead class="thead-dark"> <tr><th colspan="5" style="text-align:center">${curso.nombre}</th></tr> </thead>`
    texto += "</tr>" +
    "<tr>" +
    "<td>" + "<strong>Modalidad</strong>" + "</td>" +
    "<td>" + curso.modalidad + "</td>" +
    "</tr>"
    texto += "<tr>" +
    "<td>" + "<strong>Valor</strong>" + "</td>" +
    "<td>" + curso.valor + "</td>" +
    "</tr>"
    texto += "<td>" + "<strong>Descripcion</strong>" + "</td>" +
    "<td>" + curso.descripcion + "</td>" +
    "</tr>" 
    texto +=  "<td>" + "<strong>Intensidad</strong>" + "</td>" +
    "<td>" + curso.intensidad + "</td>" +
    "</tr>"
    texto += "<tr>" +
    "<td>" + "<strong>Estado</strong>" + "</td>" +
    "<td>" + curso.estado + "</td>" +
    "</tr>" 
    texto += "</table>"
    return texto
})
