import { useState } from "react";
import { Button } from "@/components/ui/button";

export function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Vite + Preact</h1>
			<div class="card">
				<Button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				<p>
					Edit <code>src/app.tsx</code> and save to test HMR
				</p>
			</div>
		</>
	);
}
