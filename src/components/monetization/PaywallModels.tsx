import { useEffect, useState } from "react";
import Phone, { type Screen } from "./Phone";
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

const onboarding = (id: string): Screen & { step: string } => ({
	id,
	step: "Onboarding",
	blocks: [
		{ t: "img", text: "illustration", h: 110 },
		{ t: "h", text: "Stop scrolling. Start learning." },
		{ t: "bars", n: 2 },
		{ t: "cta", text: "Get started" },
	],
});

const app = (id: string, note: string): Screen & { step: string } => ({
	id,
	step: "Uses the app",
	blocks: [
		{ t: "s", text: note },
		{ t: "h", text: "Where is C on the 5th string?" },
		{ t: "opt", text: "3rd fret", on: true },
		{ t: "opt", text: "5th fret" },
		{ t: "opt", text: "7th fret" },
		{ t: "cta", text: "Answer" },
	],
});

const MODELS: Model[] = [
	{
		id: "hard",
		name: "Hard paywall",
		oneLine: "Pay before you can use anything.",
		screens: [
			onboarding("h1"),
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
			{ ...app("h3", "Paid user"), step: "Paid, uses the app" },
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
			onboarding("t1"),
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
			{ ...app("t3", "Trial · 6 days left"), step: "Tries everything" },
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
			onboarding("f1"),
			{ ...app("f2", "Free plan"), step: "Uses the free tier" },
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
			onboarding("m1"),
			{ ...app("m2", "Free quiz 1 of 3"), step: "Quiz 1 of 3" },
			{ ...app("m3", "Free quiz 3 of 3"), step: "Quiz 3 of 3" },
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

export default function PaywallModels() {
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
				<span className="mx-title">Four paywall models, same app</span>
				<button className="mx-btn" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
					{playing ? "Pause" : "Play"}
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
						<p><strong style={{ color: "var(--mx-good)" }}>Upside.</strong> {m.good}</p>
						<p><strong style={{ color: "var(--mx-bad)" }}>Downside.</strong> {m.bad}</p>
						<p><strong>Fits.</strong> {m.fits}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
