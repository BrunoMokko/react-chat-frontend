import tinycolor from "tinycolor2";

const getCorrectIndex = number => {
    return number > 255 ? 255 : number < 0 ? 0 : number;
}

export default hash => {
    if (!hash) return { color: '#000000', colorLighten: '#000000' };

    const [r, g, b] = hash.substring(8,3).split('').map(char => getCorrectIndex(char.charCodeAt(0)));

    return {color: tinycolor({ r, g, b }).lighten(15).saturate(30).toHexString(),
        colorLighten: tinycolor({ r, g, b }).lighten(40).saturate(30).toHexString()};
}
