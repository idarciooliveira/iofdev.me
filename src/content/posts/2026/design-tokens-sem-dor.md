---
title: "Design tokens sem dor: estratégia para escalar UI"
description: "Como organizar semântica visual em tokens para evoluir o design system com consistência em vários produtos."
pubDate: 2026-01-21
tags: ["design-system", "css"]
---

## O sintoma

Cinco tons de cinzento, três raios de borda para o mesmo card, um "azul primário" definido em doze arquivos. Sem tokens, cada tela nova reinventa a linguagem visual.

## A estrutura em três níveis

### 1. Tokens primitivos

Valores brutos: paleta (`blue-500`), escala de espaço (`4, 8, 16`), fontes. Raramente usados direto nos componentes.

### 2. Tokens semânticos

Significado: `--surface`, `--text`, `--text-soft`, `--accent`, `--border-soft`. É aqui que temas claro/escuro acontecem — trocam-se os valores, não os componentes.

### 3. Tokens de componente

Casos específicos: altura do botão, raio do card. Só crie quando o padrão semântico não resolve.

## Convenções que funcionam

- **Nomes por função, não por aparência**: `--accent` em vez de `--blue`.
- **Um tema por arquivo**: `light.css`, `dark.css`, ambos mapeando os mesmos semânticos.
- **Documente com exemplos visuais**, não só tabelas de hex.

## Quando escalar

Comece com ~20 tokens semânticos. Se um valor aparece em três componentes com o mesmo papel, vira token. Antes disso, é detalhe local — e detalhe local pode ficar local.
