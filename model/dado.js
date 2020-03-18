/**
 * @author Felipe Rhoden
 * @function [integer] - recebe o numero de lados de um dado
 * @name dado
 * @description função para simular a rolagem de um dado
 * @version 0.1.0;
 * @returns integer;
 */

export function dado(lados){
    try {
       const resultado =  Math.floor(Math.random() * lados);
       return resultado;

    } catch(err){

        console.error("Erro de Random numerico");
    }
}