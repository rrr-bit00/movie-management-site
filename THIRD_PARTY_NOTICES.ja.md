# 参考にした外部OSSについて

このプロジェクトには、外部のオープンソースソフトウェアを参考にした構成や実装が含まれています。

## FastAPI Full Stack Template
- 参照元: https://github.com/fastapi/full-stack-fastapi-template
- ライセンス: MIT
- 補足: バックエンドの構成や実装の一部は、このテンプレートを参考にして作成しています。

## shadcn/ui
- 参照元: https://github.com/shadcn-ui/ui
- ライセンス: MIT
- 補足: `frontend/src/components/ui/` 配下の一部UIコンポーネントは、shadcn/ui によって生成されたもの、またはそれをもとに調整したものです。

## Codex を用いたUI調整
- 補足: スタイリングやUI調整の一部では Codex の支援を受けていますが、最終的な確認と調整は作者が行っています。

## 依存パッケージについて
このプロジェクトの依存関係は `frontend/package.json` と `backend/requirements.txt` で管理しています。各依存パッケージには、それぞれ個別のライセンス条件が適用されます。
