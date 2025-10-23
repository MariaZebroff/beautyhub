<header class="banner  top-0 right-0 left-0  ">
  <div class="flex justify-between container-menu px-4 md:px-16 lg:px-26 mx-auto py-3 md:py-4">
  <a class="brand" href="{{ home_url('/') }}">
    {!! $siteName !!}
  </a>

  @if (has_nav_menu('primary_navigation'))
    <nav class="nav-primary hidden md:block" aria-label="{{ wp_get_nav_menu_name('primary_navigation') }}">
      {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav', 'echo' => false]) !!}
    </nav>

    <nav class="nav-primary-mobile block md:hidden relative" aria-label="{{ wp_get_nav_menu_name('primary_navigation') }}">
      <button id="menu-toggle-button">
        <div class="burger-line"></div>
        <div class="burger-line"></div>
        <div class="burger-line"></div>
      </button>
      {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav', 'echo' => false]) !!}
    </nav>
  @endif
  </div>
</header>
