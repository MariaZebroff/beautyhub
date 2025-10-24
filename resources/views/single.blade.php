@extends('layouts.app')





<article @php(post_class('h-entry'))>
  <div class="single-team-content-wrapper py-20 px-4 md:px-16 lg:px-26 min-h-full">

  <header class="flex flex-col sm:flex-row justify-between items-center ">
    <h1 class="p-name bhheader headline--large bh-black-color sm:text-center text-left">{!! get_the_title() !!}</h1>

  </header>
  <div class="flex flex-wrap items-center text-sm text-gray-500 mb-5 sm:mb-10 space-x-4">
                      <!-- Date -->
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {{ get_the_date() }}
                      </span>
                    </div>

    @php(the_content())

 </div>
   

  </div>
</article>

