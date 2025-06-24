import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, LayoutDashboard, Search } from "lucide-react";
import { KeyFeatureProps } from "@/types";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <header className="w-full max-w-7xl">
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
          <Image src="hero_image.svg" alt={"Image"} width={550} height={500} />
        </div>
      </header>
      <section className="max-w-7xl py-16 md:py-24 my-20">
        <h2 className="text-4xl md:text-5xl font-medium text-foreground text-center mb-4">
          Unlock Your Potential with WorkBook
        </h2>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12 md:mb-20">
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
    </main>
  );
}

const KeyFeature = ({headerText, description, IconComponent }: KeyFeatureProps) => {
  return (
    <Card className="p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 mb-4">
        <IconComponent className="text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{headerText}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}

export default Home;
