<?php

namespace App\Roles;

add_action('init', function () {

    // Add new role
    add_role('beauty_hub_team_member', __('Beauty Hub Team Member', 'beautyhub'), [
        'read' => true,
        'edit_team' => true,
        'edit_teams' => true,
        'edit_others_teams' => false,
        'publish_teams' => false,
        'delete_teams' => false,
        'upload_files' => true,
        'create_teams' => true,
    ]);
});