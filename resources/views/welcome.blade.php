@extends('layouts.app')

@section('content')
<!--***********************cas mortes**************** -->
@php($deaths = 0)
@foreach ($data as $item=>$value)
        @foreach($value as $item_second=> $value_second)
            @foreach($value_second as $item_third=> $value_third)
            @if ($item_third == 'deaths')
                   @if ($loop->parent->last)
                       @php($deaths += $value_second["deaths"])
                   @endif
            @endif
            @endforeach
        @endforeach

  
@endforeach
<!--****************cas confirmes********************** -->
@php($confirmed = 0)
@foreach ($data as $item=>$value)
        @foreach($value as $item_second=> $value_second)
            @foreach($value_second as $item_third=> $value_third)
            @if ($item_third == 'confirmed')
                   @if ($loop->parent->last)
                       @php($confirmed += $value_second["confirmed"])
                   @endif
            @endif
            @endforeach
        @endforeach

  
@endforeach
<!--*************cas recovered ***************************-->
@php($recovered = 0)
@foreach ($data as $item=>$value)
        @foreach($value as $item_second=> $value_second)
            @foreach($value_second as $item_third=> $value_third)
            @if ($item_third == 'recovered')
                   @if ($loop->parent->last)
                       @php($recovered += $value_second["recovered"])
                   @endif
            @endif
            @endforeach
        @endforeach

  
@endforeach
<!--*************pourcentage recovered ***************************-->
@php($p_recovered = $recovered/$confirmed)
<!--*************cas deaths ***************************-->
@php($p_deaths = $deaths/$confirmed)
<div style="margin-left:500px">

<div style="bckground-color:black;">
    <div _ngcontent-ukn-c28="" class="row ng-tns-c28-0">
        <div _ngcontent-ukn-c28="" class="col-xl-3 col-md-6 col-6 ng-tns-c28-0">
            <div _ngcontent-ukn-c28="" class="card-box ng-tns-c28-0">
                <h4 _ngcontent-ukn-c28="" class="header-title m-0 text-md-left text-center ng-tns-c28-0">Infections</h4>
                <div _ngcontent-ukn-c28="" class="topBoxes ng-tns-c28-0">
                    <div _ngcontent-ukn-c28="" class="fa-3x text-center ng-tns-c28-0 d-none">
                    <i _ngcontent-ukn-c28="" class="fas fa-circle-notch fa-spin m-2 ng-tns-c28-0"></i>
                      </div>
                      <div _ngcontent-ukn-c28="" class="topBoxesDetails text-md-right text-center ng-tns-c28-0">
                          <span _ngcontent-ukn-c28="" class="badge badge-blue badge-pill float-md-left m-md-3 mt-2 ng-tns-c28-0">
                              <i _ngcontent-ukn-c28="" class="mdi mdi-trending-up ng-tns-c28-0">
                                  </i>
                              </span>
                              <h2 _ngcontent-ukn-c28="" class="font-weight-normal ng-tns-c28-0"> {{$confirmed}}</h2>
                          </div>
                          <div _ngcontent-ukn-c28="" class="progress progress-bar-alt-blue progress-sm m-0 ng-tns-c28-0">
                              <div _ngcontent-ukn-c28="" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" class="progress-bar bg-blue ng-tns-c28-0" style="width: 100%;">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div _ngcontent-ukn-c28="" class="col-xl-3 col-md-6 col-6 ng-tns-c28-0">
                  <div _ngcontent-ukn-c28="" class="card-box ng-tns-c28-0">
                      <h4 _ngcontent-ukn-c28="" class="header-title m-0 text-md-left text-center ng-tns-c28-0">Deaths</h4>
                      <div _ngcontent-ukn-c28="" class="topBoxes ng-tns-c28-0">
                          <div _ngcontent-ukn-c28="" class="fa-3x text-center ng-tns-c28-0 d-none">
                              <i _ngcontent-ukn-c28="" class="fas fa-circle-notch fa-spin m-2 ng-tns-c28-0">
                                  </i>
                              </div>
                              <div _ngcontent-ukn-c28="" class="topBoxesDetails text-md-right text-center ng-tns-c28-0">
                                  <span _ngcontent-ukn-c28="" class="badge badge-danger badge-pill float-md-left m-md-3 mt-2 ng-tns-c28-0"><i _ngcontent-ukn-c28="" class="mdi mdi-trending-up ng-tns-c28-0"></i>
                                  </span><h2 _ngcontent-ukn-c28="" class="font-weight-normal ng-tns-c28-0">{{$deaths}} </h2>
                              </div>
                              <div _ngcontent-ukn-c28="" class="progress progress-bar-alt-danger progress-sm m-0 ng-tns-c28-0">
                                  <div _ngcontent-ukn-c28="" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" class="progress-bar bg-danger ng-tns-c28-0" style="width: 100%;"></div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div _ngcontent-ukn-c28="" class="col-xl-3 col-md-6 col-6 ng-tns-c28-0">
                      <div _ngcontent-ukn-c28="" class="card-box ng-tns-c28-0">
                          <h4 _ngcontent-ukn-c28="" class="header-title m-0 text-md-left text-center ng-tns-c28-0">Recoveries</h4>
                          <div _ngcontent-ukn-c28="" class="topBoxes ng-tns-c28-0">
                              <div _ngcontent-ukn-c28="" class="fa-3x text-center ng-tns-c28-0 d-none">
                              <i _ngcontent-ukn-c28="" class="fas fa-circle-notch fa-spin m-2 ng-tns-c28-0"></i>
                              </div>
                              <div _ngcontent-ukn-c28="" class="topBoxesDetails text-md-right text-center ng-tns-c28-0">
                                  <span _ngcontent-ukn-c28="" class="badge badge-success badge-pill float-md-left m-md-3 mt-2 ng-tns-c28-0">
                                      81.27% <i _ngcontent-ukn-c28="" class="mdi mdi-trending-up ng-tns-c28-0">
                                          </i>
                                      </span>
                                      <h2 _ngcontent-ukn-c28="" class="font-weight-normal ng-tns-c28-0"> {{$recovered}} </h2>
                                  </div>
                                  <div _ngcontent-ukn-c28="" class="progress progress-bar-alt-success progress-sm m-0 ng-tns-c28-0">
                                      <div _ngcontent-ukn-c28="" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" class="progress-bar bg-success ng-tns-c28-0" style="width: 100%;"></div>
                                  </div>
                              </div>
                          </div>
                        </div>
    </div>
</div>
</div>

@endsection