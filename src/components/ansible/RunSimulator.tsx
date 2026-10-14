import { useState } from "react";
import type { Lang } from "../../i18n";
import "./an.css";

type Conf = "none" | "Prod" | "OS" | "manual";
type Sys = { pkg: boolean; conf: Conf; up: boolean };
type Kind = "plain" | "ok" | "changed" | "dim";
type Out = { kind: Kind; text: string };
type Run = { lines: Out[]; changed: number; handler: boolean };

const INITIAL: Sys = { pkg: false, conf: "none", up: false };
const WIDTH = 58;

const banner = (label: string) => `${label} `.padEnd(WIDTH, "*");

type Names = { play: string; install: string; configure: string; start: string; reload: string };

const NAMES: Record<Lang, Names> = {
	pt: {
		play: "Servidores web",
		install: "Instalar o Apache",
		configure: "Configurar o Apache",
		start: "Arrancar o Apache",
		reload: "Recarregar o Apache",
	},
	en: {
		play: "Web servers",
		install: "Install Apache",
		configure: "Configure Apache",
		start: "Start Apache",
		reload: "Reload Apache",
	},
};

function play(sys: Sys, tokens: "Prod" | "OS", n: Names): { next: Sys; run: Run } {
	const next = { ...sys };
	const lines: Out[] = [{ kind: "dim", text: banner(`PLAY [${n.play}]`) }, { kind: "plain", text: "" }];
	let changed = 0;
	let ok = 0;

	const task = (name: string, didChange: boolean) => {
		lines.push({ kind: "dim", text: banner(`TASK [${name}]`) });
		lines.push({ kind: didChange ? "changed" : "ok", text: `${didChange ? "changed" : "ok"}: [web1]` });
		lines.push({ kind: "plain", text: "" });
		ok += 1;
		if (didChange) changed += 1;
	};

	task("Gathering Facts", false);

	const install = !next.pkg;
	next.pkg = true;
	task(n.install, install);

	const reconf = next.conf !== tokens;
	next.conf = tokens;
	task(n.configure, reconf);

	const start = !next.up;
	next.up = true;
	task(n.start, start);

	if (reconf) {
		lines.push({ kind: "dim", text: banner(`RUNNING HANDLER [${n.reload}]`) });
		lines.push({ kind: "changed", text: "changed: [web1]" });
		lines.push({ kind: "plain", text: "" });
		ok += 1;
		changed += 1;
	}

	lines.push({ kind: "dim", text: banner("PLAY RECAP") });
	lines.push({ kind: "plain", text: `web1 : ok=${ok}  changed=${changed}  unreachable=0  failed=0` });

	return { next, run: { lines, changed, handler: reconf } };
}

type Copy = {
	title: string;
	hint: string;
	run: string;
	tokensLabel: string;
	handLabel: string;
	editConf: string;
	stopApache: string;
	reset: string;
	machine: string;
	installed: string;
	config: string;
	running: string;
	yes: string;
	no: string;
	manual: string;
	none: string;
	runs: string;
	empty: string;
	intro: string;
	noChange: string;
	handlerRan: string;
	partial: string;
};

const PT: Copy = {
	title: "Corre duas vezes",
	hint: "Simulação do playbook do lab. Sem servidor real.",
	run: "Correr o playbook",
	tokensLabel: "Mudar a variável",
	handLabel: "Mexer na máquina à mão",
	editConf: "Editar a config à mão",
	stopApache: "Parar o Apache à mão",
	reset: "Repor a máquina",
	machine: "Estado da máquina",
	installed: "apache2 instalado",
	config: "ServerTokens",
	running: "apache2 a correr",
	yes: "sim",
	no: "não",
	manual: "editado à mão",
	none: "sem ficheiro",
	runs: "Execuções",
	empty: "Carrega em Correr o playbook.",
	intro: "Corre duas vezes seguidas. Depois muda a variável, ou mexe na máquina à mão, e corre outra vez.",
	noChange: "changed=0. A máquina já estava como pedido, por isso nada foi tocado e o handler ficou parado.",
	handlerRan: "A config mudou, por isso o handler correu e recarregou o Apache.",
	partial: "Só mudou o que estava diferente. O handler não correu porque a config não mudou.",
};

