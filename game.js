class InvestigationGame {
  constructor() {
    this.evidence = [];
    this.interrogations = [];
    this.investigatedLocations = [];
    this.culprit = "carlos"; // O culpado é Carlos

    this.locations = {
      "sala-principal": {
        name: "Sala Principal",
        clue: "🖼️ A Sala Principal ainda exala o perfume luxuoso que impregna o ambiente. No centro, onde antes estava pendurada a obra-prima 'A Dama de Azul' de 1887, há apenas uma moldura vazia. Ao examinar cuidadosamente o piso de mármore italiano, você encontra marcas de arranhões profundos levando da parede até a janela lateral. O peso da pintura e sua moldura de mogno definitivamente deixaram essas marcas. Curiosamente, a janela estava destrancada por dentro, e há fibras de um tecido grosso preso na fechadura.",
        evidence: "Marcas de arrasto até a janela destrancada",
      },
      escritorio: {
        name: "Escritório",
        clue: "🗄️ O escritório do Dr. Silva está impecavelmente organizado, com centenas de livros sobre história da arte. No computador, ainda ligado, você encontra o histórico de navegação recente: pesquisas sobre 'técnicas de envelhecimento artificial de telas', 'como replicar pinceladas do século XIX', e 'mercado negro de arte europeia'. Há também um rascunho de e-mail não enviado mencionando 'o projeto especial está quase completo'. Mais intrigante: uma gaveta trancada contém catálogos de leilões internacionais com a obra roubada circulada em vermelho e anotações de valores em euros.",
        evidence: "Pesquisas sobre falsificação e mercado negro",
      },
      entrada: {
        name: "Entrada",
        clue: "🚪 O hall de entrada é monitorado por um sistema de alarme de última geração. Os registros eletrônicos mostram que o alarme foi desativado às 23:47h usando o código mestre 'RESTAURO-2023'. O manual de segurança indica que apenas três pessoas têm esse código: o curador, o chefe de segurança, e o restaurador-chefe. O mais perturbador: o sistema foi reativado às 00:15h, sugerindo que o ladrão tinha conhecimento íntimo dos protocolos de segurança. Há também um registro de que o cartão de acesso do restaurador foi usado na porta lateral às 23:52h.",
        evidence: "Alarme desativado com código de restaurador",
      },
      deposito: {
        name: "Depósito",
        clue: "📦 O depósito nos porões do museu cheira a produtos químicos e madeira antiga. Entre as caixas de armazenamento, você descobre embalagens especiais de transporte de arte—do tipo usado para obras valiosas—com etiquetas recentes de uma empresa de courier internacional. Mais alarmante: há um frasco de solução de limpeza de tinta, pincéis finos ainda úmidos, e um cavalete com manchas de tinta azul-ultramarino idêntica à usada em 'A Dama de Azul'. No canto, parcialmente escondido, está um manual aberto na página sobre 'Como criar pátina artificial em pinturas para parecerem antigas'.",
        evidence: "Materiais de falsificação e embalagens de exportação",
      },
      cameras: {
        name: "Sala de Câmeras",
        clue: "📹 A sala de monitoramento tem 24 telas mostrando todos os ângulos do museu. Mas há um problema crítico: as gravações das câmeras entre 23:30 e 00:30 foram completamente apagadas. O log do sistema revela que o comando de exclusão foi executado às 23:35h usando as credenciais 'CARLOS.MENDEZ - Restaurador Chefe'. Mais suspeito ainda: a câmera que filmava diretamente a Sala Principal foi manualmente desligada às 23:40h e só reativada às 00:20h. Um técnico de TI deixou uma nota: 'Impossível recuperar os arquivos deletados - foram sobrescritos três vezes'.",
        evidence: "Gravações deletadas por credenciais do restaurador",
      },
    };

    this.suspects = {
      silva: {
        name: "Dr. Henrique Silva",
        dialogue:
          "💬 Dr. Silva ajusta nervosamente seus óculos: \"Detective, eu dediquei 15 anos da minha vida a este museu! 'A Dama de Azul' era minha obra favorita—eu mesmo a trouxe de um leilão em Paris há 8 anos. Na noite do roubo, eu estava em casa com minha esposa, preparando a exposição da próxima semana. Saí às 19h, como sempre faço. Pode verificar as câmeras da garagem. Eu jamais roubaria algo que considero um tesouro nacional! Meu único arrependimento é não ter investido em segurança melhor... mas quem imaginaria que alguém de dentro...\"",
        info: "Curador há 15 anos, viúvo recentemente casado novamente, conhece todos os sistemas de segurança. Tem dívidas do tratamento médico da falecida esposa.",
      },
      marina: {
        name: "Marina Costa",
        dialogue:
          '💬 Marina parece cansada mas alerta: "Olha, eu estava fazendo minhas rondas como sempre faço há 3 anos. Conheço cada canto deste lugar. Por volta das 23h15, passei pela sala de restauração e vi luz acesa—era o Carlos, ainda trabalhando. Achei estranho porque ele normalmente sai às 20h. Quando passei novamente às 23h45, a luz estava apagada e ele não estava mais lá. Fiz minha ronda na Sala Principal às 23h30 e a pintura ainda estava lá! Mas quando voltei à meia-noite para minha checagem final... a moldura estava vazia. Eu imediatamente acionei o alarme, mas ele já havia sido desligado! Como isso é possível?"',
        info: "Segurança há 3 anos, ex-militar, responsável pelo turno noturno das 22h às 6h. Conhecida por ser extremamente dedicada e observadora.",
      },
      carlos: {
        name: "Carlos Méndez",
        dialogue:
          '💬 Carlos evita contato visual: "Sim... eu estava trabalhando até tarde. Tinha uma restauração urgente de uma escultura barroca que precisava estar pronta para a exposição. É verdade que saí tarde, talvez... 22h? Não, espera, acho que foram quase 23h. Perco a noção do tempo quando estou concentrado no trabalho. Não vi nada suspeito! Quando saí, passei pela Sala Principal e a pintura estava lá. Estava tudo normal. Por que todos estão me olhando assim? Só porque sou novo aqui não significa que sou ladrão! Eu amo arte, dediquei anos estudando restauração em Florença..."',
        info: "Restaurador-chefe há 2 anos, 28 anos, formado na prestigiosa Academia de Belas Artes de Florença. Especialista em técnicas de pinturas dos séculos XVIII e XIX. Recentemente recusou uma oferta de emprego melhor em um museu privado.",
      },
    };
  }

  startGame() {
    this.showScreen("game-screen");
  }

  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");
  }

  investigateLocation(locationId) {
    if (this.investigatedLocations.includes(locationId)) {
      this.showModal("⚠️ Você já investigou este local.");
      return;
    }

    const location = this.locations[locationId];
    this.investigatedLocations.push(locationId);
    this.evidence.push(location.evidence);

    // Marca o botão como investigado
    const buttonId =
      locationId === "sala-principal" ? "loc-sala" : `loc-${locationId}`;
    document.getElementById(buttonId).classList.add("investigated");

    // Mostra a pista encontrada
    this.showModal(
      `<h3>🔍 ${location.name}</h3><p>${location.clue}</p><p><strong>✅ Pista adicionada:</strong> ${location.evidence}</p>`
    );

    this.updateUI();
  }

  interrogate(suspectId) {
    if (this.interrogations.includes(suspectId)) {
      this.showModal("⚠️ Você já interrogou esta pessoa.");
      return;
    }

    const suspect = this.suspects[suspectId];
    this.interrogations.push(suspectId);

    // Marca o botão como interrogado
    document
      .getElementById(`suspect-${suspectId}`)
      .classList.add("interrogated");

    // Mostra o diálogo
    this.showModal(
      `<h3>👤 Interrogatório: ${suspect.name}</h3><p>${suspect.dialogue}</p><p><em>${suspect.info}</em></p>`
    );

    this.updateUI();
  }

  updateUI() {
    // Atualiza contador de pistas
    document.getElementById(
      "pistas-count"
    ).textContent = `Pistas: ${this.evidence.length}/5`;

    // Atualiza contador de interrogatórios
    document.getElementById(
      "interrogatorios"
    ).textContent = `Interrogatórios: ${this.interrogations.length}/3`;

    // Atualiza lista de evidências
    const evidenceList = document.getElementById("evidence-list");
    if (this.evidence.length === 0) {
      evidenceList.innerHTML =
        '<li class="no-evidence">Nenhuma pista coletada ainda...</li>';
    } else {
      evidenceList.innerHTML = this.evidence
        .map((e) => `<li>🔎 ${e}</li>`)
        .join("");
    }

    // Habilita botão de solução se tiver pelo menos 3 pistas e 2 interrogatórios
    const solveBtn = document.getElementById("solve-btn");
    if (this.evidence.length >= 3 && this.interrogations.length >= 2) {
      solveBtn.disabled = false;
    }
  }

  showSolution() {
    this.showScreen("solution-screen");
  }

  accuseSuspect(suspectId) {
    const suspect = this.suspects[suspectId];
    let resultHTML = "";

    if (suspectId === this.culprit) {
      resultHTML = `
                <h2 style="color: #27ae60;">✅ CASO RESOLVIDO!</h2>
                <p><strong>Parabéns, Sherlock Holmes!</strong> Você desvendou o mistério e identificou o culpado!</p>
                <p>Como prêmio, você recebe um <strong>vale papo bebendo uma cervejinha do seu "inimigo"</strong></p>
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin: 20px auto; max-width: 500px; border: 3px #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                        <h4 style="color: #667eea; margin: 0 0 10px 0;">🍺 CUPOM VÁLIDO 🍺</h4>
                        <p style="font-size: 1.2em; font-weight: bold; color: #333; margin: 10px 0;">VALE PAPO + CERVEJINHA</p>
                        <div style="border-top: 2px #667eea; margin: 15px 0; padding-top: 15px;">
                            <p style="color: #888; font-size: 0.85em; margin: 5px 0;">✓ Válido para quantas cervejas quiser</p>
                            <p style="color: #888; font-size: 0.85em; margin: 5px 0;">✓ Acompanhado de boa conversa</p>
                            <p style="color: #888; font-size: 0.85em; margin: 5px 0;">✓ Sem data de validade</p>
                        </div>
                        <p style="background: #667eea; color: white; padding: 8px; border-radius: 5px; margin-top: 15px; font-size: 0.9em;">Parabéns pelo caso resolvido! 🎉</p>
                    </div>
                </div>
                <hr style="margin: 20px 0;">
                <h3>🎨 Carlos Méndez - O Restaurador Ambicioso</h3>
                
                <p><strong>📖 A Verdade Revelada:</strong></p>
                <p>Carlos Méndez, o jovem e talentoso restaurador, orquestrou meticulosamente o roubo da pintura "A Dama de Azul". Sua formação de elite em Florença lhe deu não apenas habilidades técnicas excepcionais, mas também contatos no submundo do mercado negro de arte.</p>
                
                <p><strong>💰 O Motivo:</strong></p>
                <p>Endividado após seu curso na Itália e desiludido com o salário de um restaurador de museu público, Carlos planejava vender a pintura original—avaliada em 3 milhões de euros—para um colecionador privado na Suíça. Simultaneamente, criaria uma falsificação perfeita para substituir o original, usando suas habilidades em técnicas de envelhecimento artificial. Com sorte, ninguém perceberia a troca por anos.</p>
                
                <p><strong>🕵️ O Plano:</strong></p>
                <ul style="text-align: left; margin: 15px 0;">
                    <li><strong>23:00h:</strong> Permaneceu no museu após o horário com a desculpa de uma "restauração urgente"</li>
                    <li><strong>23:35h:</strong> Usou suas credenciais de restaurador para apagar as gravações críticas do sistema de câmeras</li>
                    <li><strong>23:40h:</strong> Desligou manualmente a câmera da Sala Principal</li>
                    <li><strong>23:47h:</strong> Desativou o alarme usando o código RESTAURO-2023 que tinha acesso</li>
                    <li><strong>23:50h:</strong> Removeu cuidadosamente a pintura da parede e a arrastou até a janela lateral</li>
                    <li><strong>00:00h:</strong> Transferiu a obra para o depósito onde já havia preparado embalagem especial</li>
                    <li><strong>00:15h:</strong> Reativou o alarme para evitar suspeitas imediatas</li>
                    <li><strong>00:20h:</strong> Saiu pela porta lateral usando seu cartão de acesso</li>
                </ul>
                
                <p><strong>🔍 As Pistas Cruciais:</strong></p>
                <ul style="text-align: left; margin: 15px 0;">
                    <li>Os materiais de falsificação no depósito, incluindo tinta azul-ultramarino idêntica</li>
                    <li>As gravações deletadas especificamente com suas credenciais</li>
                    <li>Sua contradição sobre o horário de saída (22h? 23h? Meia-noite?)</li>
                    <li>Embalagens de transporte internacional prontas no depósito</li>
                    <li>Pesquisas sobre mercado negro de arte no computador do museu</li>
                </ul>
                
                <p><strong>⚖️ Desfecho:</strong></p>
                <p>Confrontado com as evidências, Carlos finalmente confessou. A pintura foi recuperada em seu apartamento, ainda intacta e embalada. Ele foi preso e aguarda julgamento por roubo de patrimônio cultural, podendo pegar até 12 anos de prisão. O Dr. Silva foi exonerado de qualquer suspeita, e Marina recebeu uma promoção por sua observação crucial.</p>
                
                <p style="margin-top: 20px;"><strong>⭐ Você coletou ${this.evidence.length} de 5 pistas e interrogou ${this.interrogations.length} de 3 suspeitos.</strong></p>
                <p><em>"Um detetive brilhante não vê apenas o que está à superfície, mas conecta os pontos invisíveis."</em></p>
            `;
      document.querySelector(".result-box").classList.add("success");
    } else {
      resultHTML = `
                <h2 style="color: #e74c3c;">❌ ACUSAÇÃO INCORRETA</h2>
                <p><strong>O tribunal rejeita suas acusações!</strong> Você acusou <strong>${suspect.name}</strong>, mas essa pessoa tinha um álibi sólido.</p>

                <p>Porém como prêmio de consolação, você recebe um <strong>vale papo bebendo uma cervejinha do seu "inimigo"</strong></p>
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin: 20px auto; max-width: 500px; border: 3px #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                        <h4 style="color: #667eea; margin: 0 0 10px 0;">🍺 CUPOM VÁLIDO 🍺</h4>
                        <p style="font-size: 1.2em; font-weight: bold; color: #333; margin: 10px 0;">VALE PAPO + CERVEJINHA</p>
                        <div style="border-top: 2px #667eea; margin: 15px 0; padding-top: 15px;">
                            <p style="color: #888; font-size: 0.85em; margin: 5px 0;">✓ Válido para quantas cervejas quiser</p>
                            <p style="color: #888; font-size: 0.85em; margin: 5px 0;">✓ Acompanhado de boa conversa</p>
                            <p style="color: #888; font-size: 0.85em; margin: 5px 0;">✓ Sem data de validade</p>
                        </div>
                        <p style="background: #667eea; color: white; padding: 8px; border-radius: 5px; margin-top: 15px; font-size: 0.9em;">Parabéns pelo caso resolvido! 🎉</p>
                    </div>
                </div>

                <hr style="margin: 20px 0;">
                <p>Enquanto você perseguia a pista errada, o verdadeiro culpado—<strong>Carlos Méndez</strong>—fugiu do país com a pintura roubada!</p>
                
                <h3>💡 O que você perdeu:</h3>
                <p><strong>Carlos Méndez</strong> era o único suspeito com todos os três elementos cruciais:</p>
                
                <p><strong>1. MOTIVO:</strong> Endividamento após estudos na Itália e ambição de lucro rápido no mercado negro de arte (3 milhões de euros).</p>
                
                <p><strong>2. OPORTUNIDADE:</strong></p>
                <ul style="text-align: left; margin: 15px 0;">
                    <li>Estava sozinho no museu durante o horário do crime</li>
                    <li>Tinha acesso ao código do alarme (RESTAURO-2023)</li>
                    <li>Marina o viu saindo tarde, contradizendo seu próprio depoimento</li>
                    <li>Seu cartão de acesso foi usado às 23:52h na porta lateral</li>
                </ul>
                
                <p><strong>3. MEIOS:</strong></p>
                <ul style="text-align: left; margin: 15px 0;">
                    <li>Credenciais de restaurador usadas para deletar gravações das câmeras</li>
                    <li>Conhecimento técnico sobre falsificação de obras antigas</li>
                    <li>Materiais de falsificação encontrados no depósito (tinta, pincéis)</li>
                    <li>Embalagens especiais para transporte internacional já preparadas</li>
                    <li>Pesquisas sobre mercado negro de arte no histórico do computador</li>
                </ul>
                
                <p><strong>🔍 Sinais que você deveria ter notado:</strong></p>
                <ul style="text-align: left; margin: 15px 0;">
                    <li>As contradições em seu depoimento sobre o horário (22h? 23h?)</li>
                    <li>Ele evitou contato visual durante todo o interrogatório</li>
                    <li>O sistema de câmeras foi sabotado com SUAS credenciais específicas</li>
                    <li>Apenas ele tinha o conhecimento técnico para criar uma falsificação convincente</li>
                </ul>
                
                <p style="margin-top: 20px;"><em>"Um detetive competente não se deixa enganar por aparências. Todas as pistas apontavam para uma única direção."</em></p>
                <p><strong>💼 Resultado:</strong> Você foi retirado do caso. Carlos fugiu para um país sem extradição. A pintura nunca foi recuperada.</p>
            `;
      document.querySelector(".result-box").classList.add("failure");
    }

    document.getElementById("result-content").innerHTML = resultHTML;
    this.showScreen("result-screen");
  }

  showModal(content) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = content;
    modal.classList.add("active");
  }

  closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("active");
  }

  restart() {
    this.evidence = [];
    this.interrogations = [];
    this.investigatedLocations = [];

    // Remove marcações visuais
    document.querySelectorAll(".investigated, .interrogated").forEach((btn) => {
      btn.classList.remove("investigated", "interrogated");
    });

    // Remove classes de resultado
    document
      .querySelector(".result-box")
      .classList.remove("success", "failure");

    this.updateUI();
    this.showScreen("intro-screen");
  }
}

// Inicializa o jogo
const game = new InvestigationGame();

// Fecha modal ao clicar fora dele
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    game.closeModal();
  }
};
