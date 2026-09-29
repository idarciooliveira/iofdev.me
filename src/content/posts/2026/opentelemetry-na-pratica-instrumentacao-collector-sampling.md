---
title: "OpenTelemetry na prática: instrumentação, Collector e sampling"
description: "Rascunho da parte 2: especificação de sinais, instrumentação, pipelines do Collector, modelos de deployment e sampling."
pubDate: 2026-09-29
tags: ["observabilidade", "opentelemetry"]
draft: true
---

> RASCUNHO — não publicar. Este é o esqueleto do post 2, a desenvolver depois do post 1 estar fechado.

Continuação direta de `/posts/entendendo-observabilidade-logs-metricas-traces/`.

## Índice

## O que falta desenvolver

- Especificação de sinais: vocabulário comum, API, SDK
- Implementações por linguagem
- Collector como processador de telemetria e OTLP
- Categorias de instrumentação: automática, bibliotecas, manual
- Instruments: counter, updowncounter, gauge, histogram. Relação instrument, measurement, meter, metric
- Os 4 golden signals: tráfego, erros, latência, saturação
- Collector: receivers, processors, exporters, pipelines em YAML
- Deployments: sidecar, agent por nó, serviço standalone
- Sampling: representatividade, sampled vs not sampled, head vs tail com exemplos

## Notas

- Manter em português, mesmo tom do post 1
- Exemplos de YAML e de políticas de tail sampling a validar
- Decidir diagramas antes de publicar
