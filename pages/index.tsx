import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { HSLColor, RGBColor } from '../types/types'
import { ColorSwatch, Spinner } from '../components'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    const [colors, setColors] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchColors = async () => {
        setLoading(true)
        const response = await fetch('/api/colors')
        const data = await response.json()
        setColors(data.colors)
        setLoading(false)
    }

    useEffect(() => {
        fetchColors()
    }, [])

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

    return (
        <div className={styles.container}>
            <Head>
                <title>Color Swatches Generator</title>
                <meta name='description' content='Generate color swatches in various color formats' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles['main-wrapper']}>
                <h1 style={{ fontSize: 20, textAlign: 'center' }}>
                    Generate Random Color Swatches!
                </h1>
               
                <button className={styles.button} onClick={fetchColors}>Generate</button>

                <p style={{ fontSize: 13, textAlign: 'center' }}>
                    *Click on color box to copy the color code.
                </p>

                {loading && <Spinner />}

                {!loading && colors.map((color: RGBColor | HSLColor, index) => (
                    <ColorSwatch
                        key={index}
                        color={{ ...color, code: generateColorCode(color) }}
                    />
                ))}
            </main>
        </div>
    )
}

export default Home
