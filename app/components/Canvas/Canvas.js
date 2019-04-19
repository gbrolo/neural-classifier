import React, { Component } from 'react'
import { Fade, Button } from 'reactstrap'
import CanvasDraw from "react-canvas-draw"

import { saveDivAsImg } from './canvas_utils'

import './canvas.css'

class Canvas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            color: '#000',
            width: 400,
            height: 400,
            brushRadius: 10,
            lazyRadius: 12
        }
    }

    classify(div) {
        saveDivAsImg(div).then(image => {
            console.log(image)
        }).catch(error => console.log(error))
    }

    render() {
        return(
            <Fade in={true} timeout={600}>
                <div className='wrapper-canvas'>
                    <div className='layout-canvas'>
                        <div id='canvas'>
                            <CanvasDraw
                                ref = { canvasDraw => (this.canvas = canvasDraw) }
                                brushColor = { this.state.color }
                                brushRadius = { this.state.brushRadius }
                                lazyRadius = { this.state.lazyRadius }
                                canvasWidth = { this.state.width }
                                canvasHeight = { this.state.height }   
                                hideGrid = { true }  
                                hideBrush = { true }                                                  
                            />                    
                        </div>
                    </div>

                    <div className='btns-wrapper'>
                        <Button className='btn-layout' onClick={ () => this.canvas.clear() }>Clear</Button>
                        <Button className='btn-layout' onClick={ () => this.canvas.undo() }>Undo</Button>
                        <Button className='btn-layout' onClick={ () => this.classify(
                            document.getElementById('canvas')
                        ) }>Classify</Button>
                    </div>
                </div>
            </Fade>
        )
    }
}

export default Canvas
