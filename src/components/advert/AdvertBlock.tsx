import { useSelector } from 'react-redux'
import '../../styles/App.css'
import { AdvertCard } from './AdvertCard'
import { RootState } from '../../reduxAppStore/rootReducer'
import { useEffect, useRef, useState } from 'react'

const AdvertBlock = () => {
  const allAdverts = useSelector(
    (state: RootState) => state.advertisements.allAdverts,
  )

  const [imgContainerWidth, setImgContainerWidth] = useState<null | number>(
    null,
  )

  const ref = useRef<any>()
  useEffect(() => {
    if (ref.current) {
      const containerWidth = ref.current.clientWidth
      setImgContainerWidth(containerWidth)
    }
  }, [ref.current])

  console.log('AdvertCard', imgContainerWidth)

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
        <div className="Advert-column" key={item._id} ref={ref}>
          {imgContainerWidth && (
            <AdvertCard
              mainPhotoUrl={item.mainPhoto}
              advertId={item._id}
              photoWidth={imgContainerWidth}
            />
          )}
        </div>
      )
    })
    return [...cards, ...fake]
  }

  return <div className="AdvertBlock-wrapper">{normalizeAdvertArray()}</div>
}

export default AdvertBlock
