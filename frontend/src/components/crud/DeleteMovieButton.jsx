'use client'

import { deleteMovieApi } from "@/lib/api";
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
    } from "../ui/alert-dialog";


export default function DeleteMovieButton({ id }) {
  const router = useRouter();
  // alertDialogの開閉用にstateを作成
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async() => {
    try {
        setDeleting(true);
        await deleteMovieApi(id);

        // 成功したらalertDialogを閉じる
        setOpen(false);
        router.push("/movies");
        router.refresh();
    } catch(e) {
        console.error(e);
        alert("削除に失敗しました");
        // 失敗したら開いたままにする
    } finally {
        setDeleting(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        {/* クリックすると、自動でopenをtrueに変更 */}
        <AlertDialogTrigger asChild>
            <Button variant="destructive">削除</Button>
        </AlertDialogTrigger>

        {/* 確認画面のUI */}
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                <AlertDialogDescription>削除したら元に戻すことはできません</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>

                {/* 確認画面のボタン */}
                <AlertDialogCancel disabled={deleting}>キャンセル</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "削除中..." : "削除する"}
                    </Button>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
