---
title: "Nunca mais faças commit com o email errado"
description: "Como configurar identidade Git por pasta para usar conta pessoal e profissional no mesmo computador sem fazer commit com o email errado."
pubDate: 2023-09-29
tags: ["git", "github", "produtividade"]
---

No início da minha carreira, ter uma conta Git era simples. Configuravas o teu nome e email uma vez com `git config --global` e nunca mais pensavas nisso. Hoje quase ninguém tem só uma conta. Tens a conta pessoal, a conta da empresa que te dá um email profissional no primeiro dia, e às vezes uma terceira para um cliente ou um freela.

Por causa disso, muita gente acha que gerir identidades Git é só uma questão de atenção. Quando vais trabalhar num repo da empresa, trocas o config global. Quando voltas ao teu projeto, trocas de volta. Se te enganares, fazes um `git commit --amend --author` e fica resolvido.

Isto está errado. **O truque mais importante não é trocar de identidade com atenção, é montar o Git para nunca precisares de trocar.**

Um bom exemplo disto vi num code review há uns meses. Um programador fez push de uma feature para o repo da empresa e o commit apareceu com o email pessoal dele. A verificação automática falhou porque não reconheceu aquele autor, alguém perguntou porque aquele nome era desconhecido, e ele percebeu que tinha feito três commits seguidos com a identidade errada. Noutra equipa vi pior: um commit de um freela foi parar ao histórico de um repo da empresa, porque o colega estava a fazer as duas coisas no mesmo portátil à noite. Já vi muitos programadores a cometerem estes erros, e quase nunca é por descuido.

Há muito para aprender com este tipo de erro. Eis o que reparei nesses casos:

- Os comandos eram todos manuais e dependiam de memória. Eles não falhavam por falta de atenção, falhavam porque tinham de se lembrar em cada repo.
- O Git parecia bem configurado em cada repo isolado, mas não havia nenhuma regra a dizer qual pasta pertencia a qual conta.
- Eles corrigiam depois do erro, com amend ou rebase, em vez de impedir o erro antes dele acontecer.

Mas não resolves isto só a copiar um bloco de `includeIf` para o `.gitconfig`. A chave é separar as pastas primeiro e deixar o Git decidir pela localização. Sem a separação, o condicional não tem nada para decidir.

Eu não sou melhor a Git do que a maioria dos programadores. Mas esta ideia, de que **o contexto deve vir da pasta e não da tua memória**, é algo que uso todos os dias desde que mudei. Quando cada repo já nasce no sítio certo, posso fazer commit sem pensar em qual email estou a usar. Tenho a minha intuição sobre onde estou, e o Git confirma em vez de me surpreender.

Se só usas uma conta naquela máquina, não precisas disto. Um `git config --global` chega e é simples. Isso não é mau.

Mas se tens duas contas na mesma máquina, consegues tirar muito mais do mesmo Git se o empurrares com força para o caminho certo. A maior parte de nós vive numa mistura: alguns repos são só pessoais, outros são só da empresa, e é nessa fronteira que os erros acontecem.

Isto sugere algo mais geral. Na maioria destes erros, **o humano é o bottleneck, não o Git**. A informação já está no sistema, o caminho do repo já diz qual conta devia ser usada, mas é preciso uma pessoa muito atenta para aplicar isso à mão em cada commit. É mais fácil escrever a regra uma vez.

## Como montei isto aqui

Primeiro separei o disco. Todo o código da empresa vive em `~/work`, todo o pessoal vive em `~/personal`.

```bash
mkdir -p ~/work ~/personal
```

Se já tens repos clonados, move-os agora para o sítio certo:

```bash
mv ~/company-repo-1 ~/work/company-repo-1
mv ~/meu-side-project ~/personal/meu-side-project
```

E daqui para a frente clona já para a pasta certa:

```bash
git clone git@github.com:empresa/projeto.git ~/work/projeto
git clone git@github.com:IdarcioOliveira/meu-side-project.git ~/personal/meu-side-project
```

Depois defini a minha conta pessoal como padrão global:

```bash
git config --global user.name "IdarcioOliveira"
git config --global user.email "idarciooliveira@gmail.com"
```

Depois disse ao Git para usar outra identidade dentro de `~/work`. Abri o config principal:

```bash
nano ~/.gitconfig
```

E adicionei no fim:

```ini
[includeIf "gitdir:~/work/"]
  path = ~/.gitconfig-work
```

A barra no fim de `~/work/` conta. É ela que diz para aplicar só a repos dentro dessa pasta.

Depois criei o ficheiro de trabalho:

```bash
nano ~/.gitconfig-work
```

Com isto dentro:

```ini
[user]
  name = Idarcio Oliveira
  email = idarcio@company.com
```

Para confirmar, entro em cada pasta e pergunto qual email o Git está a usar:

```bash
cd ~/work/projeto && git config user.email
# esperado: idarcio@company.com

cd ~/personal/meu-side-project && git config user.email
# esperado: idarciooliveira@gmail.com
```

Se quiseres ver de onde vem o valor:

```bash
git config --show-origin user.email
```

Desde que mudei para isto, nunca mais misturei contas. Não porque fiquei mais atento, mas porque deixei de precisar de estar atento.
