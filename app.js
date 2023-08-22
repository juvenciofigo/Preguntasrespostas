const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

// view engine setup
app.set("view engine", "ejs");

// set use static files
app.use(express.static("public"));

// set use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//connection with database
const connection = require("./database/database");

connection
    .authenticate()
    .then(() => {
        console.log("Contention authenticated");
    })
    .catch((err) => {
        console.error(err);
    });

//routes
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
        res.render("index", {
            perguntas: perguntas,
        });
    });
});

app.get("/404", (req, res) => {
    res.render("404");
});

// queries database connection
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/responder/:id", (req, res) => {
    var id = req.params.id;

    Pergunta.findOne({ where: { id: id } }).then((pergunta) => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { perguntaId: pergunta.id},
                order:[["id", "DESC"]]
            }).then((respostas) => {
                res.render("responder", {
                    pergunta: pergunta,
                    respostas: respostas,
                });
            });
        } else {
            res.redirect("/404");
        }
    });
});
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var id = req.body.idPergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: id,
    })
        .then(() => {
            res.redirect("/responder/" + id);
        })
});

//
//
// server side
app.listen(8000, () => console.log("Rodando..."));
