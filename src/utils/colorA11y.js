// MIT Licensed functions courtesty of Qambar Raza
// https://github.com/Qambar/color-contrast-checker/blob/master/src/colorContrastChecker.js
let rgbClass = {
  'toString': () => {
    return '<r: ' + this.r +
    ' g: ' + this.g +
    ' b: ' + this.b +
    ' >'
  }
}


  getRGBFromHex: (color) => {
    let rgb = Object.create(rgbClass)
    let rVal
    let gVal
    let bVal

    if (typeof color !== 'string') {
      throw new Error('must use string')
    }

    rVal = parseInt(color.slice(1, 3), 16)
    gVal = parseInt(color.slice(3, 5), 16)
    bVal = parseInt(color.slice(5, 7), 16)

    rgb.r = rVal
    rgb.g = gVal
    rgb.b = bVal

    return rgb
  },

  calculateSRGB: (rgb) => {
    let sRGB = Object.create(rgbClass)
    let key

    for (key in rgb) {
      if (rgb.hasOwnProperty(key)) {
        sRGB[key] = parseFloat(rgb[key] / 255, 10)
      }
    }

    return sRGB
  },

  calculateLRGB: (rgb) => {
    let sRGB = calculateSRGB(rgb)
    let lRGB = Object.create(rgbClass)
    let key
    let val = 0

    for (key in sRGB) {
      if (sRGB.hasOwnProperty(key)) {
        val = parseFloat(sRGB[key], 10)
        if (val <= 0.03928) {
          lRGB[key] = val / 12.92
        } else {
          lRGB[key] = Math.pow(((val + 0.055) / 1.055), 2.4)
        }
      }
    }

    return lRGB
  },

  calculateLuminance: (lRGB) => {
    return (0.2126 * lRGB.r) + (0.7152 * lRGB.g) + (0.0722 * lRGB.b)
  },

  getContrastRatio: (lumA, lumB) => {
    let ratio
    let lighter
    let darker

    if (lumA >= lumB) {
      lighter = lumA
      darker = lumB
    } else {
      lighter = lumB
      darker = lumA
    }

    ratio = (lighter + 0.05) / (darker + 0.05)

    return Math.round(ratio, 1)
  },

  getContrastRatioForHex: (foregroundColor, backgroundColor) => {
    let color1 = getRGBFromHex(foregroundColor)
    let color2 = getRGBFromHex(backgroundColor)
    let l1RGB = calculateLRGB(color1)
    let l2RGB = calculateLRGB(color2)
    let l1 = calculateLuminance(l1RGB)
    let l2 = calculateLuminance(l2RGB)

    return getContrastRatio(l1, l2)
  },

  rgb2hex: (rgb) => {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) {
      return rgb
    }

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    function hex (x) {
      return ('0' + parseInt(x, 10).toString(16)).slice(-2)
    }
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])
  },

  setKeySwatchLabelColors: (c) => {
    // let $keys = document.getElementsByClassName('.es-contrast-grid__key-swatch')
    // $keys.forEach((el) => {
    let backgroundColor = rgb2hex("'" + c + "'")
    let contrastWithWhite = getContrastRatioForHex('#FFFFFF', backgroundColor)

    if (contrastWithWhite === 1) {
      return 'es-contrast-grid--bordered-swatch es-contrast-grid--dark-label'
    } else if (contrastWithWhite < 4.0) {
      return 'es-contrast-grid--dark-label'
    }
    // })
    // return $keys
  },

  addContrastToSwatches: () => {
    var $swatches = document.getElementsByClassName('.es-contrast-grid__swatch')
    $swatches.forEach((el) => {
      if (typeof this.style.backgroundColor !== 'undefined' &&
        typeof this.style.color !== 'undefined') {
        let backgroundColor = rgb2hex(el.style.backgroundColor)
        let foregroundColor = rgb2hex(el.style.color)
        let contrastRatio = getContrastRatioForHex(foregroundColor, backgroundColor)
        let contrastWithWhite = getContrastRatioForHex('#FFFFFF', backgroundColor)
        el.find('.es-contrast-grid__contrast-ratio').innerText(contrastRatio)
        // el.querySelectorAll('.es-contrast-grid__contrast-ratio')
        if (contrastWithWhite === 1) {
          el.classList.add('es-contrast-grid--bordered-swatch es-contrast-grid--dark-label')
        } else if (contrastWithWhite < 4.0) {
          el.classList.add('es-contrast-grid--dark-label')
        }
      }
    })
  }
