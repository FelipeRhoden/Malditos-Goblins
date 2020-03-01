
$.get("JSON.txt",function(data,status){
    if (status == "success"){

        const ficha = JSON.parse(data);

        function clearListening(oldElement){
            let newElement = oldElement.cloneNode(true);
            oldElement.parentNode.replaceChild(newElement, oldElement);
        }

        function fechaToggler(){

            if ($("#navbarSupportedContent").hasClass('show'))
                $("#navtoggler").trigger('click');
        
        }

        function modalText(titulo, texto){

            $("#modalSaveBtn").hide();
            $("#modalTitle").text(titulo);
            $("#modalBody").text(texto);

        }

        function modalInput(titulo, texto){

            $("#modalSaveBtn").show();
            $("#modalTitle").text(titulo);
            $("#modalBody").html(
                '<form id="modalForm">'+
                    '<div id="fomrGroup" class="form-group">'+
                        '<label for="modalFormInput">'+texto+'</label>'+
                        '<input type="text" class="form-control" id="modalFormInput" ' +
                        'placeholder="' + texto + '">'+
                    '</div>'+
                '</form>'
                );

        }

        function addInputModal(idFomr, id, type, titulo,texto){

            $("#"+ idFomr).append(
                '<label for="'+ id +'">'+titulo+'</label>'+
                '<input type="text" class="form-control" id="'+ id +'" input type="'+ type +'"'+
                'placeholder="' + texto + '">'
            ) 

        }

        function addRolarAtributo(nome, id, personagem){
            $("#"+id).click(()=>{

                let texto = '';

                for (let i = 0; i < personagem.atributos[nome]; i++){
                    if (i != 0) {
                        texto += " | "
                    }

                    texto += "Dado" + (i + 1) + ": " + (dado(6) + 1);
                }
                
                modalText("Rolar " + nome,texto);

            })
        };

        function addAnomalia(rolagem){

            if ((rolagem - 1) <= 0) {
                return ficha.Anomalia[0];

            } else if ((rolagem - 1) >= 8 ){
                return addAnomalia(dado(6) + dado(6)) + " e " + addAnomalia(dado(6) + dado(6));

            } else if (ficha.Anomalia[rolagem - 1] == "(1 D6) Olhos"){
                return (dado(6) + 3) + " Olhos";
            } else 
                return ficha.Anomalia[rolagem - 1];
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
            $("#mana").text(personagem.mana);
            $("#dano").text(personagem.dano());
            $("#protecao").text(personagem.protecao());

            for (let i = 0; i < personagem.equipamentos.length; i++) {
                $("#item"+(i+1)).text(personagem.equipamentos[i].nome);
            }

            for (let i = 0; i < personagem.tecnica.length; i++){
                $("#tecnica" + (i + 1)).text(personagem.tecnica[i].nome + " (Nivel:" + (i + 1) + ")");
                $("#tecnica" + (i + 1)).click(() => {
                    modalText(personagem.tecnica[i].nome, personagem.tecnica[i].descricao);
                })

            }

        }

        function newGoblin(){
            const personagem = new goblin();
            personagem.nome = ficha.nome.silaba1[dado(6)] + ficha.nome.silaba2[dado(6)];
            personagem.coloracao = ficha.Coloracao[dado(6)];
            personagem.caracteristica = ficha.Caracteristica[dado(6)];
            if(personagem.caracteristica == "Anomalia") {
                personagem.caracteristica = addAnomalia(dado(6) + dado(6));
            }
            personagem.ocupacao = ficha.Ocupacao[dado(6)];
            personagem.mana = ficha[personagem.ocupacao].mana;
            personagem.upNivel();  
            personagem.atributos.addValor(ficha[personagem.coloracao]); 
            personagem.atributos.addValor(ficha[personagem.ocupacao]);
            for (let i = 0; i < personagem.tecnica.length; i++){
                personagem.tecnica[i].nome = ficha[personagem.ocupacao].tecnica[i].nome;
                personagem.tecnica[i].descricao = ficha[personagem.ocupacao].tecnica[i].descricao;
            }
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

            $("#cura").click(() => {
                personagem.ganhaVitalidade();
                atualizaDadosPersonagem(personagem);
            });

            $("#levarDano").click(() => {
                personagem.perdeVitalidade();
                atualizaDadosPersonagem(personagem);
            });

            $("#ganhaMana").click(() => {
                personagem.ganhaMana();
                atualizaDadosPersonagem(personagem);
            });

            $("#gastaMana").click(() => {
                personagem.perdeMana();
                atualizaDadosPersonagem(personagem);
            });

            $("#upar").click(() => {
                personagem.upNivel();
                fechaToggler();
                atualizaDadosPersonagem(personagem);
            });

            $("#alteraNome").click(() => {
                fechaToggler();
                modalInput("Alterar Nome do Personagem", "Novo Nome");
                clearListening(document.getElementById("modalSaveBtn"));
                $("#modalSaveBtn").click(() => {

                    if ($("#modalFormInput").val() != "")
                    personagem.nome = $("#modalFormInput").val();
                    
                    atualizaDadosPersonagem(personagem);
                });
            });

            for (let i = 0; i < 3; i++) {
                let nEquip;
                $("#equip" + (i + 1)).click(() => {
                    //controla qual equipamento vai ser alterado
                    nEquip = i;
                    fechaToggler();
                    modalInput("Alterar Equipamento "+ (i + 1), "Nome");
                    addInputModal("fomrGroup",'danoEquip','number', 'Dano', 'Dano');
                    addInputModal("fomrGroup",'protecaoEquip','number', 'Proteção', 'Proteção');

                    $("#modalFormInput").val(personagem.equipamentos[i].nome);
                    $("#danoEquip").val(personagem.equipamentos[i].dano);
                    $("#protecaoEquip").val(personagem.equipamentos[i].protecao);

                    clearListening(document.getElementById("modalSaveBtn"));

                    $("#modalSaveBtn").click(() => {

                        if ((/[a-z]/i).test($("#modalFormInput").val())){
                            personagem.equipamentos[nEquip].nome = $("#modalFormInput").val();
                            personagem.equipamentos[nEquip].dano = parseInt($("#danoEquip").val(),10);
                            personagem.equipamentos[nEquip].protecao = parseInt($("#protecaoEquip").val(),10);
                        }
                        
                        
                        atualizaDadosPersonagem(personagem);
                    });

                });
            
            }

            addRolarAtributo("combate","rolarCombate",personagem);
            addRolarAtributo("conhecimento","rolarConhecimento",personagem);
            addRolarAtributo("habilidade","rolarHabilidade",personagem);
            addRolarAtributo("sorte","rolarSorte",personagem);

            fechaToggler();
            atualizaDadosPersonagem(personagem);

            $("#tituloToast").text(personagem.nome);
            $("#textoToast").text(ficha.falas[dado(6)]);
            $("#toast").toast('show');

        }

        for (let i = 0; i < ficha.acoesDeCombate.length; i++){
            $("#acoesCombate" + (i + 1)).click(() => {
                modalText(ficha.acoesDeCombate[i].nome, ficha.acoesDeCombate[i].descricao);
            })

        }

        $("#rolarD6").click(()=>{
            modalText("Rolar D6",dado(6) + 1);
        });

        $("#newGoblin").click(newGoblin);

        newGoblin();

    } else {
        console.error("Erro de requisição");
    }
});