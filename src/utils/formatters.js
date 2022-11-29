export const handleSampleSizeChange = (val) => {
    if (val > 0 && sampleSize <= 5000) {
        setSampleSize(prev => prev + 5)
    } else if (val < 0 && sampleSize > 5) {
        setSampleSize(prev => prev - 5)
    }
}

export const minutesToMilliseconds = (time) => {
    return time * 60 * 1000
}