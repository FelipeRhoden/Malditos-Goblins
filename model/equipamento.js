/**
 * @author Felipe Rhoden
 * @class
 * @name equipamento
 * @description classe para criação de equipamentos para um goblin
 * @version 2.0.0;
 */
export class equipamento{
    _nome = "Vazio";
    set nome (str){ 
        this._nome = str; 
    }
    get nome(){ 
        return this._nome;
    }

    _dano = 0;
    set dano (num){

        if (Number.isInteger(num))
            this._dano = num;
        else
            console.error('This '+ num + ' not integer valid for dano.');

    }
    get dano(){ 
        return this._dano; 
    }
    
    _protecao = 0;
    set protecao (num){

        if (Number.isInteger(num))
            this._protecao = num;
        else
            console.error('This '+ num + ' not integer valid for protecao.');

    }

    get protecao(){ 
        return this._protecao; 
    }

    addEquip(element){
        this.nome = (element) ? element.nome || this.nome : this.nome;
        this.dano = (element) ? element.dano || this.dano : this.dano;
        this.protecao = (element) ? element.protecao || this.protecao : this.protecao;
    }

}
