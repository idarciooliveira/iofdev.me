import { useMemo, useState } from "react";
import type { Lang } from "../../i18n";
import "./otel.css";

const T = {
	en: {
		title: "Keep 10% of traces. Which 10%?",
		hint: "Each square is one trace",
		head: "Head sampling", tail: "Tail sampling", rate: "Rate", fresh: "New traffic",
		error: "error", slow: "slow (over 2s)", normal: "normal", legend: "filled = kept, hollow = dropped",
		kept: (k: number, n: number, pct: number) => `Kept ${k} of ${n} traces (${pct}% of the storage bill)`,
		errors: "Errors kept", slowKept: "slow kept", trace: "trace",
		headNote: "Head sampling flips a coin when the request starts. It is cheap and needs no memory, but the coin does not know the request is about to fail.",
		tailNote: "Tail sampling waits for the whole trace, then applies policies: keep every error, keep every slow trace, keep a share of the rest. The price is buffering every span until the trace is complete.",
	},
	pt: {
		title: "Guardar 10% dos traces. Quais 10%?",
		hint: "Cada quadrado é um trace",
		head: "Head sampling", tail: "Tail sampling", rate: "Taxa", fresh: "Novo tráfego",
		error: "erro", slow: "lento (mais de 2s)", normal: "normal", legend: "cheio = guardado, vazio = descartado",
		kept: (k: number, n: number, pct: number) => `Guardados ${k} de ${n} traces (${pct}% da fatura de armazenamento)`,
		errors: "Erros guardados", slowKept: "lentos guardados", trace: "trace",
		headNote: "O head sampling lança uma moeda ao ar quando o pedido começa. É barato e não precisa de memória, mas a moeda não sabe que o pedido está prestes a falhar.",
		tailNote: "O tail sampling espera pelo trace completo e aplica políticas: guardar todos os erros, guardar todos os traces lentos, guardar uma parte do resto. O preço é manter todos os spans em memória até o trace terminar.",
	},
};

type T = { id: number; kind: "ok" | "slow" | "error"; r: number };
const N = 120;

function makeTraces(seed: number): T[] {
	let s = seed;
	const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
	return Array.from({ length: N }, (_, id) => {
		const k = rnd();
		return { id, kind: k < 0.05 ? "error" : k < 0.14 ? "slow" : "ok", r: rnd() };
	});
}

export default function SamplingLab({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const [mode, setMode] = useState<"head" | "tail">("head");
	const [rate, setRate] = useState(10);
	const [seed, setSeed] = useState(7);
	const traces = useMemo(() => makeTraces(seed), [seed]);

	const kept = (t: T) => (mode === "head" ? t.r * 100 < rate : t.kind !== "ok" || t.r * 100 < rate);
	const keptList = traces.filter(kept);
	const count = (k: T["kind"], onlyKept = false) => (onlyKept ? keptList : traces).filter((t) => t.kind === k).length;
	const color = { ok: "var(--text-soft)", slow: "var(--otx-warn)", error: "var(--otx-error)" };

	return (
		<div className="otx not-prose">
			<div className="otx-head">
				<span className="otx-title">{t.title}</span>
				<span className="otx-hint">{t.hint}</span>
			</div>
			<div className="otx-row" style={{ marginBottom: 10 }}>
				<button className="otx-btn" aria-pressed={mode === "head"} onClick={() => setMode("head")}>{t.head}</button>
				<button className="otx-btn" aria-pressed={mode === "tail"} onClick={() => setMode("tail")}>{t.tail}</button>
				<label className="otx-switch">{t.rate} {rate}%
					<input type="range" min={1} max={100} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
				</label>
				<button className="otx-btn" onClick={() => setSeed((x) => x + 1)}>{t.fresh}</button>
			</div>
			<div className="otx-panel" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(18px, 1fr))", gap: 4 }}>
				{traces.map((tr) => (
					<span key={tr.id} title={`${tr.kind} ${t.trace}`} style={{ aspectRatio: "1", borderRadius: 3, background: kept(tr) ? color[tr.kind] : "transparent", border: `1.5px solid ${color[tr.kind]}`, opacity: kept(tr) ? 1 : 0.35, transition: "background .25s, opacity .25s" }} />
				))}
			</div>
			<div className="otx-row" style={{ marginTop: 8, color: "var(--text-soft)" }}>
				<span><span style={{ color: color.error }}>■</span> {t.error}</span>
				<span><span style={{ color: color.slow }}>■</span> {t.slow}</span>
				<span><span style={{ color: color.ok }}>■</span> {t.normal}</span>
				<span>{t.legend}</span>
			</div>
			<div className="otx-grid-2" style={{ marginTop: 10 }}>
				<p>{t.kept(keptList.length, N, Math.round((keptList.length / N) * 100))}</p>
				<p>
					{t.errors} <strong style={{ color: color.error }}>{count("error", true)}/{count("error")}</strong> · {t.slowKept} <strong style={{ color: color.slow }}>{count("slow", true)}/{count("slow")}</strong>
				</p>
			</div>
			<p className="otx-note">
				{mode === "head" ? t.headNote : t.tailNote}
			</p>
		</div>
	);
}
