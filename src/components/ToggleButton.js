import React from 'react'
import '../sass/toggleButton.scss'
import { ToggleLeft, ToggleRight } from '../icons'

const ToggleButton = () => {
   return (
      <div className="toggle-btn">
         <button className="toggle-btn__left">
            <ToggleLeft />
         </button>

         <button className="toggle-btn__right">
            <ToggleRight />
         </button>
      </div>
   )
}

export default ToggleButton