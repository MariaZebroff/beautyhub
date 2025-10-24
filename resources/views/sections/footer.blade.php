<footer class="content-info">
  {{-- @php(dynamic_sidebar('sidebar-footer')) --}}
  <?php
    $phone = get_option('beautyhub_theme_phone');
    $instagram = get_option('beautyhub_theme_instagram');
    $facebook = get_option('beautyhub_theme_facebook');
    $address = get_option('beautyhub_theme_address');
  ?>

  <div class="sm:flex px-4 md:px-16 lg:px-26 mx-auto">
    <div class="footer-logo"></div>
    <div class="footer-menu ml-auto">MENU</div>
    <div class="site-info">
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


</footer>
