import React from 'react'

const BookNow = () => {
    return (
        <section className='book-now'>
            <div className="cmpad">
                <div className="book-now-inner">
                    <div className='book-now-form'>
                        <div className='rowItem'>
                            <input type="date" />
                        </div>
                        <div className='rowItem'>
                            <input type="date" />
                        </div>
                        <div className='rowItem'>
                            <select name="" id="">
                                <option value="">How many Adults</option>
                            </select>
                        </div>
                        <div className='rowItem'>
                            <select name="" id="">
                                <option value="">
                                    How many Children
                                </option>
                            </select>
                        </div>
                        <div className='rowItem'>
                            <button>
                                <p>Book Now</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookNow