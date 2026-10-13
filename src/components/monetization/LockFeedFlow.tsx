import { useEffect, useState } from "react";
import type { Lang } from "../../i18n";
import "./mx.css";

type NodeId = "install" | "choose" | "open" | "gate" | "solve" | "paywall" | "pays" | "pro" | "no";
type Mode = "first" | "fixed";

const W = 170;
const H = 40;

const POS: Record<NodeId, { x: number; y: number; diamond?: boolean }> = {
	install: { x: 200, y: 30 },
	choose: { x: 200, y: 95 },
	open: { x: 200, y: 160 },
	gate: { x: 200, y: 235, diamond: true },
	solve: { x: 440, y: 235 },
	paywall: { x: 200, y: 315 },
	pays: { x: 200, y: 390, diamond: true },
	pro: { x: 440, y: 390 },
	no: { x: 200, y: 470 },
};

const EDGES: { id: string; from: NodeId; to: NodeId; d: string; label?: string; lx?: number; ly?: number }[] = [
	{ id: "install-choose", from: "install", to: "choose", d: "M200,50 V75" },
	{ id: "choose-open", from: "choose", to: "open", d: "M200,115 V140" },
	{ id: "open-gate", from: "open", to: "gate", d: "M200,180 V207" },
	{ id: "gate-solve", from: "gate", to: "solve", d: "M262,235 H355", label: "yes", lx: 300, ly: 228 },
	{ id: "solve-open", from: "solve", to: "open", d: "M440,215 V160 H285", label: "next", lx: 448, ly: 190 },
	{ id: "gate-paywall", from: "gate", to: "paywall", d: "M200,263 V295", label: "no", lx: 208, ly: 284 },
	{ id: "paywall-pays", from: "paywall", to: "pays", d: "M200,335 V368" },
	{ id: "pays-pro", from: "pays", to: "pro", d: "M262,390 H355", label: "yes", lx: 300, ly: 383 },
	{ id: "pays-no", from: "pays", to: "no", d: "M200,412 V450", label: "no", lx: 208, ly: 436 },
];

const PATHS: Record<"pay" | "skip", NodeId[]> = {
	pay: ["install", "choose", "open", "gate", "solve", "open", "gate", "paywall", "pays", "pro"],
	skip: ["install", "choose", "open", "gate", "solve", "open", "gate", "paywall", "pays", "no"],
};

const T = {
	en: {
		text: {
			install: ["Installs LockFeed"],
			choose: ["Picks apps to lock", "(Instagram, X, TikTok)"],
			open: ["Opens Instagram"],
			gate: ["Free quizzes", "left?"],
			solve: ["Answers quiz,", "Instagram opens"],
			paywall: ["Paywall"],
			pays: ["Pays?"],
			pro: ["Unlimited quizzes,", "every pack"],
			no: [],
		} as Record<NodeId, string[]>,
		noText: { first: ["Locked apps stay", "locked forever"], fixed: ["Gate pauses until", "tomorrow's free quizzes"] } as Record<Mode, string[]>,
		edge: { yes: "yes", no: "no", next: "next scroll" } as Record<string, string>,
		title: "LockFeed's paywall, as a flow",
		first: "JMA's first plan",
		fixed: "A version Apple accepts",
		pay: "Simulate a user who pays",
		skip: "Simulate a user who doesn't",
		aria: "Flow diagram of the LockFeed metered paywall",
		rejected: "REJECTED",
		reason: "improper use of Screen Time API",
		noteFirst: <>The meter itself was fine. The problem was the last box. <strong>Holding the user's other apps hostage until they pay</strong> turns a tool they installed to help themselves into ransomware with a nice UI, and Apple's review caught it.</>,
		noteFixed: <>Same meter, same paywall. The only change is the last box. <strong>Not paying costs the user the quizzes, never their own phone.</strong> Free quizzes come back tomorrow, and the lock stays something they control. (This variant is my suggestion, not what JMA shipped.)</>,
	},
	pt: {
		text: {
			install: ["Instala o LockFeed"],
			choose: ["Escolhe apps a bloquear", "(Instagram, X, TikTok)"],
			open: ["Abre o Instagram"],
			gate: ["Ainda tem", "quizzes grátis?"],
			solve: ["Responde ao quiz,", "o Instagram abre"],
			paywall: ["Paywall"],
			pays: ["Paga?"],
			pro: ["Quizzes ilimitados,", "todos os pacotes"],
			no: [],
		} as Record<NodeId, string[]>,
		noText: { first: ["Apps bloqueadas ficam", "bloqueadas para sempre"], fixed: ["Bloqueio pausa até", "aos quizzes de amanhã"] } as Record<Mode, string[]>,
		edge: { yes: "sim", no: "não", next: "próximo scroll" } as Record<string, string>,
		title: "O paywall do LockFeed, em fluxo",
		first: "O primeiro plano do JMA",
		fixed: "Uma versão que a Apple aceita",
		pay: "Simular um utilizador que paga",
		skip: "Simular um utilizador que não paga",
		aria: "Diagrama de fluxo do paywall por limite do LockFeed",
		rejected: "REJEITADA",
		reason: "uso indevido da API Screen Time",
		noteFirst: <>O limite em si estava bem. O problema era a última caixa. <strong>Fazer reféns as outras apps do utilizador até ele pagar</strong> transforma uma ferramenta que ele instalou para se ajudar a si próprio em ransomware com uma UI bonita, e a revisão da Apple apanhou isso.</>,
		noteFixed: <>O mesmo limite, o mesmo paywall. Só muda a última caixa. <strong>Não pagar custa ao utilizador os quizzes, nunca o próprio telemóvel.</strong> Os quizzes grátis voltam amanhã, e o bloqueio continua a ser algo que ele controla. (Esta variante é sugestão minha, não o que o JMA lançou.)</>,
	},
};

