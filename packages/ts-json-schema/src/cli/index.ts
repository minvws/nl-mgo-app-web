import { program } from './program.js';

try {
    program.parse(process.argv);
} catch (error) {
    console.error(error);
    process.exitCode = 1;
}
