<footer class="content-info" style="border-top: 1px solid rgba(0,0,0,0.2);">
  {{-- @php(dynamic_sidebar('sidebar-footer')) --}}
  <?php
    $phone = get_option('beautyhub_theme_phone');
    $instagram = get_option('beautyhub_theme_instagram');
    $facebook = get_option('beautyhub_theme_facebook');
    $address = get_option('beautyhub_theme_address');
  ?>

  <div class="sm:flex px-4 md:px-16 lg:px-26 mx-auto py-10 sm:py-16">
    <a href="/"><div class="footer-logo mx-auto my-8 sm:my-4 sm:mx-0"></div></a>
    <div class="ml-auto flex gap-8 flex-col sm:flex-row items-center sm:items-start">
          @if (has_nav_menu('footer_navigation'))
            <div class="footer-menu ">
              <div class="heder-footer mb-3">Company</div>
                <nav class="nav-footer" aria-label="{{ wp_get_nav_menu_name('footer_navigation') }}">
                  {!! wp_nav_menu(['theme_location' => 'footer_navigation', 'menu_class' => 'nav-footer', 'echo' => false]) !!}
                </nav>
            </div>
          @endif

            <div class="site-info ">
              <div class="heder-footer mb-3 text-center sm:text-left">Contact Us</div>
              <?php if ($phone): ?>
                  <p class="sm:text-center text-left pb-2"><span class="foot-atr ">Phone:</span> </br> <a href="tel:<?php echo esc_attr($phone); ?>"><?php echo esc_html($phone); ?></a></p>
              <?php endif; ?>

               <?php if ($address): ?>
                  <p class="sm:text-center text-left pb-2"><span class="foot-atr">Address:</span></br> <?php echo nl2br(esc_html($address)); ?></p>
              <?php endif; ?>
              <div class="flex gap-2 justify-center sm:justify-start">

                        <?php if ($instagram): ?>
                            <a href="<?php echo esc_url($instagram); ?>" target="_blank"><div class="social-media instagram-icon"></div></a>
                        <?php endif; ?>

                        <?php if ($facebook): ?>
                            <a href="<?php echo esc_url($facebook); ?>" target="_blank"><div class="social-media facebook-icon"></div></a>
                        <?php endif; ?>
              </div>
             
            </div>
        </div>
        
  </div>

      <div class="px-4 md:px-16 lg:px-26 mx-auto py-6 opacity-55 sm:text-center text-left">
              <a href="/">&copy; Copyright BeautyHub</a> |
              <a href="{{ get_permalink(3) }}">Privacy Policy</a>
    </div>


</footer>
