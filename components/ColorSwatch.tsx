import { HSL, HSLColorCode, RGBColorCode } from '../types/types'
import ColorBox from './ColorBox'
import { RGBToHSL } from '../utils/utilities'

interface Props {
    color: RGBColorCode | HSLColorCode
}

const ColorSwatch = ({ color }: Props) => {
    const convertToHSL = (color: any) => {
        switch (color.type) {
            case 'rgb':
                const hslColorCodes: HSL | string = RGBToHSL(color.red, color.green, color.blue, 'object')

                if (typeof hslColorCodes === 'string') return { ...color, hslColorCodes }
                return { ...color, ...hslColorCodes }
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
                    hslColor={convertToHSL(color)}
                />
            ))}
        </div>
    )
}

export default ColorSwatch