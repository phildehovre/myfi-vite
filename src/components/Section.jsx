import React from 'react'
import './Section.scss'

function Section(props) {

    const { children, height } = props

    const styles = {
        height
    }
    return (
        <div className='section' style={styles}>{children}</div>
    )
}

export default Section