import React from 'react';
import { connect } from 'react-redux';
import {
   follow, setUsers, unFollow,
   setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingProcess
} from '../redux/usersReducer';
import * as axios from 'axios';

// import styles from "./Users.module.css";
// import userPhoto from "../Assets/Images/user.png";
import Users from './Users';
import Preloader from '../components/common/Preloader/Preloader';
import { getUsers, UserApi } from '../api/api';


class UsersContainer extends React.Component {
   constructor(props) {
      super(props);
      // this.getUsers();
   }

   componentDidMount() {
      // debugger;
      this.getUsers();
   }

   getUsers = () => {
      // debugger;
      // if (this.props.users.length === 0) {
      this.props.toggleIsFetching(true);
      UserApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
         this.props.toggleIsFetching(false);
         this.props.setUsers(data.items);
         this.props.setTotalUsersCount(data.totalCount);
      });
      // }
   }

   onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber);
      this.props.toggleIsFetching(true);
      UserApi.getUsers(pageNumber, this.props.pageSize).then(data => {
         this.props.toggleIsFetching(false);
         this.props.setUsers(data.items);

      });
   }

   render() {
      // debugger;
      return (
         this.props.isFetching ? <Preloader /> :
            <Users users={this.props.users}
               totalUsersCount={this.props.totalUsersCount}
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               followingInProcess={this.props.followingInProcess}
               onPageChanged={this.onPageChanged}
               follow={this.props.follow}
               unFollow={this.props.unFollow}
               getUsers={this.getUsers}
               toggleFollowingProcess={this.props.toggleFollowingProcess}
            />
      )
   }
}

let mapStateToProps = (state) => {
   return {
      users: state.userPage.users,
      pageSize: state.userPage.pageSize,
      totalUsersCount: state.userPage.totalUsersCount,
      currentPage: state.userPage.currentPage,
      isFetching: state.userPage.isFetching,
      followingInProcess: state.userPage.followingInProcess,
   }
}
// let mapDispatchToProps = (dispatch) => {
//    return {
//       follow: (userId) => {
//          dispatch(follow(userId))
//       },
//       unFollow: (userId) => {
//          dispatch(unFollow(userId))
//       },
//       setUsers: (users) => {
//          dispatch(setUsers(users))
//       },
//       setCurrentPage: (pageNumber) => {
//          dispatch(setCurrentPage(pageNumber))
//       },
//       setTotalUsersCount: (totalCount) => {
//          dispatch(setTotalUsersCount(totalCount))
//       },
//       toggleIsFetching: (isFetching) => {
//          dispatch(toggleIsFetching(isFetching))
//       },
//    }

// }






// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
export default connect(mapStateToProps, {
   follow, unFollow, setUsers, setCurrentPage,
   setTotalUsersCount, toggleIsFetching, toggleFollowingProcess
})(UsersContainer);
