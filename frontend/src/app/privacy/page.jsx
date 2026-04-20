import Link from "next/link"

const APP_NAME = "movie-management-site";
const OPERATOR_NAME = "Reo Saito";
const CONTACT_EMAIL = "reosaito.portfolio.dev@gmail.com";
const EFFECTIVE_DATE = "2026-04-20";
const UPDATED_DATE = "2026-04-20";

const sections = [
  {
    title: "1. 事業者情報",
    body: [
      `サービス名：${APP_NAME}`,
      `運営者：${OPERATOR_NAME}`,
      `連絡先：${CONTACT_EMAIL}`,
    ],
  },
  {
    title: "2. 取得する情報",
    body: [
      "本サービスでは、ユーザー登録、ログイン機能および映画管理機能の提供のため、次の情報を取得する場合があります。",
      "・メールアドレス",
      "・ユーザー名",
      "・ユーザーが本サービス上に登録した映画情報その他の入力情報",
      "・認証のために必要なCookie情報",
      "・IPアドレス、User-Agent、アクセス日時等の通信に伴って自動的に送信される情報",
    ],
  },
  {
    title: "3. 利用目的",
    body: [
      "取得した情報は、以下の目的のために利用します。",
      "・アカウント登録、本人確認、ログイン認証のため",
      "・ユーザーごとの映画データ管理機能を提供するため",
      "・本サービスの保守、障害対応、不正利用防止およびセキュリティ向上のため",
      "・お問い合わせ対応のため",
      "・本サービスの改善および今後の開発の参考とするため",
    ],
  },
  {
    title: "4. 取得方法",
    body: [
      "本サービスは、ユーザーが登録フォーム等に入力した情報を取得します。",
      "また、本サービスの利用に伴い、Cookie情報、IPアドレス、アクセス日時等の情報を自動的に取得する場合があります。",
    ],
  },
  {
    title: "5. 外部サービスの利用",
    body: [
      "本サービスは、フロントエンド、バックエンド、データベースその他の機能を提供するため、外部事業者の提供するクラウドサービス等を利用する場合があります。",
      "そのため、ユーザーが本サービスに入力した情報や、本サービスの利用に伴って発生する通信情報が、サービス提供に必要な範囲で、これらの事業者のサーバー上で処理または保存される場合があります。",
      "例えば、ユーザー登録やログイン時に入力されたメールアドレス、ユーザー名等は、バックエンドまたはデータベースのホスティング先で処理または保存される場合があります。",
      "一方で、利用する外部サービスの種類によっては、登録情報そのものではなく、IPアドレス、Cookie、アクセスログ等の情報のみを取り扱う場合があります。",
      "利用する外部サービスの例：Vercel、Render等",
    ],
  },
  {
    title: "6. 第三者提供",
    body: [
      "本サービスは、法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供しません。",
      "ただし、本サービスの提供に必要な範囲で、外部事業者の提供するインフラ、ホスティング、データベースその他のサービスを利用することがあります。",
    ],
  },
  {
    title: "7. 安全管理措置",
    body: [
      "本サービスは、取得した情報について、漏えい、滅失またはき損の防止その他の安全管理のために、必要かつ合理的な範囲で措置を講じるよう努めます。",
      "ただし、インターネット通信およびシステムの性質上、完全な安全性を保証するものではありません。",
    ],
  },
  {
    title: "8. 保有期間",
    body: [
      "取得した情報は、本サービスの提供、運営、問い合わせ対応、不正利用防止その他の利用目的の達成に必要な期間保有します。",
      "アカウント削除または情報削除の申出があった場合でも、法令対応、障害対応、不正利用防止その他これらに準ずる目的のために必要な範囲で保有することがあります。",
    ],
  },
  {
    title: "9. 開示、訂正、削除等",
    body: [
      "本人から、自己の個人情報について開示、訂正、削除等の申出があった場合には、本人確認を行ったうえで、合理的な範囲で対応します。",
      `申出先：${CONTACT_EMAIL}`,
    ],
  },
  {
    title: "10. Cookieに関する事項",
    body: [
      "本サービスは、ログイン状態の維持その他の機能提供のためにCookieを使用する場合があります。",
      "ブラウザの設定によりCookieを無効化した場合、本サービスの一部機能が利用できなくなることがあります。",
    ],
  },
  {
    title: "11. プライバシーポリシーの変更",
    body: [
      "本ポリシーは、法令、サービス内容または運用方法の変更等に応じて、必要に応じて変更することがあります。",
      "変更後の内容は、本ページに掲載した時点から効力を生じるものとします。",
    ],
  },
];

export const metadata = {
  title: `プライバシーポリシー | ${APP_NAME}`,
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-[linear-gradient(160deg,_rgb(15_23_42),_rgb(30_41_59))] px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-10">
        <Link
          href="/"
          className="mb-4 inline-flex text-sm text-amber-200 transition hover:text-amber-100"
          >
          ← TOPページに戻る
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">プライバシーポリシー</h1>

        <p className="mt-4 text-sm leading-7 text-slate-300">
          {APP_NAME}
          （以下、「本サービス」といいます。）は、本サービスにおいて取得するユーザーの情報について、以下のとおり取り扱います。
        </p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-slate-50">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 space-y-1 text-xs text-slate-400">
          <p>制定日：{EFFECTIVE_DATE}</p>
          <p>最終改定日：{UPDATED_DATE}</p>
        </div>
      </div>
    </main>
  );
}
