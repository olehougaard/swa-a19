setTimeout(() => {
    console.log('Timeout')
}, 0)

setTimeout(() => {
    console.log('Timeout2')
}, 0)

console.log('Main')
for(let i = 0; i < 1000000000; i++) {
    if (i === 999999999)
    console.log('Later')
}

