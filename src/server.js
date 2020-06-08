const express = require("express");
const server = express();

//pegar banco de dados

const db = require("./database/db")

// configurar pasta publica

server.use(express.static("public"));

//habilitar uso do req.body

server.use(express.urlencoded({ extended: true}))


//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    nocache: true
});




// configurar caminhos
//pagina inicial
// requisiçao e pedido

server.get("/", (req,res) => {
    return res.render("index.html", { title: "Um titulo"});

})

server.get("/create-point", (req,res) => {

    return res.render("create-point.html");

})


server.post("/savepoint", (req, res) => {
   //req.body, corpo do formulario
    db.run(`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
`)

//inserir dados na tabela

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
            ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err);
        }
        console.log("Cadastrado com Sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true});

    }

    db.run(query, values,afterInsertData)

})


server.get("/search", (req,res) => {

    const search = req.query.search;

    if(search == ""){
        return res.render("search-results.html", {total: 0});
    } 

    //pegar dados do banco de dados 

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }

        const total = rows.length;

        //mostrar os dados na pagina html
        return res.render("search-results.html", { places: rows, total});

    })



})


//ligar o servidor
server.listen (3000);