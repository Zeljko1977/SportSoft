import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../actions/userActions'
import { Table, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const TrainersScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allUsers = useSelector((state) => state.allUsers)
  const { users } = allUsers
  useEffect(() => {
    dispatch(getAllUsers('trener'))
  }, [])

  return (
    <>
      <div>TrainersScreen</div>
      <Table size='sm' striped bordered hover>
        <thead>
          <tr key={0}>
            <th>Ime i Prezime</th>
            <th>mail</th>
            <th>uloga</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.uloga}</td>
                <td>
                  <Nav.Link
                    style={{ color: '#35A7D5' }}
                    onClick={() => navigate(`/admin/trainer/${user.id}`)}
                  >
                    Vidi detalje
                  </Nav.Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default TrainersScreen
