module.exports = (app)=>{
    //importar a configuração do database
    var conexao = require('../config/database')

    //executar a conexao
    conexao()

    //importar modelo mygrid
    var mygrid = require('../models/mygrid')

    //abrir formulário
    app.get('/mygrid',async(req,res)=>{
        var resultado = await mygrid.find()
        res.render('mygrid.ejs',{dados:resultado})
        //console.log(resultado)
    })

    //gravar as informações do formulário no banco de dados
    app.post('/mygrid',(req,res)=>{
        var documento = new mygrid({
            titulo:req.body.titulo,
            texto:req.body.texto
        }).save()
        .then(()=>{res.redirect('/mygrid')})
        .catch(()=>{res.send('Não foi possível gravar')})   
    })

    //abrir o formulário de exibição do documento selecionado
    app.get('/visualizar_mygrid', async (req,res)=>{
        var id = req.query.id
        var ver = await mygrid.findOne({_id:id})
        res.render('mygrid_excluir.ejs',{dados:ver})
    })

    //excluir documento clicado
    app.get("/excluir_mygrid", async(req,res)=>{
        //recuperar o id na barra de endereço
        var id = req.query.id
        //Localizar e excluir o documento _id:campo da coleção d:nome da variavél
        var excluir = await mygrid.findOneAndRemove({_id:id})
        //voltar para a página mygrid
        res.redirect('/mygrid')
    })
}