# Guia Completo de Prompts - Ecommerce Games

Este diretório contém prompts de atendente virtual usando diferentes **estratégias** e **frameworks** de engenharia de prompts, aplicados ao contexto de uma loja especializada em jogos de Nintendo 64.

## 📚 Índice

- [Estratégias](#estratégias)
- [Frameworks](#frameworks)
- [Arquivos Disponíveis](#arquivos-disponíveis)
- [Como Usar](#como-usar)

---

## 🎯 Estratégias

Estratégias definem **como** o modelo deve processar e responder.

### 1. Zero-Shot
**O que é:** O modelo responde a tarefa sem exemplos, baseando-se apenas em instruções.

**Quando usar:** Quando você tem boas instruções e o modelo já tem conhecimento sobre o domínio.

**Vantagens:** Flexível, rápido, eficiente em tokens

**Limitações:** Pode ser inconsistente em tarefas complexas

**Arquivos:** `zero-shot-clear.md`, `zero-shot-crisp.md`, `zero-shot-prompt-framework.md`

---

### 2. Few-Shot
**O que é:** O modelo recebe alguns exemplos de conversação antes de responder à tarefa atual.

**Quando usar:** Quando você precisa de consistência de tom e estilo

**Vantagens:** Maior consistência, exemplos claros

**Limitações:** Consome mais tokens, exige bons exemplos

**Arquivos:** `few-shot-clear.md`, `few-shot-crisp.md`, `few-shot-prompt-framework.md`

---

### 3. Chain-of-Thought (CoT)
**O que é:** Estratégia que encoraja o modelo a mostrar seu raciocínio passo-a-passo antes de responder.

**Quando usar:** Problemas que exigem lógica, cálculos, ou múltiplas etapas de raciocínio

**Vantagens:** Maior precisão, transparência no raciocínio

**Limitações:** Pode ser verboso, consome mais tokens

**Arquivos:** `chain-of-thought.md`, `chain-of-thought-crisp.md`

---

### 4. Tree of Thoughts
**O que é:** Expande o CoT, permitindo explorar múltiplas linhas de raciocínio antes de decidir.

**Quando usar:** Decisões complexas com vários trade-offs

**Vantagens:** Considera múltiplas opções antes de decidir

**Limitações:** Muito verboso, lento

**Arquivos:** `tree-of-thoughts.md`

---

### 5. ReAct (Reasoning + Acting)
**O que é:** Combina raciocínio explícito com ações simuladas (buscar informações).

**Quando usar:** Quando precisa buscar dados externos ou fazer verificações

**Vantagens:** Mostra processo de busca de informações

**Limitações:** Pode ser repetitivo

**Arquivos:** `react.md`

---

### 6. Role Prompting
**O que é:** Define um papel/personagem específico para o modelo desempenhar.

**Quando usar:** Quando quer um tom específico ou personalidade definida

**Vantagens:** Mais humano e natural

**Limitações:** Pode ser inconsistente se mal definido

**Arquivos:** `role-prompting.md`

---

### 7. Output Format
**O que é:** Especifica exatamente o formato da saída (JSON, XML, etc).

**Quando usar:** Quando precisa integrar com sistemas que exigem formato específico

**Vantagens:** Facilita integração técnica

**Limitações:** Menos flexível, pode ser rígido

**Arquivos:** `output-format.md`

---

## 🛠️ Frameworks

Frameworks definem **estrutura** para organizar o prompt.

### 1. CLEAR Framework
**O que é:** Framework que enfatiza 5 princípios para prompts eficazes.

**Componentes:**
- **C**reative (Criativo): Respostas inovadoras e envolventes
- **L**ogical (Lógico): Coerência e fundamentação
- **E**xplicit (Explícito): Clareza e falta de ambiguidade
- **A**daptive (Adaptativo): Flexibilidade para diferentes contextos
- **R**ealistic (Realista): Praticável e factível

**Quando usar:** Quando quer garantir qualidade geral nas respostas

**Arquivos:** `zero-shot-clear.md`, `few-shot-clear.md`

---

### 2. CRISP Framework
**O que é:** Framework estruturado em 5 etapas para prompts.

**Componentes:**
- **C**ontext: Contexto ou situação relevante
- **R**equirements: Requisitos e restrições
- **I**nstructions: Diretrizes claras sobre o que fazer
- **S**pecification (Output): Formato ou tipo de resposta esperada
- **P**arameters: Parâmetros adicionais que influenciam a resposta

**Quando usar:** Quando precisa de estrutura clara e organizada

**Arquivos:** `zero-shot-crisp.md`, `few-shot-crisp.md`, `chain-of-thought-crisp.md`

---

### 3. PROMPT Framework
**O que é:** Metodologia sistemática em 6 etapas para criar prompts.

**Componentes:**
- **P**roblem definition: Definição clara do problema
- **R**equirements: Identificar requisitos específicos
- **O**bjectives: Definir objetivos do prompt
- **M**odel understanding: Compreender capacidades do modelo
- **P**rompt design: Estruturar o prompt de forma clara
- **T**esting and iteration: Testar e iterar

**Quando usar:** Para projetos mais complexos que exigem planejamento

**Arquivos:** `zero-shot-prompt-framework.md`, `few-shot-prompt-framework.md`

---

## 📁 Arquivos Disponíveis

### Estratégias Puras (sem framework específico)
| Arquivo | Estratégia | Descrição |
|---------|-----------|-----------|
| `chain-of-thought.md` | Chain-of-Thought | Raciocínio passo a passo |
| `react.md` | ReAct | Reasoning + Acting |
| `role-prompting.md` | Role Prompting | Personagem Alex |
| `output-format.md` | Output Format | Estrutura JSON |
| `tree-of-thoughts.md` | Tree of Thoughts | Múltiplas linhas de raciocínio |

### Combinações Estratégia + Framework
| Arquivo | Estratégia | Framework | Descrição |
|---------|-----------|-----------|-----------|
| `zero-shot-clear.md` | Zero-Shot | CLEAR | Sem exemplos + 5 princípios |
| `few-shot-clear.md` | Few-Shot | CLEAR | Com exemplos + 5 princípios |
| `zero-shot-crisp.md` | Zero-Shot | CRISP | Sem exemplos + estrutura 5 etapas |
| `few-shot-crisp.md` | Few-Shot | CRISP | Com exemplos + estrutura 5 etapas |
| `chain-of-thought-crisp.md` | CoT | CRISP | Raciocínio + estrutura 5 etapas |
| `zero-shot-prompt-framework.md` | Zero-Shot | PROMPT | Metodologia 6 etapas |
| `few-shot-prompt-framework.md` | Few-Shot | PROMPT | Metodologia + exemplos |

---

## 🚀 Como Usar

### 1. Escolha a Estratégia
Pergunte-se:
- **Preciso de consistência?** → Few-Shot
- **Preciso de raciocínio visível?** → Chain-of-Thought
- **Preciso de formato específico?** → Output Format
- **Simples e direto?** → Zero-Shot

### 2. Escolha o Framework
Pergunte-se:
- **Quer qualidade geral garantida?** → CLEAR
- **Quer estrutura clara?** → CRISP
- **Quer metodologia completa?** → PROMPT

### 3. Integre no Código

Exemplo usando arquivo:

```typescript
import * as fs from 'fs';

// Ler o prompt do arquivo
const promptPath = './src/prompts/few-shot-clear.md';
const systemPrompt = fs.readFileSync(promptPath, 'utf-8');

// Usar como mensagem system
const message = await prisma.message.create({
    data: {
        content: systemPrompt,
        role: 'system'
    }
});
```

### 4. Teste e Itere
- Teste com perguntas reais de clientes
- Avalie completude e precisão
- Ajuste conforme necessário
- Monitore satisfação do cliente

---

## 📊 Comparação Rápida

### Por Complexidade

| Estratégia | Complexidade | Tokens | Melhor Para |
|------------|--------------|--------|-------------|
| Zero-Shot | ⭐ Baixa | ~200-500 | Respostas simples |
| Few-Shot | ⭐⭐ Média | ~1000-2000 | Consistência |
| Chain-of-Thought | ⭐⭐⭐ Alta | ~500-1000 | Lógica |
| Tree of Thoughts | ⭐⭐⭐⭐ Muito Alta | ~2000+ | Decisões complexas |
| ReAct | ⭐⭐⭐ Alta | ~800-1500 | Busca de dados |

### Por Framework

| Framework | Estrutura | Aplicação |
|-----------|-----------|---------|
| CLEAR | 5 princípios | Garantir qualidade geral |
| CRISP | 5 etapas | Organização clara |
| PROMPT | 6 etapas | Projetos complexos |

---

## 💡 Recomendações

### Para Iniciantes:
1. Comece com `zero-shot-clear.md`
2. Teste e avalie resultados
3. Se precisar de mais consistência, use `few-shot-clear.md`

### Para Projetos de Produção:
1. Use `few-shot-clear.md` para consistência
2. Se precisar de raciocínio, adicione `chain-of-thought-crisp.md`
3. Para integração técnica, use `output-format.md`

### Para Experimentação:
1. Teste diferentes combinações
2. Compare resultados
3. Escolha a melhor para seu caso

---

## 📝 Notas Importantes

- Todos os prompts são adaptáveis para o contexto da Loja Ecommerce Games
- Informações da loja são fictícias mas realistas
- Tokens estimados são aproximados e podem variar
- Sempre teste antes de produção

---

## 🔗 Recursos Adicionais

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [Prompt Engineering Book](https://www.promptingguide.ai/books)

---

**Última atualização:** Outubro 2024  
**Versão:** 1.0  
**Autor:** Ecommerce Games Team