const EN: Copy = {
	title: "Run it twice",
	hint: "Simulation of the lab playbook. No real server.",
	run: "Run the playbook",
	tokensLabel: "Change the variable",
	handLabel: "Touch the machine by hand",
	editConf: "Edit the config by hand",
	stopApache: "Stop Apache by hand",
	reset: "Reset the machine",
	machine: "Machine state",
	installed: "apache2 installed",
	config: "ServerTokens",
	running: "apache2 running",
	yes: "yes",
	no: "no",
	manual: "edited by hand",
	none: "no file",
	runs: "Runs",
	empty: "Press Run the playbook.",
	intro: "Run it twice in a row. Then change the variable, or touch the machine by hand, and run it again.",
	noChange: "changed=0. The machine already matched the request, so nothing was touched and the handler stayed idle.",
	handlerRan: "The config changed, so the handler ran and reloaded Apache.",
	partial: "Only what differed changed. The handler did not run because the config did not change.",
};

export default function RunSimulator({ lang = "pt" }: { lang?: Lang }) {
	const c = lang === "en" ? EN : PT;
	const [sys, setSys] = useState<Sys>(INITIAL);
	const [tokens, setTokens] = useState<"Prod" | "OS">("Prod");
	const [last, setLast] = useState<Run | null>(null);
	const [history, setHistory] = useState<{ id: number; changed: number }[]>([]);
	const [count, setCount] = useState(0);

	const onRun = () => {
		const { next, run } = play(sys, tokens, NAMES[lang === "en" ? "en" : "pt"]);
		setSys(next);
		setLast(run);
		setHistory((h) => [...h, { id: count + 1, changed: run.changed }].slice(-8));
		setCount(count + 1);
	};
	const onReset = () => {
		setSys(INITIAL);
		setLast(null);
		setHistory([]);
		setCount(0);
	};

	const confText = sys.conf === "none" ? c.none : sys.conf === "manual" ? c.manual : sys.conf;
	const verdict = last ? (last.changed === 0 ? c.noChange : last.handler ? c.handlerRan : c.partial) : c.intro;

	return (
		<div className="an" role="group" aria-label={c.title}>
			<div className="an-head">
				<span className="an-title">{c.title}</span>
				<span className="an-hint">{c.hint}</span>
			</div>
			<div className="an-split">
				<div>
					<div className="an-stack">
						<button type="button" className="an-btn" data-primary="true" onClick={onRun}>
							{c.run}
						</button>
						<p className="an-label">{c.tokensLabel}</p>
						<button
							type="button"
							className="an-btn"
							onClick={() => setTokens(tokens === "Prod" ? "OS" : "Prod")}
						>
							server_tokens: {tokens}
						</button>
						<p className="an-label">{c.handLabel}</p>
						<button
							type="button"
							className="an-btn"
							disabled={sys.conf === "none"}
							onClick={() => setSys({ ...sys, conf: "manual" })}
						>
							{c.editConf}
						</button>
						<button
							type="button"
							className="an-btn"
							disabled={!sys.up}
							onClick={() => setSys({ ...sys, up: false })}
						>
							{c.stopApache}
						</button>
						<button type="button" className="an-btn" onClick={onReset} style={{ marginTop: "0.5rem" }}>
							{c.reset}
						</button>
					</div>
					<p className="an-label" style={{ marginTop: "1rem" }}>
						{c.machine}
					</p>
					<div className="an-state">
						<div>
							<span>{c.installed}</span>
							<span>{sys.pkg ? c.yes : c.no}</span>
						</div>
						<div>
							<span>{c.config}</span>
							<span>{confText}</span>
						</div>
						<div>
							<span>{c.running}</span>
							<span>{sys.up ? c.yes : c.no}</span>
						</div>
					</div>
				</div>
				<div>
					<pre className="an-term" tabIndex={0} aria-live="polite">
						<span className="dim">$ ansible-playbook site.yml{"\n\n"}</span>
						{last
							? last.lines.map((l, i) => (
									<span key={i} className={l.kind === "plain" ? undefined : l.kind}>
										{l.text}
										{"\n"}
									</span>
								))
							: <span className="dim">{c.empty}</span>}
					</pre>
					{history.length > 0 && (
						<div className="an-history" aria-label={c.runs}>
							{history.map((h) => (
								<span key={h.id} data-zero={h.changed === 0}>
									#{h.id} changed={h.changed}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
			<p className="an-note">{verdict}</p>
		</div>
	);
}
