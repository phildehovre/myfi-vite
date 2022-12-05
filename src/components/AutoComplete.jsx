// import { InstrumentContext } from '../Contexts/InstrumentContext'
import React, { useContext, useState } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateWatchlist } from '../utils/db'
import { auth } from '../Config/firebase'
import { uuidv4 } from '@firebase/util'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'

function AutoComplete(props) {

    const { term,
        setTerm,
        setShow,
        show,
        autoComplete,
        handleTickerChange,
        handleTickerItemClick,
    } = props;

    window.addEventListener('click', () => { setShow(false) })

    const [showButton, setShowButton] = useState(false);
    const [isHovered, setIsHovered] = useState(null);

    const { handleTickerSelection } = useContext(selectedTickerContext)

    const handleTickerClick = (t) => {
        setShow(false)
        handleTickerSelection(t)
    };

    const handleMouseEnter = (val) => {
        setIsHovered(val)
    };

    const handleMouseLeave = (e) => {
        setShowButton('')
    };

    const renderAutoComplete = () => {
        if (term && show && autoComplete && autoComplete.length > 0) {
            return autoComplete.map((val, i) => {
                return (
                    <li className='autocomplete-list-item'
                        key={uuidv4()}
                        onClick={() => handleTickerClick(val)}
                        onMouseEnter={(e) => handleMouseEnter(i)}
                    >
                        <span className='symbol'>
                            {val.symbol}
                        </span>
                        <span className='name'>
                            {val.instrument_name}
                        </span>
                        <span className='type'>
                            {val.instrument_type}
                        </span>
                        <span className='currency'>
                            {val.currency}
                        </span>
                        <div
                            className={`watchlist_add-btn ${isHovered === i && showButton ? 'visible' : ''}`}
                            onClick={() => { updateWatchlist(auth.currentUser.uid, val) }}
                        >
                            <FontAwesomeIcon icon={faPlus} size='lg' style={{ color: 'grey' }} />
                        </div>
                    </li>
                )
            })
        };
    };

    return (
        <div className='autocomplete-list'
            onMouseEnter={() => { setShowButton(true) }}
            onMouseLeave={() => { setShowButton(false) }}
        >{renderAutoComplete()}</div>
    )
};

export default AutoComplete;