import React from "react";
// import * as axios from 'axios';
import Profile from "./Profile";
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import Preloader from '../../components/common/Preloader/Preloader.js';
import { Redirect, withRouter } from "react-router";
// import { UserApi } from "../../api/api";
import { withAuthRedirectComponent } from "../../HOC/withAuthRedirectComponent";
import { compose } from "redux";

class ProfileContainer extends React.Component {
   // constructor(props) {
   // debugger;
   // super(props);
   // this.getProfile();
   // }

   getProfile = () => {
      let userId = this.props.match.params.userId;
      if (!userId) {
         userId = 20000;
         // userId = this.props.autorizedUserId;
         if (!userId) { this.props.history.push("/login") }
      }
      // // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      // UserApi.getProfile(userId)
      //    .then(response => {
      //       this.props.SetUserProfile(response.data);
      //    });
      // // this.getProfile();
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
   }

   componentDidMount() {
      this.getProfile();
   }
   componentDidUpdate(prevProps, prevState) {
      if (this.props.match.params.userId === prevProps.match.params.userId)
         this.getProfile();
   }




   render() {
      // debugger;
      // if (!this.props.isAuth) return <Redirect to={"/Login"} />;
      return (
         // this.props.Profile ? <Preloader /> :
         <Profile {...this.props}
            profile={this.props.profile}
            status={this.props.status}
            isOwner={!this.props.match.params.userId}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
         // saveProfile={this.props.saveProfile}
         />
      )
   }
}

// let AuthRedirectComponent = (props) => { // обертка над ProfileContainer для редиректа
//    if (!this.props.isAuth) return <Redirect to={"/Login"} />;
//    return <ProfileContainer {...props} /> //пропсы прокинем дальше
// }


// let AuthRedirectComponent = withAuthRedirectComponent(ProfileContainer); //создаем с помощью HOC

// let mapStateToPropsForRedirect = (state) => {
//    return {
//       isAuth: state.auth.isAuth,
//    }
// }
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);

let mapStateToProps = (state) => {
   return {
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      // isAuth: state.auth.isAuth,
   }
}

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);

export default compose(
   connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
   withAuthRedirectComponent,
   withRouter
)(ProfileContainer);
