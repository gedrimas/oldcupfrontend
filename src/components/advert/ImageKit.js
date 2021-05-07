import React from 'react'
import { IKContext, IKImage } from 'imagekitio-react'

export const ImageKit = (props) => {
  console.log('props', props)
  const urlEndpoint = 'https://ik.imagekit.io/scqtro3md'
  //"2BA02FFE-68FF-4AB5-9428-2D1ABD4C0C85_jjV1ak_v8.jpeg"
  return (
    <IKContext urlEndpoint={urlEndpoint}>
      <IKImage
        path={props.photoUrl}
        transformation={[
          {
            height: 200,
            width: 200,
          },
        ]}
      />
    </IKContext>
  )
}
