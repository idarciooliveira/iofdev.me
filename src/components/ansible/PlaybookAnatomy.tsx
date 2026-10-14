import { useState } from "react";
import type { Lang } from "../../i18n";
import "./an.css";

type ConceptId =
	| "play"
	| "inventory"
	| "task"
	| "module"
	| "variable"
	| "fact"
	| "loop"
	| "conditional"
	| "template"
	| "handler";

type Concept = { id: ConceptId; name: string; does: string };
type Line = { t: string; tags: ConceptId[] };

type Names = { play: string; apt: string; users: string; publish: string; reload: string };

const NAMES: Record<Lang, Names> = {
	pt: {
		play: "Servidores web",
		apt: "Atualizar o índice de pacotes",
		users: "Criar os admins",
		publish: "Publicar a configuração",
		reload: "Recarregar o Apache",
	},
	en: {
		play: "Web servers",
		apt: "Update the package index",
		users: "Create the admins",
		publish: "Publish the configuration",
		reload: "Reload Apache",
	},
};

const buildLines = (n: Names): Line[] => [
	{ t: "---", tags: [] },
	{ t: `- name: ${n.play}`, tags: ["play"] },
	{ t: "  hosts: web", tags: ["play", "inventory"] },
	{ t: "  become: true", tags: ["play"] },
	{ t: "  vars:", tags: ["variable"] },
	{ t: "    admins: [ana, bruno]", tags: ["variable"] },
	{ t: "  tasks:", tags: ["task"] },
	{ t: `    - name: ${n.apt}`, tags: ["task"] },
	{ t: "      ansible.builtin.apt:", tags: ["module"] },
	{ t: "        update_cache: true", tags: ["module"] },
	{ t: "      when: ansible_facts['os_family'] == \"Debian\"", tags: ["conditional", "fact"] },
	{ t: "", tags: [] },
	{ t: `    - name: ${n.users}`, tags: ["task"] },
	{ t: "      ansible.builtin.user:", tags: ["module"] },
	{ t: "        name: \"{{ item }}\"", tags: ["module", "loop"] },
	{ t: "      loop: \"{{ admins }}\"", tags: ["loop", "variable"] },
	{ t: "", tags: [] },
	{ t: `    - name: ${n.publish}`, tags: ["task"] },
	{ t: "      ansible.builtin.template:", tags: ["module", "template"] },
	{ t: "        src: lab.conf.j2", tags: ["module", "template"] },
	{ t: "        dest: /etc/apache2/conf-enabled/zz-lab.conf", tags: ["module", "template"] },
	{ t: `      notify: ${n.reload}`, tags: ["handler"] },
	{ t: "", tags: [] },
	{ t: "  handlers:", tags: ["handler"] },
	{ t: `    - name: ${n.reload}`, tags: ["handler"] },
	{ t: "      ansible.builtin.service:", tags: ["module", "handler"] },
	{ t: "        name: apache2", tags: ["module", "handler"] },
	{ t: "        state: reloaded", tags: ["module", "handler"] },
];

const EN: { title: string; hint: string; pick: string; concepts: Concept[] } = {
	title: "Anatomy of a playbook",
	hint: "Pick a concept to light up its lines.",
	pick: "Every line belongs to at least one concept. Pick one above.",
	concepts: [
		{ id: "play", name: "Play", does: "The top-level unit. It says where to run (hosts), with which privileges (become) and which tasks to execute." },
		{ id: "inventory", name: "Inventory", does: "hosts: web points to the [web] group in the inventory. The inventory is the list of machines." },
		{ id: "task", name: "Task", does: "One step. Each task calls exactly one module." },
		{ id: "module", name: "Module", does: "The tool that does the work. It takes parameters and describes the state you want, not the commands to get there." },
		{ id: "variable", name: "Variable", does: "A value you can change without touching the tasks. It comes from vars, the inventory or -e on the command line." },
		{ id: "fact", name: "Fact", does: "A variable Ansible collects from the machine itself, like the OS family. You use it like any other variable." },
		{ id: "loop", name: "Loop", does: "Repeats the task for each item. The variable item holds the value of the current turn." },
		{ id: "conditional", name: "Conditional", does: "The task only runs when the condition is true. when takes a bare expression, no curly braces." },
		{ id: "template", name: "Template", does: "A .j2 file with Jinja2 variables and logic. Ansible fills it in and copies the result to the machine." },
		{ id: "handler", name: "Handler", does: "A task that only runs when another task notifies it. It runs once, at the end of the play." },
	],
};

const PT: typeof EN = {
	title: "Anatomia de um playbook",
	hint: "Escolhe um conceito para acender as linhas dele.",
	pick: "Cada linha pertence a pelo menos um conceito. Escolhe um em cima.",
	concepts: [
		{ id: "play", name: "Play", does: "A unidade de topo. Diz onde corre (hosts), com que privilégios (become) e que tasks executa." },
		{ id: "inventory", name: "Inventory", does: "hosts: web aponta para o grupo [web] do inventário. O inventário é a lista de máquinas." },
		{ id: "task", name: "Task", does: "Um passo. Cada task chama exatamente um módulo." },
		{ id: "module", name: "Módulo", does: "A ferramenta que faz o trabalho. Recebe parâmetros e descreve o estado que queres, não os comandos para lá chegar." },
		{ id: "variable", name: "Variável", does: "Um valor que podes mudar sem mexer nas tasks. Vem de vars, do inventário ou de -e na linha de comandos." },
		{ id: "fact", name: "Fact", does: "Uma variável que o Ansible recolhe da própria máquina, como a família do sistema operativo. Usa-se como qualquer variável." },
		{ id: "loop", name: "Loop", does: "Repete a task para cada item. A variável item guarda o valor da volta atual." },
		{ id: "conditional", name: "Condicional", does: "A task só corre se a condição for verdadeira. O when leva uma expressão simples, sem chavetas." },
		{ id: "template", name: "Template", does: "Um ficheiro .j2 com variáveis e lógica Jinja2. O Ansible preenche-o e copia o resultado para a máquina." },
		{ id: "handler", name: "Handler", does: "Uma task que só corre quando outra a notifica. Corre uma vez, no fim do play." },
	],
};

export default function PlaybookAnatomy({ lang = "pt" }: { lang?: Lang }) {
	const copy = lang === "en" ? EN : PT;
	const lines = buildLines(NAMES[lang === "en" ? "en" : "pt"]);
	const [active, setActive] = useState<ConceptId | null>(null);
	const current = copy.concepts.find((c) => c.id === active);

	return (
		<div className="an" role="group" aria-label={copy.title}>
			<div className="an-head">
				<span className="an-title">{copy.title}</span>
				<span className="an-hint">{copy.hint}</span>
			</div>
			<div className="an-row" style={{ marginBottom: "0.75rem" }}>
				{copy.concepts.map((c) => (
					<button
						key={c.id}
						type="button"
						className="an-btn"
						aria-pressed={active === c.id}
						onClick={() => setActive(active === c.id ? null : c.id)}
					>
						{c.name}
					</button>
				))}
			</div>
			<pre className="an-code" data-active={active !== null} tabIndex={0}>
				<code>
					{lines.map((line, i) => (
						<span
							key={i}
							className="an-line"
							data-on={active !== null && line.tags.includes(active)}
						>
							{line.t}
						</span>
					))}
				</code>
			</pre>
			<p className="an-note" aria-live="polite">
				{current ? (
					<>
						<strong>{current.name}.</strong> {current.does}
					</>
				) : (
					copy.pick
				)}
			</p>
		</div>
	);
}
