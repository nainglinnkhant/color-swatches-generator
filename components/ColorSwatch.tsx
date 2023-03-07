import { Color } from '../types/types'
import ColorBox from './ColorBox'
import { RGBToHSL } from '../utils/utilities'

interface Props {
    color: Color
}

const ColorSwatch = ({ color }: Props) => {
    const generateColorCode = (color: Color) => {
        switch (color.type) {
            case 'rgb':
                return `rgb(${color.red}, ${color.green}, ${color.blue})`
                
            case 'hsl':
                return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`
        }
    }

    const convertToHSL = (color: Color) => {
        switch (color.type) {
            case 'rgb':
                const { red, green, blue } = color
                const hslColor = RGBToHSL(red, green, blue)
                return hslColor
                
            case 'hsl':
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