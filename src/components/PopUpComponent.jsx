import React, {Component} from "react";
import { ToastContainer, toast } from 'react-toastify';
import Typography from "@material-ui/core/Typography";
import 'react-toastify/dist/ReactToastify.min.css';

class PopUpComponent extends Component {

    onClose(e){
        this.props.onClose(e)
    }

    __renderMessage(){
        return (
            <Typography variant={"h5"}>{this.props.message}</Typography>
        )
    }

    async componentDidMount () {
        toast( this.__renderMessage(),
            {
                type: this.props.type,
                onClose: this.onClose.bind(this)
            })
    }


    render() {
        return (
            <ToastContainer autoClose={2000}/>
        );
    }


}

export default PopUpComponent;