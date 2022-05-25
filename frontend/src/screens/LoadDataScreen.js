import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

const LoadDataScreen = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rawdata, setRawdata] = useState('')
  const [loadDdata, setLoadData] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(`/api/data/all`, rawdata, config)
    console.log(data)
  }

  const sendLoadData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(`/api/data/load`, loadDdata, config)
    console.log(data)
  }

  const syncData = async () => {
    await axios.get(`/api/data/sync`)
  }

  return (
    <FormContainer>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='area'>
              <Form.Label>Data from katapult</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Paste data'
                rows={6}
                value={rawdata}
                onChange={(e) => setRawdata(e.target.value)}
                required
              />
            </Form.Group>
            <Button type='submit' className='w-100 mt-5'>
              Send game data
            </Button>
            <Form.Group className='mb-3' controlId='area'>
              <Form.Label>Data from katapult</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Paste data'
                rows={6}
                value={loadDdata}
                onChange={(e) => setLoadData(e.target.value)}
                required
              />
            </Form.Group>
            <Button onClick={sendLoadData} className='w-100 mt-5'>
              Send load data
            </Button>

            <Button onClick={syncData} className='w-100 mt-5'>
              Sync data
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account ? <Link to='/login'>Log In</Link>
      </div>
    </FormContainer>
  )
}

export default LoadDataScreen
