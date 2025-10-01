import { useState, useMemo } from "react";
import ContactItem from './ContactItem'

export default function ContactModule({ closePopUp, contactList }){

    const [search, setSearch] = useState("");

    // اینجا contactList رو به فرمت دلخواه تبدیل می‌کنیم
    const contacts = useMemo(() => {
        if (!contactList) return [];
        return contactList.map((item) => ({
        id: item.contact_id,
        name: item.contact_user_info?.user_name || "Unknown",
        lastOnline: new Date(item.contact_joined_date).toUTCString(),
        avatar: item.contact_user_info?.user_avatar || null,
        }));
    }, [contactList]);

    // فیلتر کردن مخاطب‌ها بر اساس سرچ
    const filteredContacts = useMemo(() => {
        if (!search.trim()) return contacts;
        return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [contacts, search]);

    return(
        <div className="container-contact m-3 h-100 d-flex flex-column justify-content-between">
            <div className="contact-title p-2 fw-bolder d-flex flex-row justify-content-between">
                <div className="contact-title-name">Contact</div>
                <div className="contact-title-icon">
                    <i className="bi bi-person-lines-fill fs-4 cursor-pointer"></i>
                </div>
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

