import { useEffect, useState } from "react";
import Phone, { type Screen } from "./Phone";
import type { Lang } from "../../i18n";
import "./mx.css";

type Step = Screen & { name: string; desire: number; tactic: string; why: string };

const STEPS_EN: Step[] = [
	{
		id: "o1",
		name: "Hook",
		desire: 15,
		tactic: "Name the problem",
		why: "The first screen names a habit the user already feels bad about. Nothing about features yet.",
		blocks: [
			{ t: "img", text: "phone with endless feed", h: 120 },
			{ t: "h", text: "Your phone is eating your day." },
			{ t: "cta", text: "Take the 1-minute quiz" },
		],
	},
	{
		id: "o2",
		name: "Self-assessment",
		desire: 30,
		tactic: "Make them answer",
		why: "Every tap is a small commitment. People who invested a minute answering questions are more likely to finish the flow, which is the commitment and consistency effect from Cialdini's Influence.",
		blocks: [
			{ t: "h", text: "How long do you scroll per day?" },
			{ t: "opt", text: "Under 1 hour" },
			{ t: "opt", text: "1 to 3 hours" },
			{ t: "opt", text: "3+ hours", on: true },
			{ t: "cta", text: "Next" },
		],
	},
	{
		id: "o3",
		name: "Pain in numbers",
		desire: 55,
		tactic: "Turn the answer into a loss",
		why: "The app repeats the answer back as a big, scary number. 3 hours a day becomes about 45 days a year. Same fact, much louder.",
		blocks: [
			{ t: "s", text: "Based on your answer" },
			{ t: "h", text: "You'll spend 45 days this year scrolling." },
			{ t: "img", text: "bar chart: you vs average", h: 80 },
			{ t: "cta", text: "That's a lot" },
		],
	},
	{
		id: "o4",
		name: "Goal",
		desire: 70,
		tactic: "Let them pick the dream",
		why: "Now the user describes the better version of themselves in their own words. The paywall will sell that, not the app.",
		blocks: [
			{ t: "h", text: "What do you want to learn instead?" },
			{ t: "opt", text: "Guitar fretboard", on: true },
			{ t: "opt", text: "Chess puzzles" },
			{ t: "opt", text: "Art history" },
			{ t: "opt", text: "Citizenship test" },
			{ t: "cta", text: "Continue" },
		],
	},
	{
		id: "o5",
		name: "Fake loading",
		desire: 85,
		tactic: "Build a plan just for you",
		why: "A progress bar and 'building your plan' copy make the result feel custom and costly to throw away. Often nothing is computed at all.",
		blocks: [
			{ t: "img", text: "spinner", h: 90 },
			{ t: "h", text: "Building your plan…" },
			{ t: "node", node: <div className="mx-meter"><div style={{ width: "82%", background: "var(--text)" }} /></div> },
			{ t: "s", text: "Matching quizzes to your goal" },
		],
	},
	{
		id: "o6",
		name: "Paywall",
		desire: 100,
		tactic: "Ask at peak motivation",
		why: "The user just saw their problem, their goal and 'their' plan. This is the moment they want the outcome the most, and it is exactly where the price shows up.",
		blocks: [
			{ t: "h", text: "Your guitar plan is ready" },
			{ t: "s", text: "Get back 45 days this year." },
			{ t: "opt", text: "Yearly", right: "$29.99", on: true },
			{ t: "opt", text: "Weekly", right: "$4.99" },
			{ t: "cta", text: "Start my plan" },
		],
	},
];

const STEPS_PT: Step[] = [
	{
		id: "o1",
		name: "Gancho",
		desire: 15,
		tactic: "Dar nome ao problema",
		why: "O primeiro ecrã nomeia um hábito que o utilizador já sabe que é mau. Ainda nada sobre funcionalidades.",
		blocks: [
			{ t: "img", text: "telemóvel com feed infinito", h: 120 },
			{ t: "h", text: "O teu telemóvel está a comer-te o dia." },
			{ t: "cta", text: "Faz o quiz de 1 minuto" },
		],
	},
	{
		id: "o2",
		name: "Autoavaliação",
		desire: 30,
		tactic: "Fazê-lo responder",
		why: "Cada toque é um pequeno compromisso. Quem já investiu um minuto a responder a perguntas tem mais tendência a ir até ao fim, que é o efeito de compromisso e coerência do livro Influence, do Cialdini.",
		blocks: [
			{ t: "h", text: "Quanto tempo fazes scroll por dia?" },
			{ t: "opt", text: "Menos de 1 hora" },
			{ t: "opt", text: "1 a 3 horas" },
			{ t: "opt", text: "Mais de 3 horas", on: true },
			{ t: "cta", text: "Seguinte" },
		],
	},
	{
		id: "o3",
		name: "A dor em números",
		desire: 55,
		tactic: "Transformar a resposta numa perda",
		why: "A app devolve a resposta como um número grande e assustador. 3 horas por dia passam a ser uns 45 dias por ano. O mesmo facto, muito mais alto.",
		blocks: [
			{ t: "s", text: "Com base na tua resposta" },
			{ t: "h", text: "Vais passar 45 dias deste ano a fazer scroll." },
			{ t: "img", text: "gráfico: tu vs a média", h: 80 },
			{ t: "cta", text: "É muito" },
		],
	},
	{
		id: "o4",
		name: "Objetivo",
		desire: 70,
		tactic: "Deixá-lo escolher o sonho",
		why: "Agora é o utilizador a descrever a versão melhor de si próprio. O paywall vai vender isso, não a app.",
		blocks: [
			{ t: "h", text: "O que queres aprender em vez disso?" },
			{ t: "opt", text: "Braço da guitarra", on: true },
			{ t: "opt", text: "Puzzles de xadrez" },
			{ t: "opt", text: "História da arte" },
			{ t: "opt", text: "Teste de cidadania" },
			{ t: "cta", text: "Continuar" },
		],
	},
	{
		id: "o5",
		name: "Loading falso",
		desire: 85,
		tactic: "Criar um plano só para ti",
		why: "Uma barra de progresso e um texto a dizer 'a criar o teu plano' fazem o resultado parecer personalizado e caro de deitar fora. Muitas vezes não se calcula nada.",
		blocks: [
			{ t: "img", text: "spinner", h: 90 },
			{ t: "h", text: "A criar o teu plano…" },
			{ t: "node", node: <div className="mx-meter"><div style={{ width: "82%", background: "var(--text)" }} /></div> },
			{ t: "s", text: "A escolher quizzes para o teu objetivo" },
		],
	},
	{
		id: "o6",
		name: "Paywall",
		desire: 100,
		tactic: "Pedir no pico da motivação",
		why: "O utilizador acabou de ver o problema, o objetivo e o 'seu' plano. É o momento em que mais quer o resultado, e é exatamente aí que aparece o preço.",
		blocks: [
			{ t: "h", text: "O teu plano de guitarra está pronto" },
			{ t: "s", text: "Recupera 45 dias este ano." },
			{ t: "opt", text: "Anual", right: "$29.99", on: true },
			{ t: "opt", text: "Semanal", right: "$4.99" },
			{ t: "cta", text: "Começar o meu plano" },
		],
	},
];

