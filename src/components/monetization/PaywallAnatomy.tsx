import { useState, type CSSProperties, type ReactNode } from "react";
import type { Lang } from "../../i18n";
import "./mx.css";

type Spot = { n: number; name: string; does: string; line: string };

const SPOTS_EN: Spot[] = [
	{
		n: 1,
		name: "Outcome headline",
		does: "Repeats the goal the user picked during onboarding. It sells the result, not the app.",
		line: "Fair when the app can deliver that result. Misleading when the headline promises more than the product does.",
	},
	{
		n: 2,
		name: "Social proof",
		does: "Ratings, user counts or a short review. It answers 'do people like me use this?' right before the price.",
		line: "Fine with real numbers. Inventing reviews or ratings gets apps removed and, in many countries, breaks consumer law.",
	},
	{
		n: 3,
		name: "Struck-through anchor",
		does: "Shows a higher 'original' price so the real price looks like a deal. The framing demo above shows why it works.",
		line: "Honest only if that price was actually charged before. A price that never existed is a fake reference price.",
	},
	{
		n: 4,
		name: "Preselected annual plan",
		does: "The plan you want people to pick is already selected. Most users keep the default.",
		line: "Normal practice. It turns dark when the selected option is hard to change or the price is hidden.",
	},
	{
		n: 5,
		name: "Per-week breakdown",
		does: "$29.99 a year becomes '$0.58 a week'. A small unit makes the number feel small, and it sits next to a $4.99 weekly plan.",
		line: "Fine as long as the full amount charged is just as visible.",
	},
	{
		n: 6,
		name: "Trial toggle",
		does: "Lets the user switch the free trial on or off. Some apps use it to make 'no trial, pay now' feel like the user's choice.",
		line: "Make it obvious what the toggle changes: the price, the billing date, or both.",
	},
	{
		n: 7,
		name: "Call to action",
		does: "One big button with outcome words like 'Start my plan', instead of 'Subscribe' or 'Pay'.",
		line: "The billing terms near the button have to match what the button does.",
	},
	{
		n: 8,
		name: "Late close button",
		does: "The X fades in after a few seconds, or is tiny and grey. It keeps the user on the offer a little longer.",
		line: "This is the one I'd skip. Users notice, and app reviewers do too.",
	},
	{
		n: 9,
		name: "Restore and terms",
		does: "Restore purchases, terms and privacy links. Apple requires a way to restore purchases, and auto-renewing plans have to state price, length and renewal terms.",
		line: "Required, not optional. Leaving it out is a common rejection reason.",
	},
];

const SPOTS_PT: Spot[] = [
	{
		n: 1,
		name: "Título com o resultado",
		does: "Repete o objetivo que o utilizador escolheu no onboarding. Vende o resultado, não a app.",
		line: "Justo quando a app consegue entregar esse resultado. Enganador quando o título promete mais do que o produto faz.",
	},
	{
		n: 2,
		name: "Prova social",
		does: "Avaliações, número de utilizadores ou uma review curta. Responde a 'pessoas como eu usam isto?' mesmo antes do preço.",
		line: "Tudo bem com números reais. Inventar reviews ou avaliações dá remoção da loja e, em muitos países, viola a lei do consumidor.",
	},
	{
		n: 3,
		name: "Âncora riscada",
		does: "Mostra um preço 'original' mais alto para o preço real parecer uma pechincha. A demo de enquadramento acima mostra porque funciona.",
		line: "Só é honesto se esse preço foi mesmo cobrado antes. Um preço que nunca existiu é um preço de referência falso.",
	},
	{
		n: 4,
		name: "Plano anual pré-selecionado",
		does: "O plano que queres que escolham já vem selecionado. A maioria dos utilizadores fica com o que vem por omissão.",
		line: "Prática normal. Passa a dark pattern quando a opção selecionada é difícil de mudar ou o preço está escondido.",
	},
	{
		n: 5,
		name: "Divisão por semana",
		does: "$29.99 por ano passa a '$0.58 por semana'. Uma unidade pequena faz o número parecer pequeno, e fica ao lado de um plano semanal de $4.99.",
		line: "Tudo bem desde que o valor total cobrado esteja igualmente visível.",
	},
	{
		n: 6,
		name: "Interruptor de trial",
		does: "Deixa o utilizador ligar ou desligar o trial grátis. Algumas apps usam-no para fazer 'sem trial, paga já' parecer escolha do utilizador.",
		line: "Deixa claro o que o interruptor muda: o preço, a data de cobrança, ou as duas coisas.",
	},
	{
		n: 7,
		name: "Botão de ação",
		does: "Um botão grande com palavras de resultado como 'Começar o meu plano', em vez de 'Subscrever' ou 'Pagar'.",
		line: "As condições de cobrança junto ao botão têm de bater com o que o botão faz.",
	},
	{
		n: 8,
		name: "Botão de fechar tardio",
		does: "O X aparece só ao fim de uns segundos, ou é minúsculo e cinzento. Mantém o utilizador na oferta um pouco mais.",
		line: "Este é o que eu deixava de fora. Os utilizadores reparam, e quem revê as apps nas lojas também.",
	},
	{
		n: 9,
		name: "Restaurar e termos",
		does: "Restaurar compras, termos e privacidade. A Apple exige uma forma de restaurar compras, e os planos com renovação automática têm de indicar preço, duração e condições de renovação.",
		line: "Obrigatório, não opcional. Deixar isto de fora é um motivo comum de rejeição.",
	},
];

