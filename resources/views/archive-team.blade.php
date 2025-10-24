
@extends('layouts.app')

@php
$booking_link = get_post_meta(get_the_ID(), '_booking_link', true);
$specialty = get_post_meta(get_the_ID(), '_specialty', true);
@endphp

@section('content')


  <div class="mx-auto px-4 md:px-16 lg:px-26 min-h-full py-20">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4 bhheader headline--large bh-black-color">Our Team</h1>
      <p class="text-lg text-gray-600">Meet our talented professionals</p>
    </div>

    <!-- Blog Posts Wrapper -->
    <div class="blog-posts-wrapper">
      @if (! have_posts())
        <div class="text-center py-12">
          <p class="text-gray-600 text-lg">No team members found.</p>
        </div>
      @else
        <div class="space-y-6">
          @while(have_posts()) @php(the_post())
            <article class="blog-article bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div class="blog-container flex flex-col">
                <!-- Thumbnail Column - Full width on mobile, 1/6 on desktop -->
                <div class="blog-thumbnail-team w-full flex-shrink-0">
                  @if(has_post_thumbnail())
                    <a href="{{ get_permalink() }}" class="block h-80">
                      {!! get_the_post_thumbnail(null, 'large', ['class' => 'w-full h-full object-cover', 'loading' => 'lazy', 'style' => 'image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; image-rendering: auto; object-position: center top;']) !!}
                    </a>
                  @else
                    <div class="w-full h-80 bg-gray-200 flex items-center justify-center">
                      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  @endif
                </div>

                <!-- Content Column - Full width on mobile, 5/6 on desktop -->
                <div class="blog-content w-full p-6 flex flex-col justify-center">
                  <div>
                    <!-- Title -->
                    <h2 class="text-xl bhheader headline--xsmall bh-black-color mb-2 hover:opacity-75 transition-opacity">
                      <a href="{{ get_permalink() }}" class="no-underline hover:no-underline" style="text-decoration: none !important;">
                        {!! get_the_title() !!} @if ($specialty)     
                          <span class=" opacity-50">/ {{ $specialty }}</span>
                          @endif
                      </a>
                    </h2>

                  </div>

                  <!-- Read More Button -->
                  <div class="mt-4">
                    <a href="{{ get_permalink() }}" class="btn btn--small btn--outlined  btn-black-color" style="margin-left: 0;">
                      Read More
                    </a>
                    @if ($booking_link)
                    <a href="{{ $booking_link }}" class="btn btn--small btn--generic  btn-primary-color" style="margin-left: 0;">
                      Book Now
                    </a>
                      @endif
                  </div>
                </div>
              </div>
            </article>
          @endwhile
        </div>

        <!-- Pagination -->
        <div class="mt-12">
          {!! get_the_posts_navigation([
            'prev_text' => '← Previous Posts',
            'next_text' => 'Next Posts →'
          ]) !!}
        </div>
      @endif
    </div>
  </div>
@endsection

