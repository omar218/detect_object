export const ratio2percent = (ratio: number) => {
    const percentage = ratio * 100;
    return `${percentage.toFixed(2)}%`;
};