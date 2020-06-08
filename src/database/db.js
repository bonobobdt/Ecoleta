// i  importar dependencia sqlite 3

const sqlite3 = require("sqlite3").verbose()


//iniciar objeto que ira fazer operaçoes no banco de dados

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db

//utilizar o objeto de banco de dados para as operaçoes

db.serialize( () => {
    //criar tabela com comandos sql

//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //inserir dados na tabela
    
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//           ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos e Lâmpadas"
//     ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err);
//         }
//         console.log("Cadastrado com Sucesso")
//         console.log(this)
//     }

//    db.run(query, values,afterInsertData)


    //consultar dados da tabela
    
    // db.all(`SELECT name FROM places`, function(err, rows){
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log("Aqui estão seus registros:");
    //     console.log(rows);
    // })
    
    
    //deletar dados da tabela

    // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
    //     if(err){
    //         return console.log(err);
    //     }

    //     console.log("Registo deletados com sucesso");
        
    // })
})