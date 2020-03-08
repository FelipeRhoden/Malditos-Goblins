//Versão 1.0.0

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
    this.mana = 0;
    this.atributos = new atributos();
    this.equipamentos = [
        new equipamentos(),
        new equipamentos(),
        new equipamentos()
    ];

    this.tecnica = [
        {nome : "", descricao : ""},
        {nome : "", descricao : ""},
        {nome : "", descricao : ""}
    ]

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

    /**
     * @author Felipe Rhoden
     * @method
     * @name perdeVitalidade
     * @description metodo para diminuir um ponto de vitalidade
     */
    this.perdeVitalidade = () => {
        this.vitalidade--;
    }

    /**
     * @author Felipe Rhoden
     * @method
     * @name ganhaVitalidade
     * @description metodo para aumentar um ponto de vitalidade
     */
    this.ganhaVitalidade = () => {
        if ((this.vitalidade < 4 && this.nivel <= 3) || this.vitalidade < (this.nivel + 1))
            this.vitalidade++;
    }

    /**
     * @author Felipe Rhoden
     * @method
     * @name perdeMana
     * @description metodo para diminuir um ponto de mana
     */
    this.perdeMana = () => {
        this.mana--;
    }


    /**
     * @author Felipe Rhoden
     * @method
     * @name ganhaMana
     * @description metodo para aumentar um ponto de mana
     */
    this.ganhaMana = () => {
        this.mana++;
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
