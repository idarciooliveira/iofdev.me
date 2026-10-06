import { useRef, useState } from "react";
import type { Lang } from "../../i18n";
import "./otel.css";

type Kind = "counter" | "updown" | "gauge" | "histogram";
const KINDS: { id: Kind; name: string; ex: string }[] = [
	{ id: "counter", name: "Counter", ex: "http.server.requests" },
	{ id: "updown", name: "UpDownCounter", ex: "db.connections.active" },
	{ id: "gauge", name: "Gauge", ex: "process.memory.usage" },
	{ id: "histogram", name: "Histogram", ex: "http.server.duration" },
];

const T = {
	en: {
		title: "Pick the right instrument",
		hint: "Press the buttons to record measurements",
		q: {
			counter: "Only goes up. Ask for the rate: how many requests per second?",
			updown: "Goes up and down. Ask for the current total of something that opens and closes.",
			gauge: "A reading at one moment. Ask what the value is right now.",
			histogram: "A distribution. Ask how slow the slowest users are, not just the average.",
		},
		req1: "+1 request", burst: "burst of 10", open: "open connection", close: "close connection", mem: "Memory MB",
		one: "one request", fifty: "50 requests", reset: "reset",
		current: "current value:", avg: "average", spark: "Recorded values over time",
		histNote: "The average hides the slow tail. Watch p95 move away from p50 as you add requests.",
	},
	pt: {
		title: "Escolhe o instrumento certo",
		hint: "Carrega nos botões para registar medições",
		q: {
			counter: "Só sobe. Pergunta pela taxa: quantos pedidos por segundo?",
			updown: "Sobe e desce. Pergunta pelo total atual de algo que abre e fecha.",
			gauge: "Uma leitura num instante. Pergunta qual é o valor agora.",
			histogram: "Uma distribuição. Pergunta quão lentos são os utilizadores mais lentos, não só a média.",
		},
		req1: "+1 pedido", burst: "rajada de 10", open: "abrir ligação", close: "fechar ligação", mem: "Memória MB",
		one: "um pedido", fifty: "50 pedidos", reset: "limpar",
		current: "valor atual:", avg: "média", spark: "Valores registados ao longo do tempo",
		histNote: "A média esconde a cauda lenta. Vê o p95 afastar-se do p50 à medida que juntas pedidos.",
	},
};
const BUCKETS = [50, 100, 250, 500, 1000, Infinity];
const LABELS = ["<50", "<100", "<250", "<500", "<1s", "1s+"];

function Spark({ data, color, max, label }: { data: number[]; color: string; max: number; label: string }) {
	const w = 520, h = 100;
	const pts = data.map((v, i) => `${(i / Math.max(data.length - 1, 1)) * w},${h - 6 - (v / Math.max(max, 1)) * (h - 14)}`);
	return (
		<svg viewBox={`0 0 ${w} ${h}`} width="100%" height={100} role="img" aria-label={label}>
			<line x1="0" x2={w} y1={h - 6} y2={h - 6} stroke="var(--border-soft)" />
			{data.length > 1 && <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" />}
		</svg>
	);
}

export default function InstrumentLab({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const [kind, setKind] = useState<Kind>("counter");
	const [series, setSeries] = useState<Record<Kind, number[]>>({ counter: [0], updown: [0], gauge: [40], histogram: [] });
	const [hist, setHist] = useState<number[]>(BUCKETS.map(() => 0));
	const lat = useRef<number[]>([]);
	const k = KINDS.find((x) => x.id === kind)!;

	const push = (id: Kind, f: (last: number) => number) =>
		setSeries((s) => ({ ...s, [id]: [...s[id].slice(-39), f(s[id][s[id].length - 1] ?? 0)] }));
	const record = (ms: number) => {
		lat.current.push(ms);
		setHist((h) => h.map((c, i) => (ms < BUCKETS[i] && (i === 0 || ms >= BUCKETS[i - 1]) ? c + 1 : c)));
	};
	const fakeLatency = () => Math.round(40 + Math.exp(Math.random() * 3.6) * 8 * (Math.random() < 0.08 ? 6 : 1));
	const sorted = [...lat.current].sort((a, b) => a - b);
	const pct = (p: number) => (sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] : 0);
	const avg = sorted.length ? Math.round(sorted.reduce((a, b) => a + b, 0) / sorted.length) : 0;
	const cur = series[kind];
	const last = cur[cur.length - 1] ?? 0;
	const hmax = Math.max(...hist, 1);

	return (
		<div className="otx not-prose">
			<div className="otx-head">
				<span className="otx-title">{t.title}</span>
				<span className="otx-hint">{t.hint}</span>
			</div>
			<div className="otx-tabs" role="tablist">
				{KINDS.map((x) => (
					<button key={x.id} role="tab" aria-selected={kind === x.id} className="otx-tab" onClick={() => setKind(x.id)}>{x.name}</button>
				))}
			</div>
			<p style={{ marginBottom: 8 }}><span className="otx-mono" style={{ color: "var(--otx-metric)" }}>{k.ex}</span> · {t.q[kind]}</p>
			<div className="otx-panel">
				<div className="otx-row" style={{ marginBottom: 8 }}>
					{kind === "counter" && (<>
						<button className="otx-btn" onClick={() => push("counter", (l) => l + 1)}>{t.req1}</button>
						<button className="otx-btn" onClick={() => { for (let n = 0; n < 10; n++) push("counter", (l) => l + 1 + Math.floor(Math.random() * 3)); }}>{t.burst}</button>
					</>)}
					{kind === "updown" && (<>
						<button className="otx-btn" onClick={() => push("updown", (l) => l + 1)}>{t.open}</button>
						<button className="otx-btn" onClick={() => push("updown", (l) => Math.max(0, l - 1))}>{t.close}</button>
					</>)}
					{kind === "gauge" && (
						<label className="otx-switch">{t.mem}
							<input type="range" min={10} max={100} value={last} onChange={(e) => push("gauge", () => Number(e.target.value))} />
						</label>
					)}
					{kind === "histogram" && (<>
						<button className="otx-btn" onClick={() => record(fakeLatency())}>{t.one}</button>
						<button className="otx-btn" onClick={() => { for (let n = 0; n < 50; n++) record(fakeLatency()); }}>{t.fifty}</button>
						<button className="otx-btn" onClick={() => { lat.current = []; setHist(BUCKETS.map(() => 0)); }}>{t.reset}</button>
					</>)}
				</div>
				{kind !== "histogram" ? (
					<>
						<Spark data={cur} color="var(--otx-metric)" max={Math.max(...cur, 10)} label={t.spark} />
						<p className="otx-mono">{t.current} <strong>{last}</strong></p>
					</>
				) : (
					<>
						<div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100 }}>
							{hist.map((c, n) => (
								<div key={n} style={{ flex: 1, textAlign: "center" }}>
									<div style={{ height: (c / hmax) * 80, background: "var(--otx-metric)", borderRadius: 3, transition: "height .2s" }} title={`${c} requests`} />
									<span className="otx-hint">{LABELS[n]}</span>
								</div>
							))}
						</div>
						<p className="otx-mono" style={{ marginTop: 6 }}>n={sorted.length} · {t.avg} {avg} ms · p50 {pct(0.5)} ms · p95 {pct(0.95)} ms</p>
					</>
				)}
			</div>
			{kind === "histogram" && <p className="otx-note">{t.histNote}</p>}
		</div>
	);
}
