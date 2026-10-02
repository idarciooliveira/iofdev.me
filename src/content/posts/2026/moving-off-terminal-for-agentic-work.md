---
title: "A sair do terminal para trabalhar com coding agents"
description: "Como passei das conversas no navegador e da sidebar do VS Code para coding agents no terminal, aplicações desktop e o T3 Code."
pubDate: 2026-10-02
tags: ["ia", "produtividade", "coding-agents"]
heroImage: "/posts/2026/moving-off-terminal-for-agentic-work/cover.png"
---

Há cerca de um ano que trabalho quase todos os dias com IA em tarefas de programação. O meu fluxo de trabalho mudou bastante nesse tempo. Comecei com conversas no navegador, passei para a sidebar do VS Code, fiquei muito tempo no terminal e, por fim, comecei a procurar uma forma melhor de gerir vários coding agents e projetos ao mesmo tempo.

Penso que muita gente fez um percurso parecido. Os modelos melhoraram, mas a forma de trabalhar com eles também teve de mudar.

## Do navegador ao coding agents

No início, usava as versões web do ChatGPT e do Claude. Explicava uma ideia, copiava algum código para a conversa, copiava a resposta de volta para o projeto e repetia o processo. Funcionava, mas era lento e não estava ligado ao código do projeto.

Comecei assim porque era quase grátis. Bastava abrir um separador no navegador e pedir ajuda, sem mudar nada no meu ambiente de trabalho. Era útil para pequenos trechos de código, mas tornava-se cansativo à medida que as tarefas cresciam.

Depois, o Copilot trouxe o preenchimento automático para dentro do VS Code. Foi a primeira vez que tive a IA mesmo ao lado do código. A seguir, as ferramentas começaram a fazer mais. Já conseguiam analisar o projeto, editar ficheiros, executar comandos e implementar uma funcionalidade completa.

Durante alguns meses, usei uma sidebar de IA no VS Code. Na altura, pareceu-me uma grande melhoria. Já não precisava de andar a passar perguntas e trechos de código entre o navegador e o VS Code. O coding agent estava dentro do projeto e tinha acesso aos ficheiros em que eu trabalhava.

Foi o suficiente para deixar completamente o fluxo de trabalho com o navegador.

## O terminal mudou o ritmo

Quando começaram a surgir coding agents no terminal, a mudança foi maior. Experimentei o GitHub Copilot CLI, o Gemini CLI e o Claude Code. Já eram suficientemente bons para fazer a maior parte do trabalho que antes fazia na sidebar do VS Code.

Gostei especialmente de trabalhar com o Codex e o Claude Opus 4.5. Os modelos conseguiam lidar com tarefas maiores, e o terminal dava-lhes acesso direto para analisar e alterar o projeto. Podia pedir uma implementação, rever as diferenças no código, executar os testes e continuar a partir daí.

O terminal também me parecia mais rápido. Havia menos interface à volta do trabalho e os coding agents respondiam melhor. Comecei a fazer cada vez mais tarefas de programação por ali.

Durante algum tempo, o meu ambiente parecia saído dos memes do "programador 100x". Tinha vários terminais abertos, vários projetos em andamento e diversos coding agents a trabalhar ao mesmo tempo. Era divertido, mas trouxe um problema novo.

A mudança de contexto passou a ser um problema.

Tinha de me lembrar de que projeto era cada terminal, ler conversas compridas e acompanhar as alterações feitas por cada coding agent. Acabava por gastar mais tempo a recuperar o fio do trabalho do que as ferramentas me poupavam.

Copiar imagens para as conversas no terminal era outro incómodo pequeno, mas constante. Uma ou duas vezes por dia esquecia-me do atalho e perdia tempo a tentar anexar uma captura de ecrã. Nenhum destes problemas era grave por si só. Juntos, tornavam o fluxo cansativo.

![Várias janelas de terminal abertas ao mesmo tempo, com coding agents a trabalhar em projetos diferentes.](</posts/2026/moving-off-terminal-for-agentic-work/terminal-overload.png>)

## A ideia de workspace por projeto

Por essa altura, a Google lançou o Antigravity IDE com uma vista pensada para trabalhar com coding agents. A ideia era simples e útil. Em vez de pensar nos coding agents como sidebars ou sessões de terminal, podia pensar em cada projeto como o seu próprio workspace.

Podia abrir um projeto, iniciar uma conversa e voltar a ela mais tarde. Assim era mais fácil gerir vários projetos. Para mim, o modelo Gemini era especialmente bom a trabalhar em interfaces, embora eu preferisse dar-lhe uma imagem de referência. Quando tinha de criar uma interface do zero, sem uma referência visual, o resultado costumava ser fraco.

