import React from 'react'
import { IKContext, IKImage } from 'imagekitio-react'

export const ImageKit = () => {
  const urlEndpoint = 'https://ik.imagekit.io/scqtro3md'

  return (
    <IKContext urlEndpoint={urlEndpoint}>
      <h1>ImageKit React quick start</h1>
      <IKImage
        path="default-image.jpg"
        transformation={[
          {
            height: 200,
            width: 200,
          },
        ]}
      />

      <h2>Loading image from an absolute path</h2>
      <IKImage
        path="07C4334B-0FAD-4350-93D4-383C57F82712_Q5YZKnOAO.jpeg"
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
