'use client'

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function MovieForm({
  initialValues = {
    title: "",
    description: "",
    director: "",
    released_year: "",
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
    };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          placeholder="映画タイトル <例：Inception>"
          {...register("title", { required: "タイトルは必須" })}
        />
        {errors.title && <p>{String(errors.title.message)}</p>}
      </div>

      <div>
        <Label htmlFor="description">作品の説明</Label>
        <Input
          id="description"
          placeholder="映画の説明"
          {...register("description", { required: "説明は必須" })}
        />
        {errors.description && <p>{String(errors.description.message)}</p>}
      </div>

      <div>
        <Label htmlFor="title">監督名</Label>
        <Input
          id="director"
          placeholder="映画の監督名"
          {...register("director", { required: "監督名は必須" })}
        />
        {errors.director && <p>{String(errors.director.message)}</p>}
      </div>

      <div>
        <Label htmlFor="released_year">年</Label>
        <Input
          id="released_year"
          placeholder="映画の公開年 <例：2020>"
          {...register("released_year", {
            // 4桁の数字の正規表現
            pattern: { value: /^\d{4}/, message: "4桁の数字にしてください" },
          })}
        />
        {errors.released_year && <p>{String(errors.released_year.message)}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "送信中・・・" : submitLabel}
      </Button>
    </form>
  );
}
