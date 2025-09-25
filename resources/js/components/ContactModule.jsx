import { useState, useMemo } from "react";
import ContactItem from './ContactItem'

export default function ContactModule({ closePopUp }){

    const [search, setSearch] = useState("");

    const contacts = [
        { name: "AliReza Mosavi", lastOnline: "1 Moon Ago", id: 1 },
        { name: "Mohammad Rezaei", lastOnline: "1 Moon Ago", id: 2 },
        { name: "Hossein Moradi", lastOnline: "1 Moon Ago", id: 3 },
        { name: "Ali Mosavi", lastOnline: "1 Moon Ago", id: 4 },
        { name: "Javad Javadi", lastOnline: "1 Moon Ago", id: 5 },
        { name: "Mohammad Mohammadi", lastOnline: "1 Moon Ago", id: 6 },
        { name: "Hossein Hosseini", lastOnline: "1 Moon Ago", id: 7 },
    ];

    const filteredContacts = useMemo(() => {
        if (!search.trim()) return contacts; // اگر جستجو خالی است، کل مخاطبین را نمایش بده
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [contacts, search]);

    return(
        <div className="container-contact m-3 h-100 d-flex flex-column justify-content-between">
            <div className="contact-title p-2 fw-bolder d-flex flex-row justify-content-between">
                <div className="contact-title-name">Contact</div>
                <div className="contact-title-icon"><i className="bi bi-person-lines-fill fs-4 cursor-pointer"></i></div>
            </div>
            <div className="contact-search-box">
                <div className="input-group">
                    <div className="input-group-text" id="basic-addon3"><i className="bi bi-search cursor-pointer"></i></div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search contacts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="container-contact-list h-75">

                {filteredContacts.length === 0 ? (
                    <div className="text-center text-danger mt-3 fw-bold">Contact Not Found</div>
                ) : (
                    filteredContacts.map(contact => (
                        <ContactItem key={contact.id} name={contact.name} lastOnline={contact.lastOnline} />
                    ))
                )}

            </div>
            <div className="add-contact cursor-pointer d-flex justify-content-between p-3">
                <div className="add-contact-text text-capitalize text-info">Add Contact</div>
                <div className="close-contact"><i className="bi bi-x-lg fs-4 fw-bold cursor-pointer" onClick={closePopUp}></i></div>
            </div>
        </div>
    )
}