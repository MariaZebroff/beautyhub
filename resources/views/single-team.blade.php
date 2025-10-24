@extends('layouts.app')



@php
$booking_link = get_post_meta(get_the_ID(), '_booking_link', true);
$specialty = get_post_meta(get_the_ID(), '_specialty', true);
@endphp



<article @php(post_class('h-entry'))>
  <div style="border-bottom: 1px solid rgba(0,0,0,0.2);" class="single-team-content-wrapper py-20 px-4 md:px-16 lg:px-26 min-h-full">

  <header class="flex flex-col sm:flex-row justify-between items-center ">
    <h1 class="p-name bhheader headline--large bh-black-color sm:text-center text-left">{!! get_the_title() !!}</h1>
    <h2 class="specialty sm:text-center text-left block sm:hidden">
      @if ($specialty)     
          {{ $specialty }}
      @endif
  </h2>

    @if ($booking_link)
      <a href="{{ esc_url($booking_link) }}" class=" btn btn-primary btn--small btn--generic btn-primary-color m-0" target="_blank">
        Book Now
      </a>
    @endif
  </header>
  <h2 class="specialty pb-10 sm:text-center text-left hidden sm:inline-block">
      @if ($specialty)     
          {{ $specialty }}
      @endif
  </h2>

    <div class="flex flex-col md:flex-row items-start md:gap-4 lg:gap-20 max-w-7xl mx-auto">
  <div class="w-full max-w-sm md:w-1/2 lg:w-1/3 flex-shrink-0 mb-5 mx-auto">
    @if (has_post_thumbnail())
      {!! get_the_post_thumbnail(get_the_ID(), 'full', ['class' => 'w-full h-auto object-cover rounded-lg']) !!}
    @endif
  </div>

  <div class="w-full md:w-1/2 lg:w-2/3">
    @php(the_content())
  </div>
</div>
   

  </div>
</article>

