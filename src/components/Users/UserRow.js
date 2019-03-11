import React from 'react'

function UserRow({ user, editButtonHandler, deleteButtonHandler }) {
  return (
    <tr>
      <td>
        <img alt={user.profilePhoto} src={user.profilePhoto} style={{height:'90px'}} />
      </td>
      <td>{user.name}</td>
      <td>{user.address}</td> 
      {/* <td>{new Date(user.EventDate).toLocaleString()}</td> */}
      <td>{user.country}</td>
      <td>{user.phoneNumber}</td>
      <td>
        <button onClick={() => editButtonHandler(user)} className="btn btn-primary">
          <span className="fas fa-pencil-alt"></span>
        </button> &nbsp;
          
          <button onClick={() => deleteButtonHandler(user)} className="btn btn-danger">
            <span className="fas fa-trash-alt"></span>
          </button>
      </td>
    </tr>
  )
}

export default UserRow
