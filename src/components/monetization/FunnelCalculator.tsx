import { useState } from "react";
import type { Lang } from "../../i18n";
import "./mx.css";

type ModelId = "hard" | "trial" | "freemium" | "metered";

type Rates = { reach: number; start: number; keep: number };

type Preset = { name: string; reach: string; start: string; rates: Rates };

const RATES: Record<ModelId, Rates> = {
	hard: { reach: 60, start: 8, keep: 100 },
	trial: { reach: 60, start: 15, keep: 40 },
	freemium: { reach: 70, start: 4, keep: 100 },
	metered: { reach: 45, start: 10, keep: 100 },
};

/** Starting points to play with, not benchmarks. Replace them with your own analytics. */
const PRESETS_EN: Record<ModelId, Preset> = {
	hard: { name: "Hard paywall", reach: "Finish onboarding, see paywall", start: "Buy", rates: RATES.hard },
	trial: { name: "Free trial", reach: "Finish onboarding, see paywall", start: "Start trial", rates: RATES.trial },
	freemium: { name: "Freemium", reach: "Ever see an upgrade screen", start: "Upgrade", rates: RATES.freemium },
	metered: { name: "Metered", reach: "Hit the free limit", start: "Buy", rates: RATES.metered },
};

const PRESETS_PT: Record<ModelId, Preset> = {
	hard: { name: "Hard paywall", reach: "Termina o onboarding, vê o paywall", start: "Compra", rates: RATES.hard },
	trial: { name: "Free trial", reach: "Termina o onboarding, vê o paywall", start: "Começa o trial", rates: RATES.trial },
	freemium: { name: "Freemium", reach: "Chega a ver um ecrã de upgrade", start: "Faz upgrade", rates: RATES.freemium },
	metered: { name: "Por limite", reach: "Atinge o limite grátis", start: "Compra", rates: RATES.metered },
};

const T = {
	en: {
		presets: PRESETS_EN,
		title: "From installs to $10K a month",
		hint: "Presets are made-up starting points. Move the sliders.",
		installs: "Installs",
		stillPaying: "Still paying after trial",
		installToPaid: "Install to paid",
		installsPerMonth: "Installs per month",
		trialToPaid: "Trial to paid",
		yearlyPrice: "Yearly price",
		monthlyChurn: "Monthly churn",
		newMrr: "New MRR each month",
		plateau: "MRR levels off at",
		needed: "Installs/month for $10K",
		note: (churn: number) => <>After the store's 15% cut. Each month you add new subscribers and lose <strong>{churn}%</strong> of the ones you have, so revenue stops growing once the losses equal the new MRR. That level is new MRR divided by churn.</>,
	},
	pt: {
		presets: PRESETS_PT,
		title: "De instalações a $10K por mês",
		hint: "Os valores iniciais são inventados. Mexe nos sliders.",
		installs: "Instalações",
		stillPaying: "Ainda paga depois do trial",
		installToPaid: "De instalação a pagante",
		installsPerMonth: "Instalações por mês",
		trialToPaid: "De trial a pagante",
		yearlyPrice: "Preço anual",
		monthlyChurn: "Churn mensal",
		newMrr: "MRR novo por mês",
		plateau: "O MRR estabiliza em",
		needed: "Instalações/mês para $10K",
		note: (churn: number) => <>Já sem os 15% da loja. Todos os meses ganhas novos subscritores e perdes <strong>{churn}%</strong> dos que tens, por isso a receita para de crescer quando as perdas igualam o MRR novo. Esse nível é o MRR novo a dividir pelo churn.</>,
	},
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

export default function FunnelCalculator({ lang = "pt" }: { lang?: Lang }) {
	const t = T[lang];
	const PRESETS = t.presets;
	const [model, setModel] = useState<ModelId>("hard");
	const [installs, setInstalls] = useState(5000);
	const [rates, setRates] = useState<Rates>(RATES.hard);
	const [price, setPrice] = useState(30);
	const [churn, setChurn] = useState(8);
	const p = PRESETS[model];

	const pick = (id: ModelId) => {
		setModel(id);
		setRates(RATES[id]);
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
		{ label: t.installs, n: installs },
		{ label: p.reach, n: reached },
		{ label: p.start, n: started },
		...(model === "trial" ? [{ label: t.stillPaying, n: paying }] : []),
	];

	return (
		<div className="mx not-prose">
			<div className="mx-head">
				<span className="mx-title">{t.title}</span>
				<span className="mx-hint">{t.hint}</span>
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
					{t.installToPaid}: <strong className="mx-mono" style={{ color: "var(--text)" }}>{(conv * 100).toFixed(1)}%</strong>
				</p>
			</div>

			<div style={{ display: "grid", gap: 6, marginBottom: 12 }}>
				<Range label={t.installsPerMonth} value={installs} min={500} max={50000} step={500} onChange={setInstalls} suffix="" />
				<Range label={p.reach} value={rates.reach} min={5} max={100} step={1} onChange={set("reach")} />
				<Range label={p.start} value={rates.start} min={1} max={40} step={0.5} onChange={set("start")} />
				{model === "trial" && <Range label={t.trialToPaid} value={rates.keep} min={5} max={90} step={1} onChange={set("keep")} />}
				<Range label={t.yearlyPrice} value={price} min={5} max={100} step={1} onChange={setPrice} suffix="$" />
				<Range label={t.monthlyChurn} value={churn} min={2} max={25} step={1} onChange={setChurn} />
			</div>

			<div className="mx-split" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
				<div className="mx-panel">
					<p className="mx-hint">{t.newMrr}</p>
					<p className="mx-mono" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{usd(newMrr)}</p>
				</div>
				<div className="mx-panel">
					<p className="mx-hint">{t.plateau}</p>
					<p className="mx-mono" style={{ fontSize: "1.25rem", fontWeight: 700, color: plateau >= GOAL ? "var(--mx-good)" : undefined }}>{usd(plateau)}</p>
				</div>
				<div className="mx-panel">
					<p className="mx-hint">{t.needed}</p>
					<p className="mx-mono" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{Number.isFinite(needed) ? fmt(needed) : "∞"}</p>
				</div>
			</div>
			<p className="mx-note">{t.note(churn)}</p>
		</div>
	);
}
