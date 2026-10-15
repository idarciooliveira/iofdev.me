---
title: "Uma Broken Window e a entropia do software"
description: "O que The Pragmatic Programmer me ensinou sobre software rot, pequenos problemas que se acumulam e a cultura de cuidar do código."
pubDate: 2026-10-15
tags: ["carreira", "produtividade"]
---

Um dos livros que várias pessoas me recomendaram foi *The Pragmatic Programmer*. Adiei a leitura durante meses, mas finalmente comecei. Em vez de tentar ler tudo de uma vez, dedico-lhe um pouco de tempo por dia. Tem sido uma leitura útil, cheia de ideias que me fazem parar para pensar.

Uma das frases que mais me marcou foi: “A maior de todas as fraquezas é o medo de parecer fraco.” Mas a ideia sobre a qual quero falar aqui é a Broken Window.

## Entropia e software rot

Entropia é uma forma de descrever a desordem de um sistema. Aplicada ao software, a ideia é que cada alteração pode tornar o sistema um pouco mais difícil de compreender e manter se não houver cuidado em preservar ou melhorar a sua estrutura.

Essa deterioração gradual é muitas vezes chamada *software rot*, ou apodrecimento do software. Não quer dizer que o código piore só por envelhecer. Acontece quando pequenos defeitos, decisões apressadas e soluções temporárias se acumulam sem serem revistos. Com o tempo, até uma mudança simples pode tornar-se mais arriscada e demorada.

Como é que algumas equipas, mesmo enfrentando dificuldades, conseguem entregar os seus projetos, enquanto outras — até equipas grandes, cheias de pessoas talentosas — não conseguem fazer o mesmo? Há vários fatores, mas, para mim, um dos mais importantes é o fator psicológico: a cultura de trabalho e a forma como as pessoas reagem aos problemas.

Quando alguém tem receio de admitir um erro, pedir ajuda ou questionar uma decisão, pode acabar por esconder o problema ou seguir em frente apesar dos riscos. Se as preocupações são ignoradas e quem erra é culpabilizado, a equipa aprende a ficar calada. Os problemas, porém, continuam lá e podem acumular-se. É neste ponto que a teoria da Broken Window ajuda a explicar como um pequeno sinal de descuido pode afetar o comportamento de todos.

## O conceito de uma Broken Window

Uma Broken Window (janela partida) deixada sem reparação durante um período significativo instala nas pessoas que vivem no edifício uma sensação de abandono: a ideia de que quem devia cuidar do edifício não se importa. Depois, partem-se outras janelas, aparecem inscrições nas paredes, acumula-se pó e começam a surgir danos estruturais sérios. Em pouco tempo, o edifício fica tão degradado que o proprietário já não o considera digno de reparar. A sensação de abandono acaba por se tornar realidade.

No software, a metáfora da Broken Window aplica-se a um mau desenho, uma decisão que ninguém revisita, um bug conhecido ou um trecho de código confuso que todos contornam. Cada problema isolado pode parecer pequeno. Mas, quando fica por resolver, a equipa pode concluir que a qualidade não é uma prioridade. É mais fácil deixar passar o próximo problema, e depois o seguinte.

Já vi projetos começarem a perder o rumo por detalhes que, vistos separadamente, pareciam insignificantes: uma falha de comunicação, um bug que ficou por corrigir ou uma decisão que a equipa considerava arriscada, mas que seguiu em frente sem espaço para discutir os motivos. Com o tempo, esses detalhes acumulam dívida técnica e tornam-se uma pedra no sapato de toda a gente.

## O que fazer perante uma Broken Window

Isto não significa que temos de parar tudo para corrigir cada imperfeição, nem que devemos culpar quem a introduziu. Todos criamos problemas. O que faz diferença é o que acontece depois de os vermos.

- Se o problema for pequeno e seguro de corrigir, corrige-o quando o encontrares.
- Se não der para o resolver já, regista-o junto do código ou numa tarefa: explica o contexto, o risco e o próximo passo. Um comentário sozinho não corrige nada, mas ajuda a dívida a não desaparecer da vista.
- Se o mesmo erro se repete, melhora o processo ou automatiza uma proteção, em vez de depender apenas de mais atenção. Foi essa a ideia por trás da configuração de [várias contas Git sem erros](/posts/git-multiplas-contas-sem-erros/).
- Cria formas de perceber cedo quando o sistema começa a comportar-se pior. A [observabilidade com logs, métricas e traces](/posts/entendendo-observabilidade-logs-metricas-traces/) ajuda a investigar problemas em produção; não substitui a revisão do código, mas dá à equipa mais sinais para agir.

Uma Broken Window não condena o projeto. É um sinal para decidir o que fazer: reparar, limitar o estrago ou deixar claro quando e porquê vai ser tratado. Para mim, cuidar do software também é cuidar da cultura que permite à equipa falar desses sinais e agir sobre eles.

## Referências

- Andy Hunt e Dave Thomas, *The Pragmatic Programmer: Your Journey to Mastery*.
- [The Broken Window Theory, de Jeff Atwood](https://blog.codinghorror.com/the-broken-window-theory/).
