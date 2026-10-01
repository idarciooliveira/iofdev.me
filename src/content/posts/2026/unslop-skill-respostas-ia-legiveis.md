---
title: "A IA não é burra. Só fala como um consultor."
description: "Troquei de ChatGPT para Claude para GPT 5.5. Todos enrolavam igual. O problema nunca foi o modelo, mas como ele se comunica. Foi isto que resolveu."
pubDate: 2026-08-14
tags: ["ia", "llm", "produtividade"]
---

Trabalhar com LLMs mudou o meu dia a dia. Delego as tarefas repetitivas e entrego em dias o que antes levava semanas. Testo modelos diferentes diariamente e troco com frequência para testar os limites. Uns são mais rápidos, outros mais baratos, outros resolvem melhor problemas difíceis. No fim, o que conta é o workflow. Se o ambiente está bem configurado, mudar de modelo não é um problema.

Comecei no ChatGPT. Depois mudei para o Claude porque escrevia melhor código e percebia melhor a intenção. Com o tempo, tornou-se demasiado caro para o uso diário. Passei uma boa temporada com o GPT 5.5 como modelo principal. Barato e rápido na subscrição, mas as respostas dele são muito enroladas. O código vinha desarrumado e o texto cheio de tiques. Para mim, essa é a diferença entre os modelos da Anthropic e os da OpenAI. O Claude tem um "taste" diferenciado, percebe o que quero dizer. Se a Apple tivesse um modelo, de certeza que seria algo como o Claude. O GPT resolve, mas comunica mal. Os modelos Grok têm o mesmo problema.

Com o passar dos dias, ler as respostas dos modelos começou a pesar. Jargão a mais, expressões estranhas, frases ocas. Eu saía das conversas cansado. Tentei resolver com um CLAUDE.md e um AGENTS.md cheios de instruções.

## Índice

## Onde o unslop entrou

Vi a skill unslop da Poteto numa lista de skills e instalei por curiosidade. Ficou logo no meu uso diário.

A ideia é simples. A skill lê o texto, procura padrões típicos de IA e reescreve com voz humana. Não é só cortar palavras. Ela pede opinião, ritmo variado e frases específicas. O resultado lê-se como uma pessoa que sabe do assunto.

Para instalar:

```bash
npx skills add https://github.com/poteto/plugins --skill unslop
```

Página da skill: <https://www.skills.sh/poteto/plugins/unslop>

Desde que comecei a usar, leio mais respostas até ao fim e falo mais com os modelos. Nos modelos chineses a diferença é ainda mais clara. O texto antes parecia traduzido à pressa. Depois passa a direto.

## Um exemplo concreto

Pedi ao modelo uma visão geral de um tema. Sem unslop, a resposta começa assim:

> Claro! Terei todo o gosto em mergulhar a fundo nesta visão geral abrangente para te ajudar a compreender...

Com unslop, o mesmo pedido sai assim:

> Aqui está uma visão geral de como isto funciona.

A primeira versão enrola antes de começar. A segunda entrega logo o conteúdo. É essa a mudança no meu dia. Passo menos tempo a decifrar e mais tempo a decidir.

Se quiseres ver o antes e depois em imagem, guarda dois prints em `public/posts/2026/unslop/` como `sem-unslop.png` e `com-unslop.png` e troca este bloco por imagens lado a lado.

<!-- TODO imagens: adicionar sem-unslop.png / com-unslop.png em public/posts/2026/unslop/ -->

## O que mudei no meu setup

Mantenho a skill sempre ligada para escrita e revisão. Uso-a em READMEs, docs e posts antes de publicar. Também a uso em respostas longas de chat quando vou guardar a conversa como nota.

Não substitui escolher bem o modelo. Continuo a trocar por preço e por tarefa, como disse acima. Mas agora a exigência é maior. Mesmo um modelo barato e rápido entrega texto que consigo ler sem esforço.

Se passas o dia a ler respostas de LLMs e sentes o mesmo cansaço, experimenta. É uma das skills indispensáveis no meu dia a dia.

Para contexto sobre como monto ambiente para não depender de memória, escrevi sobre isso em [Nunca mais faças commit com o email errado](/posts/git-multiplas-contas-sem-erros/).
