let cb

setTimeout(() => { cb() }, 0)

console.log('First!')
for(let i = 0; i < 1000000000; i++) {
    if (i === 999999999) console.log(i)
}

console.log('Not timed out')

cb = () => {
    console.log('Timeout')
}
