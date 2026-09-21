---
title: "Checklist de acessibilidade que uso no dia a dia"
description: "Itens essenciais para manter UX inclusiva desde o primeiro commit: semântica, foco, contraste e formulários."
pubDate: 2026-02-07
tags: ["acessibilidade", "frontend"]
---

## Por que checklist, não auditoria anual

Acessibilidade quebra no detalhe do dia a dia: um `div` clicável, um contraste esquecido, um foco invisível. Um checklist curto, aplicado em cada PR, vale mais que uma auditoria gigante por ano.

## O checklist

### 1. HTML semântico

Use `button`, `nav`, `main`, `h1`–`h3` em ordem. Leitores de ecrã navegam pela estrutura — `div onClick` é invisível para eles.

### 2. Teclado e foco

Tudo o que o rato faz, o teclado faz: `Tab` alcança, `Enter` ativa, `Esc` fecha. Foco sempre visível, nunca `outline: none` sem substituto.

### 3. Contraste e texto

Texto normal precisa de contraste 4.5:1, texto grande 3:1. Não transmita informação só por cor — combine com ícone ou texto.

### 4. Formulários e erros

Todo input tem `label` associado. Erros explicam o problema e como corrigir, com `aria-describedby` ligando mensagem ao campo.

### 5. Imagens e movimento

Toda imagem informativa tem `alt` útil; decorativas têm `alt=""`. Respeite `prefers-reduced-motion` em animações.

## Como aplicar

Coloque estes cinco itens no template de PR. Em duas sprints vira hábito — e [decisões documentadas evitam regressões](/posts/notas-de-campo-decisoes-produto).
