import * as axios from 'axios';
import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../Assets/Images/user.png";


let Users = (props) => {
   let getUsers = () => {
      if (props.users.length === 0) {
         axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
               debugger;
               props.setUsers(response.data.items);
            });
      }
   }

   return <div>
      <button onClick={getUsers}>Get Users</button>
      {
         props.users.map(u => <div key={u.id}>
            <span>
               <div>
                  <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto} />
               </div>
               <div>
                  {u.followed === true
                     ? <button onClick={() => { props.unFollow(u.id) }}  >Unfollow</button>
                     : <button onClick={() => { props.follow(u.id) }}  >Follow</button>}

               </div>
            </span>
            <span>
               <span>
                  <div>{u.name}</div>
                  <div>{u.status}</div>
               </span>
               <span>
                  <div>"u.location.city"</div>
                  <div>"u.location.country"</div>
               </span>
            </span>


         </div>)
      }
   </div>
}

export default Users;