import React from 'react'

export default function Card() {
  return (
    <div>
          <div>
      <div className="card mt-3" style={{ "width": "18rem","maxHeight":"360px   " }}>
          <img className="card-img-top" src="https://as2.ftcdn.net/v2/jpg/01/16/36/65/1000_F_116366544_pGHbBS3o3KwR3zPEGjYaDyiDTaKc9nfp.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">this is some important text</p>
            <div className="container w-100">
              <select className="m-2 h-100  bg-success">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100  bg-success">
                <option value="Full">Full</option>
                <option value="Half">Half</option>
              </select>
              <div className="d-inline h-100 fs-5">Total Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
