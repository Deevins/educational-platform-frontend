import { useParams } from 'react-router-dom'

type ParamsType = {
  profileID: string
}

const ProfilePage = () => {
  const { profileID } = useParams<ParamsType>()
  return <div>profile with ID {profileID}</div>
}

export default ProfilePage
