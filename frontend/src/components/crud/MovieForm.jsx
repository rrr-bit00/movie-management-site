"use client";

import useForm from "react-hook-form";
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
      year: values.year === "" ? undefined : values.year,
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
        <Label htmlFor="description">タイトル</Label>
        <Input
          id="description"
          placeholder="説明"
          {...register("description", { required: "タイトルは必須" })}
        />
        {errors.title && <p>{String(errors.title.message)}</p>}
      </div>

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
        <Label htmlFor="year">年</Label>
        <Input
          id="year"
          placeholder="公開年 <例：2020>"
          {...register("year", {
            // 4桁の数字の正規表現
            pattern: { value: /^\d{4}/, message: "4桁の数字にしてください" },
          })}
        />
        {errors.year && <p>{String(errors.year.message)}</p>}
      </div>
    </form>
  );
}
