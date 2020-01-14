import React, { useState, useEffect } from 'react'
import axios from 'axios'
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([])
    const [values, setValues] = useState({})
    const [index, setIndex] = useState('')

    useEffect(() => {
        (async () => {
            const newValues = await axios.get('/api/values/current')
            setValues(newValues.data)

            const newIndexes = await axios.get('/api/values/all')
            setSeenIndexes(newIndexes.data)
        })()
    }, [])

    return (
        <div>
            <form>
                <label>Enter your index:</label>
                <input
                    value={index}
                    onChange={(event) => setIndex(event.target.value)}
                />
                <button
                    onClick={async (event) => {
                        event.preventDefault()
                        event.stopPropagation()

                        await axios.post('/api/values', {
                            index
                        })

                        setIndex('')
                    }}
                >Submit</button>
            </form>
            <h3>Indexes I have seen:</h3>
            {isArray(seenIndexes) && seenIndexes.map(({ number }) => number).join(', ')}
            {isString(seenIndexes) && seenIndexes}
            <h3>Calculated values:</h3>
            {isObject(values) && Object.entries(values).map(([index, value]) =>
                <div key={index}>
                    For index {index} I calculated {value}
                </div>
            )}
            {isString(values) && values}
        </div>
    )
}

export default Fib