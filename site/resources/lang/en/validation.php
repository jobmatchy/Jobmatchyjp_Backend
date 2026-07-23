<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    */

    'accepted' => 'The :attribute must be accepted.',
    'active_url' => 'The :attribute is not a valid URL.',
    'after' => 'The :attribute must be a date after :date.',
    'alpha' => 'The :attribute must only contain letters.',
    'array' => 'The :attribute must be an array.',
    'boolean' => 'The :attribute must be true or false.',
    'confirmed' => 'The :attribute confirmation does not match.',
    'email' => 'The :attribute must be a valid email address.',
    'exists' => 'The selected :attribute is invalid.',
    'integer' => 'The :attribute must be an integer.',
    'max' => [
        'numeric' => 'The :attribute must not be greater than :max.',
        'string' => 'The :attribute must not be greater than :max characters.',
        'array' => 'The :attribute must not have more than :max items.',
    ],
    'min' => [
        'numeric' => 'The :attribute must be at least :min.',
        'string' => 'The :attribute must be at least :min characters.',
        'array' => 'The :attribute must have at least :min items.',
    ],
    'required' => 'The :attribute field is required.',
    'string' => 'The :attribute must be a string.',
    'unique' => 'The :attribute has already been taken.',
    'in' => 'The selected :attribute is invalid.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    */

    'custom' => [
        'email' => [
            'required' => 'The email field is required.',
            'email' => 'The email must be a valid email address.',
            'unique' => 'This email already exists in the system.',
            'exists' => 'The selected email does not exist in the system.',
        ],
        'phone' => [
            'required' => 'The phone field is required.',
            'unique' => 'This phone number already exists in the system.',
            'exists' => 'The selected phone does not exist in the system.',
        ],
        'password' => [
            'required' => 'The password field is required.',
            'min' => 'The password must be at least :min characters.',
            'confirmed' => 'The password confirmation does not match.',
        ],
        'password_confirmation' => [
            'required' => 'The password confirmation field is required.',
        ],
        'old_password' => [
            'required' => 'Current password field is required.',
        ],
        'country_code' => [
            'required' => 'The country code field is required.',
        ],
        'otp' => [
            'required' => 'The OTP field is required.',
            'exists' => 'Invalid OTP code.',
        ],
        'intro_video' => [
            'required' => 'The introduction video field is required.',
        ],
        'first_name' => [
            'required' => 'The first name field is required.',
        ],
        'last_name' => [
            'required' => 'The last name field is required.',
        ],
        'about' => [
            'required' => 'The about field is required.',
        ],
        'gender' => [
            'required' => 'The gender field is required.',
            'integer' => 'The gender field must be a valid selection.',
        ],
        'japanese_level' => [
            'required' => 'The Japanese level field is required.',
            'integer' => 'The Japanese level must be a valid selection.',
        ],
        'experience' => [
            'required' => 'The experience field is required.',
            'integer' => 'The experience must be a valid selection.',
        ],
        'job_type' => [
            'required' => 'Please select a job type.',
        ],
        'pay_type' => [
            'required' => 'Please select a pay type.',
            'in' => 'Please select a valid pay type.',
        ],
        'title' => [
            'required' => 'The job title field is required.',
        ],
        'salary_from' => [
            'required' => 'The salary from field is required.',
        ],
        'required_skills' => [
            'required' => 'The required skills field is required.',
        ],
        'occupation' => [
            'required' => 'The occupation field is required.',
            'exists' => 'The selected occupation does not exist.',
        ],
        'location' => [
            'required' => 'The location field is required.',
            'exists' => 'The selected location does not exist.',
        ],
        'tags' => [
            'array' => 'The tags must be an array.',
            'exists' => 'The selected tags do not exist.',
        ],
        'matching_accept' => [
            'required' => 'The matching accept field is required.',
            'in' => 'Matching accept must be either accept or refuse.',
        ],
        'user_id' => [
            'required' => 'The user field is required.',
            'exists' => 'The selected user does not exist in the system.',
        ],
        'jobseeker_id' => [
            'required' => 'The jobseeker field is required.',
            'exists' => 'The selected jobseeker does not exist in the system.',
        ],
        'job_id' => [
            'required' => 'The job field is required.',
            'exists' => 'The selected job does not exist in the system.',
        ],
        'name' => [
            'required' => 'The company name field is required.',
        ],
        'address' => [
            'required' => 'The address field is required.',
        ],
        'cancel_reason' => [
            'required' => 'The cancellation reason is required.',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    */

    'attributes' => [
        'email' => 'email',
        'phone' => 'phone',
        'password' => 'password',
        'first_name' => 'first name',
        'last_name' => 'last name',
        'country_code' => 'country code',
    ],
];
