import { useState } from "react";
import type { Lang } from "../../i18n";
import "./otel.css";

const T = {
	en: {
		title: "How we got here",
		hint: "Click a year",
		aria: "Timeline",
		events: [
			{ year: "1960", title: "Observability in control theory", body: "Rudolf Kalman defines a system as observable if you can work out its internal state from its outputs. The software world borrows the word decades later." },
			{ year: "2010", title: "Google publishes Dapper", body: "A paper on tracing requests across thousands of services inside Google. It introduces the shape we still use today, a trace made of spans." },
			{ year: "2012", title: "Zipkin and Prometheus", body: "Twitter open-sources Zipkin, a Dapper-style tracer. Prometheus starts at SoundCloud the same year and later becomes the default open source metrics system." },
			{ year: "2016", title: "OpenTracing joins the CNCF", body: "A vendor-neutral tracing API. It is only an API, so you still need a separate implementation behind it." },
			{ year: "2017", title: "Jaeger joins the CNCF", body: "Uber's tracing backend becomes a CNCF project. Teams now have open source tools, but each one comes with its own instrumentation." },
			{ year: "2018", title: "OpenCensus from Google", body: "Libraries that collect traces and metrics together and ship them to exporters. It overlaps with OpenTracing, and teams have to pick a side." },
			{ year: "2019", title: "Two projects become one", body: "OpenTracing and OpenCensus merge into OpenTelemetry. The goal is one set of APIs, SDKs and a wire protocol that everyone can share." },
			{ year: "2020", title: "W3C Trace Context", body: "The traceparent header becomes a W3C Recommendation, so services built with different tools can pass a trace along to each other." },
			{ year: "2021 to 2023", title: "Signals reach stable", body: "Tracing is declared stable in 2021, metrics around 2022 and logs in 2023. Each language SDK matures on its own schedule." },
			{ year: "Now", title: "Semantic conventions and more signals", body: "The work shifts to shared attribute names, so http.request.method means the same thing everywhere, and to new signals such as profiles." },
		],
	},
	pt: {
		title: "Como chegámos aqui",
		hint: "Clica num ano",
		aria: "Linha do tempo",
		events: [
			{ year: "1960", title: "Observabilidade na teoria de controlo", body: "Rudolf Kalman define um sistema como observável se der para perceber o seu estado interno a partir das saídas. O mundo do software só pede emprestada a palavra décadas depois." },
			{ year: "2010", title: "A Google publica o Dapper", body: "Um artigo sobre como seguir pedidos entre milhares de serviços dentro da Google. Introduz a forma que ainda usamos hoje, um trace feito de spans." },
			{ year: "2012", title: "Zipkin e Prometheus", body: "O Twitter abre o código do Zipkin, um tracer ao estilo do Dapper. O Prometheus nasce na SoundCloud no mesmo ano e mais tarde torna-se o sistema de métricas open source por defeito." },
			{ year: "2016", title: "OpenTracing entra na CNCF", body: "Uma API de tracing neutra em relação aos fornecedores. É só uma API, por isso continuas a precisar de uma implementação por trás." },
			{ year: "2017", title: "Jaeger entra na CNCF", body: "O backend de tracing da Uber passa a projeto da CNCF. Já há ferramentas open source, mas cada uma vem com a sua própria instrumentação." },
			{ year: "2018", title: "OpenCensus, da Google", body: "Bibliotecas que recolhem traces e métricas em conjunto e enviam para exporters. Sobrepõe-se ao OpenTracing e as equipas têm de escolher um lado." },
			{ year: "2019", title: "Dois projetos tornam-se um", body: "OpenTracing e OpenCensus fundem-se no OpenTelemetry. O objetivo é um só conjunto de APIs, SDKs e um protocolo que todos possam partilhar." },
			{ year: "2020", title: "W3C Trace Context", body: "O cabeçalho traceparent torna-se uma Recomendação do W3C, e serviços feitos com ferramentas diferentes passam a conseguir passar um trace uns aos outros." },
			{ year: "2021 a 2023", title: "Os sinais chegam a estável", body: "O tracing é declarado estável em 2021, as métricas por volta de 2022 e os logs em 2023. Cada SDK de linguagem amadurece ao seu ritmo." },
			{ year: "Agora", title: "Convenções semânticas e mais sinais", body: "O trabalho passa para nomes de atributos partilhados, para que http.request.method queira dizer o mesmo em todo o lado, e para novos sinais como profiles." },
		],
	},
};

export default function OtelTimeline({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const [i, setI] = useState(6);
	const ev = t.events[i];
	return (
		<div className="otx not-prose">
			<div className="otx-head">
				<span className="otx-title">{t.title}</span>
				<span className="otx-hint">{t.hint}</span>
			</div>
			<div className="otx-tabs" role="tablist" aria-label={t.aria}>
				{t.events.map((e, n) => (
					<button key={e.year} role="tab" aria-selected={n === i} className="otx-tab" onClick={() => setI(n)}>
						{e.year}
					</button>
				))}
			</div>
			<div className="otx-panel" role="tabpanel" key={i} style={{ animation: "otx-pop .2s ease-out" }}>
				<p style={{ fontWeight: 700, marginBottom: 4 }}>
					{ev.year} · {ev.title}
				</p>
				<p>{ev.body}</p>
			</div>
			<div style={{ position: "relative", height: 6, marginTop: 14, background: "var(--surface-soft)", borderRadius: 3 }}>
				<div style={{ position: "absolute", inset: 0, width: `${((i + 1) / t.events.length) * 100}%`, background: "var(--otx-trace)", borderRadius: 3, transition: "width .3s" }} />
			</div>
		</div>
	);
}
