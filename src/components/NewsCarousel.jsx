import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNews } from '../utils/db'
import Carousel from './Carousel'
import Spinner from './Spinner'

function NewsCarousel() {

    const [articles, setArticles] = useState()

    const onSuccess = (data) => {
        setArticles(data.data.articles)
    }

    const rotate = () => {
        const slice = articles.slice(1, articles.length)
        const slicedCell = articles.slice(0, 1)
        setArticles([...slice, ...slicedCell])
    }
    const onError = (err) => {
        console.log(err)
    }

    const { isLoading, data, error } = useNews('microsoft', 6, onSuccess, onError)


    return (
        <>
            {isLoading && <Spinner />}
            {articles &&
                <Carousel articlesArray={articles} rotate={rotate} />
            }
        </>
    )
}

export default NewsCarousel