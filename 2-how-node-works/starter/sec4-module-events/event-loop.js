const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => console.log('Timer 1 finishes'), 0);
setImmediate(() => console.log('Imidiate 1 finished'))

fs.readFile('text-file.txt', () => {
    console.log('I/O finished')
    console.log('===================');

    setTimeout(() => console.log('Timer 2 finishes'), 0);
    setTimeout(() => console.log('Timer 3 finishes'), 3000);
    setImmediate(() => console.log('Imidiate 2 finished'));

    process.nextTick(() => console.log('Process.nextTick'))

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrpted')
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrpted')
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrpted')
    });
});

console.log('Hello from the top-level code');
