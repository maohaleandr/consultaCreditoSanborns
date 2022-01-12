import newman from "newman";
import DOMParser from "xmldom";
import { parse } from 'node-html-parser';

var code = "";
var results = [];
var code1 = "";
var results1 = ""
var code2 = "";
var results2 = "";

newman.run({
    collection: './ConsultaCreditoSanbornsLogin.postman_collection.json',
    reporters: 'html',
    reporter: {
        html: {
            export: './newmanResults/resultsSanbornsLogin.html',
        }
    }
},function(err, res){
    if (err) { throw err;}
    console.log('Api Login Credito Sanborns run complete!');
})
.on('request', function (err, args) {
    code = args.response.code;
    results = JSON.parse(args.response.stream.toString());
})
.on('done', function (err, args) {
    if(code == '200'){
        if (results.ExistsError == false){
            console.log("logeado correctamente");
        } else {
            console.log('No logeado');
            process.abort();
        }
    }else {
        console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; CODIGO: " + code);
        process.abort();
    }
});

newman.run({
    collection: './ConsultaCredito.postman_collection.json',
    reporters: 'html',
    reporter: {
        html: {
            export: './newmanResults/resultsCredito.html',
        }
    }
},function(err, res){
    if (err) { throw err;}
    console.log('Api Credito Sanborns run complete!');
})
.on('request', function (err, args) {
    code1 = args.response.code;
    results1 = parse(args.response.stream.toString());
})
.on('done', function (err, args) {
    if(code1 == '200'){
        if (results1.getElementsByTagName("h4")[0].childNodes[0]._rawText == "LUIS DIEZ "){
            console.log("Datos corrextos");
        } else {
            console.log('Datos incorrectos');
            process.abort();
        }
    } else {
        console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; CODIGO: " + code1);
        process.abort();
    }
});

newman.run({
    collection: './ConsultaCreditoSanborns.postman_collection.json',
    reporters: 'html',
    reporter: {
        html: {
            export: './newmanResults/resultsCredito.html',
        }
    }
},function(err, res){
    if (err) { throw err;}
    console.log('Api Credito Sanborns Consulta run complete!');
})
.on('request', function (err, args) {
    code2 = args.response.code;
    results2 = parse(args.response.stream.toString());
})
.on('done', function (err, args) {
    if(code2 == '200'){
        if (results2.getElementsByTagName("h4")[0].childNodes[0]._rawText == "LUIS DIEZ "){
            console.log("Datos corrextos");
        } else {
            console.log('Datos incorrectos');
            process.abort();
        }
    } else {
        console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; CODIGO: " + code2);
        process.abort();
    }
});