@extends('layouts.app')
@section('content')
@foreach ($field as $item)
<p style="color:black">{{$item}}</p>    
@endforeach  
@endsection