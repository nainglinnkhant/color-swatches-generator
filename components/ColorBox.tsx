import { useState } from 'react'

import { HSLColorCode } from '../types/types'
import { HSLToRGB } from '../utils/utilities'
import styles from '../styles/Home.module.css'

interface Props {
    hslColor: HSLColorCode
    index: number
    boxCount: number
}

const ColorBox = ({ hslColor, index, boxCount }: Props) => {
    const { hue, saturation, lightness } = hslColor
    const [showTooltip, setShowTooltip] = useState(false)

    const newLightness = lightness >= 60 ? lightness - (index * 8) : lightness + (index * 8)

    const colorCode = `hsl(${hue}, ${saturation}%, ${newLightness}%)`

    const generateDisplayCode: any = (color: HSLColorCode) => {
        switch (color.type) {
            case 'rgb':
                return HSLToRGB(hue, saturation, newLightness, 'string')
            default:
                return colorCode
        }
    }

    const copyToClipboard = () => {
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 1500)
        navigator.clipboard.writeText(generateDisplayCode(hslColor))
    }

    return (
        <div className={styles['color-box-container']}>
            <p className={styles['color-text']}>
                {generateDisplayCode(hslColor)}
            </p>

            <div
                onClick={copyToClipboard}
                className={styles['color-box']}
                style={{
                    backgroundColor: colorCode,
                    maxWidth: '100px',
                    height: '100px',
                    borderTopLeftRadius: index === 0 ? 10 : 0,
                    borderBottomLeftRadius: index === 0 ? 10 : 0,
                    borderTopRightRadius: index === boxCount - 1 ? 10 : 0,
                    borderBottomRightRadius: index === boxCount - 1 ? 10 : 0,
                    cursor: 'pointer',
                }}
            >
                {showTooltip && (
                    <div className={styles.tooltip}>
                        <p>Copied</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ColorBox