import {atributos} from "./atributos.js";
import {tecnica} from "./tecnica.js";
import {equipamento} from "./equipamento.js";

/**
 * @author Felipe Rhoden
 * @class
 * @name ficha
 * @description classe para criação da ficha de um goblin
 * @version 2.0.0;
 */
export class ficha{
    _nome = "";
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }
    
    _coloracao = "";
    get coloracao() {
        return this._coloracao;
    }
    set coloracao(value) {
        this._coloracao = value;
    }
    
    _caracteristica = "";
    get caracteristica() {
        return this._caracteristica;
    }
    set caracteristica(value) {
        this._caracteristica = value;
    }
    
    _ocupacao = "";
    get ocupacao() {
        return this._ocupacao;
    }
    set ocupacao(value) {
        this._ocupacao = value;
    }
    
    _nivel = 0;
    get nivel() {
        return this._nivel;
    }
    set nivel(num) {
        if (Number.isInteger(num))
            this._nivel = num;
        else
            console.error('This '+ num + 'not integer valid for nivel.');
    }

    _vitalidade = 4;
    get vitalidade() {
        return this._vitalidade;
    }
    set vitalidade(num) {
        if (Number.isInteger(num))
            this._vitalidade = num;
        else
            console.error('This '+ num + 'not integer valid for vitalidade.');
    }

    _mana = 0;
    get mana() {
        return this._mana;
    }
    set mana(num) {
        if (Number.isInteger(num))
            this._mana = num;
        else
            console.error('This '+ num + 'not integer valid for mana.');
    }

    _atributos = new atributos();
    get atributos() {
        return this._atributos;
    }
    set atributos(value) {
        this._atributos = value;
    }
    
    _equipamentos = [];
    get equipamentos() {
        return this._equipamentos;
    }
    set equipamentos(value) {
        this._equipamentos = value;
    }
    
    _tecnicas = [];
    get tecnicas() {
        return this._tecnicas;
    }
    set tecnicas(value) {
        this._tecnicas = value;
    }

    /**
     * @author Felipe Rhoden
     * @method
     * @name addEquip
     * @description metodo para adicionar um equipamento
     */
    addEquip(equip){

        let numEquips = this.equipamentos.length;
        this.equipamentos.push(new equipamento);

        this.equipamentos[numEquips].addEquip(equip);
    }

    addTecnica(tec){
        
        let numTecnicas = this.tecnicas.length;
        this.tecnicas.push(new tecnica);

        this.tecnicas[numTecnicas].addTecnica(tec);
    }

    /**
     * @author Felipe Rhoden
     * @method
     * @name upNivel
     * @description metodo para subir um goblin de nivel
     */
    upNivel() {
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
    aparencia() {
        return this.coloracao + ' e ' + this.caracteristica;
    };

    /**
     * @author Felipe Rhoden
     * @method
     * @name dano
     * @description metodo para retornar o dano de um goblin por arma
     * @returns array
     */
     get dano() {
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
    get protecao() {
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
    perdeVitalidade(num){
        num = num || 1        
        
        if (Number.isInteger(num))
            this.vitalidade -= num;
        else
            console.error('This '+ num +' not valid for perdeVitalidae' );

    }

    /**
     * @author Felipe Rhoden
     * @method
     * @name ganhaVitalidade
     * @description metodo para aumentar um ponto de vitalidade
     */
    ganhaVitalidade(num){
        num = num || 1;

        if (Number.isInteger(num)){
            let newVit = this.vitalidade + num;

            if (
                (newVit <= 4 && this.nivel <= 3) ||
                newVit <= (this.nivel + 1))
                this.vitalidade = newVit;

        } else
            console.error('This '+ num +' not valid for ganhaVitalidade');

    }

    /**
     * @author Felipe Rhoden
     * @method
     * @name perdeMana
     * @description metodo para diminuir um ponto de mana
     */
    perdeMana(num){
        num = num || 1        
        
        if (Number.isInteger(num))
            this.mana -= num;
        else
            console.error('This '+ num +' not valid for perdeMana' );
    }


    /**
     * @author Felipe Rhoden
     * @method
     * @name ganhaMana
     * @description metodo para aumentar um ponto de mana
     */
    ganhaMana(){
        num = num || 1        
        
        if (Number.isInteger(num))
            this.mana += num;
        else
            console.error('This '+ num +' not valid for ganhaMana' );
    }

}