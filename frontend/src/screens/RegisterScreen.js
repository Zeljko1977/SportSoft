import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { registerSchema } from '../validations/userValidations'

import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerUs } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { USER_REGISTER_RESET } from '../constants/userConstants'

const RegisterScreen = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })

  const registerUser = useSelector((state) => state.userRegister)
  const { userInfo } = registerUser

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (data, e) => {
    e.preventDefault()

    dispatch(registerUs(name, email, password))
    //dispatch({type: USER_REGISTER_RESET})
  }

  return (
    <>
      {userInfo && userInfo.affectedRows === 1 ? (
        <h1>Uspesno ste se registrovali</h1>
      ) : (
        <FormContainer>
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                isInvalid={errors.name?.message ? true : false}
                type='name'
                placeholder='Enter name'
                value={name}
                {...register('name')}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                isInvalid={errors.email?.message ? true : false}
                type='email'
                placeholder='Enter email'
                value={email}
                {...register('email')}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.email?.message}
              </Form.Control.Feedback>
              {userInfo ? <p style={{ color: 'red' }}>{userInfo}</p> : ''}
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                isInvalid={errors.passoword?.message}
                type='password'
                placeholder='Enter password'
                value={password}
                {...register('password')}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Register
            </Button>
          </Form>
          {/* <Row className='py-3'>
      <Col>
      Have account?{' '}
      <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
        Login
      </Link>
      </Col>
    </Row> */}
        </FormContainer>
      )}
    </>
  )
}

export default RegisterScreen
