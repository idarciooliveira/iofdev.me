import { useEffect, useState } from "react";
import Phone, { type Screen } from "./Phone";
import type { Lang } from "../../i18n";
import "./mx.css";

type ModelId = "hard" | "trial" | "freemium" | "metered";

type Model = {
	id: ModelId;
	name: string;
	oneLine: string;
	screens: (Screen & { step: string })[];
	good: string;
	bad: string;
	fits: string;
};

type Copy = {
	onboardingStep: string;
	onboardingHead: string;
	getStarted: string;
	usesApp: string;
	question: string;
	frets: [string, string, string];
	answer: string;
};

const onboarding = (c: Copy, id: string): Screen & { step: string } => ({
	id,
	step: c.onboardingStep,
	blocks: [
		{ t: "img", text: "illustration", h: 110 },
		{ t: "h", text: c.onboardingHead },
		{ t: "bars", n: 2 },
		{ t: "cta", text: c.getStarted },
	],
});

const app = (c: Copy, id: string, note: string): Screen & { step: string } => ({
	id,
	step: c.usesApp,
	blocks: [
		{ t: "s", text: note },
		{ t: "h", text: c.question },
		{ t: "opt", text: c.frets[0], on: true },
		{ t: "opt", text: c.frets[1] },
		{ t: "opt", text: c.frets[2] },
		{ t: "cta", text: c.answer },
	],
});

const EN: Copy = {
	onboardingStep: "Onboarding",
	onboardingHead: "Stop scrolling. Start learning.",
	getStarted: "Get started",
	usesApp: "Uses the app",
	question: "Where is C on the 5th string?",
	frets: ["3rd fret", "5th fret", "7th fret"],
	answer: "Answer",
};

const PT: Copy = {
	onboardingStep: "Onboarding",
	onboardingHead: "Pára de fazer scroll. Começa a aprender.",
	getStarted: "Começar",
	usesApp: "Usa a app",
	question: "Onde está o Dó na 5.ª corda?",
	frets: ["3.ª casa", "5.ª casa", "7.ª casa"],
	answer: "Responder",
};

const MODELS_EN: Model[] = [
	{
		id: "hard",
		name: "Hard paywall",
		oneLine: "Pay before you can use anything.",
		screens: [
			onboarding(EN, "h1"),
			{
				id: "h2",
				step: "Paywall",
				blocks: [
					{ t: "h", text: "Unlock LockFeed" },
					{ t: "bars", n: 3 },
					{ t: "opt", text: "Yearly", right: "$29.99", on: true },
					{ t: "opt", text: "Weekly", right: "$4.99" },
					{ t: "cta", text: "Continue" },
					{ t: "fine", text: "No free option" },
				],
			},
			{ ...app(EN, "h3", "Paid user"), step: "Paid, uses the app" },
		],
		good: "Every user who gets past the paywall is paying. Revenue shows up on day one, and you never serve free users who cost money and never convert.",
		bad: "Nobody gets to check whether the product is good before paying. That brings more refunds, worse reviews and very little word of mouth, because most people who install never see the product.",
		fits: "Apps whose value is easy to picture before trying them, with paid ads bringing traffic.",
	},
	{
		id: "trial",
		name: "Free trial",
		oneLine: "Full access for a few days, then billing starts.",
		screens: [
			onboarding(EN, "t1"),
			{
				id: "t2",
				step: "Trial offer",
				blocks: [
					{ t: "h", text: "Try 7 days free" },
					{ t: "opt", text: "Today", right: "Full access" },
					{ t: "opt", text: "Day 5", right: "Reminder" },
					{ t: "opt", text: "Day 7", right: "$29.99/yr" },
					{ t: "cta", text: "Start free trial" },
					{ t: "fine", text: "Cancel anytime before day 7" },
				],
			},
			{ ...app(EN, "t3", "Trial · 6 days left"), step: "Tries everything" },
			{
				id: "t4",
				step: "Converts or cancels",
				blocks: [
					{ t: "img", text: "receipt", h: 70 },
					{ t: "h", text: "Your trial ended" },
					{ t: "s", text: "You were charged $29.99. Thanks for staying." },
					{ t: "cta", text: "Keep learning" },
				],
			},
		],
		good: "People judge the real product, so the ones who pay meant to pay. The timeline screen (today, reminder, charge day) also builds trust.",
		bad: "Revenue arrives a week late, and part of it never arrives because people cancel. A weak product gets found out during the trial.",
		fits: "Products that prove themselves in a few days of normal use.",
	},
	{
		id: "freemium",
		name: "Freemium",
		oneLine: "A free tier forever, with paid features on top.",
		screens: [
			onboarding(EN, "f1"),
			{ ...app(EN, "f2", "Free plan"), step: "Uses the free tier" },
			{
				id: "f3",
				step: "Hits a premium feature",
				blocks: [
					{ t: "h", text: "Chess puzzles are Pro" },
					{ t: "img", text: "locked pack preview", h: 90 },
					{ t: "s", text: "Free plan: guitar notes only" },
					{ t: "cta", text: "See Pro plans" },
					{ t: "fine", text: "Maybe later" },
				],
			},
		],
		good: "The product can spread on its own, because anyone can install it and share it. Free users become reviews, referrals and an audience.",
		bad: "Most users never pay, and you pay to serve all of them. If the free tier is too good, nobody upgrades. If it is too thin, nobody stays.",
		fits: "Products where usage grows over time and some features are clearly worth more to heavy users.",
	},
	{
		id: "metered",
		name: "Metered (soft) paywall",
		oneLine: "Use it for free a few times, then pay.",
		screens: [
			onboarding(EN, "m1"),
			{ ...app(EN, "m2", "Free quiz 1 of 3"), step: "Quiz 1 of 3" },
			{ ...app(EN, "m3", "Free quiz 3 of 3"), step: "Quiz 3 of 3" },
			{
				id: "m4",
				step: "Limit reached",
				blocks: [
					{ t: "h", text: "You solved 3 quizzes" },
					{ t: "s", text: "Keep the streak going with unlimited quizzes." },
					{ t: "opt", text: "Yearly", right: "$29.99", on: true },
					{ t: "opt", text: "Monthly", right: "$5.99" },
					{ t: "cta", text: "Go unlimited" },
				],
			},
		],
		good: "The paywall shows up right after the user got value, so it asks for money at a moment that feels earned. This is what JMA chose for LockFeed.",
		bad: "You have to pick the limit. Set it too high and people never hit it. Set it too low and it works like a hard paywall that hides the real price.",
		fits: "Products with a repeated action you can count: quizzes, exports, messages, generations.",
	},
];

