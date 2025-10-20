const defaultSettings = {
    personal_info: {
        date_of_birth: ""
    },
    notification_and_sounds: {
        global_setting: {
            allow_sounds: true,
            allow_notification: false
        },
        notification_for_chats: {
            group_notification: true,
            channel_notification: false
        },
        event: {
            contact_joined: true,
            pinned_messages: false
        },
        calls: {
            accept_call_on_this_device: true
        },
        location_notification: {
            top_left: false,
            top_bottom: false,
            right_bottom: true,
            top_right: false
        }
    },
    privacy_and_security: {
        security: {
            two_step_verification: {
                enabled: true,
                active_service: {
                    Email: true,
                    phone: false
                },
            },
            local_password: {
                enabled: false,
                password_set: false
            },
            active_session: {
                enabled: true,
                list: [
                    {
                        device_name: "Windows 11",
                        device_location: "Tehran, Iran",
                        device_ip: "140.21.30.240",
                        device_activity: 'آخرین فعالیت: چند وقت پیش',
                        current_device: true
                    }
                ]
            },
            blocked_users: {
                enabled: true,
                list: [
                    {
                        username: '@amir',
                        fullname: 'Amir Reza',
                        avatar: '/images/amir.jpg',
                    }
                ]
            },
            auto_delete_messages: false
        },
        privacy: {
            phone_number: {
                visibility: {
                    everybody: false,
                    contact: true,
                    nobody: false,
                },
                allow_contact_list: [
                    {
                        username: '@amir',
                        fullname: 'Amir Reza',
                        avatar: '/images/amir.jpg'
                    }

                ],
                deny_contact_list: [
                    {
                        username: '@amir',
                        fullname: 'Amir Reza',
                        avatar: '/images/amir.jpg'
                    }
                ]
            },
            last_seen_and_online: {
                visibility: {
                    everybody: false,
                    contact: true,
                    nobody: false,
                },
                allow_list: [
                    {
                        username: '@amir',
                        fullname: 'Amir Reza',
                        avatar: '/images/amir.jpg'
                    }
                ],
                deny_list: [
                    {
                        username: '@amir',
                        fullname: 'Amir Reza',
                        avatar: '/images/amir.jpg'
                    }
                ]
            },
            date_of_birth_in_private_chat: false,
        },
        delete_my_account: {
            after_one_month: true,
            after_three_month: false,
            after_six_month: false,
            after_one_year: false
        }
    },
    chat_settings: {
        theme_settings: {
            font_family: {
                font_name: ['Arial', 'Times New Roman', 'Georgia', 'ایران نستعلیق', 'وزیر', 'ایران سنس'],
                selected_font: 'Arial'
            },
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
        folder_list: ["work", "friends", "family", "news"],
        tabs_view: {
            tabs_on_the_left: true,
            tabs_on_the_top: false
        }
    },
    advanced: {
        data_and_storage: {
            download_path: "C:/Users/User/Downloads",
            connection_type: {
                tcp_with_proxy: [
                    {
                        enabled: false,
                        host_address: false,
                        port: false,
                        ping_time: false
                    }
                ],
                tcp_direct: [ { enabled: true } ]
            },
            ask_download_path_for_each_file: false
        },
        automatic_media_download: {
            in_group: {
                media_item_types: ["image"]
            },
            in_channel: {
                media_item_types: ["video"]
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
        }
    },
    speakers_and_camera: {
        speakers_and_headphones: {
            device_list: [],
            selected_device_id: null
        },
        microphone: {
            device_list: [],
            selected_device_id: null
        },
        camera: {
            device_list: [],
            selected_device_id: null
        }
    },
    languages: {
        show_translate_button: true,
        available_languages: ["persian", "english"],
        default_language: "persian",
        current_language: "persian"
    },
    faq: [
        {
            category: 'password',
            question: "How do I reset my password?",
            answer: "Go to settings > Account > Reset Password and follow the instructions."
        },
        {
            category: 'profile',
            question: "How can I change my profile picture?",
            answer: "Go to your profile, click on the avatar, and upload a new picture."
        },
        {
            category: 'notification',
            question: "How do I enable notifications?",
            answer: "Go to settings > Notifications and toggle the notifications switch."
        },
    ]
};

export default defaultSettings;