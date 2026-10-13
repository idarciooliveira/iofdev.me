import { useEffect, useState } from "react";
import "./mx.css";

type NodeId = "install" | "choose" | "open" | "gate" | "solve" | "paywall" | "pays" | "pro" | "no";
type Mode = "first" | "fixed";

const W = 170;
const H = 40;

const NODES: Record<NodeId, { x: number; y: number; text: string[]; diamond?: boolean }> = {
	install: { x: 200, y: 30, text: ["Installs LockFeed"] },
	choose: { x: 200, y: 95, text: ["Picks apps to lock", "(Instagram, X, TikTok)"] },
	open: { x: 200, y: 160, text: ["Opens Instagram"] },
	gate: { x: 200, y: 235, text: ["Free quizzes", "left?"], diamond: true },
	solve: { x: 440, y: 235, text: ["Answers quiz,", "Instagram opens"] },
	paywall: { x: 200, y: 315, text: ["Paywall"] },
	pays: { x: 200, y: 390, text: ["Pays?"], diamond: true },
	pro: { x: 440, y: 390, text: ["Unlimited quizzes,", "every pack"] },
	no: { x: 200, y: 470, text: [] },
};

const EDGES: { id: string; from: NodeId; to: NodeId; d: string; label?: string; lx?: number; ly?: number }[] = [
	{ id: "install-choose", from: "install", to: "choose", d: "M200,50 V75" },
	{ id: "choose-open", from: "choose", to: "open", d: "M200,115 V140" },
	{ id: "open-gate", from: "open", to: "gate", d: "M200,180 V207" },
	{ id: "gate-solve", from: "gate", to: "solve", d: "M262,235 H355", label: "yes", lx: 300, ly: 228 },
	{ id: "solve-open", from: "solve", to: "open", d: "M440,215 V160 H285", label: "next scroll", lx: 448, ly: 190 },
	{ id: "gate-paywall", from: "gate", to: "paywall", d: "M200,263 V295", label: "no", lx: 208, ly: 284 },
	{ id: "paywall-pays", from: "paywall", to: "pays", d: "M200,335 V368" },
	{ id: "pays-pro", from: "pays", to: "pro", d: "M262,390 H355", label: "yes", lx: 300, ly: 383 },
	{ id: "pays-no", from: "pays", to: "no", d: "M200,412 V450", label: "no", lx: 208, ly: 436 },
];

const PATHS: Record<"pay" | "skip", NodeId[]> = {
	pay: ["install", "choose", "open", "gate", "solve", "open", "gate", "paywall", "pays", "pro"],
	skip: ["install", "choose", "open", "gate", "solve", "open", "gate", "paywall", "pays", "no"],
};

const NO_TEXT: Record<Mode, string[]> = {
	first: ["Locked apps stay", "locked forever"],
	fixed: ["Gate pauses until", "tomorrow's free quizzes"],
};

export default function LockFeedFlow() {
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
				<span className="mx-title">LockFeed's paywall, as a flow</span>
				<div className="mx-row" role="tablist">
					<button role="tab" className="mx-btn" aria-selected={mode === "first"} onClick={() => { setMode("first"); setStep(-1); }}>JMA's first plan</button>
					<button role="tab" className="mx-btn" aria-selected={mode === "fixed"} onClick={() => { setMode("fixed"); setStep(-1); }}>A version Apple accepts</button>
				</div>
			</div>
			<div className="mx-row" style={{ marginBottom: 8 }}>
				<button className="mx-btn" onClick={() => run("pay")}>Simulate a user who pays</button>
				<button className="mx-btn" onClick={() => run("skip")}>Simulate a user who doesn't</button>
			</div>
			<div className="mx-panel" style={{ position: "relative" }}>
				<svg viewBox="0 0 560 500" width="100%" role="img" aria-label="Flow diagram of the LockFeed metered paywall">
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
								{e.label && <text x={e.lx} y={e.ly} fontSize="11" fill="var(--text-soft)">{e.label}</text>}
							</g>
						);
					})}
					{(Object.keys(NODES) as NodeId[]).map((id) => {
						const n = NODES[id];
						const text = id === "no" ? NO_TEXT[mode] : n.text;
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
							<text x={430} y={469} fontSize="15" fontWeight="700" textAnchor="middle" fill="var(--mx-bad)">REJECTED</text>
							<text x={430} y={483} fontSize="9.5" textAnchor="middle" fill="var(--mx-bad)">improper use of Screen Time API</text>
						</g>
					)}
				</svg>
			</div>
			<p className="mx-note">
				{mode === "first" ? (
					<>The meter itself was fine. The problem was the last box. <strong>Holding the user's other apps hostage until they pay</strong> turns a tool they installed to help themselves into ransomware with a nice UI, and Apple's review caught it.</>
				) : (
					<>Same meter, same paywall. The only change is the last box. <strong>Not paying costs the user the quizzes, never their own phone.</strong> Free quizzes come back tomorrow, and the lock stays something they control. (This variant is my suggestion, not what JMA shipped.)</>
				)}
			</p>
		</div>
	);
}
