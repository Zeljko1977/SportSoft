import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner 
        animation='border'
        role='status'
        variant='succes'
        style={{
            width: '200px',
            height: '200px',
            margin: 'auto',
            position: 'fixed', top: '40%', left: '40%'
        }}
        />

    )
}

export default Loader