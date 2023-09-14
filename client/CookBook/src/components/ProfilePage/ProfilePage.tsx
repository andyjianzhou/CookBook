import React from 'react'
import { ProfileDetails } from '../../models/ProfileDetails'
import { IUserServices } from '../Services/IUserServices'

const ProfilePage: React.FC = () => {
    const [profileDetails, setProfileDetails] = React.useState<ProfileDetails | null>(null)
    const getUserProfile = async () => {

    }
    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    )
}

export default ProfilePage