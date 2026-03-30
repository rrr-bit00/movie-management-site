import NewMovieForm from "@/components/crud/NewMovieForm";
import { requireSession } from "@/lib/session";

export default async function Page() {
    await requireSession()
    return <NewMovieForm />
}
