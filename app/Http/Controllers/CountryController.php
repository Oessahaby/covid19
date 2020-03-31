<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class CountryController extends Controller
{
    public function index()
    {
        $rUrl = 'https://pomber.github.io/covid19/timeseries.json';
        $data = json_decode(file_get_contents($rUrl), true);

        return view('welcome',['data'=>$data]);

    }
    public function showResults(Request $request){
        $rUrl = 'https://pomber.github.io/covid19/timeseries.json';
        $data = json_decode(file_get_contents($rUrl), true);
        $field = $request->input('country');
    return view('dash',['data'=>$data,'field'=>$field]);

       
    }
}
