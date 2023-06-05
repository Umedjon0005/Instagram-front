import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserItem = ({all, search}) => {
  return (
    all?.filter(obj=>obj.fullName.includes(search)).map((item) => {
      return (
        <div style={{display: 'flex', alignItems: 'center', marginBottom: 10, marginTop: 10, border: "1px solid black"}}>
          <img src={item.avatarUrl || '/noavatar.png'} style={{VerticalAlign: 'middle', width: 50, height: 50, borderRadius: '50%', display: 'inline'}}/>
          <div style={{marginLeft: 15}}>
              <p style={{fontSize: 18, margin: 0}}>{item.fullName}</p>
              <Link to={`/userPage/${item._id}`} style={{display: 'inline', top: 0, marginLeft: 10, textDecoration: 'none', color: '#000'}}>Check user</Link>
          </div>
        </div>
      )
    })
  )
}

export default UserItem;