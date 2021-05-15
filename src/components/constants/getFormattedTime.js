const getFormattedTime = (milliseconds) => {
    const date = new Date(milliseconds)
    const optionsDate = {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    }

    const optionsGeneral = {
        hour: 'numeric',
        minute: 'numeric',
        // hourCycle: 'h23',
        hour12: false
    }
    const optionsExact = {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hourCycle: 'h23'
    }

    const messageSentAt = Intl.DateTimeFormat('default', optionsGeneral).format(date)
    const messageExactSentAt = Intl.DateTimeFormat('default', optionsExact).format(date)
    const messageSentDate = Intl.DateTimeFormat('default', optionsDate).format(date)

    return [messageSentAt, messageExactSentAt, messageSentDate]
}

export default getFormattedTime