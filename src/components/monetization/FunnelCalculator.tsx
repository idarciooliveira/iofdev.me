import { useState } from "react";
import "./mx.css";

type ModelId = "hard" | "trial" | "freemium" | "metered";

type Rates = { reach: number; start: number; keep: number };

/** Starting points to play with, not benchmarks. Replace them with your own analytics. */
const PRESETS: Record<ModelId, { name: string; reach: string; start: string; rates: Rates }> = {
	hard: { name: "Hard paywall", reach: "Finish onboarding, see paywall", start: "Buy", rates: { reach: 60, start: 8, keep: 100 } },
	trial: { name: "Free trial", reach: "Finish onboarding, see paywall", start: "Start trial", rates: { reach: 60, start: 15, keep: 40 } },
	freemium: { name: "Freemium", reach: "Ever see an upgrade screen", start: "Upgrade", rates: { reach: 70, start: 4, keep: 100 } },
	metered: { name: "Metered", reach: "Hit the free limit", start: "Buy", rates: { reach: 45, start: 10, keep: 100 } },
};

const STORE_CUT = 0.15; // Apple and Google small business rate, for developers under $1M a year
const GOAL = 10_000;

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10_000 ? 0 : 1)}k` : Math.round(n).toString());
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function Range({ label, value, min, max, step, onChange, suffix = "%" }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string }) {
	return (
		<label className="mx-range">
			<span>{label}</span>
			<input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
			<span className="mx-mono" style={{ minWidth: 56, textAlign: "right" }}>{suffix === "$" ? `$${value}` : `${fmt(value)}${suffix}`}</span>
		</label>
	);
}

export default function FunnelCalculator() {
	const [model, setModel] = useState<ModelId>("hard");
	const [installs, setInstalls] = useState(5000);
	const [rates, setRates] = useState<Rates>(PRESETS.hard.rates);
	const [price, setPrice] = useState(30);
	const [churn, setChurn] = useState(8);
	const p = PRESETS[model];

	const pick = (id: ModelId) => {
		setModel(id);
		setRates(PRESETS[id].rates);
	};
	const set = (k: keyof Rates) => (v: number) => setRates((r) => ({ ...r, [k]: v }));

	const reached = installs * (rates.reach / 100);
	const started = reached * (rates.start / 100);
	const paying = started * (rates.keep / 100);
	const conv = paying / installs;
	const netMonthly = (price / 12) * (1 - STORE_CUT);
	const newMrr = paying * netMonthly;
	const plateau = newMrr / (churn / 100);
	const needed = conv > 0 ? (GOAL * (churn / 100)) / (conv * netMonthly) : Infinity;

	const stages = [
		{ label: "Installs", n: installs },
		{ label: p.reach, n: reached },
		{ label: p.start, n: started },
		...(model === "trial" ? [{ label: "Still paying after trial", n: paying }] : []),
	];

	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">From installs to $10K a month</span>
				<span className="mx-hint">Presets are made-up starting points. Move the sliders.</span>
			</div>
			<div className="mx-row" role="tablist" style={{ marginBottom: 12 }}>
				{(Object.keys(PRESETS) as ModelId[]).map((id) => (
					<button key={id} role="tab" aria-selected={id === model} className="mx-btn" onClick={() => pick(id)}>
						{PRESETS[id].name}
					</button>
				))}
			</div>

			<div className="mx-panel" style={{ display: "grid", gap: 6, marginBottom: 12 }}>
				{stages.map((s, i) => (
					<div key={s.label} style={{ display: "grid", gridTemplateColumns: "1fr 56px", gap: "2px 8px", alignItems: "center" }}>
						<span style={{ fontSize: "0.75rem", gridColumn: "1 / -1" }}>{s.label}</span>
						<div style={{ height: 18, background: "var(--surface-soft)", borderRadius: 4, overflow: "hidden" }}>
							<div
								style={{
									height: "100%",
									width: `${Math.max(1.5, (s.n / installs) * 100)}%`,
									background: i === stages.length - 1 ? "var(--mx-good)" : "var(--mx-accent)",
									opacity: 1 - i * 0.12,
									borderRadius: 4,
									transition: "width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
								}}
							/>
						</div>
						<span className="mx-mono" style={{ textAlign: "right" }}>{fmt(s.n)}</span>
					</div>
				))}
				<p className="mx-hint" style={{ marginTop: 4 }}>
					Install to paid: <strong className="mx-mono" style={{ color: "var(--text)" }}>{(conv * 100).toFixed(1)}%</strong>
				</p>
			</div>

			<div style={{ display: "grid", gap: 6, marginBottom: 12 }}>
				<Range label="Installs per month" value={installs} min={500} max={50000} step={500} onChange={setInstalls} suffix="" />
				<Range label={p.reach} value={rates.reach} min={5} max={100} step={1} onChange={set("reach")} />
				<Range label={p.start} value={rates.start} min={1} max={40} step={0.5} onChange={set("start")} />
				{model === "trial" && <Range label="Trial to paid" value={rates.keep} min={5} max={90} step={1} onChange={set("keep")} />}
				<Range label="Yearly price" value={price} min={5} max={100} step={1} onChange={setPrice} suffix="$" />
				<Range label="Monthly churn" value={churn} min={2} max={25} step={1} onChange={setChurn} />
			</div>

			<div className="mx-split" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
				<div className="mx-panel">
					<p className="mx-hint">New MRR each month</p>
					<p className="mx-mono" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{usd(newMrr)}</p>
				</div>
				<div className="mx-panel">
					<p className="mx-hint">MRR levels off at</p>
					<p className="mx-mono" style={{ fontSize: "1.25rem", fontWeight: 700, color: plateau >= GOAL ? "var(--mx-good)" : undefined }}>{usd(plateau)}</p>
				</div>
				<div className="mx-panel">
					<p className="mx-hint">Installs/month for $10K</p>
					<p className="mx-mono" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{Number.isFinite(needed) ? fmt(needed) : "∞"}</p>
				</div>
			</div>
			<p className="mx-note">
				After the store's 15% cut. Each month you add new subscribers and lose <strong>{churn}%</strong> of the ones you have, so revenue stops growing once the losses equal the new MRR. That level is new MRR divided by churn.
			</p>
		</div>
	);
}
