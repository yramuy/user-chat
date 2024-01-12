import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposite, withdraw } from "./actions";

const AccountForm = () => {

    const [amount, setAmount] = useState("");
    const [transactionId, setTransactionId] = useState(1);

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserData);
    }, []);

    const data = useSelector((state1) => {
        return state1;
    });

    console.log("initial state ", data);

    const fetchUserData = async () => {
        console.log("object defauly loading");
        const userData = await fetch("https://jsonplaceholder.typicode.com/users");
        const userObj = await userData.json();

        dispatch({ type: "USER_LIST", payload: userObj });

        console.log(userObj);
    }

    return (
        <>
            <div className="container p-3">

                <div className="row">
                    <div className="col-4">
                        <h4>Deposite/Withdraw Amount</h4>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="number"
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />

                        </div>
                        <div className="form-group" style={{ display: 'flex', gap: 10 }}>
                            <button className="btn btn-primary" onClick={() => {
                                dispatch(deposite(amount));
                                setTransactionId(transactionId + 1);
                                dispatch({ type: "Add_Transaction", payload: { id: transactionId, amount: amount, date: new Date(), type: "Credit" } });
                                setAmount("");
                            }
                            }>Deposite</button>
                            <button className="btn btn-danger" onClick={() => {
                                dispatch(withdraw(amount));
                                setTransactionId(transactionId + 1);
                                dispatch({ type: "Add_Transaction", payload: { id: transactionId, amount: amount, date: new Date(), type: "Debit" } });
                                setAmount("");
                            }
                            }>Withdraw</button>
                        </div>

                    </div>
                    <div className="col-6">
                        <h4>Account Details</h4>
                        <table className="table table-bordered">
                            <thead>
                                <th>Balance</th>
                                <th>Name</th>
                                <th>A/C No.</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.account.balance}</td>
                                    <td>{data.account.name}</td>
                                    <td>{data.account.accountNo}</td>

                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>

                <div className="row">
                    <div className="col-10">
                        <h4>Transaction Details</h4>
                        <table className="table table-bordered">
                            <thead>
                                <th>Id</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Date</th>
                            </thead>
                            <tbody>
                                {
                                    data.transaction.map((trns, index) => (
                                        <tr key={trns.id}>
                                            <td>{trns.id}</td>
                                            <td>{trns.amount}</td>
                                            <td>{trns.type}</td>
                                            <td>{trns.date.toString()}</td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>
                    </div>

                </div>

                <div className="row">
                    <div className="col-10">
                        <h4>Users Details</h4>
                        <table className="table table-bordered">
                            <thead>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Website</th>
                            </thead>
                            <tbody>
                                {
                                    data.usersData.userList.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.website}</td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>
                    </div>

                </div>

            </div>


        </>
    );
};

export default AccountForm;