export default function LockFeedFlow({ lang = "pt" }: { lang?: Lang }) {
	const t = T[lang];
	const [mode, setMode] = useState<Mode>("first");
	const [path, setPath] = useState<"pay" | "skip">("skip");
	const [step, setStep] = useState(-1);

	useEffect(() => {
		if (step < 0 || step >= PATHS[path].length - 1) return;
		const id = setTimeout(() => setStep((s) => s + 1), 750);
		return () => clearTimeout(id);
	}, [step, path]);

	const seq = PATHS[path];
	const visited = new Set(step >= 0 ? seq.slice(0, step + 1) : []);
	const current = step >= 0 ? seq[step] : null;
	const walked = new Set<string>();
	for (let i = 1; i <= step; i++) walked.add(`${seq[i - 1]}-${seq[i]}`);
	const done = step === seq.length - 1;
	const rejected = done && path === "skip" && mode === "first";

	const run = (p: "pay" | "skip") => {
		setPath(p);
		setStep(0);
	};

	const nodeColor = (id: NodeId) => {
		if (id === "no") return mode === "first" ? "var(--mx-bad)" : "var(--mx-good)";
		if (id === "pro") return "var(--mx-good)";
		return "var(--text)";
	};

	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">{t.title}</span>
				<div className="mx-row" role="tablist">
					<button role="tab" className="mx-btn" aria-selected={mode === "first"} onClick={() => { setMode("first"); setStep(-1); }}>{t.first}</button>
					<button role="tab" className="mx-btn" aria-selected={mode === "fixed"} onClick={() => { setMode("fixed"); setStep(-1); }}>{t.fixed}</button>
				</div>
			</div>
			<div className="mx-row" style={{ marginBottom: 8 }}>
				<button className="mx-btn" onClick={() => run("pay")}>{t.pay}</button>
				<button className="mx-btn" onClick={() => run("skip")}>{t.skip}</button>
			</div>
			<div className="mx-panel" style={{ position: "relative" }}>
				<svg viewBox="0 0 560 500" width="100%" role="img" aria-label={t.aria}>
					<defs>
						<marker id="mx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
							<path d="M0,0 L10,5 L0,10 z" fill="var(--text-soft)" />
						</marker>
					</defs>
					{EDGES.map((e) => {
						const on = walked.has(`${e.from}-${e.to}`);
						return (
							<g key={e.id}>
								<path
									d={e.d}
									fill="none"
									stroke={on ? "var(--mx-accent)" : "var(--text-soft)"}
									strokeWidth={on ? 2.5 : 1.5}
									strokeDasharray={on ? "6 2" : undefined}
									style={on ? { animation: "mx-dash 0.6s linear infinite" } : undefined}
									markerEnd="url(#mx-arrow)"
								/>
								{e.label && <text x={e.lx} y={e.ly} fontSize="11" fill="var(--text-soft)">{t.edge[e.label]}</text>}
							</g>
						);
					})}
					{(Object.keys(POS) as NodeId[]).map((id) => {
						const n = POS[id];
						const text = id === "no" ? t.noText[mode] : t.text[id];
						const isCur = current === id;
						const stroke = isCur ? "var(--mx-accent)" : nodeColor(id);
						const fill = visited.has(id) ? "color-mix(in srgb, var(--mx-accent) 12%, var(--bg))" : "var(--bg)";
						return (
							<g key={id} style={isCur ? { transformOrigin: `${n.x}px ${n.y}px`, animation: "mx-pop 0.3s ease-out" } : undefined}>
								{n.diamond ? (
									<polygon points={`${n.x},${n.y - 28} ${n.x + 62},${n.y} ${n.x},${n.y + 28} ${n.x - 62},${n.y}`} fill={fill} stroke={stroke} strokeWidth={isCur ? 2.5 : 1.5} />
								) : (
									<rect x={n.x - W / 2} y={n.y - H / 2} width={W} height={H} rx={8} fill={fill} stroke={stroke} strokeWidth={isCur ? 2.5 : 1.5} />
								)}
								{text.map((line, i) => (
									<text key={i} x={n.x} y={n.y + (i - (text.length - 1) / 2) * 13 + 4} fontSize="11.5" textAnchor="middle" fill="var(--text)">
										{line}
									</text>
								))}
							</g>
						);
					})}
					{rejected && (
						<g style={{ transformOrigin: "430px 470px", animation: "mx-stamp 0.35s ease-out forwards" }}>
							<rect x={330} y={448} width={200} height={42} rx={6} fill="none" stroke="var(--mx-bad)" strokeWidth={3} />
							<text x={430} y={469} fontSize="15" fontWeight="700" textAnchor="middle" fill="var(--mx-bad)">{t.rejected}</text>
							<text x={430} y={483} fontSize="9.5" textAnchor="middle" fill="var(--mx-bad)">{t.reason}</text>
						</g>
					)}
				</svg>
			</div>
			<p className="mx-note">{mode === "first" ? t.noteFirst : t.noteFixed}</p>
		</div>
	);
}
