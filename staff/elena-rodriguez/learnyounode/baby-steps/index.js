
let addition = 0;
for (let i = 2; i < process.argv.length; i++) {
addition += +process.argv[i]
}

console.log(addition)