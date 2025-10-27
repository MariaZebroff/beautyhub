@extends('layouts.app')





<article @php(post_class('h-entry'))>
  <div class="single-team-content-wrapper py-20 px-4 md:px-16 lg:px-26 min-h-full">

  <header class="flex flex-col sm:flex-row justify-between items-center ">
    <h1 class="p-name bhheader headline--large bh-black-color sm:text-center text-left">{!! get_the_title() !!}</h1>

  </header>


    @php(the_content())

 </div>
   

  </div>
</article>