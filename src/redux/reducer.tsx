interface Ticket {
    ticket: {
        id: string,
        stt: number,
        magoi: string,
        tengoive: string,
        giave: string,
        ngayapdung: string,
        ngayhethan: string,
        tinhtrang: string,
        giacombo: string,
        sove: number
    }[]
}



const initState = {
    // tickets: [{}],
    // loading: false
    createticket: [

    ]
}


const rootReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "createticket":
            return {
                ...state,
                createticket: [
                    ...state.createticket,
                ]
            }
        default:
            return state;
    }
}

export default rootReducer;