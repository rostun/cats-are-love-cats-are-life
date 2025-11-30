# cats-are-love-cats-are-life

A tiny, zero-dependency collection of cat-themed browser utilities.
Provides cursor pop effects, simple animations, and playful logging helpers.

## Features

- purrLog: a cat-style console logger
- hissWarning: a warning-style logger
- kittyPop: spawns a cat at the cursor location
- parabola animation mode similar to Cookie Clicker fountain effects
- written in TypeScript
- tested with Jest and JSDOM
- works in React, Vite, Next.js, or plain JavaScript

## Installation

npm install cats-are-love-cats-are-life

or:

yarn add cats-are-love-cats-are-life

## Quick Start

Enable the cursor animation:

import { enableKittyCursor } from "cats-are-love-cats-are-life";

enableKittyCursor({
animation: "parabola",
emoji: "🐈",
fontSize: "2rem"
});

## Logging Utilities

purrLog:

import { purrLog } from "cats-are-love-cats-are-life";
purrLog("hello from the cat console", { mood: "happy" });

hissWarning:

import { hissWarning } from "cats-are-love-cats-are-life";
hissWarning("Back off!");

## Cursor Animations

Built-in modes:

- float
- parabola

Example:

kittyPop(event, {
emoji: "🐈",
fontSize: "3rem",
durationMs: 800,
animation: "parabola"
});

## Running Tests

yarn test

## Building the Project

yarn build
yarn start

## Playground Demo

yarn dlx serve .

Then open:

http://localhost:3000/playground.html

## Project Structure

src/
cursor/
kitty.ts
kitty.test.ts
log/
purr.ts
purr.test.ts
hiss.ts
hiss.test.ts
index.ts
dist/
playground.html

## License

MIT License
Copyright (c) 2025 Rosa Tung
