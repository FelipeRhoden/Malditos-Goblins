/**
 * @author Felipe Rhoden
 * @class
 * @name tecnica
 * @description classe para criação da técnica de um goblin
 * @version 2.0.0;
 */
export class tecnica{
    _nome = '';
    set nome (str){ this._nome = str; }
    get nome (){ return this._nome; }

    _descricao = '';
    set descricao (str){ this._descricao = str; }
    get descricao (){ return this._descricao; }

    addTecnica(element){
        this.nome = (element) ? element.nome || this.nome : this.nome;
        this.descricao = (element) ? element.descricao || this.descricao : this.descricao;
    }

}