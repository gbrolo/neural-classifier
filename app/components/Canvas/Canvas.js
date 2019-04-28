import React, { Component } from 'react'
import { Fade, Button } from 'reactstrap'
import CanvasDraw from "react-canvas-draw"
import axios from 'axios'

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
            lazyRadius: 10,
            title: 'Draw something!',
            confidence: '',
            phrases: [
                "I think it's a ",
                "Mmmm, perhaps you draw a ",
                "My best guess is a ",
                "It's got to be a ",
                "Am I confused, or is this a ",
                "Gotcha! It's a ",
                "Monkey working behind says it's a ",
                "... maybe a ",
                "Wow! Nice ",
                "Yikes! That's an uggly  "
            ]
        }
    }

    classify(div) {
        saveDivAsImg(div).then(image => {
            let image_array = image.split('base64,')

            fetch(`http://localhost:5000/classify/${image_array[1].replace(/\//g, '&')}`, {
                method: 'POST',
                body: {},
            }).then((response) => {                
                response.json().then((body) => {
                    console.log(body)   
                    this.setState({
                        title: `${this.state.phrases[Math.floor(Math.random() * 10)]}${body.prediction}`,
                        confidence: `I'm ${body[body.prediction].toFixed(2)}% sure of it!`
                    })                 
                })
            })
        }).catch(error => console.log(error))
    }

    render() {
        return(
            <Fade in={true} timeout={600}>
                <div className='wrapper-canvas'>
                    <p className='title-lbl'>{this.state.title}</p>
                    <p className='confidence-lbl'>{this.state.confidence}</p>
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
