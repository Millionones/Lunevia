import React from 'react'

const Highlights = ({ data }) => {
  return (
    <section className='highlight-section'>
      {data?.length > 0 ?
        <div className='cmpad'>
          <div className='highlight-inner'>
            <div className='highlight-header'>
              <h2>Property Highlights</h2>
              <p>The property offers a host of amenities</p>
            </div>
            <div>
              <ul className='highlight-list'>
                {
                  data.map((item, idx) => (
                    <li>{item.name}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        : <></>}
    </section>
  )
}

export default Highlights