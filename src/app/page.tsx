import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Calendar, FileText, LayoutDashboard, Quote, Search } from "lucide-react";
import { KeyFeatureProps } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Logo from "@/components/ui/Logo";

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

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <header className="w-full max-w-6xl">
        <NavBar />
        <div className="flex justify-between items-center">
          <section className="flex flex-col w-full max-w-lg my-10">
            <h2 className="text-6xl font-bold tracking-tight lg:text-8xl mb-4 w-sm">
              Your Personal Workspace Hub
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Organize your thoughts, manage your schedule, and unleash your productivity.
            </p>
            <div className="flex gap-4">
              <Link href="/login" passHref>
                <Button size="lg">Get Started - Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button size="lg" variant="outline">Create Account</Button>
              </Link>
            </div>
          </section>
          <Image src="hero_image.svg" alt={"Image"} width={500} height={500} />
        </div>
      </header>
      <section className="max-w-7xl py-16 md:py-24 my-20">
        <h2 className="text-4xl font-bold text-foreground text-center mb-4">
          Unlock Your Potential with WorkBook
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 md:mb-20">
          WorkBook provides powerful tools to streamline your workflow and keep everything in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
      <section className="max-w-7xl py-16 md:py-24 mb-20">
        <div className="space-y-2">
          <h1 className="font-bold text-4xl">Achieve Your Goals, Stress-Free</h1>
          <p className="text-xl mb-8 text-muted-foreground">WorkBook streamlines your digital life, turning chaos into clarity and helping you stay on top of everything that matters</p>
        </div>
        <div>
          <Carousel opts={{loop:true}}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem className="flex items-center gap-8 select-none">
                  <img src={testimonial.image} alt={"Images"} width={600} />
                  <div className="space-y-2 text-lg">
                    <Quote className="size-6 text-primary"/>
                    <h1 className="text-2xl font-bold text-primary mt-5">{testimonial.name}</h1>
                    <h2 className="text-muted-foreground mb-4">{testimonial.title}</h2>
                    <p className="text-muted-foreground">{testimonial.quote}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary"/>
            <CarouselNext className="text-primary"/>
          </Carousel>
        </div>
      </section>
      <section className="w-full bg-secondary">
        <div className="max-w-6xl mx-auto py-16 md:py-24 my-20 space-y-6">
          <h1 className="font-bold text-2xl">Ready to get started?</h1>
          <p className="max-w-lg text-lg text-muted-foreground">Create an account instantly to get started or contact us to manage a custom workspace for your workbook.</p>
          <span>
            <Button size="lg" >Start Now</Button>
          </span>
        </div>
      </section>
      <footer className="w-full max-w-7xl my-8 flex justify-between">
        <div className="space-y-1">
          <Logo />
          <span></span>
          <h1 className="text-muted-foreground">© 2025 · Kenny Tang · All rights reserved </h1>
        </div>
        <div className="text-right space-y-1">
          <h1>Created by <span className="font-bold underline hover:text-primary">Kenny Tang</span></h1>
          <h1>Code / Design by <span className="font-bold underline hover:text-primary">Kenny Tang</span></h1>
        </div>
      </footer>
    </main>
  );
}

const KeyFeature = ({headerText, description, IconComponent }: KeyFeatureProps) => {
  return (
    <Card className="p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-center size-12 rounded-full bg-primary/15 mb-4">
        <IconComponent className="text-primary" />
      </div>
      <h1 className="text-lg font-semibold mb-2">{headerText}</h1>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

export default HomePage;
