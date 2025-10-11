import react from "react";

export default function PrivacySetting({ header, body, footer, handleClose }) {

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    {
                        header && (
                            <div className="modal-header">
                                {header}
                            </div>
                        )
                    }
                    {
                        body && (
                            <div className="modal-body">
                                {body}
                            </div>
                        )
                    }
                    {
                        footer && (
                            <div className="modal-footer">
                                {footer}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}