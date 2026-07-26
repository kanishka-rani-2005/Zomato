import { useEffect, useState } from 'react'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import { api } from '../../api/config'

const Home = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        api.get('/api/food')
            .then(response => {
                setVideos(response.data.foodItems)
            })
            .catch((err) => { return err })
    }, [])


    async function likeVideo(item) {

        const response = await api.post('/api/food/like', { foodId: item._id })

        if(response.data.like){
            setVideos(prev =>
  prev.map(v =>
    v._id === item._id
      ? {
          ...v,
          liked: response.data.like,
          likesCount: response.data.like
            ? v.likesCount + 1
            : v.likesCount - 1
        }
      : v
  )
);
        }else{
            setVideos(prev =>
  prev.map(v =>
    v._id === item._id
      ? {
          ...v,
          liked: response.data.like,
          likesCount: response.data.like
            ? v.likesCount + 1
            : v.likesCount - 1
        }
      : v
  )
);
        }
        
    }

    async function saveVideo(item) {
        const response = await api.post('/api/food/save', { foodId: item._id })
        
        if(response.data.save){
            setVideos(prev =>
  prev.map(v =>
    v._id === item._id
      ? {
          ...v,
          saved: response.data.save,
          savesCount: response.data.save
            ? v.savesCount + 1
            : v.savesCount - 1
        }
      : v
  )
)
        }else{
            setVideos(prev =>
  prev.map(v =>
    v._id === item._id
      ? {
          ...v,
          saved: response.data.save,
          savesCount: response.data.save
            ? v.savesCount + 1
            : v.savesCount - 1
        }
      : v
  )
)
        }
    }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home