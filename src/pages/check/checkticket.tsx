import React from 'react'

const Checkticket = () => {
    return (
        <div className='body-container'>
            <div className="body-list">
                <h1 className="title">Check Ticket</h1>

                <input className="search" type="text" placeholder="Tìm bằng số vé" />
                <button className="csv">Chốt đổi soát</button>

                <table className="boy-table">
                    <tr className="table-heading">
                        <th>STT</th>
                        <th>Booking code</th>
                        <th>Số vé</th>
                        <th>Ngày sử dụng</th>
                        <th>Tên loại vé</th>
                        <th>Cổng check-in</th>
                    </tr>
                    <tr className="table-content">
                    </tr>
                </table>
            </div>

            <div className="body-right">
                <h1>Lọc vé</h1>
                <div>
                    <h2>Tình trạng đối soát</h2>
                    <input type="radio" id="html" name="fav_language" value="Tất cả" />
                    <label >Tất cả</label><br />
                    <input type="radio" id="css" name="fav_language" value="Đã đối soát" />
                    <label >Đã đối soát</label><br />
                    <input type="radio" id="javascript" name="fav_language" value="Chưa đối soát" />
                    <label >Chưa đối soát</label>
                </div>
                <div className="type-ticket">
                    <div className="type-title">Loại vé</div>
                    <div className="type">Vé cổng</div>
                </div>
                <div className="time-day">
                    <div className="day-current">
                        <div className="day-title">Từ ngày</div>
                        <div className="day-title">Đến ngày</div>
                    </div>
                    {/* <div className="day-current">
                        
                    </div> */}
                </div>
                <button type='submit'>Lọc</button>
            </div>
        </div>
    )
}

export default Checkticket