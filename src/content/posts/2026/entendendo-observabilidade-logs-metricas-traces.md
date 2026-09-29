---
title: "Entendendo observabilidade: logs, métricas e traces"
description: "O que é observabilidade em sistemas distribuídos e como logs, métricas e traces se combinam para explicar o que o sistema está a fazer."
pubDate: 2026-09-29
tags: ["observabilidade", "opentelemetry"]
draft: true
---

Passei os primeiros anos a trabalhar quase sempre na minha própria máquina. Eu planeava, construía, corria localmente e testava. Nos primeiros empregos o ritmo era parecido. Eu recebia uma especificação, construía a funcionalidade, testava sozinho e mostrava ao product owner.

Em adolescente eu já tinha visto ficheiros chamados logs.txt ao instalar jogos no PC. Eu abria, encontrava centenas de linhas que não faziam sentido e fechava. Nunca associei aquilo ao meu trabalho.

A ligação apareceu no primeiro deploy em produção. A aplicação funcionava na minha máquina e falhava na máquina de outra pessoa. Deixo a história completa desse deploy para outro post. O que me ficou foi uma pergunta simples. Se o código já não corre aqui, como é que eu percebo porque falhou ali.

## Índice

## A minha primeira resposta não funcionava

A minha primeira resposta foi tentar reproduzir o erro em local. Correr os mesmos passos, forçar a mesma entrada e esperar ver a mesma falha.

Em produção isso raramente chega. Os utilizadores usam a aplicação de outra forma. A base de dados local não é a base de dados de produção. A máquina tem outros limites de CPU e memória. Há outros serviços no meio. Eu não consigo pôr um console.log num ambiente que não controlo.

O que me ajudou foi mudar a pergunta. Em vez de como reproduzo isto aqui, passei a perguntar que informação o sistema devia emitir para eu perceber o que se passou lá. Isso, para mim, é observabilidade. A capacidade de perceber o que se passa dentro de um sistema a partir da informação que ele produz.

## Um sistema distribuído tem três sítios onde olhar

Gosto de descrever um sistema distribuído de forma simples. São vários computadores independentes a trabalhar em conjunto como se fossem um só. Dividimos a aplicação por servidores diferentes para partilhar recursos e equilibrar a carga.

Quando comecei a pensar assim, passei a olhar para três camadas.

Primeiro, a carga de trabalho. São as operações que o sistema faz. Um utilizador manda um pedido e esse pedido é partido em tarefas mais pequenas por serviços diferentes. Costumamos chamar a isto transação.

Depois, as abstrações de software. Contentores, pods, load balancers. A estrutura onde o trabalho corre.

Por fim, as máquinas físicas. CPU, RAM, disco. O hardware que executa tudo.

Em local eu só prestava atenção à primeira camada. Em produção o problema podia estar em qualquer uma. Aprendi que nenhuma camada explica tudo sozinha. Preciso de sinais de ângulos diferentes e de perceber como se ligam. Antes de analisar, preciso de capturar. É aqui que uso logs, métricas e traces.

## Logs dizem o que aconteceu e quando

Um log é uma lista só de escrita. Cada entrada regista um evento com a hora e uma mensagem.

Aqueles logs.txt da adolescência eram isto. Alguém registou eventos para outra pessoa ler depois. O problema é que cada sistema registava à sua maneira. Campos diferentes, formatos diferentes, opiniões diferentes sobre o que era um bom log. Com o volume a crescer, ler aquilo à mão deixou de funcionar.

O que eu vejo resultar hoje são logs estruturados. Em vez de uma frase solta, cada evento sai como pares chave e valor que uma máquina consegue filtrar. Continuam a responder à minha pergunta original. O que aconteceu, e quando.

## Métricas mostram a tendência

Uma métrica é um número que resume muitos eventos. Uma média, uma contagem, uma taxa, recolhida ao longo do tempo.

Se um log conta uma história, uma métrica mostra a direção. Quantos pedidos por minuto. Quantos falharam. Quanto tempo demoraram.

Eu uso métricas para saúde e desempenho. Quando algo parte em produção, raramente começo por um evento isolado. Começo pela curva que mudou.

## Tracing segue um pedido entre serviços

Tracing acompanha um pedido específico do início ao fim. Regista por onde passou, quanto tempo demorou em cada passo e qual foi o resultado.

Chamo trace à viagem completa. Chamo span a cada operação dentro dessa viagem. Para ligar tudo, passo um identificador único, o trace ID, de uma operação para a seguinte. A isto chamamos propagação de contexto.

Isto resolveu a parte que mais me custou no início. Em local, um pedido passa por um processo. Em produção, passa por vários serviços. Sem tracing, cada serviço conta a sua versão isolada e eu tenho de adivinhar como se juntam.

## Porque falo em três pilares

Chamo telemetria à recolha e envio automático destes dados a partir de sistemas remotos. Instrumento a aplicação para emitir, defino um formato e tenho um caminho para recolher e encaminhar.

Falo em logs, métricas e traces como três pilares porque cada um responde a uma pergunta diferente. O log mostra o evento. A métrica mostra a tendência. O trace mostra o percurso. Consigo usar cada um sozinho, mas juntos dão-me uma base mais estável para responder porque falhou fora da minha máquina.

Também aprendi onde a metáfora falha. Ter os três pilares não significa ver tudo. Significa ter pontos de partida suficientes para investigar sem adivinhar.

## Onde entra o OpenTelemetry

Uso OpenTelemetry, ou OTel, como forma padrão de gerar, recolher e exportar estes três sinais. É um projeto open source, não uma ferramenta fechada de um fornecedor.

O que me atrai aqui são três pontos.

Consigo tratar tracing, logs e métricas no mesmo modelo, o que facilita correlacionar os dados. Consigo enviar para backends diferentes, por isso não fico preso à análise de um só fornecedor. E encontro suporte para Java, Python, Go e outras plataformas que uso.

Na prática, instrumento uma vez e uso em vários sítios. Separo como gero os dados de como os analiso. Evito espalhar código específico de fornecedor pela aplicação.

No próximo post entro na parte prática. Falo da especificação de sinais, de instrumentação, do Collector, das formas de deployment e de sampling.
