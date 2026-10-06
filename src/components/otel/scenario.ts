/** One failed checkout request, shared by the pillar and trace demos. */
export const TRACE_ID = "4bf92f3577b34da6a3ce929d0e0e4736";
export const TOTAL_MS = 4200;

export interface Span {
	id: string;
	parent?: string;
	service: string;
	name: string;
	start: number;
	end: number;
	error?: boolean;
	attrs: Record<string, string>;
}

export const SPANS: Span[] = [
	{ id: "a1", service: "gateway", name: "POST /checkout", start: 0, end: 4200, error: true, attrs: { "http.method": "POST", "http.route": "/checkout", "http.status_code": "504", "user.id": "42" } },
	{ id: "b2", parent: "a1", service: "order-service", name: "create_order", start: 40, end: 4150, error: true, attrs: { "order.items": "3", "order.total": "129.90" } },
	{ id: "c3", parent: "b2", service: "inventory-service", name: "reserve_stock", start: 90, end: 400, attrs: { "db.system": "postgresql", "stock.reserved": "3" } },
	{ id: "d4", parent: "b2", service: "payment-service", name: "charge_card", start: 450, end: 4100, error: true, attrs: { "payment.provider": "acme-pay", "retry.count": "0" } },
	{ id: "e5", parent: "d4", service: "payment-service", name: "SELECT card", start: 500, end: 620, attrs: { "db.system": "postgresql", "db.operation": "SELECT" } },
	{ id: "f6", parent: "d4", service: "payment-service", name: "POST bank-api /authorize", start: 700, end: 4050, error: true, attrs: { "http.url": "https://bank.example/authorize", "error.type": "timeout", "timeout.ms": "3350" } },
];

export function depth(span: Span): number {
	let d = 0;
	let cur: Span | undefined = span;
	while (cur?.parent) {
		cur = SPANS.find((s) => s.id === cur!.parent);
		d++;
	}
	return d;
}

export const SERVICE_COLOR: Record<string, string> = {
	gateway: "var(--otx-trace)",
	"order-service": "var(--otx-metric)",
	"inventory-service": "var(--otx-log)",
	"payment-service": "var(--otx-error)",
};
