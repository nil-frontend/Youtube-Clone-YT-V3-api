import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonVideo = () => {
   return (
      <div style={{ width: '95%', margin: '1rem 0.35rem' }}>
         <SkeletonTheme color='#343a40' highlightColor='#3c4147' baseColor='#3F3F3F'>
            <Skeleton height= '11vw' /*{180}*/ borderRadius='1rem'/>
            <div>
               <Skeleton
                  style={{ margin: '0.5rem' }}
                  circle
                  height={40}
                  width={40}
               />
               <Skeleton height={40} width='75%' />
            </div>
         </SkeletonTheme>
      </div>
   )
}

export default SkeletonVideo