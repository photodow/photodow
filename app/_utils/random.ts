type Random = {
    start?: number;
    end: number;
};

type UniqueRandom = Random & {
    id: string;
};

const numOfRetries = 5;
const numberCache: Record<string, number> = {};

export function random(start: number, end: number) {
    return Math.round(Math.random() * end) + start;
}

export function uniqueRandom({ id, start = 0, end }: UniqueRandom) {
    let num;
    let cachedNum = numberCache[id];
    let index = 0;

    do {
        num = random(start, end);
        index++;
    } while (num === cachedNum && index <= numOfRetries);

    numberCache[id] = num;
    return num;
}
