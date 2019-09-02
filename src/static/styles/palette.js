
class Palette {
    constructor() {
        this.palette = {
            defaultUserColors: ['#ffffff', '#e5e9f2', '#5585ed', '#000000'],
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
    getUserColors(){
        const storedPalette = localStorage.getItem('userPalette');
        return storedPalette ? JSON.parse(storedPalette) : this.palette.defaultUserColors;
    }
    addUserColor(color){
        const storedPalette = localStorage.getItem('userPalette');
        const userPalette = storedPalette ? JSON.parse(storedPalette) : this.palette.defaultUserColors;
        if (!userPalette.includes(color)) {
            userPalette.unshift(color);
        }
        if (userPalette.length > 16) {
            userPalette.pop();
        }
        localStorage.setItem('userPalette', JSON.stringify(userPalette));
    }
}
const palette = new Palette();
export default palette;