import { useState, type ReactNode } from "react";
import type { Lang } from "../../i18n";
import "./mx.css";

type FrameId = "plain" | "discount" | "weekly" | "decoy";

type Frame = { id: FrameId; name: string; how: string; watch: string };

const FRAMES_EN: Frame[] = [
	{
		id: "plain",
		name: "Plain price",
		how: "One number, no context. The user compares $29.99 with whatever they have in their head: a coffee, Netflix, 'apps should be free'. You don't control that comparison.",
		watch: "Nothing deceptive here. It just leaves the reference point to chance.",
	},
	{
		id: "discount",
		name: "50% off",
		how: "The first number the user reads is $59.99. That becomes the reference, so $29.99 now looks like a gain of $30 instead of a cost of $30. Behavioural economists call this anchoring, from Tversky and Kahneman's work in the 1970s.",
		watch: "If $59.99 was never the real price, the discount is fake, and so is the 'ends when you leave' countdown if the same offer shows up tomorrow. In the EU, the Price Indication Directive (as amended in 2019) says an announced discount must be measured against the lowest price of the previous 30 days.",
	},
	{
		id: "weekly",
		name: "Per week",
		how: "The yearly price is divided into the smallest unit that still sounds normal. $0.58 a week feels like nothing, and it sits right next to a $4.99 weekly plan that makes it look 88% cheaper.",
		watch: "The full amount that will be charged has to be just as visible as the per-week number.",
	},
	{
		id: "decoy",
		name: "Decoy plan",
		how: "A monthly plan at $9.99 is there mostly to be rejected. Twelve months of it costs $119.88, so the $29.99 yearly plan looks like the smart choice. Dan Ariely's Economist subscription experiment in Predictably Irrational is the classic example.",
		watch: "Legit as long as every plan is real and can be bought. It only works if the plans are honest about what they include.",
	},
];

const FRAMES_PT: Frame[] = [
	{
		id: "plain",
		name: "Preço simples",
		how: "Um número, sem contexto. O utilizador compara $29.99 com o que tiver na cabeça: um café, a Netflix, 'as apps deviam ser grátis'. Não controlas essa comparação.",
		watch: "Nada de enganoso aqui. Só deixa o ponto de referência ao acaso.",
	},
	{
		id: "discount",
		name: "50% de desconto",
		how: "O primeiro número que o utilizador lê é $59.99. Esse passa a ser a referência, e $29.99 parece um ganho de $30 em vez de um custo de $30. Os economistas comportamentais chamam a isto ancoragem, do trabalho de Tversky e Kahneman nos anos 70.",
		watch: "Se $59.99 nunca foi o preço real, o desconto é falso, e a contagem 'acaba quando saíres' também, se a mesma oferta voltar amanhã. Na UE, a Diretiva de Indicação de Preços (alterada em 2019) obriga a medir um desconto anunciado contra o preço mais baixo dos 30 dias anteriores.",
	},
	{
		id: "weekly",
		name: "Por semana",
		how: "O preço anual é dividido pela unidade mais pequena que ainda soa normal. $0.58 por semana parece nada, e fica mesmo ao lado de um plano semanal de $4.99 que o faz parecer 88% mais barato.",
		watch: "O valor total que vai ser cobrado tem de estar tão visível como o número por semana.",
	},
	{
		id: "decoy",
		name: "Plano isco",
		how: "Um plano mensal a $9.99 está lá sobretudo para ser rejeitado. Doze meses dele custam $119.88, e o plano anual de $29.99 parece a escolha inteligente. A experiência do Dan Ariely com as assinaturas da Economist, no Predictably Irrational, é o exemplo clássico.",
		watch: "Legítimo desde que todos os planos sejam reais e possam ser comprados. Só funciona se os planos forem honestos sobre o que incluem.",
	},
];

const T = {
	en: {
		frames: FRAMES_EN,
		title: "Same $29.99, four framings",
		hint: "The price never changes. Only the context does.",
		watch: "Watch out.",
		pro: "LockFeed Pro, yearly",
		yearly: "Yearly",
		weekly: "Weekly",
		monthly: "Monthly",
		endsOnLeave: "Offer ends when you leave this screen",
		perWeek: "/ week",
		billedYearly: "billed $29.99 yearly",
		perYear: "$119.88 a year",
		best: "best value",
		save: "save 75%",
	},
	pt: {
		frames: FRAMES_PT,
		title: "Os mesmos $29.99, quatro enquadramentos",
		hint: "O preço nunca muda. Só muda o contexto.",
		watch: "Cuidado.",
		pro: "LockFeed Pro, anual",
		yearly: "Anual",
		weekly: "Semanal",
		monthly: "Mensal",
		endsOnLeave: "A oferta acaba quando saíres deste ecrã",
		perWeek: "/ semana",
		billedYearly: "cobrado $29.99 por ano",
		perYear: "$119.88 por ano",
		best: "melhor valor",
		save: "poupa 75%",
	},
};

type Copy = (typeof T)["en"];

function Card({ frame, t }: { frame: FrameId; t: Copy }) {
	const row = (label: ReactNode, right: ReactNode, on = false, sub?: ReactNode) => (
		<div className="mx-opt" data-on={on ? "true" : "false"} style={{ flexDirection: "column", alignItems: "stretch", gap: 2, fontSize: "0.8125rem", padding: "8px 10px" }}>
			<div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
				<span>{label}</span>
				<span>{right}</span>
			</div>
			{sub && <div style={{ textAlign: "right", fontWeight: 400, color: "var(--text-soft)", fontSize: "0.75rem" }}>{sub}</div>}
		</div>
	);
	return (
		<div key={frame} style={{ display: "grid", gap: 8, animation: "mx-pop 0.3s ease-out", maxWidth: 320 }}>
			{frame === "plain" && row(t.pro, "$29.99", true)}
			{frame === "discount" && row(
				<>{t.yearly} <span className="mx-badge">-50%</span></>,
				<span><s style={{ color: "var(--text-soft)", fontWeight: 400 }}>$59.99</s> $29.99</span>,
				true,
				t.endsOnLeave,
			)}
			{frame === "weekly" && (
				<>
					{row(t.yearly, `$0.58 ${t.perWeek}`, true, t.billedYearly)}
					{row(t.weekly, `$4.99 ${t.perWeek}`)}
				</>
			)}
			{frame === "decoy" && (
				<>
					{row(t.monthly, "$9.99", false, t.perYear)}
					{row(<>{t.yearly} <span className="mx-badge" style={{ background: "var(--mx-good)" }}>{t.best}</span></>, "$29.99", true, t.save)}
				</>
			)}
		</div>
	);
}

export default function PriceFraming({ lang = "pt" }: { lang?: Lang }) {
	const t = T[lang];
	const FRAMES = t.frames;
	const [frame, setFrame] = useState<FrameId>("plain");
	const f = FRAMES.find((x) => x.id === frame)!;
	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">{t.title}</span>
				<span className="mx-hint">{t.hint}</span>
			</div>
			<div className="mx-row" role="tablist" style={{ marginBottom: 12 }}>
				{FRAMES.map((x) => (
					<button key={x.id} role="tab" aria-selected={x.id === frame} className="mx-btn" onClick={() => setFrame(x.id)}>
						{x.name}
					</button>
				))}
			</div>
			<div className="mx-panel" style={{ display: "grid", gap: 12 }}>
				<Card frame={frame} t={t} />
				<p>{f.how}</p>
				<p style={{ color: "var(--text-soft)" }}><strong style={{ color: "var(--text)" }}>{t.watch}</strong> {f.watch}</p>
			</div>
		</div>
	);
}
