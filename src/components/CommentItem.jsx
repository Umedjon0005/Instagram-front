import React from 'react';
import axios from '../axios';
 
export const CommentItem = ({ avatar, cmt, fullName }) => {
    const [userName, setUserName] = React.useState([]);
    const getUser = React.useCallback(async () => {
        try {
          const { data } = await axios.get(`/oneUser/${fullName}`);
          setUserName(data);
        } catch (e) {
          console.log(e);
        }
      }, []);

      React.useEffect(() => {
        getUser()
        }, []);
    return ( 
        <div style={{display: 'flex',backgroundColor:"white", alignItems: 'center', marginBottom: 10, border: "1px solid black"}}> 
            <img src={avatar || '/noavatar.png'} style={{VerticalAlign: 'middle', width: 50, height: 50, borderRadius: '50%', display: 'inline'}}/> 
            <div style={{marginLeft: 15}}> 
                <p style={{fontSize: 18, margin: 0}}>{userName.fullName}</p> 
                <p style={{display: 'inline',width:"100%", top: 0, marginLeft: 10}}>{cmt.comment}</p> 
            </div> 
        </div> 
    ) 
}

// .avatar {
//     vertical-align: middle;
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
// }