const MODELS_PT: Model[] = [
	{
		id: "hard",
		name: "Hard paywall",
		oneLine: "Pagas antes de poder usar o que quer que seja.",
		screens: [
			onboarding(PT, "h1"),
			{
				id: "h2",
				step: "Paywall",
				blocks: [
					{ t: "h", text: "Desbloqueia o LockFeed" },
					{ t: "bars", n: 3 },
					{ t: "opt", text: "Anual", right: "$29.99", on: true },
					{ t: "opt", text: "Semanal", right: "$4.99" },
					{ t: "cta", text: "Continuar" },
					{ t: "fine", text: "Sem opção grátis" },
				],
			},
			{ ...app(PT, "h3", "Utilizador pago"), step: "Pagou, usa a app" },
		],
		good: "Todos os utilizadores que passam do paywall estão a pagar. A receita aparece no primeiro dia e nunca serves utilizadores grátis que custam dinheiro e nunca convertem.",
		bad: "Ninguém consegue ver se o produto é bom antes de pagar. Isso traz mais reembolsos, piores reviews e quase nenhum boca a boca, porque a maioria de quem instala nunca chega a ver o produto.",
		fits: "Apps cujo valor é fácil de imaginar antes de as experimentar, com anúncios pagos a trazer tráfego.",
	},
	{
		id: "trial",
		name: "Free trial",
		oneLine: "Acesso total durante uns dias, depois começa a cobrança.",
		screens: [
			onboarding(PT, "t1"),
			{
				id: "t2",
				step: "Oferta de trial",
				blocks: [
					{ t: "h", text: "Experimenta 7 dias grátis" },
					{ t: "opt", text: "Hoje", right: "Acesso total" },
					{ t: "opt", text: "Dia 5", right: "Lembrete" },
					{ t: "opt", text: "Dia 7", right: "$29.99/ano" },
					{ t: "cta", text: "Começar trial grátis" },
					{ t: "fine", text: "Cancela quando quiseres antes do dia 7" },
				],
			},
			{ ...app(PT, "t3", "Trial · faltam 6 dias"), step: "Experimenta tudo" },
			{
				id: "t4",
				step: "Converte ou cancela",
				blocks: [
					{ t: "img", text: "recibo", h: 70 },
					{ t: "h", text: "O teu trial terminou" },
					{ t: "s", text: "Foste cobrado $29.99. Obrigado por ficares." },
					{ t: "cta", text: "Continuar a aprender" },
				],
			},
		],
		good: "As pessoas julgam o produto real, por isso quem paga queria mesmo pagar. O ecrã com a linha do tempo (hoje, lembrete, dia da cobrança) também cria confiança.",
		bad: "A receita chega uma semana atrasada, e parte dela nunca chega porque as pessoas cancelam. Um produto fraco é descoberto durante o trial.",
		fits: "Produtos que se provam em poucos dias de uso normal.",
	},
	{
		id: "freemium",
		name: "Freemium",
		oneLine: "Um plano grátis para sempre, com funcionalidades pagas por cima.",
		screens: [
			onboarding(PT, "f1"),
			{ ...app(PT, "f2", "Plano grátis"), step: "Usa o plano grátis" },
			{
				id: "f3",
				step: "Chega a uma funcionalidade premium",
				blocks: [
					{ t: "h", text: "Os puzzles de xadrez são Pro" },
					{ t: "img", text: "pré-visualização bloqueada", h: 90 },
					{ t: "s", text: "Plano grátis: só notas de guitarra" },
					{ t: "cta", text: "Ver planos Pro" },
					{ t: "fine", text: "Talvez mais tarde" },
				],
			},
		],
		good: "O produto pode espalhar-se sozinho, porque qualquer pessoa o pode instalar e partilhar. Os utilizadores grátis transformam-se em reviews, recomendações e audiência.",
		bad: "A maioria nunca paga, e tu pagas para servir todos. Se o plano grátis for bom demais, ninguém faz upgrade. Se for fraco demais, ninguém fica.",
		fits: "Produtos em que o uso cresce com o tempo e algumas funcionalidades valem claramente mais para quem usa muito.",
	},
	{
		id: "metered",
		name: "Paywall por limite (soft)",
		oneLine: "Usas de graça umas quantas vezes, depois pagas.",
		screens: [
			onboarding(PT, "m1"),
			{ ...app(PT, "m2", "Quiz grátis 1 de 3"), step: "Quiz 1 de 3" },
			{ ...app(PT, "m3", "Quiz grátis 3 de 3"), step: "Quiz 3 de 3" },
			{
				id: "m4",
				step: "Limite atingido",
				blocks: [
					{ t: "h", text: "Resolveste 3 quizzes" },
					{ t: "s", text: "Mantém a sequência com quizzes ilimitados." },
					{ t: "opt", text: "Anual", right: "$29.99", on: true },
					{ t: "opt", text: "Mensal", right: "$5.99" },
					{ t: "cta", text: "Passar a ilimitado" },
				],
			},
		],
		good: "O paywall aparece logo depois de o utilizador ter tirado valor, por isso pede dinheiro num momento que parece merecido. Foi o que o JMA escolheu para o LockFeed.",
		bad: "Tens de escolher o limite. Se for alto demais, ninguém lá chega. Se for baixo demais, funciona como um hard paywall que esconde o preço real.",
		fits: "Produtos com uma ação repetida que dá para contar: quizzes, exportações, mensagens, gerações.",
	},
];