const T = {
	en: {
		spots: SPOTS_EN,
		title: "Anatomy of a paywall",
		hint: "Click a number on the phone or in the list",
		aria: "Wireframe of a subscription paywall",
		line: "Where the line is.",
		headline: "Learn guitar instead of scrolling",
		proof: "★★★★★ 4.8 · 20k learners",
		yearly: "Yearly",
		weekly: "Weekly",
		perWeek: "$0.58 / week",
		trial: "Free trial enabled",
		cta: "Start my plan",
		fine: "Restore · Terms · Privacy · Renews yearly",
	},
	pt: {
		spots: SPOTS_PT,
		title: "Anatomia de um paywall",
		hint: "Clica num número no telemóvel ou na lista",
		aria: "Wireframe de um paywall de subscrição",
		line: "Onde fica a linha.",
		headline: "Aprende guitarra em vez de fazer scroll",
		proof: "★★★★★ 4.8 · 20 mil alunos",
		yearly: "Anual",
		weekly: "Semanal",
		perWeek: "$0.58 / semana",
		trial: "Trial grátis ativo",
		cta: "Começar o meu plano",
		fine: "Restaurar · Termos · Privacidade · Renova anualmente",
	},
};

function Hot({ n, active, onPick, pin, children }: { n: number; active: number; onPick: (n: number) => void; pin?: CSSProperties; children: ReactNode }) {
	return (
		<div className="mx-hot" data-active={active === n ? "true" : "false"} onClick={(e) => { e.stopPropagation(); onPick(n); }} style={{ cursor: "pointer" }}>
			<span className="mx-pin" style={pin}>{n}</span>
			{children}
		</div>
	);
}

export default function PaywallAnatomy({ lang = "pt" }: { lang?: Lang }) {
	const t = T[lang];
	const SPOTS = t.spots;
	const [active, setActive] = useState(3);
	const spot = SPOTS.find((s) => s.n === active)!;

	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">{t.title}</span>
				<span className="mx-hint">{t.hint}</span>
			</div>
			<div className="mx-split">
				<div className="mx-phone" aria-label={t.aria}>
					<div className="mx-screen" style={{ gap: 6, animation: "none" }}>
						<Hot n={8} active={active} onPick={setActive}>
							<div style={{ textAlign: "right", fontSize: 10, color: "var(--text-soft)", opacity: active === 8 ? 1 : 0.25 }}>✕</div>
						</Hot>
						<Hot n={1} active={active} onPick={setActive}>
							<p className="mx-screen-h" style={{ paddingLeft: 8 }}>{t.headline}</p>
						</Hot>
						<Hot n={2} active={active} onPick={setActive}>
							<p className="mx-screen-s" style={{ paddingLeft: 8 }}>{t.proof}</p>
						</Hot>
						<Hot n={4} active={active} onPick={setActive} pin={{ top: 12 }}>
							<div className="mx-opt" data-on="true" style={{ flexDirection: "column", alignItems: "stretch", gap: 2 }}>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<span>{t.yearly} <span className="mx-badge">-50%</span></span>
									<span>$29.99</span>
								</div>
								<Hot n={3} active={active} onPick={setActive} pin={{ left: 4 }}>
									<div style={{ textAlign: "right", fontWeight: 400, color: "var(--text-soft)", textDecoration: "line-through" }}>$59.99</div>
								</Hot>
								<Hot n={5} active={active} onPick={setActive} pin={{ left: 4 }}>
									<div style={{ textAlign: "right", fontWeight: 400 }}>{t.perWeek}</div>
								</Hot>
							</div>
						</Hot>
						<div className="mx-opt"><span>{t.weekly}</span><span>$4.99</span></div>
						<Hot n={6} active={active} onPick={setActive}>
							<div className="mx-opt"><span>{t.trial}</span><span style={{ width: 24, height: 12, borderRadius: 999, background: "var(--text)", display: "inline-block" }} /></div>
						</Hot>
						<div style={{ marginTop: "auto", display: "grid", gap: 6 }}>
							<Hot n={7} active={active} onPick={setActive}>
								<div className="mx-cta">{t.cta}</div>
							</Hot>
							<Hot n={9} active={active} onPick={setActive}>
								<p className="mx-fine">{t.fine}</p>
							</Hot>
						</div>
					</div>
				</div>
				<div style={{ display: "grid", gap: 10 }}>
					<div className="mx-panel" key={spot.n} style={{ animation: "mx-pop 0.25s ease-out", display: "grid", gap: 6 }}>
						<p style={{ fontWeight: 700 }}>{spot.n}. {spot.name}</p>
						<p>{spot.does}</p>
						<p style={{ color: "var(--text-soft)" }}><strong style={{ color: "var(--text)" }}>{t.line}</strong> {spot.line}</p>
					</div>
					<ol className="mx-list" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
						{SPOTS.map((s) => (
							<li key={s.n}>
								<button className="mx-btn" aria-pressed={s.n === active} style={{ width: "100%", textAlign: "left", fontSize: "0.75rem" }} onClick={() => setActive(s.n)}>
									{s.n}. {s.name}
								</button>
							</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}
