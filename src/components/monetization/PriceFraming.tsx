import { useState, type ReactNode } from "react";
import "./mx.css";

type FrameId = "plain" | "discount" | "weekly" | "decoy";

const FRAMES: { id: FrameId; name: string; how: string; watch: string }[] = [
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

function Card({ frame }: { frame: FrameId }) {
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
			{frame === "plain" && row("LockFeed Pro, yearly", "$29.99", true)}
			{frame === "discount" && row(
				<>Yearly <span className="mx-badge">-50%</span></>,
				<span><s style={{ color: "var(--text-soft)", fontWeight: 400 }}>$59.99</s> $29.99</span>,
				true,
				"Offer ends when you leave this screen",
			)}
			{frame === "weekly" && (
				<>
					{row("Yearly", "$0.58 / week", true, "billed $29.99 yearly")}
					{row("Weekly", "$4.99 / week")}
				</>
			)}
			{frame === "decoy" && (
				<>
					{row("Monthly", "$9.99", false, "$119.88 a year")}
					{row(<>Yearly <span className="mx-badge" style={{ background: "var(--mx-good)" }}>best value</span></>, "$29.99", true, "save 75%")}
				</>
			)}
		</div>
	);
}

export default function PriceFraming() {
	const [frame, setFrame] = useState<FrameId>("plain");
	const f = FRAMES.find((x) => x.id === frame)!;
	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">Same $29.99, four framings</span>
				<span className="mx-hint">The price never changes. Only the context does.</span>
			</div>
			<div className="mx-row" role="tablist" style={{ marginBottom: 12 }}>
				{FRAMES.map((x) => (
					<button key={x.id} role="tab" aria-selected={x.id === frame} className="mx-btn" onClick={() => setFrame(x.id)}>
						{x.name}
					</button>
				))}
			</div>
			<div className="mx-panel" style={{ display: "grid", gap: 12 }}>
				<Card frame={frame} />
				<p>{f.how}</p>
				<p style={{ color: "var(--text-soft)" }}><strong style={{ color: "var(--text)" }}>Watch out.</strong> {f.watch}</p>
			</div>
		</div>
	);
}
