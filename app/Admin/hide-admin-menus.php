<?php

namespace App\Admin;

add_action('admin_menu', function () {
    $user = wp_get_current_user();

    if (in_array('beauty_hub_team_member', (array) $user->roles)) {
        // Remove unwanted menu items
        remove_menu_page('index.php');                  // Dashboard
        remove_menu_page('edit.php');                   // Posts
        remove_menu_page('upload.php');                 // Media
        remove_menu_page('edit.php?post_type=page');    // Pages
        remove_menu_page('edit-comments.php');          // Comments
        remove_menu_page('themes.php');                 // Appearance
        remove_menu_page('plugins.php');                // Plugins
        remove_menu_page('users.php');                  // Users
        remove_menu_page('tools.php');                  // Tools
        remove_menu_page('options-general.php');        // Settings
    }
}, 999);

add_action('init', function () {
    // Get the admin role
    $admin = get_role('administrator');

    // Give admin full capabilities for 'team' CPT
    $capabilities = [
        'edit_team',
        'read_team',
        'delete_team',
        'edit_teams',
        'edit_others_teams',
        'publish_teams',
        'read_private_teams',
        'delete_teams',
        'delete_private_teams',
        'delete_published_teams',
        'delete_others_teams',
        'edit_private_teams',
        'edit_published_teams'
    ];

    foreach ($capabilities as $cap) {
        $admin->add_cap($cap);
    }
});