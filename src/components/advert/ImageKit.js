import { IKContext, IKImage } from 'imagekitio-react'

export const ImageKit = (props) => {
  const { photoUrl, width } = props

  console.log('imagekit', width)
  const urlEndpoint = 'https://ik.imagekit.io/scqtro3md'
  return (
    <IKContext urlEndpoint={urlEndpoint}>
      <IKImage
        style={{
          marginTop: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        }}
        path={photoUrl}
        transformation={[
          {
            height: width,
            width: width,
          },
        ]}
      />
    </IKContext>
  )
}
