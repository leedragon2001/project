export const addNewTicket = (ticket: any) => {
    return {
        type: 'Createticket',
        payload: ticket,
    }
}

export const updateNewTicket = (ticket: any) => {
    return {
        type: 'Updateticket',
        payload: ticket,
    }
}