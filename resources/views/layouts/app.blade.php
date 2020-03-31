<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>
  
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>COVID 19</title>
   <link rel="stylesheet" href="{{asset('css/css.css')}}">
   <script src="{{asset('js/bootstrap-select.min.js')}}"></script>
   <script src="{{asset('js/bootstrap.bundle.min.js')}}"></script>
   <script src="{{asset('js/jquery-3.3.1.slim.min.js')}}"></script>
   <link rel="stylesheet" href="{{asset('css/bootstrap-select.min.css')}}">
   <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
   <link rel="stylesheet" href="{{asset('css/font-awesome.min.css')}}">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">    

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div id="div1">
                <h6 style="font-size:15px ; color:white">Country</h6>
                <form>
            <select name="country[]" id="framework" class="form-control selectpicker" data-live-search="true" multiple>
                @foreach ($data as $item=>$value)            
              <option id="option">{{$item}}</option>       
              @endforeach    
              <form>
            </div>
        </select> 
        <button type="submit" formaction="/dash">check</button>
          
        </div>
      </nav>                         
      <div class="content">
        @yield('content')
    </div>    
     <script>
     $(document).ready(function(){
      $('.selectpicker').selectpicker();
     
      $('#framework').change(function(){
       $('#hidden_framework').val($('#framework').val());
      });
     });
     </script>
</body>
</html>