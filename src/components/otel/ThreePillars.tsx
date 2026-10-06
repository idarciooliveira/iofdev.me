import { useState } from "react";
import { SPANS, TOTAL_MS, SERVICE_COLOR, depth, TRACE_ID } from "./scenario";
import type { Lang } from "../../i18n";
import "./otel.css";

const T = {
	en: {
		metricAria: "p95 latency of /checkout, spiking at 14:03",
		metricLabel: "p95 latency of /checkout (ms)",
		exemplar: "exemplar: trace 4bf9…",
		metricNote: ["The metric says ", "something got slow at 14:03", ". It says nothing about which request, or why."],
		traceNote: ["The trace shows ", "where the time went", ". 3.3 seconds disappeared inside one call to the bank."],
		title: "One incident, three views",
		correlate: "Correlate with trace ID",
		tabs: { logs: "Logs", metrics: "Metrics", traces: "Traces" },
		q: { logs: "What happened?", metrics: "Is it getting worse?", traces: "Where did it go wrong?" },
		logNote: ["The log tells ", "exactly what happened and when", ". With thousands of lines per second, finding the relevant five is the hard part."],
		logLinked: " With a trace ID on each line, you can filter to one request.",
	},
	pt: {
		metricAria: "latência p95 de /checkout, com um pico às 14:03",
		metricLabel: "latência p95 de /checkout (ms)",
		exemplar: "exemplar: trace 4bf9…",
		metricNote: ["A métrica diz que ", "algo ficou lento às 14:03", ". Não diz que pedido foi, nem porquê."],
		traceNote: ["O trace mostra ", "para onde foi o tempo", ". 3,3 segundos desapareceram numa única chamada ao banco."],
		title: "Um incidente, três vistas",
		correlate: "Correlacionar com o trace ID",
		tabs: { logs: "Logs", metrics: "Métricas", traces: "Traces" },
		q: { logs: "O que aconteceu?", metrics: "Está a piorar?", traces: "Onde correu mal?" },
		logNote: ["O log diz ", "exatamente o que aconteceu e quando", ". Com milhares de linhas por segundo, o difícil é encontrar as cinco que interessam."],
		logLinked: " Com um trace ID em cada linha, filtras por um só pedido.",
	},
};

type Tab = "logs" | "metrics" | "traces";

const LOGS = [
	{ t: "14:03:11.020", svc: "gateway", lvl: "INFO", msg: "POST /checkout user=42", trace: true },
	{ t: "14:03:11.110", svc: "inventory", lvl: "INFO", msg: "stock reserved items=3", trace: true },
	{ t: "14:03:11.720", svc: "payment", lvl: "INFO", msg: "calling bank-api /authorize", trace: true },
	{ t: "14:03:15.070", svc: "payment", lvl: "ERROR", msg: "bank-api timeout after 3350ms", trace: true },
	{ t: "14:03:15.220", svc: "gateway", lvl: "ERROR", msg: "upstream returned 504", trace: true },
	{ t: "14:03:15.400", svc: "gateway", lvl: "INFO", msg: "POST /checkout user=17 status=200", trace: false },
];

const P95 = [180, 190, 175, 200, 185, 210, 3900, 4100, 3800, 4200, 600, 220];

function Metrics({ correlate, onJump, lang }: { correlate: boolean; onJump: () => void; lang: Lang }) {
	const t = T[lang];
	const w = 520, h = 140, pad = 24, max = 4500;
	const x = (i: number) => pad + (i * (w - pad * 2)) / (P95.length - 1);
	const y = (v: number) => h - pad - (v / max) * (h - pad * 2);
	const d = P95.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
	return (
		<div>
			<svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={t.metricAria}>
				<line x1={pad} x2={w - pad} y1={h - pad} y2={h - pad} stroke="var(--border-soft)" />
				<path d={d} fill="none" stroke="var(--otx-metric)" strokeWidth="2" />
				{P95.map((v, i) => (
					<circle key={i} cx={x(i)} cy={y(v)} r={2.5} fill="var(--otx-metric)" />
				))}
				<text x={pad} y={12} fontSize="10" fill="var(--text-soft)">{t.metricLabel}</text>
				<text x={x(6)} y={h - 6} fontSize="10" fill="var(--text-soft)" textAnchor="middle">14:03</text>
				{correlate && (
					<g style={{ cursor: "pointer" }} onClick={onJump}>
						<circle cx={x(9)} cy={y(P95[9])} r={7} fill="none" stroke="var(--otx-trace)" strokeWidth="2" style={{ animation: "otx-pulse 1.4s infinite" }} />
						<text x={x(9) - 8} y={y(P95[9]) - 12} fontSize="10" fill="var(--otx-trace)" textAnchor="end">{t.exemplar}</text>
					</g>
				)}
			</svg>
			<p className="otx-note">{t.metricNote[0]}<strong>{t.metricNote[1]}</strong>{t.metricNote[2]}</p>
		</div>
	);
}

