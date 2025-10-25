<footer class="content-info" style="border-top: 1px solid rgba(0,0,0,0.2);">
  {{-- @php(dynamic_sidebar('sidebar-footer')) --}}
  <?php
    $phone = get_option('beautyhub_theme_phone');
    $instagram = get_option('beautyhub_theme_instagram');
    $facebook = get_option('beautyhub_theme_facebook');
    $address = get_option('beautyhub_theme_address');
  ?>

  <div class="sm:flex px-4 md:px-16 lg:px-26 mx-auto py-10 sm:py-16">
    <div class="footer-logo mx-auto my-4 sm:mx-0"></div>
    <div class="ml-auto flex gap-8 flex-col sm:flex-row">
          @if (has_nav_menu('footer_navigation'))
            <div class="footer-menu ">
                <nav class="nav-footer" aria-label="{{ wp_get_nav_menu_name('footer_navigation') }}">
                  {!! wp_nav_menu(['theme_location' => 'footer_navigation', 'menu_class' => 'nav-footer', 'echo' => false]) !!}
                </nav>
            </div>
          @endif

            <div class="site-info ">
              <?php if ($phone): ?>
                  <p><strong>Phone:</strong> <a href="tel:<?php echo esc_attr($phone); ?>"><?php echo esc_html($phone); ?></a></p>
              <?php endif; ?>

              <?php if ($instagram): ?>
                  <p><a href="<?php echo esc_url($instagram); ?>" target="_blank">Instagram</a></p>
              <?php endif; ?>

              <?php if ($facebook): ?>
                  <p><a href="<?php echo esc_url($facebook); ?>" target="_blank">Facebook</a></p>
              <?php endif; ?>

              <?php if ($address): ?>
                  <p><strong>Address:</strong> <?php echo nl2br(esc_html($address)); ?></p>
              <?php endif; ?>
            </div>
        </div>
  </div>


</footer>
