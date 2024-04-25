import { Navigate, useParams } from 'react-router-dom'

type ParamsType = {
  profileID: string
}

const ProfilePage = () => {
  const { profileID } = useParams<ParamsType>()
  if (!isNaN(Number(profileID))) {
    console.log(!isNaN(Number(profileID)))
    return <Navigate to={'/profiles`)'} />
  }

  return <div>profile with ID {profileID}</div>
}

export default ProfilePage
