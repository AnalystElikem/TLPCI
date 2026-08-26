import { CheckCircle2 } from "lucide-react";

export default function FormSuccess({
  title,
  message,
  onReset,
}: {
  title: string;
  message: string;
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      className="flex h-fit flex-col items-center bg-white p-8 text-center shadow-sm md:p-10"
    >
      <CheckCircle2 className="h-12 w-12 text-secondary" strokeWidth={1.5} />
      <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
        {title}
      </h3>
      <p className="mt-2 max-w-md leading-relaxed text-text-muted">{message}</p>
      <button type="button" onClick={onReset} className="btn btn-outline mt-6">
        Submit another
      </button>
    </div>
  );
}
