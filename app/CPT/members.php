<?php

namespace App\CPT;

add_action('init', function () {
    register_post_type('team', [
        'labels' => [
            'name' => __('Team Members', 'beautyhub'),
            'singular_name' => __('Team Member', 'beautyhub'),
        ],
        'public' => true,
        'has_archive' => false,
        'rewrite' => ['slug' => 'team'],
        'menu_icon' => 'dashicons-groups',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'show_in_rest' => true,
        'capability_type' => ['team', 'teams'],
        'map_meta_cap' => true,
    ]);


    // Add Booking Link meta box
        add_action('add_meta_boxes', function () {
            add_meta_box(
                'team_booking_link',
                __('Booking Link', 'beautyhub'),
                function ($post) {
                    $value = get_post_meta($post->ID, '_booking_link', true);
                    ?>
                    <label for="team_booking_link_input"><?php _e('Enter a booking or calendar link:', 'sage'); ?></label><br>
                    <input type="url"
                        id="team_booking_link_input"
                        name="team_booking_link"
                        value="<?php echo esc_attr($value); ?>"
                        style="width:100%;max-width:500px;">
                    <?php
                },
                'team',
                'normal',
                'default'
            );
        });

        add_action('save_post_team', function ($post_id) {
            if (array_key_exists('team_booking_link', $_POST)) {
                update_post_meta(
                    $post_id,
                    '_booking_link',
                    esc_url_raw($_POST['team_booking_link'])
                );
            }
        });
});


// /wp-json/beautyhub/v1/team

add_action('rest_api_init', function () {
    register_rest_route('beautyhub/v1', '/team', [
        'methods'  => 'GET',
        'callback' => function () {
            $args = [
                'post_type'      => 'team',
                'posts_per_page' => -1,
                'post_status'    => 'publish',
            ];

            $query = new \WP_Query($args);
            $members = [];

            foreach ($query->posts as $post) {
                $id = $post->ID;

                $members[] = [
                    'id'           => $id,
                    'title'        => get_the_title($id),
                    'permalink'        => get_the_permalink($id),
                    'thumbnail'    => get_the_post_thumbnail_url($id, 'large') ?: '',
                    'booking_link' => get_post_meta($id, '_booking_link', true),
                ];
            }

            return rest_ensure_response($members);
        },
        'permission_callback' => '__return_true',
    ]);
});