import React, { Component } from 'react'
import notimage from '../../images/dfr.jpg'
export default class Notfound extends Component {
  render() {
    return (
        <>
        <div className='text-center'>
        <img src={notimage}></img>
        </div>
        </>
      
    )
  }
}
