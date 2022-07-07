import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Celendar from '../home/celendar';
import './changeticket.scss'

const ChangeTicket = ({ showModal, setShowModal }: any) => {

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
                <label className='change-sove'>Số vé</label>
                <label className='change-tensukien'>Tên sự kiện</label>
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