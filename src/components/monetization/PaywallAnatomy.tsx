import { useState, type CSSProperties, type ReactNode } from "react";
import "./mx.css";

type Spot = { n: number; name: string; does: string; line: string };

const SPOTS: Spot[] = [
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

function Hot({ n, active, onPick, pin, children }: { n: number; active: number; onPick: (n: number) => void; pin?: CSSProperties; children: ReactNode }) {
	return (
		<div className="mx-hot" data-active={active === n ? "true" : "false"} onClick={(e) => { e.stopPropagation(); onPick(n); }} style={{ cursor: "pointer" }}>
			<span className="mx-pin" style={pin}>{n}</span>
			{children}
		</div>
	);
}

export default function PaywallAnatomy() {
	const [active, setActive] = useState(3);
	const spot = SPOTS.find((s) => s.n === active)!;

	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">Anatomy of a paywall</span>
				<span className="mx-hint">Click a number on the phone or in the list</span>
			</div>
			<div className="mx-split">
				<div className="mx-phone" aria-label="Wireframe of a subscription paywall">
					<div className="mx-screen" style={{ gap: 6, animation: "none" }}>
						<Hot n={8} active={active} onPick={setActive}>
							<div style={{ textAlign: "right", fontSize: 10, color: "var(--text-soft)", opacity: active === 8 ? 1 : 0.25 }}>✕</div>
						</Hot>
						<Hot n={1} active={active} onPick={setActive}>
							<p className="mx-screen-h" style={{ paddingLeft: 8 }}>Learn guitar instead of scrolling</p>
						</Hot>
						<Hot n={2} active={active} onPick={setActive}>
							<p className="mx-screen-s" style={{ paddingLeft: 8 }}>★★★★★ 4.8 · 20k learners</p>
						</Hot>
						<Hot n={4} active={active} onPick={setActive} pin={{ top: 12 }}>
							<div className="mx-opt" data-on="true" style={{ flexDirection: "column", alignItems: "stretch", gap: 2 }}>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<span>Yearly <span className="mx-badge">-50%</span></span>
									<span>$29.99</span>
								</div>
								<Hot n={3} active={active} onPick={setActive} pin={{ left: 4 }}>
									<div style={{ textAlign: "right", fontWeight: 400, color: "var(--text-soft)", textDecoration: "line-through" }}>$59.99</div>
								</Hot>
								<Hot n={5} active={active} onPick={setActive} pin={{ left: 4 }}>
									<div style={{ textAlign: "right", fontWeight: 400 }}>$0.58 / week</div>
								</Hot>
							</div>
						</Hot>
						<div className="mx-opt"><span>Weekly</span><span>$4.99</span></div>
						<Hot n={6} active={active} onPick={setActive}>
							<div className="mx-opt"><span>Free trial enabled</span><span style={{ width: 24, height: 12, borderRadius: 999, background: "var(--text)", display: "inline-block" }} /></div>
						</Hot>
						<div style={{ marginTop: "auto", display: "grid", gap: 6 }}>
							<Hot n={7} active={active} onPick={setActive}>
								<div className="mx-cta">Start my plan</div>
							</Hot>
							<Hot n={9} active={active} onPick={setActive}>
								<p className="mx-fine">Restore · Terms · Privacy · Renews yearly</p>
							</Hot>
						</div>
					</div>
				</div>
				<div style={{ display: "grid", gap: 10 }}>
					<div className="mx-panel" key={spot.n} style={{ animation: "mx-pop 0.25s ease-out", display: "grid", gap: 6 }}>
						<p style={{ fontWeight: 700 }}>{spot.n}. {spot.name}</p>
						<p>{spot.does}</p>
						<p style={{ color: "var(--text-soft)" }}><strong style={{ color: "var(--text)" }}>Where the line is.</strong> {spot.line}</p>
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