function Waterfall({ lang }: { lang: Lang }) {
	const t = T[lang];
	return (
		<div>
			{SPANS.map((s) => (
				<div key={s.id} style={{ display: "grid", gridTemplateColumns: "minmax(90px,170px) 1fr", gap: 8, alignItems: "center", marginBottom: 4 }}>
					<span className="otx-mono" style={{ paddingLeft: depth(s) * 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={s.name}>
						{s.name}
					</span>
					<div style={{ position: "relative", height: 14, background: "var(--surface-soft)", borderRadius: 3 }}>
						<div style={{ position: "absolute", left: `${(s.start / TOTAL_MS) * 100}%`, width: `${((s.end - s.start) / TOTAL_MS) * 100}%`, top: 0, bottom: 0, borderRadius: 3, background: s.error ? "var(--otx-error)" : SERVICE_COLOR[s.service] }} />
					</div>
				</div>
			))}
			<p className="otx-note">{t.traceNote[0]}<strong>{t.traceNote[1]}</strong>{t.traceNote[2]}</p>
		</div>
	);
}

export default function ThreePillars({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const [tab, setTab] = useState<Tab>("logs");
	const [correlate, setCorrelate] = useState(false);
	const tabs: { id: Tab; label: string; color: string; q: string }[] = [
		{ id: "logs", label: t.tabs.logs, color: "var(--otx-log)", q: t.q.logs },
		{ id: "metrics", label: t.tabs.metrics, color: "var(--otx-metric)", q: t.q.metrics },
		{ id: "traces", label: t.tabs.traces, color: "var(--otx-trace)", q: t.q.traces },
	];
	const active = tabs.find((t) => t.id === tab)!;
	return (
		<div className="otx not-prose">
			<div className="otx-head">
				<span className="otx-title">{t.title}</span>
				<label className="otx-switch">
					<input type="checkbox" checked={correlate} onChange={(e) => setCorrelate(e.target.checked)} />
					{t.correlate}
				</label>
			</div>
			<div className="otx-tabs" role="tablist">
				{tabs.map((t) => (
					<button key={t.id} role="tab" aria-selected={tab === t.id} className="otx-tab" style={tab === t.id ? { borderColor: t.color, color: t.color } : undefined} onClick={() => setTab(t.id)}>
						{t.label}
					</button>
				))}
			</div>
			<p style={{ marginBottom: 8, color: active.color, fontWeight: 700 }}>{active.q}</p>
			<div className="otx-panel">
				{tab === "logs" && (
					<div>
						<div className="otx-mono" style={{ display: "grid", gap: 2, overflowX: "auto" }}>
							{LOGS.map((l, i) => (
								<div key={i} style={{ display: "flex", gap: 8, whiteSpace: "nowrap", opacity: correlate && !l.trace ? 0.35 : 1 }}>
									<span style={{ color: "var(--text-soft)" }}>{l.t}</span>
									<span style={{ color: l.lvl === "ERROR" ? "var(--otx-error)" : "var(--text-soft)", width: 44 }}>{l.lvl}</span>
									<span>{l.svc}: {l.msg}</span>
									{correlate && l.trace && (
										<button className="otx-chip" style={{ color: "var(--otx-trace)", background: "none", cursor: "pointer", font: "inherit", fontSize: 11 }} onClick={() => setTab("traces")}>
											trace_id={TRACE_ID.slice(0, 4)}…
										</button>
									)}
								</div>
							))}
						</div>
						<p className="otx-note">{t.logNote[0]}<strong>{t.logNote[1]}</strong>{t.logNote[2]}{correlate ? t.logLinked : ""}</p>
					</div>
				)}
				{tab === "metrics" && <Metrics correlate={correlate} onJump={() => setTab("traces")} lang={lang} />}
				{tab === "traces" && <Waterfall lang={lang} />}
			</div>
		</div>
	);
}
