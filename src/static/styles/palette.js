
class Palette {
    constructor() {
        this.palette = {
            PALE_GREY_THREE: {
                rgba: { r: 229, g: 233, b: 242, a: 1 },
                hex: '#e5e9f2'
            },
            BLUE: {
                rgba: { r: 85, g: 133, b: 237, a: 1 },
                hex: '#5585ed'
            },
            WHITE: {
                rgba: { r: 255, g: 255, b: 255, a: 1 },
                hex: '#ffffff'
            },
        }
    }
    getColor(colorName) {
        return Object.assign({}, this.palette[colorName]);
    }
}
const palette = new Palette();
export default palette;