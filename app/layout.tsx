import './globals.css';
import type { ReactNode } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';

export const metadata = {
    title: {
        template: '%s | Valuya',
        default: 'Valuya Wizard'
    }
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased text-slate-900 relative overflow-x-hidden" suppressHydrationWarning>
                {/* Full-screen animated background */}
                <AnimatedBackground className="fixed inset-0 -z-10" />

                {/* Content */}
                <main className="min-h-screen flex flex-col">{children}</main>
            </body>
        </html>
    );
}
