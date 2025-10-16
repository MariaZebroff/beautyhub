<?php

namespace App\Admin;

/**
 * Limit the user roles available in the "Add New User" and "Edit User" screens
 */
add_filter('editable_roles', function ($roles) {
    $allowed_roles = [
        'administrator' => $roles['administrator'] ?? null,
        'beauty_hub_team_member' => $roles['beauty_hub_team_member'] ?? null,
    ];

    return array_filter($allowed_roles);
});

/**
 * Hide the role dropdown for non-admins (optional)
 */
add_action('admin_init', function () {
    $user = wp_get_current_user();

    if (!in_array('administrator', (array) $user->roles)) {
        // Remove add new users capability for non-admins
        remove_menu_page('users.php'); 
    }
});