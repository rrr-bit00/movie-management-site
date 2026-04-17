'use client'

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MOVIE_STATUS_OPTIONS } from "@/lib/status";

export default function MovieForm({
  initialValues = {
    title: "",
    description: "",
    director: "",
    released_year: "",
    image: "",
    status_code: "unwatched",
  },
  submitLabel,
  onSubmit,
}) {
  // useFormを作成
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
  });

  const submit = async (values) => {
    // FastAPIがstrを期待するため文字のまま
    const payload = {
      ...values,
      released_year: values.released_year === "" ? undefined : values.released_year,
      image: values.image === "" ? undefined : values.image,
      status_code: values.status_code || "unwatched",
    };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title" className="text-sm font-medium text-slate-700">
          タイトル
        </Label>
        <Input
          id="title"
          placeholder="映画タイトル 例：Inception"
          className="border-slate-300 bg-white text-slate-800 shadow-none placeholder:text-slate-400"
          {...register("title", { required: "タイトルは必須" })}
        />
        {errors.title && <p className="text-xs text-red-600">{String(errors.title.message)}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-sm font-medium text-slate-700">
          作品の説明
        </Label>
        <textarea
          id="description"
          placeholder="映画の説明"
          className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-none outline-none placeholder:text-slate-400 focus:border-slate-400"
          {...register("description", { required: "説明は必須" })}
        />
        {errors.description && <p className="text-xs text-red-600">{String(errors.description.message)}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="director" className="text-sm font-medium text-slate-700">
          監督名
        </Label>
        <Input
          id="director"
          placeholder="映画の監督名"
          className="border-slate-300 bg-white text-slate-800 shadow-none placeholder:text-slate-400"
          {...register("director", { required: "監督名は必須" })}
        />
        {errors.director && <p className="text-xs text-red-600">{String(errors.director.message)}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="released_year" className="text-sm font-medium text-slate-700">
          公開年
        </Label>
        <Input
          id="released_year"
          placeholder="映画の公開年 例：2020"
          className="border-slate-300 bg-white text-slate-800 shadow-none placeholder:text-slate-400"
          {...register("released_year", {
            pattern: { value: /^\d{4}$/, message: "4桁の数字にしてください" },
          })}
        />
        {errors.released_year && <p className="text-xs text-red-600">{String(errors.released_year.message)}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="image" className="text-sm font-medium text-slate-700">
          画像URL
        </Label>
        <Input
          id="image"
          placeholder="https://example.com/poster.jpg"
          type="url"
          className="border-slate-300 bg-white text-slate-800 shadow-none placeholder:text-slate-400"
          {...register("image")}
        />
        {errors.image && <p className="text-xs text-red-600">{String(errors.image.message)}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="status_code" className="text-sm font-medium text-slate-700">
          ステータス
        </Label>
        <select
          id="status_code"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-slate-400"
          {...register("status_code", { required: "ステータスは必須" })}
        >
          {MOVIE_STATUS_OPTIONS.map((status) => (
            <option key={status.code} value={status.code}>
              {status.label}
            </option>
          ))}
        </select>
        {errors.status_code && <p className="text-xs text-red-600">{String(errors.status_code.message)}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-slate-800 text-white hover:bg-slate-900"
      >
        {isSubmitting ? "送信中..." : submitLabel}
      </Button>
    </form>
  );
}
