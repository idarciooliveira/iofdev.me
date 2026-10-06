import { useState } from "react";
import type { Lang } from "../../i18n";
import "./otel.css";

const COLORS = ["var(--text-soft)", "var(--otx-trace)", "var(--otx-metric)", "var(--otx-log)"];
const VALUES = ["00", "4bf92f3577b34da6a3ce929d0e0e4736", "00f067aa0ba902b7", "01"];
const KEYS = ["version", "trace-id", "parent-id", "trace-flags"];

const T = {
	en: {
		title: "Inside the traceparent header",
		hint: "Hover or tap a segment",
		texts: [
			"Format version. It has been 00 since the spec was published.",
			"128-bit ID shared by every span in the request. This is what stitches the journey together.",
			"64-bit ID of the span that made the call. The receiving service uses it as the parent of its own first span.",
			"A bit field. 01 means the caller sampled this trace, so downstream services should keep their spans too.",
		],
	},
	pt: {
		title: "Dentro do cabeçalho traceparent",
		hint: "Passa o rato ou toca num segmento",
		texts: [
			"Versão do formato. É 00 desde que a especificação foi publicada.",
			"ID de 128 bits partilhado por todos os spans do pedido. É isto que cola a viagem toda.",
			"ID de 64 bits do span que fez a chamada. O serviço que recebe usa-o como pai do seu primeiro span.",
			"Um campo de bits. 01 quer dizer que quem chamou fez sampling deste trace, por isso os serviços seguintes devem guardar os seus spans também.",
		],
	},
};
const PARTS = KEYS.map((key, n) => ({ key, value: VALUES[n], color: COLORS[n] }));

export default function TraceparentDecoder({ lang = "en" }: { lang?: Lang }) {
	const t = T[lang];
	const [i, setI] = useState(1);
	const p = PARTS[i];
	return (
		<div className="otx not-prose">
			<div className="otx-head">
				<span className="otx-title">{t.title}</span>
				<span className="otx-hint">{t.hint}</span>
			</div>
			<div className="otx-panel">
				<p className="otx-mono" style={{ color: "var(--text-soft)", marginBottom: 6 }}>GET /authorize HTTP/1.1</p>
				<div className="otx-mono" style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: 4 }}>
					<span style={{ color: "var(--text-soft)" }}>traceparent: </span>
					{PARTS.map((part, n) => (
						<span key={part.key}>
							{n > 0 && <span style={{ color: "var(--text-soft)" }}>-</span>}
							<button
								onMouseEnter={() => setI(n)}
								onFocus={() => setI(n)}
								onClick={() => setI(n)}
								style={{ font: "inherit", background: i === n ? "var(--surface-soft)" : "none", color: part.color, border: 0, borderBottom: `2px solid ${i === n ? part.color : "transparent"}`, padding: "0 2px", cursor: "pointer" }}
							>
								{part.value}
							</button>
						</span>
					))}
				</div>
			</div>
			<p className="otx-note" key={i} style={{ animation: "otx-pop .2s ease-out" }}>
				<strong style={{ color: p.color }}>{p.key}.</strong> {t.texts[i]}
			</p>
		</div>
	);
}
