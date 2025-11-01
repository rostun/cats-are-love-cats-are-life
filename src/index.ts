type PurrMood = "happy" | "grumpy" | "sleepy" | "chaotic";

interface PurrOptions {
	mood?: PurrMood;
}

const moodEmojis: Record<PurrMood, string> = {
	happy: "😺",
	grumpy: "😾",
	sleepy: "😴",
	chaotic: "🙀"
};

export function purrLog(message: string, options: PurrOptions = {}): void {
	const emoji = moodEmojis[options.mood || "happy"];
	console.log(`${emoji} ${message}`);
}
