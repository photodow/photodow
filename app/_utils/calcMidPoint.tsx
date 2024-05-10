export default function calcMidPoint(
    changingObj: { start: number; end: number },
    matchingObj: { start: number; end: number; current: number },
) {
    return (
        ((matchingObj.current - matchingObj.end) /
            (matchingObj.start - matchingObj.end)) *
            (changingObj.start - changingObj.end) +
        changingObj.end
    );
}
