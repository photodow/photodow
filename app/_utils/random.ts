

type Random = {
    start?: number,
    end: number
}

type UniqueRandom = Random & {
    id: string
}

const numberCache: Record<string, number> = {};

export function random (start: number, end: number) {
    return Math.round(Math.random() * end) + start;
}

export function uniqueRandom ({ id, start = 0, end }: UniqueRandom) {
    let num;
    let cachedNum = numberCache[id];

    do {
        num = random(start, end);
    } while(num === cachedNum);

    numberCache[id] = num;
    return num;
} 