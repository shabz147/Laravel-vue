<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use App\Repositories\UserRepository;

class UserController extends Controller
{


    protected $repo;

    public function __construct(UserRepository $user)
    {
        $this->repo = $user;
    }

    public function index(Request $request)
    {
        return new ApiResource($this->repo->getUserList($request->all())->paginate());
    }


    public function store(Request $request)
    {

        return new ApiResource($this->repo->addUpdateUser($request->all()));
    }

    public function show($id)
    {
        return new ApiResource($this->repo->getUserDetail(['id'=>$id]));
    }


    public function update(Request $request, $id)
    {
        return new ApiResource($this->repo->addUpdateUser($request->all(),$id));
    }

   
    public function destroy($id)
    {
        $user = $this->repo->getUserDetail(['id'=>$id]);
        $user->delete();
        return new ApiResource($user);
    }
}
