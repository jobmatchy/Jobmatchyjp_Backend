<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $privacyPolicyEn = "This Privacy Policy describes how Our Works (\"we,\" \"our,\" or \"us\") collects, uses, and shares the personal information of users (\"you\" or \"your\") of our website. By using our Website, you consent to the practices described in this Privacy Policy.\n\n1.Information We Collect\n\nWe may collect various types of information, including:\n\nPersonal Information: This includes information that can identify you, such as your name, email address, phone number, or postal address, which you may provide when contacting us or filling out forms on our Website.\n\nUsage Information: We collect information about your interactions with our Website, such as your IP address, browser type, referring/exit pages, and operating system.\n\n2.Cookies:\n\nWe use cookies and similar tracking technologies to gather information about your browsing activities on our Website. You can control cookies through your browser settings, but please note that disabling cookies may affect your experience on our Website.\n\n3.How We Use Your Information\n\nWe use the collected information for various purposes, including:\n\nProviding Services: To provide you with the services and information you request from us.\n\nImproving Our Website: To enhance and personalize your experience on our Website and to analyze user preferences and trends.\n\nCommunications: To communicate with you, respond to your inquiries, and provide updates on our services.\n\nLegal Compliance: To comply with applicable laws, regulations, and legal processes.\n\n4.Sharing Your Information\n\nWe do not sell, trade, or rent your personal information to third parties. However, we may share your information with:\n\nService Providers: We may share your information with third-party service providers who assist us in operating our Website or providing our services.\n\nLegal Requirements: We may disclose your information in response to a legal request, court order, or government investigation.\n\n5.Security\n\nWe take reasonable steps to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmitting information over the internet is completely secure, and we cannot guarantee the security of your data.\n\nYour Choices\n\nYou have the right to:\n\nAccess, correct, or delete your personal information.\n\nOpt out of receiving marketing communications from us.\n\nDisable cookies through your browser settings.\n\n6.Changes to this Privacy Policy\n\nWe may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated policy will be posted on our Website with the date of the latest revision.\n\n7.Contact Us\n\nIf you have any questions or concerns about this Privacy Policy or our data practices, please contact us.";

        $privacyPolicyJa = "このプライバシー ポリシーでは、当社が当社 Web サイトのユーザーの個人情報をどのように収集、使用、および共有するかについて説明します。当社の Web サイトを使用することにより、このプライバシー ポリシーに記載されている慣行に同意したことになります。\n\n1.当社が収集する情報\n\n当社は、次のようなさまざまな種類の情報を収集する場合があります。\n\n個人情報: これには、お客様が当社に連絡するとき、または当社のウェブサイト上のフォームに記入するときに提供する、お客様の名前、電子メール アドレス、電話番号、郵便番号など、お客様を特定できる情報が含まれます。\n\n使用状況情報: 当社は、IP アドレス、ブラウザの種類、ページの参照/終了、オペレーティング システムなど、当社 Web サイトとのやり取りに関する情報を収集します。\n\n2.クッキー:\n\n当社は、Cookie および同様の追跡技術を使用して、当社 Web サイトでの閲覧活動に関する情報を収集します。\n\n3.お客様の情報の使用方法\n\n当社は収集した情報を次のようなさまざまな目的で使用します。\n\nサービスの提供: お客様が当社に要求するサービスおよび情報を提供するため\n\n当社の Web サイトの改善: 当社の Web サイトでのエクスペリエンスを強化およびパーソナライズし、ユーザーの好みや傾向を分析するため。\n\n4.あなたの情報の共有\n\n当社はお客様の個人情報を第三者に販売、取引、または貸与することはありません。\n\n5.セキュリティ\n\n当社は、お客様の個人情報を不正なアクセス、開示、変更、または破壊から保護するために合理的な措置を講じます。\n\n6.本プライバシーポリシーの変更\n\n当社は、本プライバシー ポリシーを随時更新することがあります。\n\n7.お問い合わせ\n\nこのプライバシー ポリシーに関してご質問がある場合は、お問い合わせください。";

        $data = [
            [
                'title_en' => 'Terms Of Service',
                'title_ja' => '利用規約',
                'type' => 'terms_of_service',
                'description_en' => $privacyPolicyEn,
                'description_ja' => $privacyPolicyJa,
            ],
            [
                'title_en' => 'User Policy',
                'title_ja' => 'ユーザーポリシー',
                'type' => 'user_policy',
                'description_en' => $privacyPolicyEn,
                'description_ja' => $privacyPolicyJa,
            ],
            [
                'title_en' => 'Privacy Policy',
                'title_ja' => 'プライバシーポリシー',
                'type' => 'privacy_policy',
                'description_en' => $privacyPolicyEn,
                'description_ja' => $privacyPolicyJa,
            ],
            [
                'title_en' => 'Terms Of Service Company',
                'title_ja' => '会社利用規約',
                'type' => 'terms_of_service_company',
                'description_en' => $privacyPolicyEn,
                'description_ja' => $privacyPolicyJa,
            ],
            [
                'title_en' => 'Job Policy',
                'title_ja' => '求人ポリシー',
                'type' => 'job_policy',
                'description_en' => $privacyPolicyEn,
                'description_ja' => $privacyPolicyJa,
            ],
        ];

        DB::table('contents')->insert($data);
    }
}
