// Botão adicionar
const botao = document.getElementById("btnAdicionar");

// Evento de clique
botao.addEventListener("click", adicionarTarefa);

// Função para adicionar uma nova tarefa
function adicionarTarefa() {

    // Pegando os dados do formulário
    let tarefa = document.getElementById("tarefa").value;
    let responsavel = document.getElementById("responsavel").value;
    let descricao = document.getElementById("descricao").value;
    let prioridade = document.getElementById("prioridade").value;
    let data = document.getElementById("data").value;

    // Verificando se todos os campos foram preenchidos
    if (
        tarefa == "" ||
        responsavel == "" ||
        descricao == "" ||
        prioridade == "" ||
        data == ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    // Criando o card
    let card = document.createElement("div");
    card.classList.add("card");

    // Cor da prioridade
    if (prioridade == "baixa") {

        card.classList.add("baixa");
    
    } else if (prioridade == "media") {
    
        card.classList.add("media");
    
    } else if (prioridade == "alta") {
    
        card.classList.add("alta");
    }

    // Conteúdo do card
    card.innerHTML = `
        <h3>${tarefa}</h3>

        <h2>Responsável: ${responsavel}</h2>

        <h2>Data: ${data}</h2>

        <h2>Prioridade: ${prioridade}</h2>

        <p>${descricao}</p>

        <button class="andamento">Em andamento</button>

        <button class="finalizar">Finalizar</button>
    `;

    // Adiciona na coluna ABERTO
    document.getElementById("aberto").appendChild(card);

    // Atualiza contadores
    atualizarContadores();

    // Limpa os campos
    document.getElementById("tarefa").value = "";
    document.getElementById("responsavel").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prioridade").value = "";
    document.getElementById("data").value = "";

    // ----------------------------
    // BOTÃO EM ANDAMENTO
    // ----------------------------

    let btnAndamento = card.querySelector(".andamento");

    btnAndamento.addEventListener("click", function () {

        document.getElementById("andamento").appendChild(card);

        btnAndamento.disabled = true;

        atualizarContadores();

    });

    // ----------------------------
    // BOTÃO FINALIZAR
    // ----------------------------

    let btnFinalizar = card.querySelector(".finalizar");

    btnFinalizar.addEventListener("click", function () {

        document.getElementById("finalizada").appendChild(card);

        btnAndamento.remove();
        btnFinalizar.remove();

        // Criando botão Reabrir
        let btnReabrir = document.createElement("button");

        btnReabrir.textContent = "Reabrir";

        card.appendChild(btnReabrir);

        // Evento do botão Reabrir
        btnReabrir.addEventListener("click", function () {

            document.getElementById("aberto").appendChild(card);

            btnReabrir.remove();

            // Botão Em andamento novamente
            let novoAndamento = document.createElement("button");

            novoAndamento.textContent = "Em andamento";

            card.appendChild(novoAndamento);

            novoAndamento.addEventListener("click", function () {

                document.getElementById("andamento").appendChild(card);

                novoAndamento.disabled = true;

            });

            // Botão Finalizar novamente
            let novoFinalizar = document.createElement("button");

            novoFinalizar.textContent = "Finalizar";

            card.appendChild(novoFinalizar);

            novoFinalizar.addEventListener("click", function () {

                document.getElementById("finalizada").appendChild(card);

                novoAndamento.remove();
                novoFinalizar.remove();

                let reabrir = document.createElement("button");

                reabrir.textContent = "Reabrir";

                card.appendChild(reabrir);

                reabrir.addEventListener("click", function () {

                    document.getElementById("aberto").appendChild(card);

                    reabrir.remove();

                });

                atualizarContadores();

            });

            atualizarContadores();

        });

        atualizarContadores();

    });

}

// ----------------------------
// Atualiza os contadores
// ----------------------------

function atualizarContadores() {

    let baixa = document.querySelectorAll(".baixa").length;

    let media = document.querySelectorAll(".media").length;

    let alta = document.querySelectorAll(".alta").length;

    document.getElementById("qtdBaixa").textContent = baixa;

    document.getElementById("qtdMedia").textContent = media;

    document.getElementById("qtdAlta").textContent = alta;

}