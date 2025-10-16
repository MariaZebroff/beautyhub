'SINGLE TEAM!'

@php
$booking_link = get_post_meta(get_the_ID(), '_booking_link', true);
@endphp

@if ($booking_link)
  <a href="{{ esc_url($booking_link) }}" class="btn btn-primary" target="_blank">
    Book Now
  </a>
@endif