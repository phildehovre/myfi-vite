import React, {
    useState,
    useEffect,
    useContext,
    // useRef 
} from 'react'
import AutoComplete from './AutoComplete'
import { useForm } from 'react-hook-form'
import { auth } from '../Config/firebase'
import axios from 'axios'
import './SearchBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Section from './Section'
import { useTimeSeries } from '../utils/db'

function SearchBar({ height, handleTickerChange }) {

    const { handleSubmit, register, reset } = useForm();

    const [term, setTerm] = useState('');
    const [autoComplete, setAutoComplete] = useState([]);
    const [show, setShow] = useState(true);
    const [type, setType] = useState('stocks');

    useEffect(() => {
        if (term && term.length) {
            axios.get(`https://api.twelvedata.com/symbol_search?symbol=${term}&outputsize=20&apikey=${import.meta.env.REACT_APP_TWELVEDATA_API_KEY}`, {
            }).then((res, err) => {
                setAutoComplete(res.data.data)
            }).catch(err => alert(err))
        };
    }, [term]);


    const onSubmit = (data) => {
        handleSubmit(data)
        // updateWatchlist(auth.currentUser.uid, term)
        reset()
        setTerm('')
    };



    const handleOnSearchBarInput = (e) => {
        setShow(true)
        setTerm(e.target.value)
    };

    const handleTypeChange = (type) => {
        setType(type)
        setTerm('')
    };



    return (
        <>
            <form className='searchbar_form-ctn' onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('term')}
                    name='searchTerm'
                    autoComplete="off"
                    className='searchbar'
                    onChange={e => { handleOnSearchBarInput(e) }}
                    placeholder='Try GE, TSLA, AMZN, ...'
                    type='text'
                    value={term}
                />
                <button className='searchbar-btn' type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                </button>
                <AutoComplete
                    term={term}
                    setShow={setShow}
                    show={show}
                    autoComplete={autoComplete}
                    handleTickerChange={handleTickerChange}
                />
            </form>
        </>
    )
};

export default SearchBar;