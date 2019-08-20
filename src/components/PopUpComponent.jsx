import React, {Component} from "react";
import { ToastContainer, toast } from 'react-toastify';

class PopUpComponent extends Component {


    render() {
        return (
            <ToastContainer autoClose={2000}/>
        );
    }


}

export default PopUpComponent;