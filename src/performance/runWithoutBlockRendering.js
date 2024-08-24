export function runWithoutBlockRendering(task) {
    const startTime = Date.now()
    requestAnimationFrame(() => {
        if (Date.now() - startTime < 16.6) {
            task()
        } else {
            runWithoutBlockRendering(task)
        }
    })
}