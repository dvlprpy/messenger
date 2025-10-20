<?php

return [
    'personal_info' => [
        'date_of_birth' => ''
    ],
    'notification_and_sounds' => [
        'global_setting' => [
            'allow_sounds' => false,
            'allow_notification' => false,
        ],
        'notification_for_chats' => [
            'group_notification' => false,
            'channel_notification' => false,
        ],
        'event' => [
            'contact_joined' => true,
            'pinned_messages' => false,
        ],
        'calls' => [
            'accept_call_on_this_device' => false,
        ],
        'location_notification' => [
            'top_left' => false,
            'top_bottom' => false,
            'right_bottom' => true,
            'top_right' => false,
        ],
    ],
    'privacy' => [
        'security' => [
            'two_step_verification' => [
                'Email' => false,
                'phone' => false,
            ],
            'local_password' => [
                'password' => false,
            ],
            'active_session' => [
                'device_name' => null,
                'device_location' => null,
                'device_ip' => null,
                'device_activity' => null,
            ],
            'blocked_users' => [
                'block_user_fullname' => null,
                'block_user_username' => null,
                'block_user_activity' => null,
                'block_user_status' => 'block',
            ],
            'auto_delete_messages' => false,
        ],
        'privacy' => [
            'phone_number' => [
                'everybody' => false,
                'contact' => true,
                'nobody' => false,
                'allow_contact_list' => [
                    'username' => null,
                ],
                'deny_contact_list' => [
                    'username' => null,
                ],
            ],
            'last_seen_and_online' => [
                'everybody' => true,
                'contact' => false,
                'nobody' => false,
                'allow_list' => [
                    'username' => null,
                ],
                'deny_list' => [
                    'username' => null,
                ],
            ],
            'date_of_birth_in_private_chat' => false,
        ],
        'delete_my_account' => [
            'after_one_month' => true,
            'after_three_month' => false,
            'after_six_month' => false,
            'after_one_year' => false,
        ],
    ],
    'chat_setting' => [
        'theme_settings' => [
            'font_family' => [
                'font_name' => 'default',
            ],
            'auto_night_mode' => true,
        ],
        'messages' => [
            'send_with_enter' => true,
            'send_with_CTRL_Enter' => false,
        ],
        'sensitive_content' => [
            'disable_18_content' => true,
        ],
    ],
    'folders' => [
        'my_folders' => ['work', 'friends', 'family', 'news'],
        'tabs_view' => [
            'tabs_on_the_left' => true,
            'tabs_on_the_top' => false,
        ],
    ],
    'advanced' => [
        'data_and_storage' => [
            'download_path' => 'C:/Users/User/Downloads',
            'connection_type' => [
                'tcp_with_proxy' => [
                    'status' => false,
                    'host_address' => false,
                    'port' => false,
                ],
                'tcp_direct' => true,
            ],
            'ask_download_path_for_each_file' => false,
        ],
        'automatic_media_download' => [
            'in_group' => [
                'media_item_types' => ['image'],
            ],
            'in_channel' => [
                'media_item_types' => ['video'],
            ],
        ],
        'window_title_bar' => [
            'show_chat_name' => true,
            'total_unread_message_count' => true,
        ],
        'spell_checker' => [
            'use_system_spell_checker' => true,
        ],
        'version_and_update' => [
            'update_automatically' => false,
        ],
    ],
    'speakers_and_camera' => [
        'speakers_and_headphones' => [
            'device_list' => [],
        ],
        'microphone' => [
            'device_list' => [],
        ],
        'camera' => [
            'device_list' => [],
        ],
    ],
    'language' => [
        'show_translate_button' => true,
        'language_list' => ['persian', 'english'],
    ],
    'faq' => [
        'password' => [
            'question' => 'How do I reset my password?',
            'answer' => 'Go to settings > Account > Reset Password and follow the instructions.',
        ],
        'profile' => [
            'question' => 'How can I change my profile picture?',
            'answer' => 'Go to your profile, click on the avatar, and upload a new picture.',
        ],
        'notification' => [
            'question' => 'How do I enable notifications?',
            'answer' => 'Go to settings > Notifications and toggle the notifications switch.',
        ],
    ],
];