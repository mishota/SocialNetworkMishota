import React from "react";
import s from './ProfileInfo.module.css';



const ProfileData = ({ profile, isOwner, goToEditMode }) => {
   return (
      <div>
         <div>
            {isOwner && <button onClick={goToEditMode}>Edit</button>}
         </div>
         <div>
            <b>Full name:</b> {profile.fullName}
         </div>
         <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
         </div>
         {profile.lookingForAJob &&
            <div>
               <b>My skills:</b> {profile.lookingForAJobDescription}
            </div>
         }
         <div>
            <b>About me:</b> {profile.aboutMe}
         </div>
         <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
               return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
         </div>
      </div>
   )
}
const Contact = ({ contactTitle, contactValue }) => {
   return (
      <div className={s.contact}><b>{contactTitle}:</b> {contactValue} </div>
   )
}

const ProfileDataForm = ({ profile }) => {
   return (
      <div>
         Form
      </div>
   )
}

export default ProfileDataForm;