![O workspace de coding agents do Cursor, com conversas do projeto, um plano e código lado a lado.](</posts/2026/moving-off-terminal-for-agentic-work/cursor-agent-view.png>)

Mesmo assim, a forma de interagir fazia sentido. Já não precisava de guardar na cabeça todas as tarefas em andamento. A aplicação dava um lugar próprio a cada tarefa.

Depois de algumas semanas, comecei a experimentar outras ferramentas com esta abordagem.

## As aplicações desktop mudaram o meu dia a dia

Experimentei o Cursor com a primeira versão da vista Glass. Era lenta e ainda pouco polida, mas foi melhorando com o tempo. O Codex Desktop também mudou a forma como trabalho. Gostei de ter um sítio onde podia gerir tarefas de vários projetos sem abrir o VS Code para cada uma.

Comecei a passar mais tempo no Codex Desktop do que no VS Code. Quando o abria, muitas vezes era só para rever o código ou confirmar algum detalhe. A aplicação de coding agents tinha-se tornado o sítio onde começava e geria o meu trabalho.

Fiquei com uma divisão curiosa. Precisava do VS Code para editar e rever código, mas também do Codex Desktop para gerir os coding agents. Conseguia trabalhar assim, mas queria experimentar outros modelos e comparar diferentes fluxos de trabalho.

O Cursor deu-me um bom meio-termo. Juntava o próprio ambiente de edição a ferramentas para gerir o trabalho dos coding agents. Ter as duas coisas na mesma aplicação parecia natural, e o produto já tinha melhorado bastante.

O problema era o plano. Apesar de gostar do Cursor, não conseguia ter o mesmo volume de utilização que tinha com as subscrições da OpenAI e da Anthropic. Depois de usar o Composer e o Grok durante algum tempo, continuava a querer mais capacidade e mais opções.

## Porque passei para o T3 Code

Até agora, o T3 Code tem sido a melhor solução para a forma como trabalho.

Vejo-o como uma interface para organizar o meu trabalho com coding agents. Posso ligar subscrições e ferramentas da Anthropic, do OpenCode, do Codex e do Cursor num só lugar. Consigo mudar de modelo, trabalhar em vários projetos e manter cada conversa ligada ao projeto a que pertence.

Essa organização é mais importante para mim do que ter o VS Code aberto. Quero um lugar onde consiga ver os projetos e as conversas com os coding agents, escolher o modelo e voltar a uma tarefa sem ter de reconstruir o contexto de memória.

Para mim, a experiência é melhor do que trabalhar só no terminal. Ainda o uso em situações específicas, sobretudo quando quero uma interacção directa e focada. Mas já não quero gerir todo o meu trabalho por ali.

![O T3 Code com uma conversa de projeto aberta e o seletor de modelos visível.](</posts/2026/moving-off-terminal-for-agentic-work/t3code-workspace.png>)

## O que ainda me faz falta

O que mais me faz falta é a continuidade na cloud.

Alguns dos outros produtos deixam-me trabalhar localmente, iniciar um coding agent na cloud e continuar a tarefa mais tarde. Assim, posso deixar o trabalho a decorrer e retomá-lo noutro sítio. O T3 Code ainda não me oferece a mesma experiência.

Tenho visto avanços em soluções remotas e na possibilidade de alojar a ferramenta por conta própria, por isso espero que esta parte melhore. No futuro, ter o meu próprio ambiente alojado talvez me dê a organização de que gosto e mais controlo sobre onde o trabalho é executado.

Para já, estou satisfeito com a troca. O T3 Code deixa-me usar as subscrições e os modelos pelos quais já pago, numa interface que combina com a forma como trabalho. Posso passar de um projeto para outro sem abrir uma floresta de terminais e voltar a uma conversa antiga sem tentar lembrar-me de onde tinha ficado.

O terminal foi um grande avanço para os coding agents. Deu-lhes acesso direto à máquina e tornou o fluxo de trabalho muito mais rápido. Quando comecei a trabalhar em vários projetos ao mesmo tempo, passei a precisar de uma forma de organizar o trabalho e acompanhar os coding agents.

Foi por isso que deixei de usar o terminal como centro do meu trabalho.

Se ainda tens um terminal aberto para cada projeto, experimenta o T3 Code. Pode encaixar melhor na tua forma de trabalhar do que mais uma sidebar no VS Code.

Se procuras uma opção mais barata que continue no terminal, também escrevi sobre [usar o OpenCode como coding agent](/posts/opencode-alternativa-agentes-codigo/).
