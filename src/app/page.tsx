'use client';

import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Logo from "@/components/ui/Logo";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, FileText, LayoutDashboard, LayoutPanelTop, Quote, Search, TrendingUp } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { KeyFeatureProps, TrustMetricsProps } from "@/types";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "From academic research to daily to-do lists, WorkBook handles it all. The ability to link notes to my schedule and search everything instantly means no idea ever gets lost.",
    name: "David Kim",
    title: "University Researcher",
    image: "testimony1_image.jpg"
  },
  {
    quote: "WorkBook has been a game-changer for my scattered thoughts. Everything is so neatly organized now, and I finally feel in control of my projects. The customizable dashboard is a lifesaver!",
    name: "Aisha Rahman",
    title: "Marketing Manager",
    image: "testimony2_image.jpg" 
  },
  {
    quote: "I used to jump between three different apps for notes and scheduling. WorkBook brought it all together seamlessly. My productivity has genuinely soared, and I'm hitting deadlines with ease.",
    name: "Ben Carter",
    title: "Software Developer",
    image: "testimony3_image.jpg" 
  },
  {
    quote: "The clean interface and intuitive features make WorkBook a joy to use. It's transformed how I manage my freelance clients and personal tasks. Simple, yet incredibly powerful.",
    name: "Chloe Lee",
    title: "Freelance Photographer",
    image: "testimony4_image.jpg" 
  }
];

const titleAnimationVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
};

