import { useEffect, useState } from 'react'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import { api } from '../../api/config'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        api.get('/api/food/save')
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likesCount: item.food.likesCount,
                    savesCount: item.food.savesCount,
                    foodPartner: item.food.foodPartner?._id,
                    foodPartnerName: item.food.foodPartner?.name || 'Unknown',
                }))
                setVideos(savedFoods)
            })
    }, [])

    const removeSaved = async (item) => {
        try {
            const response = await api.post('/api/food/save', { foodId: item._id })
            if (response.data.save === false) {
                setVideos((prev) => prev.filter((v) => v._id !== item._id))
            }
        } catch (err){
            return err
        }
    }

    return (
            <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    
    )
}

export default Saved