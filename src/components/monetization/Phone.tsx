import type { ReactNode } from "react";
import "./mx.css";

/** A tiny description language for wireframe screens, so each component can list screens as data. */
export type Block =
	| { t: "h"; text: string }
	| { t: "s"; text: string }
	| { t: "bars"; n: number }
	| { t: "img"; text: string; h?: number }
	| { t: "opt"; text: string; right?: string; on?: boolean }
	| { t: "cta"; text: string }
	| { t: "fine"; text: string }
	| { t: "node"; node: ReactNode };

export type Screen = { id: string; blocks: Block[] };

function render(b: Block, i: number) {
	switch (b.t) {
		case "h":
			return <p key={i} className="mx-screen-h">{b.text}</p>;
		case "s":
			return <p key={i} className="mx-screen-s">{b.text}</p>;
		case "bars":
			return (
				<div key={i} style={{ display: "grid", gap: 5 }}>
					{Array.from({ length: b.n }, (_, j) => (
						<div key={j} className="mx-bar" style={{ width: `${90 - ((j * 23) % 40)}%` }} />
					))}
				</div>
			);
		case "img":
			return <div key={i} className="mx-img" style={{ height: b.h ?? 80 }}>{b.text}</div>;
		case "opt":
			return (
				<div key={i} className="mx-opt" data-on={b.on ? "true" : "false"}>
					<span>{b.text}</span>
					{b.right && <span>{b.right}</span>}
				</div>
			);
		case "cta":
			return <div key={i} className="mx-cta">{b.text}</div>;
		case "fine":
			return <p key={i} className="mx-fine">{b.text}</p>;
		case "node":
			return <div key={i}>{b.node}</div>;
	}
}

export default function Phone({ screen, label }: { screen: Screen; label: string }) {
	return (
		<div className="mx-phone" role="img" aria-label={label}>
			{/* key forces a remount, which replays the slide-in animation on every screen change */}
			<div key={screen.id} className="mx-screen">
				{screen.blocks.map(render)}
			</div>
		</div>
	);
}
