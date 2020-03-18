/**
 * @author Felipe Rhoden
 * @class
 * @name atributos
 * @description classe para criação de atributos para um goblin,
 * @version 2.0.0;
 */
export class atributos {
    _combate = 0;
    set combate (num){

        if (Number.isInteger(num))
            this._combate = num;
        else
            console.error('This '+ num + 'not integer valid for combate.');

    }
    get combate() { return this._combate; }

    _conhecimento = 0;
    set conhecimento (num){

        if (Number.isInteger(num))
            this._conhecimento = num;
        else
            console.error('This '+ num + 'not integer valid for conhecimento.');

    }
    get conhecimento() { return this._conhecimento; }

    _habilidade = 0;
    set habilidade (num){

        if (Number.isInteger(num))
            this._habilidade = num;
        else
            console.error('This '+ num + 'not integer valid for habilidade.');

    }
    get habilidade() { return this._habilidade; }

    _sorte = 0;
    set sorte (num){

        if (Number.isInteger(num))
            this._sorte = num;
        else
            console.error('This '+ num + 'not integer valid for sorte.');

    }
    get sorte() { return this._sorte; }

    addValor(element){
        this.combate += (element) ? element.combate || 0 : 0;
        this.conhecimento += (element) ? element.conhecimento || 0 : 0;
        this.habilidade += (element) ? element.habilidade || 0 : 0;
        this.sorte += (element) ? element.sorte || 0 : 0;
    }
    
}