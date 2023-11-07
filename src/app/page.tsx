"use client";
import { AppContextProvider } from "@/component/contexts/app-context";
import { ImageDataContextProvider } from "@/component/contexts/image-data-context";
import AppRoot from "@/views/app-root";


export default function Home () {
  return (
    <AppContextProvider>
      <ImageDataContextProvider>
        <main className={""}>
          <AppRoot/>
        </main>
      </ImageDataContextProvider>
    </AppContextProvider>
  )
}
