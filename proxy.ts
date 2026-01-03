const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "OPTIONS, POST",
	"Access-Control-Allow-Headers": "Content-Type",
};

Bun.serve({
	port: 3005,
	async fetch(req) {
		if (req.method === "OPTIONS") {
			return new Response("ok", { headers: CORS_HEADERS });
		}

		try {
			const url = new URL(req.url);
			if (url.pathname === "/api/points/map") {
				const body = await req.json();
				const response = await fetch("https://api.furgonetka.pl/points/map", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				});
				const data = await response.json();

				return new Response(JSON.stringify(data), {
					headers: {
						...CORS_HEADERS,
						"Content-Type": "application/json",
					},
				});
			}

			return new Response("Not Found", { status: 404 });
		} catch (error) {
			return new Response(JSON.stringify({ error: "Proxy error" }), {
				status: 500,
				headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
			});
		}
	},
});

console.log("Proxy server running on http://localhost:3005");
