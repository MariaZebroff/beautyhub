<?php

use Roots\Acorn\Application;

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our theme. We will simply require it into the script here so that we
| don't have to worry about manually loading any of our classes later on.
|
*/

if (! file_exists($composer = __DIR__.'/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', 'sage'));
}

require $composer;

/*
|--------------------------------------------------------------------------
| Register The Bootloader
|--------------------------------------------------------------------------
|
| The first thing we will do is schedule a new Acorn application container
| to boot when WordPress is finished loading the theme. The application
| serves as the "glue" for all the components of Laravel and is
| the IoC container for the system binding all of the various parts.
|
*/

Application::configure()
    ->withProviders([
        App\Providers\ThemeServiceProvider::class,
    ])
    ->boot();

/*
|--------------------------------------------------------------------------
| Register Sage Theme Files
|--------------------------------------------------------------------------
|
| Out of the box, Sage ships with categorically named theme files
| containing common functionality and setup to be bootstrapped with your
| theme. Simply add (or remove) files from the array below to change what
| is registered alongside Sage.
|
*/

collect(['setup', 'filters', 'CPT/members', 'Roles/beauty-hub-team-member', 'Admin/hide-admin-menus', 'Admin/limit-user-roles'])
    ->each(function ($file) {
        if (! locate_template($file = "app/{$file}.php", true, true)) {
            wp_die(
                /* translators: %s is replaced with the relative file path */
                sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
            );
        }
    });

//+++++++Option PAGE+++++++++


function beautyhub_theme_add_options_page() {
    add_menu_page(
        'Site Info',        // Page title
        'Site Info',        // Menu title
        'manage_options',   // Capability
        'beautyhub_theme-site-info',// Menu slug
        'beautyhub_theme_render_options_page', // Callback function
        'dashicons-admin-home', // Icon
        80 // Position
    );
}
add_action('admin_menu', 'beautyhub_theme_add_options_page');

function beautyhub_theme_register_settings() {
    register_setting('beautyhub_theme_options_group', 'beautyhub_theme_phone');
    register_setting('beautyhub_theme_options_group', 'beautyhub_theme_instagram');
    register_setting('beautyhub_theme_options_group', 'beautyhub_theme_facebook');
    register_setting('beautyhub_theme_options_group', 'beautyhub_theme_address');
}
add_action('admin_init', 'beautyhub_theme_register_settings');

function beautyhub_theme_render_options_page() { ?>
    <div class="wrap">
        <h1>Site Info</h1>
        <form method="post" action="options.php">
            <?php settings_fields('beautyhub_theme_options_group'); ?>
            <?php do_settings_sections('beautyhub_theme_options_group'); ?>

            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Phone</th>
                    <td><input type="text" name="beautyhub_theme_phone" value="<?php echo esc_attr(get_option('beautyhub_theme_phone')); ?>" class="regular-text" /></td>
                </tr>

                <tr valign="top">
                    <th scope="row">Instagram Link</th>
                    <td><input type="url" name="beautyhub_theme_instagram" value="<?php echo esc_attr(get_option('beautyhub_theme_instagram')); ?>" class="regular-text" /></td>
                </tr>

                <tr valign="top">
                    <th scope="row">Facebook Link</th>
                    <td><input type="url" name="beautyhub_theme_facebook" value="<?php echo esc_attr(get_option('beautyhub_theme_facebook')); ?>" class="regular-text" /></td>
                </tr>

                <tr valign="top">
                    <th scope="row">Address</th>
                    <td><textarea name="beautyhub_theme_address" rows="3" class="large-text"><?php echo esc_textarea(get_option('beautyhub_theme_address')); ?></textarea></td>
                </tr>
            </table>

            <?php submit_button(); ?>
        </form>
    </div>
<?php }


add_filter('wp_editor_set_quality', function() {
    return 100;
});
