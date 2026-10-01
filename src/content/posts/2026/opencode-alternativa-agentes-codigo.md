---
title: "OpenCode, a alternativa mais barata para coding agents"
description: "Os coding agents vieram para ficar, mas as subscrições pesam no bolso em Angola. Faço as contas em kwanzas e mostro como configurar o OpenCode passo a passo."
pubDate: 2026-10-01
tags: ["ia", "produtividade", "opencode"]
heroImage: "/posts/2026/opencode-alternativa-agentes-codigo/cover.jpg"
---

Os coding agents vieram para ficar. Tornaram-se o novo framework de JavaScript. Todos os dias sai um agente novo, um modelo novo ou uma ferramenta de IA nova. Dá para fingir que é moda, mas quem já delegou tarefas repetitivas a um coding agent não volta atrás.

O problema é que isto não é grátis. Para usar um coding agent a sério, pagas uma chave de API ou uma subscrição. A subscrição quase sempre compensa, porque os laboratórios subsidiam o uso. Pagas menos e consomes mais do que consumirias em API.

Então qual é a melhor subscrição, ou o melhor modelo, para ti? A resposta típica é "depende". Vou tentar ser mais concreto.

## Índice

## Anthropic ou OpenAI

Na prática é igual. A Anthropic, com o Claude, e a OpenAI, com o ChatGPT, têm planos generosos e bons modelos. Estes são os preços de referência em dólares, no momento em que escrevo.

| Laboratório | Plano | Preço por mês |
| --- | --- | --- |
| Anthropic | Claude Pro | 20 USD |
| Anthropic | Claude Max, 5x ou 20x | desde 100 USD |
| OpenAI | ChatGPT Plus | 20 USD |
| OpenAI | ChatGPT Pro | desde 100 USD |
| xAI | SuperGrok | 30 USD |
| xAI | SuperGrok Heavy | 300 USD |

Os planos mudam com frequência. Confirma nas páginas oficiais antes de pagar.

## Em Angola o jogo é outro

Nos EUA, 20 dólares são pouco. Aqui são quase 21.000 kwanzas por mês, já com câmbio e taxas. Para uns é barato. Para a maioria dos angolanos é caro.

O Decreto Presidencial 152/24, publicado na I Série do Diário da República de 17 de Julho de 2024, fixou o salário mínimo nacional em cerca de 100 mil kwanzas para pequenas e médias empresas. Para startups e microempresas ficou em 50 mil. Sim, a startup paga metade e o café custa o mesmo.

