<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    private $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function getUserList($params)
    {
        if (!empty($params['search'])) {
            return $this->model->where('id', 'LIKE',  $params['search'] . '%')->with([]);
        }
        return $this->model->with([]);
    }

    public function getUserDetail($params)
    {
        $data =  $this->model->where($params)->firstOrFail();
        return $data;
    }
   
    public function addUpdateUser($params, $id = null)
    {
        if (!empty($id)) {
            $detail = $this->getUserDetail($id);
            if ($detail) {
                if (!empty($params['name'])) $detail->name     = $params['name'];
                $detail->save();
                return $detail;
            }
        } else {
            $data =  $this->model->forceCreate($this->formatParams($params));
            return $data;
        }
    }

    private function formatParams($params)
    {
        $formatted = [
            'name'   => $params['name'] ?? null,
        ];

        return $formatted;
    }
}