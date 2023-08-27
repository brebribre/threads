import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import '../globals.css';

//specify different rules for auth routes
export const metadata = {
    title: 'Threads',
    description : 'A Next.js 13 Threads application from Meta'
}

//set default font
const inter = Inter({ subsets: ["latin"]})

//CLERK Authentication
export default function RootLayout( {
    children
}: {
    children: React.ReactNode
} ){
    return (
    <ClerkProvider>
        <html lang = "en">
            <body className={`${inter.className} bg-dark-1 grid justify-center`}>{children}</body>
        </html>
    </ClerkProvider>
    )
}