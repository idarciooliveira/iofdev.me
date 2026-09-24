---
title: "Como penso arquitetura frontend em produtos em crescimento"
description: "Uma abordagem prática para equilibrar velocidade, qualidade e autonomia de times em frontends que escalam."
pubDate: 2026-02-13
tags: ["frontend", "arquitetura"]
heroImage: "/posts/2026/como-penso-arquitetura-frontend/cover.jpg"
---

## O problema

Todo produto em crescimento chega ao ponto em que o frontend vira gargalo: builds lentos, componentes duplicados, medo de refatorar. A causa raramente é a framework. É a falta de fronteiras claras entre domínios.

## Três camadas que uso

### 1. Fundação: design system e tokens

Cores, espaçamentos e tipografia vivem em tokens, não em valores soltos. Quando o marketing pede um rebrand, muda-se um arquivo, não trezentos. Veja mais em [Design tokens sem dor](/posts/design-tokens-sem-dor).

### 2. Domínio: features isoladas

Cada área de produto tem sua pasta com componentes, hooks e tipos próprios. Código compartilhado só sobe de nível quando o terceiro uso aparece. Nunca antes.

### 3. Plataforma: roteamento, dados e observabilidade

Cache, autenticação, logs e métricas ficam na camada de plataforma. Features consomem, não reinventam.

## Regras de decisão

- **Regra dos três usos** antes de generalizar um componente.
- **Contratos tipados** entre frontend e API: [documentação leve economiza retrabalho](/posts/notas-de-campo-decisoes-produto).
- **Métricas antes de micro-otimização**: Core Web Vitals primeiro, bundle depois.

## Conclusão

![OpenTelemetry: observabilidade na camada de plataforma](/posts/2026/como-penso-arquitetura-frontend/cover.webp)

Arquitetura boa é a que um developer novo entende em uma tarde. Fronteiras claras, tokens consistentes e plataforma compartilhada. O resto é disciplina de revisão de código.
