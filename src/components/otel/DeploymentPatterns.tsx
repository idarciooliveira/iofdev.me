import { useState } from "react";
import type { Lang } from "../../i18n";
import "./otel.css";

const T = {
	en: {
		title: "Where does the Collector live?",
		good: "Good for.",
		watch: "Watch out.",
		note: "Most real setups combine them. A node agent or sidecar sends to a gateway that owns sampling and exports.",
		pod: "pod", node: "node", service: "collector service",
		modes: [
			{ id: "sidecar", name: "Sidecar", best: "Isolation per workload and per-team config.", cost: "One Collector per pod. Resource use adds up fast." },
			{ id: "agent", name: "Node agent", best: "Host metrics and enriching data with node details.", cost: "Shared by every pod on the node, so one noisy app affects the rest." },
			{ id: "gateway", name: "Standalone gateway", best: "Central place for sampling, routing and credentials.", cost: "One more service to run, scale and keep available." },
		],
	},
	pt: {
		title: "Onde vive o Collector?",
		good: "Bom para.",
		watch: "Atenção.",
		note: "Na prática, combinam-se. Um agent por nó ou um sidecar envia para um gateway que trata do sampling e das exportações.",
		pod: "pod", node: "nó", service: "serviço collector",
		modes: [
			{ id: "sidecar", name: "Sidecar", best: "Isolamento por carga de trabalho e configuração por equipa.", cost: "Um Collector por pod. O consumo de recursos soma depressa." },
			{ id: "agent", name: "Agent por nó", best: "Métricas do host e enriquecer dados com detalhes do nó.", cost: "É partilhado por todos os pods do nó, e uma aplicação barulhenta afeta as outras." },
			{ id: "gateway", name: "Gateway standalone", best: "Um sítio central para sampling, encaminhamento e credenciais.", cost: "Mais um serviço para correr, escalar e manter disponível." },
		],
	},
};

export default function DeploymentPatterns({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const [i, setI] = useState(0);
	const m = t.modes[i];
	const box = (label: string, hot = false) => (
		<span className="otx-panel otx-mono" style={{ padding: "0.3rem 0.6rem", borderColor: hot ? "var(--otx-trace)" : undefined }}>{label}</span>
	);
	const arrow = (
		<span aria-hidden style={{ position: "relative", display: "inline-block", width: 40, height: 2, background: "var(--border-soft)", margin: "0 4px" }}>
			<span style={{ position: "absolute", top: -2, left: 0, width: 6, height: 6, borderRadius: 3, background: "var(--otx-trace)", animation: "otx-flow-x 1.4s infinite linear" }} />
		</span>
	);
	return (
		<div className="otx not-prose">
			<div className="otx-head"><span className="otx-title">{t.title}</span></div>
			<div className="otx-tabs" role="tablist">
				{t.modes.map((x, n) => (
					<button key={x.id} role="tab" aria-selected={n === i} className="otx-tab" onClick={() => setI(n)}>{x.name}</button>
				))}
			</div>
			<div className="otx-panel" key={m.id} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4, justifyContent: "center", padding: "1.2rem 0.8rem" }}>
				{m.id === "sidecar" && (
					<span className="otx-panel" style={{ display: "flex", gap: 6, alignItems: "center", padding: "0.4rem" }}>
						<span style={{ color: "var(--text-soft)" }}>{t.pod}</span><span>{box("app")}</span><span>{box("collector", true)}</span>
					</span>
				)}
				{m.id === "agent" && (
					<span className="otx-panel" style={{ display: "flex", gap: 6, alignItems: "center", padding: "0.4rem", flexWrap: "wrap" }}>
						<span style={{ color: "var(--text-soft)" }}>{t.node}</span><span>{box("app")}</span><span>{box("app")}</span><span>{box("collector", true)}</span>
					</span>
				)}
				{m.id === "gateway" && (<>
					<span style={{ display: "flex", flexDirection: "column", gap: 4 }}><span>{box("app")}</span><span>{box("app")}</span><span>{box("app")}</span></span>
					{arrow}{box(t.service, true)}
				</>)}
				{arrow}{box("backend")}
			</div>
			<div className="otx-grid-2" style={{ marginTop: 10 }}>
				<p><strong>{t.good}</strong> {m.best}</p>
				<p><strong>{t.watch}</strong> {m.cost}</p>
			</div>
			<p className="otx-note">{t.note}</p>
		</div>
	);
}
