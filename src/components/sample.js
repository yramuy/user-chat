import React from "react";
import { connect, useDispatch } from "react-redux";


const Sample = ({ count }) => {

    const dispatch = useDispatch();

    return (
        <>
            <br/>
            <h2>REDUX APP</h2>

            <br/>
            <h3>COUNT : {count}</h3>
            <br />

            <div class="button-container">
                <button onClick={() => dispatch({ type: 'INC', payload: 10 })}>Increment</button>
                <button onClick={() => dispatch({ type: 'DEC', payload: 5 })}>Decrement</button>
            </div>
        </>

    );
};

const mapStateToProps = (state) => ({
    count: state
});

// const mapDispatchToProps = (dispatch) => ({
//     increment: () => dispatch({ type: 'INC' }),
//     decrement: () => dispatch({ type: 'DEC' }),
// });

export default connect(mapStateToProps)(Sample);