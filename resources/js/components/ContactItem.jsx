import { memo } from "react";

const ContactItem = memo(({ name, lastOnline, contactId }) => {
    return (
        <div data-contactid={contactId} className="contact-list d-flex align-items-center p-2 border-bottom">
            <i className="bi bi-person-circle fs-1 cursor-pointer me-3"></i>
            <div>
                <div className="text-capitalize fw-bold">{name}</div>
                <div className="font-monospace text-muted small cursor-pointer">{lastOnline}</div>
            </div>
        </div>
    );
}, (prevProps, nextProps) => 
    prevProps.name === nextProps.name && prevProps.lastOnline === nextProps.lastOnline
);

export default ContactItem