import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Celendar from '../home/celendar';
import './changeticket.scss'
// import { db } from "../../firebase";
// import { collection, getDocs, addDoc } from "firebase/firestore";

interface Ticket {
    ticket: {
        stt: number,
        id: string,
        tensukien: string,
        sove: number,
        ngaysudung: string,
        ngayxuatve: string,
        tinhtrangsudung: string,
        congcheckin: string
    }[]
}

const ChangeTicket = ({ showModal, setShowModal }: any) => {
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    // const usersCollectionRef = collection(db, "ticketlist");
    // const getTickets = async () => {
    //     const res = await getDocs(usersCollectionRef).then((res) => {
    //         setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id })));
    //     });
    // };
    // useEffect(() => {
    //     getTickets();
    // }, []);



    const handleOk = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (

        <Modal visible={showModal} closable={false} footer={null} onCancel={handleCancel} width={800} >
            <div className='change-container'>
                <h1 className='change-title'>Đổi ngày sử dụng vé</h1>
                <label className='change-tenve'>Số vé</label>
                <input className='change-tenve-label' type="text" disabled />
                <label className='change-sove'>Số vé</label>
                <input className='change-sove-label' type="text" disabled />
                <label className='change-tensukien'>Tên sự kiện</label>
                <input className='change-tensukien-label' type="text"
                    // value={tickets.id} 
                    disabled />
                <label className='change-hansudung'>Hạn sử dụng</label>
                <div className='change-date'>
                    <Celendar format='DD/MM/YY' />
                </div>
                <div className='buttonchange-holder'>
                    <button className='buttonchange-huy' onClick={handleCancel}>Hủy</button>
                    <button className='buttonchange-luu' onClick={handleOk}>Lưu</button>
                </div>
            </div>
        </Modal>

    );
};

export default ChangeTicket