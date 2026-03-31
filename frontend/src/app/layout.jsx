import "./globals.css";

// タイトルなどのメタデータ
export const metadata = {
  title: "Movie Management Site",
  description: "映画情報を管理するアプリ"
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
