enum TimeUnit {
    year = 'year',
    quarter = 'quarter',
    month = 'month',
    week = 'week',
    day = 'day',
    hour = 'hour',
    minute = 'minute',
    second = 'second',
}

declare namespace Intl {
    function getCanonicalLocales(locales: string | string[]): string[];

    class RelativeTimeFormat {
        constructor(locale: string, options?: object);

        format (value: number, unit: TimeUnit)
    }
}

export function getTimeDiffObject (timeA: Date, timeB: Date) {
    const diff = timeA.getTime() - timeB.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return {
        [TimeUnit.second]: seconds,
        [TimeUnit.minute]: minutes,
        [TimeUnit.hour]: hours
    };
}

export function getTimeDiffString (timeA: Date, timeB: Date) {
    const intl = new Intl.RelativeTimeFormat(navigator.language, {numeric: 'auto'});
    const diff = getTimeDiffObject(timeA, timeB);
    if (diff[TimeUnit.hour] > 0) {
        return intl.format(-diff[TimeUnit.hour], TimeUnit.hour);
    } else if (diff[TimeUnit.minute] > 0) {
        return intl.format(-diff[TimeUnit.minute], TimeUnit.minute);
    } else if (diff[TimeUnit.second] > 0) {
        return intl.format(-diff[TimeUnit.second], TimeUnit.second);
    } else {
        return '';
    }
}
