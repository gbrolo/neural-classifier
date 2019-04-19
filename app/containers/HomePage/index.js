import React, { Component } from 'react'
import { Fade } from 'reactstrap'

import Canvas from '../../components/Canvas/Canvas'

import './index.css'

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return(
            <Fade in={true} timeout={600}>
                <div className='wrapper'>
                    <Canvas />
                </div>
            </Fade>
        )
    }
}

export default HomePage