const staggerContainer : Variants = {
  hidden: { opacity: 0 }, 
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const featureItemVariants : Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const HomePage = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  return (
    <main className="flex flex-col items-center justify-center">
      <header className="w-full max-w-5xl lg:max-w-7xl px-6 sm:px-8">
        <NavBar />
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0">
          <section className="flex flex-col w-full max-w-lg my-10 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4">
              Your Personal Workspace Hub
            </h2>
            <p className="text-md sm:text-xl text-muted-foreground mb-8">
              Organize your thoughts, manage your schedule, and unleash your productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/login" passHref>
                <Button size="lg" className="w-full sm:w-auto">Get Started - Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Create Account</Button>
              </Link>
            </div>
          </section>
          <div className="w-full lg:w-auto flex justify-center">
            <Image 
              src="hero_image.svg" 
              alt={"Image"} 
              width={500} 
              height={500} 
              draggable="false" 
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto"
            />
          </div>
        </div>
      </header>

      <section className="max-w-7xl py-16 md:py-24 my-10 lg:my-20 px-6 sm:px-8">
        <motion.div 
          variants={titleAnimationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">Unlock Your Potential with WorkBook</h2>
          <p className="text-base sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 md:mb-20">WorkBook provides powerful tools to streamline your workflow and keep everything in one place.</p>
        </motion.div>
        <motion.div 
          variants={staggerContainer} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-3 sm:px-0"
        >
          <KeyFeature 
            headerText={"Intuitive Notes & Page"} 
            description={" Capture ideas effortlessly with rich text editing, organized into custom folders and searchable pages."} 
            IconComponent={FileText}          
          />
          <KeyFeature 
            headerText={"Effortless Scheduling"} 
            description={"Manage your events, set reminders, and view your schedule clearly to stay on top of your tasks."} 
            IconComponent={Calendar}          
          />
          <KeyFeature 
            headerText={"Personalized Dashboard"} 
            description={"Arrange widgets and quick access points to create a workspace that perfectly fits your unique needs."} 
            IconComponent={LayoutDashboard}          
          />
          <KeyFeature 
            headerText={"Unified Smart Search"} 
            description={"Quickly find any note, event, or file across your entire workspace with powerful, instant search."} 
            IconComponent={Search}          
          />
        </motion.div>
      </section>

      <motion.div 
        className="bg-accent w-full"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="max-w-7xl py-16 md:py-24 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUpChild} className="space-y-2 text-center">
            <h1 className="font-bold text-3xl sm:text-4xl text-primary">Testimonies</h1>
            <h1 className="max-w-xl text-base sm:text-lg text-muted-foreground mb-10 mx-auto">Discover how countless users are transforming their work and personal organization through our platform.</h1>
          </motion.div>
          <motion.div variants={fadeUpChild} className="max-w-5xl lg:max-w-11/12 ml-5 lg:mx-auto">
            <Carousel opts={{loop:true}} plugins={[plugin.current]}>
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 select-none p-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full max-w-sm lg:max-w-lg h-auto rounded-lg"
                      />
                    <div className="space-y-2 text-center lg:text-left lg:text-lg">
                      <Quote className="size-4 sm:size-6 text-primary mx-auto lg:mx-0"/>
                      <h1 className="text-xl sm:text-2xl font-bold text-primary mt-5">{testimonial.name}</h1>
                      <h2 className="text-muted-foreground text-sm sm:text-base sm:mb-4">{testimonial.title}</h2>
                      <p className="text-muted-foreground text-sm sm:text-base">{testimonial.quote}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-primary hidden lg:flex"/>
              <CarouselNext className="text-primary hidden lg:flex"/>
            </Carousel>
          </motion.div>
        </section>
      </motion.div>

      <motion.section 
        className="max-w-5xl py-16 md:py-24 mb-10 lg:mb-20 w-full mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={fadeUpChild} className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-center">
          <span className="space-y-6 px-4 sm:px-0 sm:w-sm mb-10 lg:mb-20 lg:mr-auto text-center lg:text-left">
            <h1 className="font-bold text-sm sm:text-base text-primary">Trust Metrics</h1>
            <h1 className="font-bold text-2xl sm:text-3xl sm:w-sm"> The ultimate foundation for your ideas and projects.</h1>
            <p className="text-sm sm:text-lg font-medium text-muted-foreground">Your workspace hub transforms how you organize information, collaborate, and bring your visions to life, making productivity intuitive and effortless. Empowering individuals and teams worldwide, we constantly evolve to ensure your best work is always within reach.</p>
          </span>
          <Image src="hero_image.svg" alt={"Image"} width={400} height={500} draggable="false" />
        </motion.div>
        <motion.div 
          variants={staggerContainer} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mt-12"
        >
          <TrustMetrics numbers=" 25,000+" description="Pages & documents created daily." IconComponent={BookOpen}/>
          <TrustMetrics numbers="99.99%" description="Historical uptime for seamless work." IconComponent={Clock}/>
          <TrustMetrics numbers="85%" description="Of users report increased organization." IconComponent={TrendingUp}/>
          <TrustMetrics numbers="40+" description="Templates & integrations available." IconComponent={LayoutPanelTop}/>
        </motion.div>
      </motion.section>

      <section className="w-full bg-secondary">
        <div className="max-w-6xl mx-auto py-16 md:py-20 my-10 lg:my-20 flex flex-col-reverse lg:flex-row items-center gap-8 px-6 lg:px-8">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="font-bold text-lg sm:text-2xl mb-2 sm:mb-6">Ready to get started?</h1>
            <p className="max-w-lg text-sm sm:text-lg text-muted-foreground mx-auto lg:mx-0">Create an account instantly to get started or contact us to manage a custom workspace for your workbook.</p>
            <span>
              <Button size="lg" className="w-full sm:w-auto"><Link href={"/register"}>Start Now</Link></Button>
            </span>
          </div>
          <motion.div className="w-12 h-12 mb-12 lg:mb-0 lg:w-28 lg:h-28 shadow-md bg-primary rounded-lg mx-auto " 
            animate={{scale: [1, 2, 2, 1], rotate: [0, 90, 90, 0], borderRadius: ["10%", "10%", "50%", "10%"]}}
            transition={ {duration: 4, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </section>
      <footer className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-8 flex flex-col sm:flex-row justify-between items-center sm:items-start mx-auto gap-4 sm:gap-0">
        <div className="space-y-1 text-center sm:text-left">
          <Logo />
          <h1 className="text-muted-foreground text-sm">© 2025 · Kenny Tang · All rights reserved</h1>
        </div>
        <div className="text-center sm:text-right space-y-1">
          <h1 className="text-sm">Created by <span className="font-bold underline hover:text-primary hover:cursor-pointer">
            <a href="https://github.com/kennytangg" target="_blank" rel="noopener noreferrer">Kenny Tang</a></span>
          </h1>
          <h1 className="text-sm">Code / Design by <span className="font-bold underline hover:text-primary hover:cursor-pointer">
            <a href="https://github.com/kennytangg" target="_blank" rel="noopener noreferrer">Kenny Tang</a></span>
          </h1>
        </div>
      </footer>
    </main>
  );
}

const KeyFeature = ({headerText, description, IconComponent }: KeyFeatureProps) => {
  return (
    <motion.div variants={featureItemVariants} transition={{ duration: 0.5, ease: "easeInOut"}} className="px-10 py-8 md:p-8 rounded-lg border-1 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-center size-10 sm:size-12 rounded-full bg-primary/15 mb-2 sm:mb-4">
        <IconComponent className="text-primary size-5 sm:size-6" />
      </div>
      <h1 className="text-base sm:text-lg  font-semibold mb-2">{headerText}</h1>
      <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
    </motion.div>
  );
}

const TrustMetrics = ({numbers, description, IconComponent}: TrustMetricsProps) => {
  return (
    <motion.div variants={fadeUpChild} className="flex items-center px-4 sm:px-2">
        <div className="border-l-3 border-primary h-16 mr-4"></div>
        <div className="w-full">
            <span className="flex items-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-1">{numbers}</h3>
              <IconComponent className="size-5 ml-auto text-primary"></IconComponent>
            </span>
            <p className="text-xs sm:text-sm opacity-80 ">{description}</p>
        </div>
    </motion.div>
  );
}

export default HomePage;