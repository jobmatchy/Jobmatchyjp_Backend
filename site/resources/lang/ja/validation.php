<?php

return [
    /*
    |--------------------------------------------------------------------------
    | バリデーション言語行
    |--------------------------------------------------------------------------
    */

    'accepted' => ':attributeを承認してください。',
    'active_url' => ':attributeは有効なURLではありません。',
    'after' => ':attributeは:dateより後の日付にしてください。',
    'alpha' => ':attributeは文字のみにしてください。',
    'array' => ':attributeは配列にしてください。',
    'boolean' => ':attributeはtrueかfalseにしてください。',
    'confirmed' => ':attributeの確認が一致しません。',
    'email' => ':attributeは有効なメールアドレスにしてください。',
    'exists' => '選択された:attributeは無効です。',
    'integer' => ':attributeは整数にしてください。',
    'max' => [
        'numeric' => ':attributeは:max以下にしてください。',
        'string' => ':attributeは:max文字以下にしてください。',
        'array' => ':attributeは:max個以下にしてください。',
    ],
    'min' => [
        'numeric' => ':attributeは:min以上にしてください。',
        'string' => ':attributeは:min文字以上にしてください。',
        'array' => ':attributeは:min個以上にしてください。',
    ],
    'required' => ':attributeは必須項目です。',
    'string' => ':attributeは文字列にしてください。',
    'unique' => ':attributeはすでに存在します。',
    'in' => '選択された:attributeは無効です。',

    /*
    |--------------------------------------------------------------------------
    | カスタムバリデーション言語行
    |--------------------------------------------------------------------------
    */

    'custom' => [
        'email' => [
            'required' => 'メールアドレスは必須項目です。',
            'email' => '正しいメールアドレスを入力してください。',
            'unique' => 'メールアドレスはすでに登録されています。',
            'exists' => 'メールアドレスが存在しません。',
        ],
        'phone' => [
            'required' => '電話番号は必須項目です。',
            'unique' => '電話番号はすでに登録されています。',
            'exists' => '電話番号が存在しません。',
        ],
        'password' => [
            'required' => 'パスワードは必須項目です。',
            'min' => 'パスワードは:min文字以上にしてください。',
            'confirmed' => 'パスワードの確認が一致しません。',
        ],
        'password_confirmation' => [
            'required' => 'パスワード確認は必須項目です。',
        ],
        'old_password' => [
            'required' => '現在のパスワードは必須項目です。',
        ],
        'country_code' => [
            'required' => '国コードは必須項目です。',
        ],
        'otp' => [
            'required' => 'OTPは必須項目です。',
            'exists' => 'OTPが間違えています。',
        ],
        'intro_video' => [
            'required' => '紹介動画は必須項目です。',
        ],
        'first_name' => [
            'required' => '名前は必須項目です。',
        ],
        'last_name' => [
            'required' => '苗字は必須項目です。',
        ],
        'about' => [
            'required' => '自己PRは必須項目です。',
        ],
        'gender' => [
            'required' => '性別は必須項目です。',
            'integer' => '性別を選択してください。',
        ],
        'japanese_level' => [
            'required' => '日本語レベルは必須項目です。',
            'integer' => '日本語レベルを選択してください。',
        ],
        'experience' => [
            'required' => '経験は必須項目です。',
            'integer' => '経験を選択してください。',
        ],
        'job_type' => [
            'required' => '雇用形態を選択してください。',
        ],
        'pay_type' => [
            'required' => '給与の種類を選択してください。',
            'in' => '給与の種類を選択してください。',
        ],
        'title' => [
            'required' => 'タイトルは必須項目です。',
        ],
        'salary_from' => [
            'required' => '給与は必須項目です。',
        ],
        'required_skills' => [
            'required' => 'スキルは必須項目です。',
        ],
        'occupation' => [
            'required' => '職種は必須項目です。',
            'exists' => '職種はシステムに存在しません。',
        ],
        'location' => [
            'required' => '勤務地は必須項目です。',
            'exists' => '勤務地は存在しません。',
        ],
        'tags' => [
            'array' => 'タグは配列にしてください。',
            'exists' => 'システムにタグが存在しません。',
        ],
        'matching_accept' => [
            'required' => 'マッチング承認は必須項目です。',
            'in' => 'マッチング承認は承諾または拒否にしてください。',
        ],
        'user_id' => [
            'required' => 'ユーザーは必須項目です。',
            'exists' => '選択されたユーザーは存在しません。',
        ],
        'jobseeker_id' => [
            'required' => '求職者は必須項目です。',
            'exists' => '選択された求職者は存在しません。',
        ],
        'job_id' => [
            'required' => '求人は必須項目です。',
            'exists' => '選択された求人は存在しません。',
        ],
        'name' => [
            'required' => '企業名は必須項目です。',
        ],
        'address' => [
            'required' => '住所は必須項目です。',
        ],
        'cancel_reason' => [
            'required' => 'キャンセル理由は必須項目です。',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | カスタムバリデーション属性
    |--------------------------------------------------------------------------
    */

    'attributes' => [
        'email' => 'メールアドレス',
        'phone' => '電話番号',
        'password' => 'パスワード',
        'first_name' => '名前',
        'last_name' => '苗字',
        'country_code' => '国コード',
    ],
];
