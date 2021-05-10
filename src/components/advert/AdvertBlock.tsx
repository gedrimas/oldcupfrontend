import { useSelector } from 'react-redux'
import '../../styles/App.css'
import { AdvertCard } from './AdvertCard'
import { RootState } from '../../reduxAppStore/rootReducer'
import { useEffect, useState, createRef } from 'react'
import Grid from '@material-ui/core/Grid'

const AdvertBlock = () => {
  const allAdverts = useSelector(
    (state: RootState) => state.advertisements.allAdverts,
  )

  const [imgContainerWidth, setImgContainerWidth] = useState<null | number>(
    null,
  )

  const ref = createRef<HTMLDivElement>()

  //get widht for advert photo
  useEffect(() => {
    if (ref.current) {
      const containerWidth = ref.current.clientWidth
      setImgContainerWidth(containerWidth)
    }
  }, [ref])

  //return adverts cards
  const normalizeAdvertArray = () => {
    let fake: unknown[] = []
    //make every row with not less then 4 columns by addin empty div
    if (allAdverts.length % 4 > 0) {
      fake = [1, 2, 3].map((item) => (
        <div key={item} className="Advert-column"></div>
      ))
    }
    let cards = allAdverts.map((item) => {
      return (
        <Grid className="Advert-column" key={item._id} ref={ref}>
          {imgContainerWidth && (
            <AdvertCard
              mainPhotoUrl={item.mainPhoto}
              advertId={item._id}
              photoWidth={imgContainerWidth}
            />
          )}
        </Grid>
      )
    })
    return [...cards, ...fake]
  }

  return <div className="AdvertBlock-wrapper">{normalizeAdvertArray()}</div>
}

export default AdvertBlock
