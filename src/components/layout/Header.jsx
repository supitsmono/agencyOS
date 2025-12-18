"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Command, Brain, Users, Database, Share2 } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components = [
    {
        title: "AI Analysis",
        description: "Auto-categorize applications into 3 clear buckets.",
        icon: Brain
    },
    {
        title: "Central CRM",
        description: "Your whole team in one system. No more chaos.",
        icon: Database
    },
    {
        title: "Collaboration",
        description: "Vote, comment, and decide on talent together.",
        icon: Users
    },
    {
        title: "Casting Links",
        description: "Share professional presentations with one click.",
        icon: Share2
    },
]

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 max-w-screen-2xl items-center justify-between">
                <div className="font-bold text-2xl tracking-tighter mr-8">
                    <Link href="/">Agency<span className="text-primary">OS</span></Link>
                </div>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-muted p-6 no-underline outline-none border border-border/50 cursor-default">
                                            <Command className="h-8 w-8 mb-4 text-primary opacity-80" />
                                            <div className="mb-2 text-lg font-bold">
                                                AgencyOS Ecosystem
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Centralize your data. Automate your intake. Scale your agency.
                                            </p>
                                        </div>
                                    </li>
                                    <ListItem title="Cloud Infrastructure">
                                        Secure, scalable, and always online.
                                    </ListItem>
                                    <ListItem title="Team Permissioning">
                                        Simple access control for scouts and admins.
                                    </ListItem>
                                    <ListItem title="Enterprise Security">
                                        Bank-grade encryption for your data.
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            icon={component.icon}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/pricing" className={navigationMenuTriggerStyle()}>
                                    Pricing
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/resources" className={navigationMenuTriggerStyle()}>
                                    Resources
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4">
                    <Link href="/login" className={navigationMenuTriggerStyle()}>Log In</Link>
                    <Link href="/pricing" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                        Start Free Trial
                    </Link>
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef(({ className, title, children, href, icon: Icon, ...props }, ref) => {
    if (href) {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        href={href}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
                            className
                        )}
                        {...props}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            {Icon && <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />}
                            <div className="text-sm font-medium leading-none">{title}</div>
                        </div>
                        <p className={cn("line-clamp-2 text-sm leading-snug text-muted-foreground", Icon ? "ml-6" : "")}>
                            {children}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        )
    }

    return (
        <li>
            <div
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none outline-none cursor-default",
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-2 mb-1">
                    {Icon && <Icon className="h-4 w-4 text-primary" />}
                    <div className="text-sm font-medium leading-none">{title}</div>
                </div>
                <p className={cn("line-clamp-2 text-sm leading-snug text-muted-foreground", Icon ? "ml-6" : "")}>
                    {children}
                </p>
            </div>
        </li>
    )
})
ListItem.displayName = "ListItem"
