import React from 'react';

const ErrorsModal = (props) => {
    return (
        <div className="auth-error-modal">
            <div className="auth-error-message">
                {props.errors.map(error => <span key={error.message + "isthekey"}>{error.message}</span>)}
                <button onClick={props.clearErrors}>OK</button>
            </div>
        </div>
    );
}

export default ErrorsModal;