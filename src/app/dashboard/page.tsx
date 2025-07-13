'use client'

import { motion } from "framer-motion";

const DashboardPage = () => {
  return (
    <>
      <main className="min-h-screen">
            <section className="max-w-4xl w-full mx-auto h-1/6">
                <div className="flex items-center justify-center gap-4 h-full">
                    <motion.div className="w-4 sm:w-8 shadow-md bg-primary aspect-square rounded-lg" 
                        animate={{scale: [0.5, 1, 1, 0.5], rotate: [0, 90, 90, 0], borderRadius: ["10%", "10%", "50%", "10%"]}}
                        transition={ {duration: 4, ease: "easeInOut", repeat: Infinity }}
                    />
                    <h1 className="font-bold text-base sm:text-2xl text-center text-muted-foreground">Welcome back</h1>
                </div>
                <div className="bg-muted rounded-lg aspect-square w-full h-56 mt-10">
                </div>
            </section>
        </main>
    </>
  )
}

export default DashboardPage;