const T = {
	en: {
		steps: STEPS_EN,
		title: "An onboarding that sells",
		playing: "Playing…",
		playStart: "Play from start",
		back: "Back",
		next: "Next",
		stepLabel: (n: number, name: string) => `Onboarding step ${n}: ${name}`,
		desire: "Desire to buy",
		peak: "peak",
		tactic: "Tactic",
		note: "The desire numbers are illustrative. The point is the shape: it only goes up, and the price appears at the top.",
	},
	pt: {
		steps: STEPS_PT,
		title: "Um onboarding que vende",
		playing: "A reproduzir…",
		playStart: "Reproduzir do início",
		back: "Anterior",
		next: "Seguinte",
		stepLabel: (n: number, name: string) => `Passo ${n} do onboarding: ${name}`,
		desire: "Vontade de comprar",
		peak: "pico",
		tactic: "Tática",
		note: "Os números da vontade são ilustrativos. O que interessa é a forma: só sobe, e o preço aparece no topo.",
	},
};

export default function OnboardingPitch({ lang = "pt" }: { lang?: Lang }) {
	const t = T[lang];
	const STEPS = t.steps;
	const [i, setI] = useState(0);
	const [playing, setPlaying] = useState(false);
	const s = STEPS[i];

	useEffect(() => {
		if (!playing) return;
		if (i === STEPS.length - 1) {
			setPlaying(false);
			return;
		}
		const id = setTimeout(() => setI((x) => x + 1), 2200);
		return () => clearTimeout(id);
	}, [playing, i]);

	const peak = s.desire === 100;

	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">{t.title}</span>
				<div className="mx-row">
					<button className="mx-btn" onClick={() => { setI(0); setPlaying(true); }}>
						{playing ? t.playing : t.playStart}
					</button>
					<button className="mx-btn" disabled={i === 0} onClick={() => { setPlaying(false); setI(i - 1); }}>{t.back}</button>
					<button className="mx-btn" disabled={i === STEPS.length - 1} onClick={() => { setPlaying(false); setI(i + 1); }}>{t.next}</button>
				</div>
			</div>
			<div className="mx-split">
				<Phone screen={s} label={t.stepLabel(i + 1, s.name)} />
				<div style={{ display: "grid", gap: 12 }}>
					<div>
						<div className="mx-row" style={{ justifyContent: "space-between", marginBottom: 4 }}>
							<span className="mx-hint">{t.desire}</span>
							<span className="mx-mono" style={{ fontWeight: 700, color: peak ? "var(--mx-bad)" : undefined }}>
								{peak ? t.peak : `${s.desire}%`}
							</span>
						</div>
						<div className="mx-meter" aria-hidden="true">
							<div style={{ width: `${s.desire}%`, background: peak ? "var(--mx-bad)" : "var(--mx-accent)" }} />
						</div>
					</div>
					<ol className="mx-row" style={{ listStyle: "none", margin: 0, padding: 0, gap: 4 }}>
						{STEPS.map((x, j) => (
							<li key={x.id}>
								<button
									className="mx-btn"
									aria-pressed={j === i}
									style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem" }}
									onClick={() => { setPlaying(false); setI(j); }}
								>
									{j + 1}. {x.name}
								</button>
							</li>
						))}
					</ol>
					<div className="mx-panel" key={s.id} style={{ animation: "mx-pop 0.3s ease-out" }}>
						<p style={{ fontWeight: 700, marginBottom: 4 }}>{t.tactic}: {s.tactic}</p>
						<p>{s.why}</p>
					</div>
					<p className="mx-hint">{t.note}</p>
				</div>
			</div>
		</div>
	);
}
