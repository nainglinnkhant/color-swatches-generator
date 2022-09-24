export function RGBToHSL(red: number, green: number, blue: number, type = 'object') {
    // Make r, g, and b fractions of 1
    let r = red / 255,
        g = green / 255,
        b = blue / 255
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0

    if (delta == 0)
        h = 0
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2
    // Blue is max
    else
        h = (r - g) / delta + 4

    h = Math.round(h * 60)
    
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360

    // Calculate lightness
    l = (cmax + cmin) / 2

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
        
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    if (type === 'string') return `hsl(${h}, ${s}%, ${l}%)`

    return {
        hue: h,
        saturation: s,
        lightness: l,
    }
}