import { combineReducers } from "redux";

const initialState = {
    balance: 0,
    name: "HDFC",
    accountNo: "341290189901",
    userList: [],
    chatList: []
};

function AccountReducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case "deposite":
            return { ...state, balance: state.balance + +payload };

        case "withdraw":
            return { ...state, balance: state.balance - +payload };

        default:
            return state;
    }

}

function transactionReducer(state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case "Add_Transaction":
            return [
                ...state,
                {
                    id: payload.id,
                    amount: payload.amount,
                    type: payload.type,
                    date: payload.date,
                },
            ];
        default:
            return state;
    }
}

function userReducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case "USER_LIST":
            return { ...state, userList: payload }

        case "CHATLIST":
            return { ...state, chatList: payload }

        default:
            return state;
    }

}

let rootReducer = combineReducers({
    account: AccountReducer,
    transaction: transactionReducer,
    usersData: userReducer
});

export default rootReducer;
