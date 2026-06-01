'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

interface CalEmbedProps {
    brandColor?: string
}

export default function CalEmbed({ brandColor = '#111111' }: CalEmbedProps) {
    // useEffect kører efter komponenten er mountet i browseren.
    // Selve useEffect-callbacken er IKKE async — den må kun returnere
    // en cleanup-funktion eller ingenting, ikke et Promise.
    useEffect(() => {
        // Vi bruger en IIFE (Immediately Invoked Function Expression) for at
        // kunne bruge await inde i useEffect uden at gøre callbacken async.
        // Funktionen oprettes og kaldes med det samme: (async () => { ... })()
        ; (async () => {
            const cal = await getCalApi()
            cal('ui', {
                cssVarsPerTheme: {
                    light: {
                        'cal-brand': '#191919',           // valgt dag — sort
                        'cal-brand-emphasis': '#191919',  // hover på valgt
                        'cal-brand-text': '#ffffff',      // tekst på valgt dag
                        'cal-bg': '#ffffff',              // baggrund
                        'cal-bg-subtle': '#e1e1e1',       // subtil baggrund
                        'cal-bg-emphasis': '#e1e1e1',     // hover på ledige dage
                        'cal-border': '#191919',
                        'cal-border-subtle': '#191919',
                        'cal-text': '#191919',            // tekst på ledige dage
                        'cal-text-subtle': '#191919',     // tekst på dage uden for måneden
                        'cal-text-emphasis': '#191919',   // ← tekst på ledige dage
                    },
                } as Record<string, Record<string, string>>,
                hideEventTypeDetails: true,
                layout: 'column_view',
            })
        })()
    }, [brandColor]) // Re-initialiserer kun hvis brandColor ændrer sig

    return (
        <Cal
            calLink="linneabaekgaard/meeting"
            calOrigin="https://cal.eu"
            embedJsUrl="https://cal.eu/embed/embed.js"
            style={{ width: '100%', maxWidth: '400px', height: '100%', overflow: 'scroll' }} />
    )
}