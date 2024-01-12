const count = 5;

export default function reducer(state = 0, action) {

    const { type, payload } = action;

    switch (type) {

        case "INC":

            return state + payload;

        case "DEC":

            return state - payload;

        default:

            return state;

    }
}