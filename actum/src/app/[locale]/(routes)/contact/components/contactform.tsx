"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/lib/submissions";

// Props modtager oversættelser som tekststrenge fra page.tsx
// fordi t() fra next-intl ikke virker i klientkomponenter
// Fejlbeskeder sendes også som props, så zod kan vise dem på det rigtige sprog
type Props = {
  submitLabel: string;
  emailLabel: string;
  nameLabel: string;
  phoneLabel: string;
  messagePlaceholder: string;
  errorEmail: string;
  errorName: string;
  errorPhone: string;
  sendingLabel: string;
  sentLabel: string;
  errorLabel: string;
};

// Modtager alle oversættelser som props, da t() ikke virker i klientkomponenter.
export default function ContactForm({
  submitLabel,
  emailLabel,
  nameLabel,
  phoneLabel,
  messagePlaceholder,
  errorEmail,
  errorName,
  errorPhone,
  sendingLabel,
  sentLabel,
  errorLabel,
}: Props) {
  // Styrer tekst på send-knappen afhængigt af formularens tilstand
  const [buttonText, setButtonText] = useState(submitLabel);

  // Øverst i komponenten – tilføj til eksisterende props og state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Zod-schema definerer valideringsregler for hvert felt
  // Fejlbeskeder kommer som props fra page.tsx, så de kan oversættes
  const contactSchema = z.object({
    email: z.string().email(errorEmail),
    name: z.string().min(2, errorName),
    phone: z.string().min(8, errorPhone),
    message: z.string(),
  });

  // TypeScript-typen bestemmes automatisk ud fra zod-schemaet
  type FormData = z.infer<typeof contactSchema>;

  // reset bruges til at rydde formularen efter en vellykket afsendelse
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  // Kaldes når formularen sendes, og valideringen er gået igennem
  const onSubmit = async (data: FormData) => {
    setButtonText(sendingLabel);

    try {
      // selectedFile sendes som separat argument – ikke en del af zod-schemaet
      await submitContactForm(data, selectedFile ?? undefined);
      setButtonText(sentLabel);
      reset();
      setSelectedFile(null);
      setTimeout(() => setButtonText(submitLabel), 3000);
    } catch {
      setButtonText(errorLabel);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div>
        <input
          type="email"
          placeholder={emailLabel}
          className="cursor-pointer w-full border-b border-(--almost-black) bg-transparent outline-none pb-4"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-xs text-(--grey-accessible)">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={nameLabel}
            className="cursor-pointer w-full border-b border-(--almost-black) bg-transparent outline-none pb-4"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-(--grey-accessible)">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex-1">
          <input
            type="tel"
            placeholder={phoneLabel}
            className="cursor-pointer w-full border-b border-(--almost-black) bg-transparent outline-none pb-4"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-(--grey-accessible)">
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <textarea
          placeholder={messagePlaceholder}
          className="cursor-pointer w-full border-b border-(--almost-black) bg-transparent outline-none resize-none h-32 pb-2"
          {...register("message")}
        />
      </div>

      <label className="relative flex items-center text-(--grey-accessible) w-full border-b cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2" // ← ikke stroke-width
          strokeLinecap="round" // ← ikke stroke-linecap
          strokeLinejoin="round" // ← ikke stroke-linejoin
          className="  pb-1 mr-2 "
        >
          <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
          <path d="M14 2v5a1 1 0 0 0 1 1h5" />
          <path d="M12 12v6" />
          <path d="m15 15-3-3-3 3" />
        </svg>
        <p className="flex-1 cursor-pointer ">
          {selectedFile
            ? selectedFile.name
            : " Klik for at vedhæfte en fil (valgfrit)"}
        </p>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.ai,.eps"
          onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          className="absolute inset-0 w-full h-full opacity-0"
        />
      </label>

      <button
        type="submit"
        className="mt-10  w-1/2 mx-auto inline-block px-16 py-3 text-sm tracking-widest bg-(--almost-black) text-white border border-(--almost-black) hover:bg-white hover:text-(--almost-black) transition-colors duration-200"
      >
        {buttonText}
      </button>
    </form>
  );
}
