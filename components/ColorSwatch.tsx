import { RGB, HSL } from '../types/types'
import ColorBox from './ColorBox'
import { RGBToHSL } from '../utils/utilities'

interface Props {
    color: RGB | HSL
}

const ColorSwatch = ({ color }: Props) => {
    const generateColorCode = (color: any) => {
        switch (color.type) {
            case 'rgb':
                return `rgb(${color.red}, ${color.green}, ${color.blue})`
            case 'hsl':
                return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`
            default:
                return `rgb(${color.red}, ${color.green}, ${color.blue})`
        }
    }

    const convertToHSL = (color: any) => {
        switch (color.type) {
            case 'rgb':
                const hslColorFields: HSL | string = RGBToHSL(color.red, color.green, color.blue, 'object')

                return hslColorFields
            default:
                return color
        }
    }

    const arr = new Array(5).fill(0)

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {arr.map((_, index) => (
                <ColorBox
                    key={index}
                    index={index}
                    boxCount={arr.length}
                    colorCode={generateColorCode(color)}
                    hslColor={convertToHSL(color)}
                />
            ))}
        </div>
    )
}

export default ColorSwatch