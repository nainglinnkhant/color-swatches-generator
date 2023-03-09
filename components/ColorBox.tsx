import { useEffect, useState } from 'react'

import type { HSLColor } from 'types/types'
import styles from 'styles/Home.module.css'

interface Props {
    hslColor: HSLColor
    index: number
    boxCount: number
    colorCode: string
}

let timeout: ReturnType<typeof setTimeout>

const ColorBox = ({ hslColor, index, boxCount, colorCode }: Props) => {
    const { hue, saturation, lightness } = hslColor
    const [showTooltip, setShowTooltip] = useState(false)

    const newLightness = lightness >= 60 ? lightness - (index * 8) : lightness + (index * 8)

    const hslColorCode = `hsl(${hue}, ${saturation}%, ${newLightness}%)`

    const copyToClipboard = () => {
        setShowTooltip(true)
        timeout = setTimeout(() => setShowTooltip(false), 1500)
        navigator.clipboard.writeText(colorCode)
    }

    useEffect(() => {
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className={styles['color-box-container']}>
            <p className={styles['color-text']}>
                {colorCode}
            </p>

            <div
                onClick={copyToClipboard}
                className={styles['color-box']}
                style={{
                    backgroundColor: hslColorCode,
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