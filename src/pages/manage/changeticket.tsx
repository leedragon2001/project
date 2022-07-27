import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Celendar from '../home/celendar';
import './changeticket.scss'
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";


const ChangeTicket = (props: any) => {

    const [newDueDate, setNewDueDate] = useState("")

    const ChangeDate = async (id: string, ngayxuatve: string) => {
        const ticketDoc = doc(db, "ticketlist", id)
        const newFields = { ngayxuatve: newDueDate }
        await updateDoc(ticketDoc, newFields);
        console.log("update successful")
        props.setShowModal(false);
        window.location.reload();
    }


    const handleCancel = () => {
        props.setShowModal(false);
    };

    return (

        <Modal visible={props.showModal} closable={false} footer={null} onCancel={handleCancel} width={800} >
            <div className='change-container'>
                <h1 className='change-title'>Đổi ngày sử dụng vé</h1>
                <label className='change-tenve'>Số vé</label>
                <input className='change-tenve-label' placeholder={props.id} type="text" disabled />
                <label className='change-sove'>Số vé</label>
                <input className='change-sove-label' placeholder={props.sove} type="text" disabled />
                <label className='change-tensukien'>Tên sự kiện</label>
                <input className='change-tensukien-label' type="text"
                    placeholder={props.tensukien}
                    disabled />
                <label className='change-hansudung'>Hạn sử dụng</label>
                <div className='change-date'>
                    <Celendar format='DD/MM/YYYY' endday={setNewDueDate} />
                </div>
                <div className='buttonchange-holder'>
                    <button className='buttonchange-huy' onClick={handleCancel}>Hủy</button>
                    <button className='buttonchange-luu' onClick={() => ChangeDate(props.ticketID, newDueDate)}>Lưu</button>
                </div>
            </div>
        </Modal>

    );
};

export default ChangeTicket