const T = {
	en: { models: MODELS_EN, title: "Four paywall models, same app", pause: "Pause", play: "Play", upside: "Upside.", downside: "Downside.", fitsLabel: "Fits." },
	pt: { models: MODELS_PT, title: "Quatro modelos de paywall, a mesma app", pause: "Pausar", play: "Reproduzir", upside: "Vantagem.", downside: "Desvantagem.", fitsLabel: "Serve para." },
};

export default function PaywallModels({ lang = "pt" }: { lang?: Lang }) {
	const t = T[lang];
	const MODELS = t.models;
	const [model, setModel] = useState<ModelId>("hard");
	const [step, setStep] = useState(0);
	const [playing, setPlaying] = useState(true);
	const m = MODELS.find((x) => x.id === model)!;

	useEffect(() => {
		if (!playing) return;
		const id = setInterval(() => setStep((s) => (s + 1) % m.screens.length), 1800);
		return () => clearInterval(id);
	}, [playing, m.screens.length]);

	const pick = (id: ModelId) => {
		setModel(id);
		setStep(0);
	};

	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">{t.title}</span>
				<button className="mx-btn" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
					{playing ? t.pause : t.play}
				</button>
			</div>
			<div className="mx-row" role="tablist" style={{ marginBottom: 12 }}>
				{MODELS.map((x) => (
					<button key={x.id} role="tab" aria-selected={x.id === model} className="mx-btn" onClick={() => pick(x.id)}>
						{x.name}
					</button>
				))}
			</div>
			<div className="mx-split">
				<Phone screen={m.screens[step]} label={`${m.name}: ${m.screens[step].step}`} />
				<div style={{ display: "grid", gap: 10 }}>
					<p style={{ fontWeight: 700 }}>{m.oneLine}</p>
					<ol className="mx-list">
						{m.screens.map((s, i) => (
							<li key={s.id}>
								<button
									className="mx-btn"
									aria-pressed={i === step}
									style={{ width: "100%", textAlign: "left" }}
									onClick={() => {
										setStep(i);
										setPlaying(false);
									}}
								>
									{i + 1}. {s.step}
								</button>
							</li>
						))}
					</ol>
					<div className="mx-panel" style={{ display: "grid", gap: 6 }}>
						<p><strong style={{ color: "var(--mx-good)" }}>{t.upside}</strong> {m.good}</p>
						<p><strong style={{ color: "var(--mx-bad)" }}>{t.downside}</strong> {m.bad}</p>
						<p><strong>{t.fitsLabel}</strong> {m.fits}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
