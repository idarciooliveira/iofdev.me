import { useState } from "react";
import type { Lang } from "../../i18n";
import "./otel.css";

type Item = { attrs: Record<string, string> };

const T = {
	en: {
		title: "Build a Collector pipeline",
		hint: "Toggle processors and exporters, then send an item",
		gets: "Receiver gets:",
		samples: ["Checkout request", "Health check", "Login"],
		send: "Send ▶",
		procs: "Processors, in order",
		exps: "Exporters",
		notes: { filter: "drops /healthz spans", redact: "masks user.email", attrs: "adds deployment.environment", batch: "groups items before export" },
		received: "received",
		in: "In",
		out: "Out",
		copied: (n: number) => `(copied to ${n} exporters)`,
		dropped: "dropped by the filter processor",
		nowhere: "no exporter selected, data goes nowhere",
		footer: (s: number, d: number) => [`Sent `, String(s), ` · dropped `, String(d), `. The application did not change at any point.`],
	},
	pt: {
		title: "Monta um pipeline do Collector",
		hint: "Liga e desliga processors e exporters, depois envia um item",
		gets: "O receiver recebe:",
		samples: ["Pedido de checkout", "Health check", "Login"],
		send: "Enviar ▶",
		procs: "Processors, por ordem",
		exps: "Exporters",
		notes: { filter: "descarta spans de /healthz", redact: "mascara user.email", attrs: "adiciona deployment.environment", batch: "agrupa itens antes de exportar" },
		received: "recebidos",
		in: "Entrada",
		out: "Saída",
		copied: (n: number) => `(copiado para ${n} exporters)`,
		dropped: "descartado pelo processor filter",
		nowhere: "nenhum exporter selecionado, os dados não vão a lado nenhum",
		footer: (s: number, d: number) => [`Enviados `, String(s), ` · descartados `, String(d), `. A aplicação não mudou em momento nenhum.`],
	},
};

const SAMPLES: Item[] = [
	{ attrs: { "http.route": "/checkout", "http.status_code": "200", "user.email": "ana@example.com" } },
	{ attrs: { "http.route": "/healthz", "http.status_code": "200" } },
	{ attrs: { "http.route": "/login", "http.status_code": "401", "user.email": "rui@example.com" } },
];

const PROCESSORS = [
	{ id: "filter", name: "filter" },
	{ id: "redact", name: "redact" },
	{ id: "attrs", name: "attributes" },
	{ id: "batch", name: "batch" },
] as const;
const EXPORTERS = ["Jaeger", "Prometheus", "Vendor X"];

export default function CollectorPipeline({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const [on, setOn] = useState<Record<string, boolean>>({ filter: true, redact: true, attrs: true, batch: true });
	const [exps, setExps] = useState<Record<string, boolean>>({ Jaeger: true, Prometheus: false, "Vendor X": true });
	const [sample, setSample] = useState(0);
	const [stats, setStats] = useState({ sent: 0, dropped: 0, out: {} as Record<string, number> });
	const [run, setRun] = useState(0);

	const item = SAMPLES[sample];
	const dropped = on.filter && item.attrs["http.route"] === "/healthz";
	const out: Record<string, string> = { ...item.attrs };
	if (on.redact && out["user.email"]) out["user.email"] = "***";
	if (on.attrs) out["deployment.environment"] = "production";
	const targets = EXPORTERS.filter((e) => exps[e]);

	function send() {
		setRun((r) => r + 1);
		setStats((s) => {
			const o = { ...s.out };
			if (!dropped) targets.forEach((t) => (o[t] = (o[t] ?? 0) + 1));
			return { sent: s.sent + 1, dropped: s.dropped + (dropped ? 1 : 0), out: o };
		});
	}
	const json = (o: Record<string, string>) => JSON.stringify(o, null, 2);
	const toggle = (id: string) => setOn((p) => ({ ...p, [id]: !p[id] }));

	return (
		<div className="otx not-prose">
			<div className="otx-head">
				<span className="otx-title">{t.title}</span>
				<span className="otx-hint">{t.hint}</span>
			</div>
			<div className="otx-row" style={{ marginBottom: 10 }}>
				<span style={{ color: "var(--text-soft)" }}>{t.gets}</span>
				{SAMPLES.map((_, n) => (
					<button key={n} className="otx-btn" aria-pressed={sample === n} onClick={() => setSample(n)}>{t.samples[n]}</button>
				))}
				<button className="otx-btn" onClick={send} style={{ borderColor: "var(--otx-trace)" }}>{t.send}</button>
			</div>

			<div className="otx-grid-2" style={{ marginBottom: 10 }}>
				<div>
					<p className="otx-hint" style={{ marginBottom: 4 }}>{t.procs}</p>
					<div style={{ display: "grid", gap: 4 }}>
						{PROCESSORS.map((p) => (
							<label key={p.id} className="otx-switch otx-panel" style={{ padding: "0.4rem 0.6rem" }}>
								<input type="checkbox" checked={on[p.id]} onChange={() => toggle(p.id)} />
								<span><strong>{p.name}</strong> <span style={{ color: "var(--text-soft)" }}>{t.notes[p.id]}</span></span>
							</label>
						))}
					</div>
				</div>
				<div>
					<p className="otx-hint" style={{ marginBottom: 4 }}>{t.exps}</p>
					<div style={{ display: "grid", gap: 4 }}>
						{EXPORTERS.map((e) => (
							<label key={e} className="otx-switch otx-panel" style={{ padding: "0.4rem 0.6rem" }}>
								<input type="checkbox" checked={exps[e]} onChange={() => setExps((p) => ({ ...p, [e]: !p[e] }))} />
								<span><strong>{e}</strong> <span style={{ color: "var(--text-soft)" }}>{stats.out[e] ?? 0} {t.received}</span></span>
							</label>
						))}
					</div>
				</div>
			</div>

			<div className="otx-grid-2">
				<div>
					<p className="otx-hint" style={{ marginBottom: 4 }}>{t.in}</p>
					<pre><code>{json(item.attrs)}</code></pre>
				</div>
				<div>
					<p className="otx-hint" style={{ marginBottom: 4 }}>{t.out} {targets.length > 1 ? t.copied(targets.length) : ""}</p>
					<pre key={run} style={{ animation: run ? "otx-pop .25s ease-out" : undefined, color: dropped ? "var(--otx-error)" : undefined }}>
						<code>{dropped ? t.dropped : targets.length ? json(out) : t.nowhere}</code>
					</pre>
				</div>
			</div>
			<p className="otx-note">{t.footer(stats.sent, stats.dropped)[0]}<strong>{stats.sent}</strong>{t.footer(stats.sent, stats.dropped)[2]}<strong>{stats.dropped}</strong>{t.footer(stats.sent, stats.dropped)[4]}</p>
		</div>
	);
}
