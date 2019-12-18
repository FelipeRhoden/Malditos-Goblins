
function random(num){
    try {
       let newNum =  Math.floor(Math.random() * num);
       return newNum;

    } catch(err){

        console.error("Erro de Random numerico");
    }
}

$.get("db.JSON",function(data,status){
    if (status == "success"){

        const ficha = JSON.stringify(data);
        const cor = ficha.Coloracao[random(6)];
        const caracteristica = ficha.Caracteristica[random(6)];
        const ocupacao = ficha.Ocupacao[random(6)];

        $("aparencia").text(cor + " e " + caracteristica);
        $("ocupacao").text(ocupacao);
    } else {
        console.error("Erro de requisição");
    }
})