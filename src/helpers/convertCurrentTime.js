export default (number) => {
    const mins = Math.floor(number / 59);
    const secs = (number % 59).toFixed();
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}