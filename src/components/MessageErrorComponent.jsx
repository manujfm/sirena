import React, {Component} from 'react';
import "../ui/css/tools.css"

class MessageErrorComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorMessage: ""
        }
    }

    async componentWillMount() {
        let error =  this.props.errorCode;
        let errorMessage = await this.getErrorsMessage(error);
        this.setState({errorMessage})

    }

    render() {
        return (
            <div className={"container"} style={{marginTop:"5%"}}>
                <div className={"row align-items-center"}>
                    <div className={"col-lg-8 offset-lg-2"}>
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMessage}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default MessageErrorComponent;