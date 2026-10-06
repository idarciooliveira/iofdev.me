import { useState } from "react";
import type { Lang } from "../../i18n";
import "./otel.css";

const T = {
	en: {
		title: "From your code to a dashboard",
		hint: "Click a layer",
		layers: [
			{ name: "Your application", tag: "you write this", text: "Business code and the frameworks it uses. Libraries such as HTTP servers and database clients can call the OpenTelemetry API themselves, so you get telemetry without writing it." },
			{ name: "OpenTelemetry API", tag: "stable contract", text: "The interfaces for creating spans, recording measurements and emitting logs. Without an SDK installed, API calls do nothing and cost almost nothing. That is why library authors can depend on it safely." },
			{ name: "SDK", tag: "does the work", text: "The implementation behind the API. It holds the sampler, batches data, attaches resource attributes such as service.name and decides what leaves the process." },
			{ name: "OTLP exporter", tag: "wire format", text: "Serializes telemetry into OTLP, the protocol OpenTelemetry defines for traces, metrics and logs. It runs over gRPC or HTTP. One protocol for every signal." },
			{ name: "Collector", tag: "optional broker", text: "A standalone process that receives, processes and exports telemetry. It moves work like batching, redaction and routing out of the application." },
			{ name: "Backend", tag: "swap freely", text: "Where you store and query the data. Jaeger, Prometheus, Grafana Tempo or a commercial vendor. Changing it is a Collector config change, not an application change." },
		],
	},
	pt: {
		title: "Do teu código até ao dashboard",
		hint: "Clica numa camada",
		layers: [
			{ name: "A tua aplicação", tag: "escreves tu", text: "O código de negócio e as frameworks que usa. Bibliotecas como servidores HTTP e clientes de base de dados podem chamar a API do OpenTelemetry por si, e assim tens telemetria sem a escrever." },
			{ name: "API do OpenTelemetry", tag: "contrato estável", text: "As interfaces para criar spans, registar medições e emitir logs. Sem um SDK instalado, as chamadas à API não fazem nada e custam quase nada. É por isso que os autores de bibliotecas podem depender dela com segurança." },
			{ name: "SDK", tag: "faz o trabalho", text: "A implementação por trás da API. Tem o sampler, agrupa dados em lotes, junta atributos de recurso como service.name e decide o que sai do processo." },
			{ name: "Exporter OTLP", tag: "formato de transporte", text: "Serializa a telemetria em OTLP, o protocolo que o OpenTelemetry define para traces, métricas e logs. Corre sobre gRPC ou HTTP. Um só protocolo para todos os sinais." },
			{ name: "Collector", tag: "intermediário opcional", text: "Um processo separado que recebe, processa e exporta telemetria. Tira da aplicação trabalho como batching, redação de dados e encaminhamento." },
			{ name: "Backend", tag: "troca à vontade", text: "Onde guardas e consultas os dados. Jaeger, Prometheus, Grafana Tempo ou um fornecedor comercial. Mudá-lo é alterar a configuração do Collector, não a aplicação." },
		],
	},
};

export default function ArchitectureMap({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const LAYERS = t.layers;
	const [i, setI] = useState(0);
	const cur = LAYERS[i];
	return (
		<div className="otx not-prose">
			<div className="otx-head">
				<span className="otx-title">{t.title}</span>
				<span className="otx-hint">{t.hint}</span>
			</div>
			<div className="otx-grid-2" style={{ alignItems: "start" }}>
				<div role="tablist" aria-orientation="vertical" style={{ display: "flex", flexDirection: "column" }}>
					{LAYERS.map((l, n) => (
						<div key={l.name} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
							<button role="tab" aria-selected={n === i} className="otx-tab" onClick={() => setI(n)} style={{ display: "flex", justifyContent: "space-between", gap: 8, textAlign: "left" }}>
								<span>{l.name}</span>
								<span style={{ color: "var(--text-soft)", fontWeight: 400 }}>{l.tag}</span>
							</button>
							{n < LAYERS.length - 1 && (
								<div aria-hidden style={{ position: "relative", height: 26, width: 2, background: "var(--border-soft)", margin: "0 auto" }}>
									<span style={{ position: "absolute", left: -2, top: 0, width: 6, height: 6, borderRadius: 3, background: "var(--otx-trace)", ["--otx-dist" as string]: "20px", animation: `otx-flow-y 1.6s ${n * 0.25}s infinite linear` }} />
								</div>
							)}
						</div>
					))}
				</div>
				<div className="otx-panel" key={i} style={{ animation: "otx-pop .2s ease-out" }}>
					<p style={{ fontWeight: 700, marginBottom: 6 }}>{cur.name}</p>
					<p>{cur.text}</p>
				</div>
			</div>
		</div>
	);
}
