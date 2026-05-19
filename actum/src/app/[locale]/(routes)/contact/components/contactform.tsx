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
  messageLabel: string;
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
  messageLabel,
  errorEmail,
  errorName,
  errorPhone,
  sendingLabel,
  sentLabel,
  errorLabel,
}: Props) {
  // Styrer tekst på send-knappen afhængigt af formularens tilstand
  const [buttonText, setButtonText] = useState(submitLabel);

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
      await submitContactForm(data);
      // Nulstiller formularen og viser succesbesked på knappen
      setButtonText(sentLabel);
      reset();
      // Gendanner knappens tekst til originalen efter 3 sekunder
      setTimeout(() => {
        setButtonText(submitLabel);
      }, 3000);
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
          className="w-full border-b border-(--almost-black) bg-transparent outline-none pb-4"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-xs text-(--grey)">{errors.email.message}</span>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={nameLabel}
            className="w-full border-b border-(--almost-black) bg-transparent outline-none pb-4"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-(--grey)">{errors.name.message}</span>
          )}
        </div>
        <div className="flex-1">
          <input
            type="tel"
            placeholder={phoneLabel}
            className="w-full border-b border-(--almost-black) bg-transparent outline-none pb-4"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-(--grey)">{errors.phone.message}</span>
          )}
        </div>
      </div>

      <div>
        <textarea
          placeholder={messageLabel}
          className="w-full border-b border-(--almost-black) bg-transparent outline-none resize-none h-32 pb-2"
          {...register("message")}
        />
      </div>

      <button
        type="submit"
        className="mt-10 w-1/2 mx-auto inline-block px-16 py-3 text-sm tracking-widest bg-(--almost-black) text-white border border-(--almost-black) hover:bg-white hover:text-(--almost-black) transition-colors duration-200"
      >
        {buttonText}
      </button>
    </form>
  );
}
