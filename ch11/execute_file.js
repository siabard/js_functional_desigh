const fs = require('fs');

function noop(state) {
    return { ...state, cycles: [...state.cycles, state.x] };
}

function addx(n, state) {
    return {
        ...state,
        x: state.x + n,
        cycles: [...state.cycles, state.x, state.x]
    };
}

function execute(state, lines) {
    if (lines.length === 0) return state;
    
    const [line, ...rest] = lines;
    let newState;
    
    if (line.match(/^noop$/)) {
        newState = noop(state);
    } else {
        const match = line.match(/^addx (-?\d+)$/);
        if (match) {
            newState = addx(parseInt(match[1], 10), state);
        } else {
            throw new Error("TILT");
        }
    }
    
    return execute(newState, rest);
}

function executeFile(fileName) {
    const lines = fs.readFileSync(fileName, 'utf-8').split('\n');
    const startingState = { x: 1, cycles: [] };
    const endingState = execute(startingState, lines);
    return endingState.cycles;
}

function renderCycles(cycles) {
    let screen = '';
    let t = 0;
    
    for (const x of cycles) {
        const offset = t - x;
        const pixel = Math.abs(offset) <= 1 ? '#' : '.';
        screen += pixel;
        t = (t + 1) % 40;
    }
    
    // partition 40 chars per line
    const lines = [];
    for (let i = 0; i < screen.length; i += 40) {
	lines.push(screen.slice(i, i + 40));
    }

    return lines;
}

function printScreen(lines) {
    lines.forEach(line => console.log(line));
    return true;
}

function main() {
    printScreen(renderCycles(executeFile('input')));
}

main();
