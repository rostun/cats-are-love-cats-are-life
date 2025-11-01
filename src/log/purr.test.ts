import { purrLog } from "./purr.js";

console.log("🐾 Running purrLog tests...");
purrLog("happy cat!", { mood: "happy" });
purrLog("grumpy cat!", { mood: "grumpy" });
purrLog("sleepy cat!", { mood: "sleepy" });
purrLog("chaotic cat!", { mood: "chaotic" });
purrLog("default mood cat!"); // no mood provided
console.log("✅ All purrLog calls executed.");
