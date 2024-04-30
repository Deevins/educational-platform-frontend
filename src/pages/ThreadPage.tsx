import { useParams } from 'react-router-dom'

type ParamsType = {
  threadID: string
}

const ThreadPage = () => {
  const params = useParams<ParamsType>()

  return <div>thread page {params.threadID}</div>
}

export default ThreadPage
