@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
    @includeFirst(['partials.content-page', 'partials.content'])
    <p class="font-brand-primary">PAGE 11111</p>
    <p class="font-brand-secondary font-light">PAGE 11111</p>
  @endwhile
@endsection
