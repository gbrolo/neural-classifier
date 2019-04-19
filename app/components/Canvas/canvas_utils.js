const html2canvas = require('html2canvas')

function saveDivAsImg(div) {
    return new Promise((resolve, reject) => {
        html2canvas(div).then(canvas => {
            resolve(canvas.toDataURL('image/jpg'))
        }).catch(error => reject(error))
    })    
}

export {
    saveDivAsImg
}