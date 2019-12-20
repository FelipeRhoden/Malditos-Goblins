/**
 * @author Felipe Rhoden
 * @class
 * @name atributos
 * @description classe para criação de atributos para um goblin,
 * @version 0.1.0;
 */
function atributos(){
    this.combate = 0;
    this.conhecimento = 0;
    this.habilidade = 0;
    this.sorte = 0

    this.addValor = (element) => {
        this.combate += element.combate;
        this.conhecimento += element.conhecimento;
        this.habilidade += element.habilidade;
        this.sorte += element.sorte;
    }
}

/**
 * @author Felipe Rhoden
 * @class
 * @name equipamentos
 * @description classe para criação de equipamentos para um goblin
 * @version 0.1.0;
 */
function equipamentos(){
    this.nome = "Vazio";
    this.dano = 0;
    this.protecao = 0;

    this.addEquip = (element) => {
        this.nome = element.nome;
        this.dano = element.dano;
        this.protecao = element.protecao;
    }
}

/**
 * @author Felipe Rhoden
 * @class
 * @name goblin
 * @description classe para criação de um goblin
 * @version 0.1.0;
 */
function goblin(){
    this.nome = "";
    this.coloracao = "";
    this.caracteristica = "";
    this.ocupacao = "";
    this.nivel = 0;
    this.vitalidade = 4;
    this.atributos = new atributos();
    this.equipamentos = [
        new equipamentos(),
        new equipamentos(),
        new equipamentos()
    ];

    /**
     * @author Felipe Rhoden
     * @method
     * @name upNivel
     * @description metodo para subir um goblin de nivel
     */
    this.upNivel = () => {
        this.nivel++;
        this.vitalidade = 4;
        if (this.nivel > 3) {
           this.vitalidade += this.nivel - 3; 
        }
    }

    /**
     * @author Felipe Rhoden
     * @method
     * @name aparencia
     * @description metodo para retornar a aprencia de um goblin
     * @returns string
     */
    this.aparencia = () => {
        return this.coloracao + ' e ' + this.caracteristica;
    };

    /**
     * @author Felipe Rhoden
     * @method
     * @name dano
     * @description metodo para retornar o dano de um goblin por arma
     * @returns array
     */
    this.dano = () => {
        let danoFinal = [];

        this.equipamentos.forEach(element => {
            if (element.dano != 0){
                danoFinal.push(element.dano);
            }
        });

        if (danoFinal.length == 0){
            return [1];
        } else {
            return danoFinal;
        }
    }

    /**
     * @author Felipe Rhoden
     * @method
     * @name protecao
     * @description metodo para retornar a proteção de um goblin
     * @returns integer
     */
    this.protecao = () => {
        let protecaoFinal = 0;
        this.equipamentos.forEach(element => {
            protecaoFinal += element.protecao;
        });

        return protecaoFinal;
    }

    this.perdeVitalidade = () => {
        this.vitalidade--;
    }

    this.ganhaVitalidade = () => {
        if ((this.vitalidade < 4 && this.nivel <= 3) || this.vitalidade < (4 + nivel - 3))
            this.vitalidade++;
    }


}

/**
 * @author Felipe Rhoden
 * @function [integer] - recebe o numero de lados de um dado
 * @name dado
 * @description função para simular a rolagem de um dado
 * @version 0.1.0;
 * @returns integer;
 */
function dado(lados){
    try {
       const resultado =  Math.floor(Math.random() * lados);
       return resultado;

    } catch(err){

        console.error("Erro de Random numerico");
    }
}

function fechaToggler(){

    if ($("#navbarSupportedContent").hasClass('show'))
        $("#navtoggler").trigger('click');

}

function atualizaDadosPersonagem(personagem){

    $("#nome").text(personagem.nome);   
    $("#aparencia").text(personagem.aparencia());
    $("#ocupacao").text(personagem.ocupacao);
    $("#nivel").text(personagem.nivel);
    $("#combate").text(personagem.atributos.combate);
    $("#conhecimento").text(personagem.atributos.conhecimento);
    $("#habilidade").text(personagem.atributos.habilidade);
    $("#sorte").text(personagem.atributos.sorte);
    $("#vitalidade").text(personagem.vitalidade);
    $("#dano").text(personagem.dano());
    $("#protecao").text(personagem.protecao());

    for (let i = 0; i < personagem.equipamentos.length; i++) {
        $("#item"+(i+1)).text(personagem.equipamentos[i].nome);
    }
}

let ficha = {};

function newGoblin(){
    const personagem = new goblin();
    personagem.nome = ficha.nome.silaba1[dado(6)] + ficha.nome.silaba2[dado(6)];
    personagem.coloracao = ficha.Coloracao[dado(6)];
    personagem.caracteristica = ficha.Caracteristica[dado(6)];
    personagem.ocupacao = ficha.Ocupacao[dado(6)];
    personagem.upNivel();  
    personagem.atributos.addValor(ficha[personagem.coloracao]); 
    personagem.atributos.addValor(ficha[personagem.ocupacao]);
    if (personagem.ocupacao != "Xamã"){ 
        let i = 0;
        ficha[ficha[personagem.ocupacao].equip][dado(6)].forEach(element =>{
            personagem.equipamentos[i].addEquip(element);
            i++;
        })
    } else {
        let i = 0;
        ficha[personagem.ocupacao].equip.forEach(element => {
            personagem.equipamentos[i].addEquip(element);
            i++;
        })
    }

    $("#upar").click(() => {
        personagem.upNivel();
        fechaToggler();
        atualizaDadosPersonagem(personagem);
    });

    $("#levaDano").click(() => {
        personagem.perdeVitalidade();
        atualizaDadosPersonagem(personagem);
    });

    fechaToggler();
    atualizaDadosPersonagem(personagem);
}

$("#newGoblin").click(newGoblin);
$("#rolarDado").click(()=>{
    alert(dado(6)+1);
})

$.get("JSON.txt",function(data,status){
    if (status == "success"){
        ficha = JSON.parse(data);
        newGoblin();
    } else {
        console.error("Erro de requisição");
    }
});