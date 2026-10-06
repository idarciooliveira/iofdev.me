import { useEffect, useRef, useState } from "react";
import { SPANS, TOTAL_MS, SERVICE_COLOR, depth, TRACE_ID } from "./scenario";
import type { Lang } from "../../i18n";
import "./otel.css";

const T = {
	en: {
		title: "Follow one request through four services",
		hint: "Click a span for its attributes",
		replay: "▶ Replay request",
		propagate: "Propagate context",
		one: (n: number) => `1 trace · ${n} spans`,
		broken: "4 unrelated traces, one per service. Nothing says they belong to the same request.",
		error: "error",
		ok: "ok",
		childOf: (n: string) => ` · child of ${n}`,
		root: " · root span",
	},
	pt: {
		title: "Seguir um pedido por quatro serviços",
		hint: "Clica num span para ver os atributos",
		replay: "▶ Repetir pedido",
		propagate: "Propagar contexto",
		one: (n: number) => `1 trace · ${n} spans`,
		broken: "4 traces sem relação, um por serviço. Nada indica que pertencem ao mesmo pedido.",
		error: "erro",
		ok: "ok",
		childOf: (n: string) => ` · filho de ${n}`,
		root: " · span raiz",
	},
};

const ISOLATED_IDS: Record<string, string> = {
	gateway: "9a1c…",
	"order-service": "51de…",
	"inventory-service": "c07b…",
	"payment-service": "e3f4…",
};

export default function TraceExplorer({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const [propagate, setPropagate] = useState(true);
	const [progress, setProgress] = useState(1);
	const [selected, setSelected] = useState("f6");
	const raf = useRef(0);

	function replay() {
		cancelAnimationFrame(raf.current);
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setProgress(1);
		const start = performance.now();
		const run = (now: number) => {
			const p = Math.min((now - start) / 4500, 1);
			setProgress(p);
			if (p < 1) raf.current = requestAnimationFrame(run);
		};
		setProgress(0);
		raf.current = requestAnimationFrame(run);
	}
	useEffect(() => () => cancelAnimationFrame(raf.current), []);

	const now = progress * TOTAL_MS;
	const sel = SPANS.find((s) => s.id === selected)!;
	const services = Object.keys(SERVICE_COLOR);

	return (
		<div className="otx not-prose">
			<div className="otx-head">
				<span className="otx-title">{t.title}</span>
				<span className="otx-hint">{t.hint}</span>
			</div>
			<div className="otx-row" style={{ marginBottom: 12 }}>
				<button className="otx-btn" onClick={replay}>{t.replay}</button>
				<label className="otx-switch">
					<input type="checkbox" checked={propagate} onChange={(e) => setPropagate(e.target.checked)} />
					{t.propagate}
				</label>
			</div>

			<div className="otx-panel">
				{propagate ? (
					<p className="otx-mono" style={{ marginBottom: 8 }}>
						trace_id <span style={{ color: "var(--otx-trace)" }}>{TRACE_ID}</span> · {t.one(SPANS.length)}
					</p>
				) : (
					<p className="otx-mono" style={{ marginBottom: 8, color: "var(--otx-error)" }}>
						{t.broken}
					</p>
				)}
				{SPANS.map((s) => {
					const visible = now >= s.start;
					const end = Math.min(now, s.end);
					const w = visible ? ((end - s.start) / TOTAL_MS) * 100 : 0;
					return (
						<button
							key={s.id}
							onClick={() => setSelected(s.id)}
							aria-pressed={selected === s.id}
							style={{ display: "grid", gridTemplateColumns: "minmax(110px,190px) 1fr", gap: 8, alignItems: "center", width: "100%", padding: "2px 0", marginBottom: 2, background: "none", border: 0, color: "inherit", font: "inherit", textAlign: "left", cursor: "pointer", opacity: visible ? 1 : 0.3 }}
						>
							<span className="otx-mono" style={{ paddingLeft: propagate ? depth(s) * 10 : 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: selected === s.id ? 700 : 400 }}>
								{!propagate && <span style={{ color: SERVICE_COLOR[s.service] }}>{ISOLATED_IDS[s.service]} </span>}
								{s.name}
							</span>
							<span style={{ position: "relative", height: 14, background: "var(--surface-soft)", borderRadius: 3, display: "block" }}>
								<span style={{ position: "absolute", top: 0, bottom: 0, left: `${(s.start / TOTAL_MS) * 100}%`, width: `${w}%`, borderRadius: 3, background: s.error ? "var(--otx-error)" : SERVICE_COLOR[s.service], outline: selected === s.id ? "2px solid var(--text)" : "none", outlineOffset: 1 }} />
							</span>
						</button>
					);
				})}
				<div className="otx-row" style={{ marginTop: 8, color: "var(--text-soft)" }}>
					{services.map((sv) => (
						<span key={sv}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: SERVICE_COLOR[sv], marginRight: 4 }} />{sv}</span>
					))}
				</div>
			</div>

			<div className="otx-panel" style={{ marginTop: 10 }}>
				<p style={{ fontWeight: 700 }}>
					{sel.name} <span className="otx-chip" style={{ color: sel.error ? "var(--otx-error)" : "var(--otx-ok)" }}>{sel.error ? t.error : t.ok}</span>
				</p>
				<p className="otx-mono" style={{ color: "var(--text-soft)", marginBottom: 6 }}>
					{sel.service} · {sel.end - sel.start} ms{sel.parent ? t.childOf(SPANS.find((p) => p.id === sel.parent)!.name) : t.root}
				</p>
				<div className="otx-mono">
					{Object.entries(sel.attrs).map(([k, v]) => (
						<div key={k}><span style={{ color: "var(--text-soft)" }}>{k}</span> = {v}</div>
					))}
				</div>
			</div>
		</div>
	);
}
