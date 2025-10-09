const settings = {
    personal_info: {
        date_of_birth: ""
    },
    notification_and_sounds: {
        global_setting: {
            allow_sounds: false,
            allow_notification: false
        },
        notification_for_chats: {
            group_notification: false,
            channel_notification: false
        },
        event: {
            contact_joined: true,
            pinned_messages: false
        },
        calls: {
            accept_call_on_this_device: false
        },
        location_notification: {
            top_left: false,
            top_bottom: false,
            right_bottom: true,
            top_right: false
        }
    },
    privacy: {
        security: {
            two_step_verification: false,
            local_password: false,
            active_session: 2,
            blocked_users: 5,
            auto_delete_messages: false
        },
        privacy: {
            phone_number: "Everybody",
            last_seen_and_online: "Everybody",
            date_of_birth_in_private_chat: "Contact",
            date_of_birth_in_group_and_channel: "Nobody"
        },
        delete_my_account: {
            date_of_deleted_account: "11 month"
        }
    },
    chat_setting: {
        theme_settings: {
            font_family: "default",
            auto_night_mode: true
        },
        messages: {
            send_with_enter: true,
            send_with_CTRL_Enter: false
        },
        sensitive_content: {
            disable_18_content: true
        }
    },
    folders: {
        my_folders: ["work", "friends", "family", "news"],
        tabs_view: {
            tabs_on_the_left: true,
            tabs_on_the_top: false
        }
    },
    advanced: {
        data_and_storage: {
            download_path: "default path",
            connection_type: "tcp with proxy",
            ask_download_path_for_each_file: false
        },
        automatic_media_download: {
            in_group: {
                media_item_types: ["image", "voice"]
            },
            in_channel: {
                media_item_types: ["image", "video"]
            }
        },
        window_title_bar: {
            show_chat_name: true,
            total_unread_message_count: true
        },
        spell_checker: {
            use_system_spell_checker: true
        },
        version_and_update: {
            update_automatically: false,
            check_for_update: false
        }
    },
    speakers_and_camera: {
        speakers_and_headphones: {
            device_list: []
        },
        microphone: {
            device_list: []
        },
        camera: {
            device_list: []
        }
    },
    language: {
        show_translate_button: true,
        language_list: ["persian", "english"]
    },
    faq: {
        password: {
            question: "How do I reset my password?",
            answer: "Go to settings > Account > Reset Password and follow the instructions."
        },
        profile: {
            question: "How can I change my profile picture?",
            answer: "Go to your profile, click on the avatar, and upload a new picture."
        },
        notification: {
            question: "How do I enable notifications?",
            answer: "Go to settings > Notifications and toggle the notifications switch."
        }
    }
};
