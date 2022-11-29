import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import './Carousel.scss'
import { useNews } from '../utils/db';
import Section from './Section';

function Carousel({ articlesArray, rotate }) {

    const [isRotating, setIsRotating] = useState(false)
    const [isSlicing, setIsSlicing] = useState(false)
    const [isAppearing, setIsAppearing] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsAppearing(!isAppearing)
            setIsSlicing(!isSlicing)
            setTimeout(() => {
                rotate()
            }, 1000)
        }, 1000)
    })





    const renderCells = () => {
        return articlesArray.slice(1, articlesArray.length - 2).map((article, i) => {
            return (
                <div className='cell' key={i}>{article.title}</div>
            )
        })
    }

    return (
        <Section height='10em'>
            <div className={`carousel-ctn ${isSlicing ? 'slicing' : ''} ${isRotating ? 'rotating' : ''}`}
            >
                <div
                    className={`cell ${isSlicing ? 'slicing' : ''} ${isRotating ? 'rotating' : ''}`}
                >{articlesArray[0].title}</div>
                {renderCells()}
                <div
                    className={`cell`}
                >{articlesArray[articlesArray.length - 2].title}</div>
                <div
                    className={`cell last ${isAppearing ? 'appearing' : ''}`}
                >{articlesArray[articlesArray.length - 1].title}</div>
            </div>
        </Section>
    )
}

export default Carousel