Contas feitas, 21.000 Kz são mais ou menos 20% de quem ganha 100 mil e 40% de quem ganha 50 mil. Só que o salário mínimo é o caso mais duro. Para equilibrar, fui ao [WageIndicator](https://wageindicator.org/pt-ao/trabalho-em-angola/trabalho-e-salario/desenvolventes-de-software), que dá para programadores de software em 2026 um intervalo de 277.837 Kz a 2.286.808 Kz por mês. No início de carreira, a maioria ganha entre 277.837 Kz e 879.126 Kz líquidos.

Esta tabela mostra quanto pesa cada plano, com 20 USD a 21.000 Kz e 10 USD a 10.500 Kz.

| Rendimento mensal | Valor | Plano de 20 USD | OpenCode Go, 10 USD |
| --- | --- | --- | --- |
| Salário mínimo, startup e microempresa | 50.000 Kz | 42% | 21% |
| Salário mínimo, pequena e média empresa | 100.000 Kz | 21% | 10,5% |
| Programador, início de carreira, mínimo | 277.837 Kz | 7,6% | 3,8% |
| Programador, início de carreira, máximo | 879.126 Kz | 2,4% | 1,2% |
| Programador, topo da faixa | 2.286.808 Kz | 0,9% | 0,5% |

Conforme a tua fase e o que ganhas, continua caro. Para quem está no primeiro degrau, 7,6% do salário numa ferramenta pesa.

## Quanto plano precisas

Pela minha experiência, a maioria dos profissionais fica bem com 20 USD por mês, seja Claude ou ChatGPT. Se programas pouco e o teu trabalho é sobretudo documentos e apresentações, chega com folga. Um programador pleno que usa coding agent todos os dias também aguenta com este plano, desde que gira bem o consumo.

Mas há uma alternativa que muita gente ignora.

## OpenCode

O [OpenCode](https://opencode.ai) é um coding agent open source. Corre no terminal, numa app desktop e como extensão de IDE. Dá-te duas coisas que os laboratórios não dão.

**Flexibilidade.** Usas quase todos os modelos que existem. Suporta mais de 75 fornecedores e também modelos locais. Se um modelo piora, encarece ou esgota o limite, trocas com um comando.

**Preço.** O plano OpenCode Go custa 10 USD por mês. Dá acesso a modelos open source bons para coding agents, como Kimi, GLM, MiniMax, Qwen e DeepSeek. O limite mensal chega a cerca de 60 USD de uso de API por modelo. Pagas 10 e consomes bem mais do que isso em API. Há ainda o Go Plus, a 40 USD, com limites maiores.

Tem uma terceira vantagem. O OpenCode costuma ter **modelos gratuitos**. Servem para tarefas simples e para aprenderes o fluxo antes de gastares um kwanza. Mudam com o tempo, por isso vê a lista atual com `/models`.

O que mais pesa no dia a dia:

- Modo Plan. O agente só planeia e não mexe no código até aprovares.
- `AGENTS.md` por projeto, onde ele guarda a estrutura e as convenções.
- Troca de modelo a meio da conversa. Um barato para o trivial, um forte para o difícil.
- Código aberto. Vês o que ele faz e a comunidade corrige depressa.
- O Go funciona também noutros coding agents, não só no OpenCode.

Se queres começar a trabalhar com coding agents sem gastar muito, não conheço entrada mais barata.

## Configurar passo a passo

### 1. Instalar

O mais simples é o script oficial.

```bash
curl -fsSL https://opencode.ai/install | bash
```

Em qualquer sistema também podes usar npm.

```bash
npm install -g opencode-ai
```

No macOS e no Linux há Homebrew.

```bash
brew install anomalyco/tap/opencode
```

No Windows funcionam o Scoop, com `scoop install opencode`, e o Chocolatey, com `choco install opencode`. A documentação recomenda um terminal moderno, como WezTerm, Alacritty, Ghostty ou Kitty.

### 2. Subscrever o OpenCode Go

Cria conta em [opencode.ai](https://opencode.ai/go), subscreve o Go por 10 USD e gera a chave de API em [opencode.ai/auth](https://opencode.ai/auth). Se só queres experimentar, salta este passo e usa os modelos gratuitos.

### 3. Abrir o OpenCode num projeto

```bash
cd /caminho/do/teu/projeto
opencode
```

### 4. Ligar o fornecedor

Dentro do OpenCode, corre o comando abaixo.

```text
/connect
```

Escolhe OpenCode Go, cola a chave de API e carrega Enter. A chave fica em `~/.local/share/opencode/auth.json`.

### 5. Escolher o modelo

```text
/models
```

Aparece a lista de modelos. Para começar, um modelo barato e rápido resolve a maior parte das tarefas. Guarda os mais pesados para os problemas difíceis.

### 6. Inicializar o projeto

```text
/init
```

O OpenCode analisa o projeto e cria um `AGENTS.md` na raiz, com a estrutura e os padrões de código. Faz commit deste ficheiro. Ele serve de contexto sempre que abrires o agente.

### 7. Planear antes de mexer

Carrega em Tab para entrar no modo Plan. Descreve o que queres e revê o plano. Quando estiver certo, carrega em Tab outra vez e pede a implementação.

```text
Quando um utilizador apaga uma nota, marca-a como apagada na base de dados.
Cria um ecrã com as notas apagadas recentemente, onde seja possível
restaurar ou apagar definitivamente.
```

### 8. Fixar um modelo por defeito

Este passo é opcional. Para não escolheres o modelo em cada sessão, cria um `opencode.json` na raiz do projeto.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode-go/kimi-k3"
}
```

O formato é `opencode-go/<id-do-modelo>`. O id exato aparece no `/models`.

## Conclusão

Vão continuar a aparecer coding agents, modelos e planos novos. Se tens orçamento para 20 USD por mês, Claude ou ChatGPT servem bem. Se cada kwanza conta, ou se não queres ficar preso a um laboratório, começa pelo OpenCode. Foi a forma mais barata que encontrei de trabalhar com coding agents a sério.

Se já usas o OpenCode, diz-me que modelos funcionam melhor para ti. Também escrevi sobre [como tornar as respostas da IA mais legíveis](/posts/unslop-skill-respostas-ia-legiveis/), que ajuda com qualquer modelo.
