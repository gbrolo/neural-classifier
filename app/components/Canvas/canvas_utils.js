const html2canvas = require('html2canvas')

function saveDivAsImg(div) {
    return new Promise((resolve, reject) => {
        html2canvas(div).then(canvas => {
            let extra_canvas = document.createElement('canvas')
            extra_canvas.setAttribute('width', 28)
            extra_canvas.setAttribute('height', 28)
            
            let ctx = extra_canvas.getContext('2d')
            ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,28,28)

            resolve(extra_canvas.toDataURL('image/jpg').replace("image/jpeg", "image/octet-stream"))
        }).catch(error => reject(error))
    })    
}

export {
    saveDivAsImg
}